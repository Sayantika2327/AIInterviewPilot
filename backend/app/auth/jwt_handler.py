from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

from app.config.settings import settings


def create_access_token(data: dict):
    """
    Generate JWT Access Token.
    """

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.secret_key,
        algorithm=settings.algorithm,
    )

    return encoded_jwt


def verify_access_token(token: str):
    try:
        print("SECRET:", settings.secret_key)
        print("ALGORITHM:", settings.algorithm)

        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm],
        )

        print("PAYLOAD:", payload)

        return payload

    except JWTError as e:
        print("JWT ERROR:", e)
        return None