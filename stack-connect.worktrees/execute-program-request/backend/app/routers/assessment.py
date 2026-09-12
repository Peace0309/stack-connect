
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.ai.skill_gap_engine import apply_assessment
from app.database.session import get_db
from app.models import AssessmentAttempt, AssessmentQuestion, UserCompetency
from app.schemas.schemas import AttemptResult, AttemptSubmit, QuestionOut

router = APIRouter(prefix="/assessments", tags=["assessments"])


@router.get("/{assessment_id}/questions", response_model=list[QuestionOut])
def questions(assessment_id: int, db: Session = Depends(get_db)):
    rows = (
        db.query(AssessmentQuestion)
        .filter(AssessmentQuestion.assessment_id == assessment_id)
        .order_by(AssessmentQuestion.position)
        .all()
    )
    if not rows:
        raise HTTPException(404, "Assessment has no questions")
    return rows


@router.post("/{user_id}/submit", response_model=AttemptResult)
def submit(user_id: int, payload: AttemptSubmit, db: Session = Depends(get_db)) -> AttemptResult:
    rows = (
        db.query(AssessmentQuestion)
        .filter(AssessmentQuestion.assessment_id == payload.assessment_id)
        .all()
    )
    if not rows:
        raise HTTPException(404, "Assessment not found")

    per_competency: dict[str, dict[str, int]] = {}
    correct_count = 0
    for question in rows:
        bucket = per_competency.setdefault(question.competency_id, {"correct": 0, "total": 0})
        bucket["total"] += 1
        if payload.answers.get(str(question.id)) == question.correct_index:
            bucket["correct"] += 1
            correct_count += 1

    current = {
        row.competency_id: row.current_level
        for row in db.query(UserCompetency).filter(UserCompetency.user_id == user_id)
    }
    updated = apply_assessment(current, per_competency)

    for competency_id, level in updated.items():
        existing = (
            db.query(UserCompetency)
            .filter(
                UserCompetency.user_id == user_id,
                UserCompetency.competency_id == competency_id,
            )
            .first()
        )
        if existing:
            existing.current_level = level
            existing.source = "assessment"
        else:
            db.add(
                UserCompetency(
                    user_id=user_id,
                    competency_id=competency_id,
                    current_level=level,
                    source="assessment",
                )
            )

    attempt = AssessmentAttempt(
        assessment_id=payload.assessment_id,
        user_id=user_id,
        correct_count=correct_count,
        total_questions=len(rows),
        per_competency=per_competency,
        answers=payload.answers,
    )
    db.add(attempt)
    db.commit()
    db.refresh(attempt)

    return AttemptResult(
        attempt_id=attempt.id,
        correct_count=correct_count,
        total_questions=len(rows),
        score_percentage=round(correct_count * 100 / len(rows), 2),
        per_competency=per_competency,
        updated_levels=updated,
    )