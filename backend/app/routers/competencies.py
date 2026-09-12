
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models import Competency, UserCompetency
from app.schemas.schemas import CompetencyOut, UserCompetencyOut

router = APIRouter(prefix="/competencies", tags=["competencies"])


@router.get("", response_model=list[CompetencyOut])
def list_competencies(db: Session = Depends(get_db)) -> list[Competency]:
    return db.query(Competency).order_by(Competency.category, Competency.name).all()


@router.get("/user/{user_id}", response_model=list[UserCompetencyOut])
def user_levels(user_id: int, db: Session = Depends(get_db)) -> list[UserCompetency]:
    return db.query(UserCompetency).filter(UserCompetency.user_id == user_id).all()