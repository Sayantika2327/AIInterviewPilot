from app.models.user_stats import UserStats

from sqlalchemy.orm import Session

from app.auth.hashing import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserLogin



class AuthService:

    @staticmethod
    def register(
        db: Session,
        user: UserCreate,
    ) -> User:

        existing = UserRepository.get_by_email(
            db,
            user.email,
        )

        if existing:
            raise ValueError("An account with this email already exists.")

        password_hash = hash_password(user.password)

        new_user = UserRepository.create(
    db=db,
    full_name=user.full_name,
    email=user.email,
    password_hash=password_hash,
)
        stats = UserStats(
            user_id=new_user.id,
)
        db.add( stats)
        db.commit()
        return new_user

    @staticmethod
    def login(
        db: Session,
        user: UserLogin,
    ):

        existing_user = UserRepository.get_by_email(
            db,
            user.email,
        )

        if not existing_user:
            raise ValueError("Invalid email or password")

        if not verify_password(
            user.password,
            existing_user.password_hash,
        ):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {
                "sub": existing_user.email,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }