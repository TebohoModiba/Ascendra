from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings

app = FastAPI(title="Ascendra Agentic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "app": "Ascendra Agentic"}

@app.get("/api/health")
def health():
    return {
        "groq_configured": bool(settings.GROQ_API_KEY),
        "hunter_configured": bool(settings.HUNTER_API_KEY),
        "adzuna_configured": bool(settings.ADZUNA_APP_ID and settings.ADZUNA_APP_KEY),
    }