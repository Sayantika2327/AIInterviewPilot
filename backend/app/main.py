from fastapi import FastAPI

from app.api.auth import router as auth_router      # <-- ADD THIS
from app.api.health import router as health_router
from app.config.settings import settings
from app.core.logger import logger
from app.api.users import router as users_router
from app.api.resume import router as resume_router
from app.api.upload import router as upload_router
from app.api.interview import router as interview_router
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.models.user_stats import UserStats

# Import ALL models so SQLAlchemy knows about them
from app.models.user import User
from app.models.interview import Interview
from app.models.interview_question import InterviewQuestion
from app.models.interview_answer import InterviewAnswer

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():

    Base.metadata.create_all(bind=engine)

    logger.info("InterviewPilot AI started successfully.")


@app.get("/", tags=["Home"])
async def root():
    return {
        "message": "Welcome to InterviewPilot AI",
        "version": settings.app_version,
    }


# Register API Routers
app.include_router(health_router)
app.include_router(auth_router)      # <-- ADD THIS
app.include_router(users_router)
app.include_router(resume_router)
app.include_router(upload_router)
app.include_router(interview_router)