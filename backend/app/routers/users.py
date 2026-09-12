"""Learner profile endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models import User
from app.routers.auth import to_out
from app.schemas.schemas import UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)) -> UserOut:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(404, "User not found")
    return to_out(user)


@router.get("", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db), limit: int = 100) -> list[UserOut]:
    return [to_out(user) for user in db.query(User).limit(limit).all()]
