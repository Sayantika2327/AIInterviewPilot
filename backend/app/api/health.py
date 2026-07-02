from fastapi import APIRouter
from sqlalchemy import text

from app.config.settings import settings
from app.core.database import engine

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
            "environment": settings.app_env,
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "environment": settings.app_env,
            "error": str(e),
        }