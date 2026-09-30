from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    GROQ_API_KEY: str = ""
    HUNTER_API_KEY: str = ""
    ADZUNA_APP_ID: str = ""
    ADZUNA_APP_KEY: str = ""

    GROQ_MODEL: str = "openai/gpt-oss-120b"
    GROQ_FALLBACK_MODEL: str = "qwen/qwen3.8-27b"

    ALLOWED_ORIGINS: str = "http://localhost:3000"


settings = Settings()