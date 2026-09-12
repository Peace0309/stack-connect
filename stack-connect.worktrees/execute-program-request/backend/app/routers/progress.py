"""Learning progress: enrolments, completion and competency feedback."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.mock_igot import service
from app.models import Course, CourseCompetency, TrainingHistory, User, UserCompetency
from app.schemas.schemas import EnrollmentOut, ProgressUpdate

router = APIRouter(prefix="/progress", tags=["progress"])


@router.get("/{user_id}", response_model=list[EnrollmentOut])
def enrollments(user_id: int, db: Session = Depends(get_db)):
    return db.query(TrainingHistory).filter(TrainingHistory.user_id == user_id).all()


@router.put("/{user_id}")
def update(user_id: int, payload: ProgressUpdate, db: Session = Depends(get_db)) -> dict:
    record = (
        db.query(TrainingHistory)
        .filter(
            TrainingHistory.user_id == user_id,
            TrainingHistory.course_id == payload.course_id,
        )
        .first()
    )
    if not record:
        raise HTTPException(404, "Enrolment not found")

    result = service.update_progress(db, user_id, payload.course_id, payload.progress)

    if payload.progress >= 100:
        course = db.get(Course, payload.course_id)
        links = (
            db.query(CourseCompetency)
            .filter(CourseCompetency.course_id == payload.course_id)
            .all()
        )
        for link in links:
            row = (
                db.query(UserCompetency)
                .filter(
                    UserCompetency.user_id == user_id,
                    UserCompetency.competency_id == link.competency_id,
                )
                .first()
            )
            if row:
                row.current_level = min(5, row.current_level + 1)
                row.source = "course"
            else:
                db.add(
                    UserCompetency(
                        user_id=user_id,
                        competency_id=link.competency_id,
                        current_level=1,
                        source="course",
                    )
                )
        user = db.get(User, user_id)
        if user and course:
            user.learning_hours = float(user.learning_hours or 0) + course.duration_hours
        db.commit()

    return result
