"""Skill-gap detection endpoint."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.ai.skill_gap_engine import build_gap_rows, overall_competency, severity_summary
from app.database.session import get_db
from app.models import Competency, UserCompetency
from app.schemas.schemas import SkillGapReport

router = APIRouter(prefix="/skill-gaps", tags=["skill-gaps"])


def gap_rows_for_user(db: Session, user_id: int) -> list[dict]:
    competencies = [
        {
            "id": c.id,
            "name": c.name,
            "category": c.category,
            "required_level": c.required_level,
        }
        for c in db.query(Competency).all()
    ]
    levels = {
        row.competency_id: row.current_level
        for row in db.query(UserCompetency).filter(UserCompetency.user_id == user_id)
    }
    return build_gap_rows(competencies, levels)


@router.get("/{user_id}", response_model=SkillGapReport)
def report(user_id: int, db: Session = Depends(get_db)) -> SkillGapReport:
    rows = gap_rows_for_user(db, user_id)
    levels = {row["competency_id"]: row["current"] for row in rows}
    return SkillGapReport(
        rows=rows,
        summary=severity_summary(rows),
        overall_competency=overall_competency(levels, levels.keys()),
    )
