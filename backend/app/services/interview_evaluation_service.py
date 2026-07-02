import json
import re

from app.ai.groq_client import ask_groq


class InterviewEvaluationService:

    @staticmethod
    def evaluate_answer(
        question: str,
        answer: str,
    ):

        prompt = f"""
You are an experienced Technical Interviewer.

Evaluate the candidate's answer.

Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

Format:

{{
    "score": 0,
    "feedback": "",
    "ideal_answer": ""
}}

Rules:
- score should be an integer between 0 and 10.
- feedback should explain what was good and what was missing.
- ideal_answer should be a concise model answer.
"""

        response = ask_groq(prompt)
        print("=" * 80)
        print("AI EVALUATION RESPONSE")
        print(response)
        print("=" * 80)

        response = re.sub(
            r"```json|```",
            "",
            response,
        ).strip()

        return json.loads(response)