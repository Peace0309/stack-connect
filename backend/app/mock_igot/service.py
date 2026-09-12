
from __future__ import annotations

from datetime import date
from typing import Any, Dict, List, Optional

from sqlalchemy import text
from sqlalchemy.orm import Session

SOURCE_LABEL = "iGOT Integration: Prototype / Mock API"


def list_courses(
    db: Session,
    query: Optional[str] = None,
    competency_id: Optional[str] = None,
    course_format: Optional[str] = None,
    limit: int = 100,
) -> List[Dict[str, Any]]:
    sql = """
        SELECT c.*, ARRAY_AGG(cc.competency_id) AS competency_ids
        FROM courses c
        JOIN course_competencies cc ON cc.course_id = c.id
        WHERE (:query IS NULL OR c.title ILIKE '%' || :query || '%'
                              OR c.code  ILIKE '%' || :query || '%'
                              OR c.provider ILIKE '%' || :query || '%')
          AND (:fmt IS NULL OR c.format = :fmt)
          AND (:competency IS NULL OR EXISTS (
                SELECT 1 FROM course_competencies x
                WHERE x.course_id = c.id AND x.competency_id = :competency))
        GROUP BY c.id
        ORDER BY c.department_priority DESC, c.rating DESC
        LIMIT :limit
    """
    rows = db.execute(
        text(sql),
        {
            "query": query,
            "fmt": course_format,
            "competency": competency_id,
            "limit": limit,
        },
    ).mappings()
    return [{**row, "source": SOURCE_LABEL} for row in rows]


def get_course(db: Session, course_id: str) -> Optional[Dict[str, Any]]:
    courses = db.execute(
        text(
            """SELECT c.*, ARRAY_AGG(cc.competency_id) AS competency_ids
               FROM courses c JOIN course_competencies cc ON cc.course_id = c.id
               WHERE c.id = :id GROUP BY c.id"""
        ),
        {"id": course_id},
    ).mappings().first()
    return {**courses, "source": SOURCE_LABEL} if courses else None


def enroll(db: Session, user_id: int, course_id: str) -> Dict[str, Any]:
    """Idempotent mock enrolment; returns the enrolment record."""
    db.execute(
        text(
            """INSERT INTO training_history (user_id, course_id, status, progress, enrolled_at)
               VALUES (:user_id, :course_id, 'enrolled', 0, :today)
               ON CONFLICT (user_id, course_id) DO NOTHING"""
        ),
        {"user_id": user_id, "course_id": course_id, "today": date.today()},
    )
    db.commit()
    return {
        "user_id": user_id,
        "course_id": course_id,
        "status": "enrolled",
        "progress": 0,
        "source": SOURCE_LABEL,
    }


def update_progress(db: Session, user_id: int, course_id: str, progress: int) -> Dict[str, Any]:
    progress = max(0, min(100, int(progress)))
    status = "completed" if progress >= 100 else ("in-progress" if progress > 0 else "enrolled")
    db.execute(
        text(
            """UPDATE training_history
               SET progress = :progress,
                   status = :status,
                   completed_at = CASE WHEN :progress >= 100 THEN CURRENT_DATE ELSE NULL END
               WHERE user_id = :user_id AND course_id = :course_id"""
        ),
        {"progress": progress, "status": status, "user_id": user_id, "course_id": course_id},
    )
    db.commit()
    return {
        "user_id": user_id,
        "course_id": course_id,
        "progress": progress,
        "status": status,
        "source": SOURCE_LABEL,
    }
