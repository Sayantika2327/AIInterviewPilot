from groq import Groq

from app.config.settings import settings


class GroqClient:
    """
    Singleton Groq Client
    """

    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            cls._client = Groq(
                api_key=settings.groq_api_key,
            )

        return cls._client


def ask_groq(prompt: str) -> str:
    """
    Send a prompt to Groq and return the response.
    """

    client = GroqClient.get_client()

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