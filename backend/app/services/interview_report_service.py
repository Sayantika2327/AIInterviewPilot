from sqlalchemy.orm import Session

from app.services.user_stats_service import UserStatsService

from app.repositories.interview_repository import (
    InterviewRepository,
)

from app.repositories.interview_answer_repository import (
    InterviewAnswerRepository,
)

from app.services.interview_report_ai_service import (
    InterviewReportAIService,
)


class InterviewReportService:

    @staticmethod
    def generate_report(
        db: Session,
        interview_id: int,
    ):

        interview = InterviewRepository.get_by_id(
            db=db,
            interview_id=interview_id,
        )

        if interview is None:
            raise ValueError("Interview not found")

        # Get complete interview history
        answers = InterviewAnswerRepository.get_full_interview(
            db=db,
            interview_id=interview_id,
        )

        if len(answers) == 0:
            raise ValueError("No interview answers found")

        interview_text = ""

        total_score = 0

        for item in answers:

            interview_text += f"""
Question {item.question_number}

Question:
{item.question}

Candidate Answer:
{item.answer}

Score:
{item.score}

Feedback:
{item.feedback}

Ideal Answer:
{item.ideal_answer}

----------------------------------------------------

"""

            total_score += item.score

        overall_score = int((total_score / len(answers)) * 10)

        # Save score in Interview table
        InterviewRepository.update_score(
            db=db,
            interview=interview,
            score=overall_score,
        )

        # Save score in UserStats table
        UserStatsService.save_interview_score(
            db=db,
            user_id=interview.user_id,
            score=overall_score,
        )

        ai_report = InterviewReportAIService.generate(
            interview_text
        )

        return {
            "overall_score": overall_score,
            "technical_score": ai_report["technical_score"],
            "communication_score": ai_report["communication_score"],
            "confidence_score": ai_report["confidence_score"],
            "problem_solving_score": ai_report["problem_solving_score"],
            "strengths": ai_report["strengths"],
            "weaknesses": ai_report["weaknesses"],
            "learning_roadmap": ai_report["learning_roadmap"],
            "overall_feedback": ai_report["overall_feedback"],
            "hiring_recommendation": ai_report["hiring_recommendation"],
            "question_analysis": [
                {
                    "question_number": item.question_number,
                    "question": item.question,
                    "candidate_answer": item.answer,
                    "ideal_answer": item.ideal_answer,
                    "score": item.score,
                    "feedback": item.feedback,
                }
                for item in answers
            ],
        }

    @staticmethod
    def latest_report(
        db: Session,
        user_id: int,
    ):

        interview = InterviewRepository.get_latest_completed(
            db=db,
            user_id=user_id,
        )

        if interview is None:
            raise ValueError("No completed interviews found")

        return InterviewReportService.generate_report(
            db=db,
            interview_id=interview.id,
        )