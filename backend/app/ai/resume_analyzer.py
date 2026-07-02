from app.ai.groq_client import GroqClient
from app.config.settings import settings


class ResumeAnalyzer:

    @staticmethod
    def analyze(resume_text: str):

        client = GroqClient.get_client()

        prompt = f"""
You are an expert ATS resume reviewer.

Analyze the following resume.

Return ONLY valid JSON.

Resume:
{resume_text}

Return this JSON format:

{{
  "summary": "",
  "technical_skills": [],
  "soft_skills": [],
  "strengths": [],
  "missing_skills": [],
  "ats_score": 0,
  "suggestions": []
}}
"""

        response = client.chat.completions.create(
            model=settings.llm_model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.2,
        )

        return response.choices[0].message.content