import logging

import httpx

from config import settings

logger = logging.getLogger(__name__)

BASE = "https://api.adzuna.com/v1/api/jobs"


async def search_jobs(
    country: str,
    what: str,
    results_per_page: int = 5,
) -> list[dict]:
    url = f"{BASE}/{country}/search/1"
    params = {
        "app_id": settings.ADZUNA_APP_ID,
        "app_key": settings.ADZUNA_APP_KEY,
        "what": what,
        "results_per_page": results_per_page,
        "content-type": "application/json",
    }

    async with httpx.AsyncClient(timeout=15) as c:
        r = await c.get(url, params=params)
        if r.status_code != 200:
            logger.warning(
                "Adzuna %s for '%s': %s",
                r.status_code,
                what,
                r.text[:200],
            )
            return []
        return r.json().get("results", [])


def normalize_job(j: dict) -> dict:
    return {
        "title": j.get("title", ""),
        "company": j.get("company", {}).get("display_name", "Unknown"),
        "location": j.get("location", {}).get("display_name"),
        "url": j.get("redirect_url", ""),
        "salary_min": j.get("salary_min"),
        "salary_max": j.get("salary_max"),
    }