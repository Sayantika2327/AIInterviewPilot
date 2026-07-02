import json
import re

from sqlalchemy.orm import Session

from app.ai.groq_client import ask_groq
from app.repositories.interview_repository import InterviewRepository
from app.repositories.interview_question_repository import (
    InterviewQuestionRepository,
)


class InterviewSessionService:

    @staticmethod
    def start_interview(
        db: Session,
        user_id: int,
        resume_text: str,
        job_description: str,
    ):

        interview = InterviewRepository.create(
            db=db,
            user_id=user_id,
            job_description=job_description,
        )

        prompt = f"""
You are an expert Technical Interviewer.

You are starting a REAL interview.

Based on the candidate's resume and the job description,
generate ONLY the FIRST interview question.

Rules:

- Ask only ONE question.
- Start with an introductory or resume-based question.
- Do NOT generate future questions.
- The next questions will be generated later based on the candidate's answers.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY JSON.

Format:

{{
    "question":"Your first interview question"
}}
"""

        response = ask_groq(prompt)

        response = re.sub(
            r"```json|```",
            "",
            response,
        ).strip()

        data = json.loads(response)

        InterviewQuestionRepository.create(
            db=db,
            interview_id=interview.id,
            question_number=1,
            question=data["question"],
        )

        return {
            "interview_id": interview.id,
            "question": data["question"],
        }