
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.schemas import AdminOverview, DepartmentStats

router = APIRouter(prefix="/admin", tags=["admin"])

LEVEL_NAMES = {1: "Beginner", 2: "Basic", 3: "Intermediate", 4: "Advanced", 5: "Expert"}


@router.get("/overview", response_model=AdminOverview)
def overview(department: str | None = None, db: Session = Depends(get_db)) -> AdminOverview:
    params = {"dept": department}

    dept_rows = db.execute(
        text(
            """
            SELECT d.name AS department,
                   COUNT(DISTINCT u.id) AS officials,
                   COALESCE(AVG(uc.current_level), 0) AS average_competency,
                   COUNT(*) FILTER (WHERE c.required_level - uc.current_level >= 4) AS critical_gaps,
                   COALESCE(AVG(u.learning_hours), 0) AS average_learning_hours,
                   (SELECT COUNT(*) FROM assessment_attempts a
                     JOIN users au ON au.id = a.user_id
                     WHERE au.department_id = d.id) AS assessment_attempts
            FROM departments d
            LEFT JOIN users u ON u.department_id = d.id AND u.is_active
            LEFT JOIN user_competencies uc ON uc.user_id = u.id
            LEFT JOIN competencies c ON c.id = uc.competency_id
            WHERE (:dept IS NULL OR d.name = :dept)
            GROUP BY d.id, d.name
            ORDER BY d.name
            """
        ),
        params,
    ).mappings().all()

    distribution_rows = db.execute(
        text(
            """
            SELECT uc.current_level AS level, COUNT(*) AS total
            FROM user_competencies uc
            JOIN users u ON u.id = uc.user_id
            LEFT JOIN departments d ON d.id = u.department_id
            WHERE (:dept IS NULL OR d.name = :dept) AND uc.current_level BETWEEN 1 AND 5
            GROUP BY uc.current_level
            """
        ),
        params,
    ).mappings().all()

    emerging_rows = db.execute(
        text(
            """
            SELECT c.name AS skill,
                   ROUND(AVG(c.required_level) * 20) AS demand,
                   ROUND(COALESCE(AVG(uc.current_level), 0) * 20) AS capability
            FROM competencies c
            LEFT JOIN user_competencies uc ON uc.competency_id = c.id
            WHERE c.is_emerging
            GROUP BY c.name
            ORDER BY demand DESC
            """
        )
    ).mappings().all()

    departments = [
        DepartmentStats(
            department=row["department"],
            officials=row["officials"],
            average_competency=round(float(row["average_competency"]), 1),
            critical_gaps=row["critical_gaps"],
            average_learning_hours=round(float(row["average_learning_hours"]), 1),
            assessment_attempts=row["assessment_attempts"],
        )
        for row in dept_rows
    ]

    officials = sum(d.officials for d in departments) or 1
    return AdminOverview(
        total_officials=sum(d.officials for d in departments),
        average_competency=round(
            sum(d.average_competency * d.officials for d in departments) / officials, 1
        ),
        critical_gaps=sum(d.critical_gaps for d in departments),
        average_learning_hours=round(
            sum(d.average_learning_hours * d.officials for d in departments) / officials, 1
        ),
        assessment_attempts=sum(d.assessment_attempts for d in departments),
        level_distribution={
            LEVEL_NAMES[row["level"]]: row["total"] for row in distribution_rows
        },
        emerging_skills=[dict(row) for row in emerging_rows],
        departments=departments,
    )
