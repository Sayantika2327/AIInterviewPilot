from typing import Generator

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.auth.jwt_handler import verify_access_token
from app.repositories.user_repository import UserRepository

security = HTTPBearer()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    print("TOKEN:", credentials.credentials)

    payload = verify_access_token(credentials.credentials)

    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    email = payload.get("sub")

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    user = UserRepository.get_by_email(
        db,
        email,
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user