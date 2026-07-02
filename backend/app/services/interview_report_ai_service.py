import json
import re

from app.ai.groq_client import ask_groq


class InterviewReportAIService:

    @staticmethod
    def generate(interview_data):

        prompt = f"""
You are a Senior Technical Interview Panel consisting of:

- Senior Software Engineer
- Hiring Manager
- Communication Expert

Below is the complete interview.

{interview_data}

Analyze the entire interview.

Return ONLY valid JSON.

Format:

{{
    "technical_score": 0,
    "communication_score": 0,
    "confidence_score": 0,
    "problem_solving_score": 0,

    "strengths": [
        "",
        "",
        ""
    ],

    "weaknesses": [
        "",
        "",
        ""
    ],

    "learning_roadmap": [
        "",
        "",
        "",
        ""
    ],

    "overall_feedback": "",

    "hiring_recommendation": ""
}}

Rules:

- All scores must be between 0 and 100.
- Give exactly 3 strengths.
- Give exactly 3 weaknesses.
- Give exactly 4 roadmap items.
- overall_feedback should be 3-5 sentences.
- hiring_recommendation must be exactly one of:
    "Strong Hire"
    "Hire"
    "Borderline"
    "No Hire"

Be strict but fair.

Return ONLY JSON.
"""

        response = ask_groq(prompt)

        print("=" * 80)
        print("AI REPORT")
        print(response)
        print("=" * 80)

        response = re.sub(
            r"```json|```",
            "",
            response,
        ).strip()

        return json.loads(response)