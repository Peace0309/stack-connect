from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.mock_igot import service
from app.schemas.schemas import CourseOut, EnrollRequest

router = APIRouter(prefix="/igot", tags=["igot (mock)"])


@router.get("/courses", response_model=list[CourseOut])
def courses(
    query: str | None = None,
    competency_id: str | None = None,
    format: str | None = None,
    db: Session = Depends(get_db),
):
    return service.list_courses(db, query=query, competency_id=competency_id, course_format=format)


@router.get("/courses/{course_id}", response_model=CourseOut)
def course(course_id: str, db: Session = Depends(get_db)):
    found = service.get_course(db, course_id)
    if not found:
        raise HTTPException(404, "Course not found in mock iGOT catalogue")
    return found


@router.post("/enroll/{user_id}")
def enroll(user_id: int, payload: EnrollRequest, db: Session = Depends(get_db)) -> dict:
    return service.enroll(db, user_id, payload.course_id)
