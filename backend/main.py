import logging
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from cache import get as cache_get, put as cache_put, key_for as cache_key
from config import settings
from models.schemas import UserInput, SuggestionResponse
from services.adzuna_client import search_jobs, normalize_job
from services.groq_agent import run_agent
from services.hunter_client import find_contacts

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Ascendra Agentic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Config knobs ----
MAX_JOBS = 5
MAX_JOBS_FOR_OUTREACH = 3
CONTACTS_PER_DOMAIN = 2
MAX_CONTACTS_TOTAL = 6

# ---- Domain guessing ----

_SUFFIX_RE = re.compile(
    r"\b(inc|llc|ltd|corp|corporation|co|company|group|technologies|technology|"
    r"staffing|solutions|partners|consulting|services|systems|labs)\b\.?",
    re.IGNORECASE,
)


def _domain_candidates(company_name: str) -> list[str]:
    """Return best-guess domains for a company, most likely first."""
    if not company_name:
        return []

    base = _SUFFIX_RE.sub("", company_name)
    base = re.sub(r"[^\w\s-]", "", base).strip().lower()
    words = base.split()
    if not words:
        return []

    candidates: list[str] = []
    if len(words) >= 2:
        candidates.append("".join(words[:2]) + ".com")
    candidates.append("".join(words) + ".com")
    candidates.append(words[0] + ".com")

    seen: set[str] = set()
    out: list[str] = []
    for c in candidates:
        if c not in seen and len(c.split(".")[0]) >= 3:
            seen.add(c)
            out.append(c)
    return out


async def _collect_contacts(jobs: list[dict]) -> list[dict]:
    contacts: list[dict] = []
    seen_domains: set[str] = set()

    for job in jobs[:MAX_JOBS_FOR_OUTREACH]:
        if len(contacts) >= MAX_CONTACTS_TOTAL:
            break

        company = job.get("company", "")
        found: list[dict] = []

        for domain in _domain_candidates(company):
            if domain in seen_domains:
                continue
            seen_domains.add(domain)
            logger.debug("Hunter lookup: %s (%s)", domain, company)
            found = await find_contacts(domain, limit=CONTACTS_PER_DOMAIN)
            if found:
                logger.info("Hunter %s -> %d contacts", domain, len(found))
                break

        for c in found:
            contacts.append({**c, "company": company})

    return contacts[:MAX_CONTACTS_TOTAL]


# ---- Routes ----

@app.get("/")
def root():
    return {"status": "ok", "app": "Ascendra Agentic"}


@app.get("/api/health")
def health():
    return {
        "groq_configured": bool(settings.GROQ_API_KEY),
        "hunter_configured": bool(settings.HUNTER_API_KEY),
        "adzuna_configured": bool(
            settings.ADZUNA_APP_ID and settings.ADZUNA_APP_KEY
        ),
    }


@app.post("/api/suggest", response_model=SuggestionResponse)
async def suggest(payload: UserInput):
    # ---- 1. Groq agent (cached) ----
    ck = cache_key(payload.resume, payload.target_role)
    agent = cache_get(ck)
    if agent is None:
        try:
            agent = run_agent(payload.resume, payload.target_role)
        except Exception as e:
            logger.exception("Groq agent failed")
            raise HTTPException(status_code=502, detail=f"Groq error: {e}")
        cache_put(ck, agent)

    # ---- 2. Adzuna jobs ----
    try:
        raw_jobs = await search_jobs(
            payload.country,
            payload.target_role,
            results_per_page=MAX_JOBS,
        )
    except Exception:
        logger.exception("Adzuna search failed")
        raw_jobs = []

    jobs = [normalize_job(j) for j in raw_jobs]
    if not jobs:
        logger.warning("Adzuna returned 0 jobs for '%s'", payload.target_role)

    # ---- 3. Hunter contacts ----
    contacts = await _collect_contacts(jobs)

    return {
        "upskilling": agent.get("upskilling", []),
        "assignments": agent.get("assignments", []),
        "jobs": jobs,
        "contacts": contacts,
    }