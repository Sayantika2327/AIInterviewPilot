import json

from app.ai.groq_client import ask_groq


class ResumeAIService:

    @staticmethod
    def analyze_resume(
        resume_text: str,
        job_description: str,
    ):

        prompt = f"""
You are an expert ATS Resume Analyzer.

Compare the resume with the job description.

Resume:
{resume_text}

Job Description:
{job_description}

Instructions:

1. Find all matched skills.
2. Find all missing skills.
3. Calculate an ATS score between 0 and 100.
4. The ATS score MUST be based on the percentage of requirements satisfied.
5. DO NOT always return 0.
6. Return ONLY raw JSON.
7. Do NOT use markdown or ```json.

Output format:

{{
    "matched_skills": [],
    "missing_skills": [],
    "ats_score": 85,
    "suggestions": []
}}
"""

        response = ask_groq(prompt)

        print("=" * 80)
        print("GROQ RESPONSE:")
        print(response)
        print("=" * 80)

        # Remove markdown code fences
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        result = json.loads(response)
        result["ats_score"] = int(float(result["ats_score"]))
        return result