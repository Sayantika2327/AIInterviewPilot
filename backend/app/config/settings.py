from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str
    app_version: str
    app_env: str

    host: str
    port: int

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    database_url: str

    groq_api_key: str
    llm_model: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()