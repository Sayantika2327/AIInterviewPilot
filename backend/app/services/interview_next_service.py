import json
import re

from sqlalchemy.orm import Session

from app.ai.groq_client import ask_groq

from app.repositories.interview_answer_repository import (
    InterviewAnswerRepository,
)

from app.repositories.interview_question_repository import (
    InterviewQuestionRepository,
)

from app.repositories.interview_repository import (
    InterviewRepository,
)

from app.services.user_stats_service import (
    UserStatsService,
)

from app.services.interview_evaluation_service import (
    InterviewEvaluationService,
)


class InterviewNextService:

    @staticmethod
    def next_question(
        db: Session,
        interview_id: int,
        answer: str,
    ):

        interview = InterviewRepository.get_by_id(
            db,
            interview_id,
        )

        question = InterviewQuestionRepository.get_question(
            db,
            interview_id,
            interview.current_question,
        )

        # Evaluate candidate answer
        evaluation = InterviewEvaluationService.evaluate_answer(
            question.question,
            answer,
        )

        # Save candidate answer
        InterviewAnswerRepository.create(
            db=db,
            question_id=question.id,
            answer=answer,
            score=evaluation["score"],
            feedback=evaluation["feedback"],
            ideal_answer=evaluation["ideal_answer"],
        )

        # Finish after 10 questions
        if interview.current_question >= 10:

            interview.status = "completed"

            db.commit()

            UserStatsService.increment_interviews(
                db=db,
                user_id=interview.user_id,
            )

            return {
                "completed": True,
                "score": evaluation["score"],
                "feedback": evaluation["feedback"],
                "ideal_answer": evaluation["ideal_answer"],
                "message": "Interview Finished",
            }

        # -------------------------
        # Generate NEXT Question
        # -------------------------

        prompt = f"""
You are an experienced Technical Interviewer.

The interview is already in progress.

Current Question:
{question.question}

Candidate Answer:
{answer}

Evaluation:
{evaluation["feedback"]}

Candidate Score:
{evaluation["score"]}/10

Generate ONLY ONE next interview question.

Rules:

- Make the next question depend on the candidate's previous answer.
- If the answer was excellent, increase the difficulty.
- If the answer was weak, ask an easier follow-up.
- Ask only ONE question.
- Return ONLY valid JSON.

Format:

{{
    "question":"Next interview question"
}}
"""

        response = ask_groq(prompt)

        response = re.sub(
            r"```json|```",
            "",
            response,
        ).strip()

        data = json.loads(response)

        # Update interview question number
        InterviewRepository.update_current_question(
            db,
            interview,
        )

        # Save generated question
        InterviewQuestionRepository.create(
            db=db,
            interview_id=interview.id,
            question_number=interview.current_question,
            question=data["question"],
        )

        return {
            "completed": False,
            "score": evaluation["score"],
            "feedback": evaluation["feedback"],
            "ideal_answer": evaluation["ideal_answer"],
            "next_question": data["question"],
        }