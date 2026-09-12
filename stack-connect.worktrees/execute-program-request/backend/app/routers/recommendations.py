"""Personalised learning recommendations (35/25/15/10/10/5 weighted engine)."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models import TrainingHistory
from app.mock_igot.service import list_courses
from app.recommendation.engine import WEIGHTS, recommend
from app.routers.skill_gaps import gap_rows_for_user
from app.schemas.schemas import CourseOut, RecommendationOut

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/weights")
def weights() -> dict:
    return WEIGHTS


@router.get("/{user_id}", response_model=list[RecommendationOut])
def for_user(user_id: int, limit: int = 8, db: Session = Depends(get_db)):
    rows = gap_rows_for_user(db, user_id)
    catalogue = list_courses(db)
    history = db.query(TrainingHistory).filter(TrainingHistory.user_id == user_id).all()

    scored = recommend(
        gap_rows=rows,
        courses=catalogue,
        completed_course_ids=[h.course_id for h in history if h.progress >= 100],
        enrolled_course_ids=[h.course_id for h in history],
        limit=limit,
    )

    return [
        RecommendationOut(
            rank=index + 1,
            score=item.score,
            course=CourseOut(**item.course),
            component_scores=item.components,
            targeted_gaps=item.targeted_gaps,
        )
        for index, item in enumerate(scored)
    ]
