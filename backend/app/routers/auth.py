
from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models import Role, User
from app.schemas.schemas import LoginRequest, TokenResponse, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET = os.getenv("JWT_SECRET", "dev-secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))


def create_token(user: User, role_code: str) -> str:
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "role": role_code,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_MINUTES),
    }
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def to_out(user: User) -> UserOut:
    return UserOut(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        designation=user.designation,
        grade=user.grade,
        division=user.division,
        location=user.location,
        department=user.department.name if user.department else None,
        role=user.role.code,  # type: ignore[arg-type]
        learning_hours=float(user.learning_hours or 0),
        joined_on=user.joined_on,
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not pwd_context.verify(payload.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid email or password")
    if not user.is_active:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Account is inactive")

    role = db.get(Role, user.role_id)
    return TokenResponse(access_token=create_token(user, role.code), user=to_out(user))