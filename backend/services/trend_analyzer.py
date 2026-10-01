import hashlib
import json
import logging
import re
from collections import Counter

from groq import Groq, RateLimitError

from cache import get as cache_get, put as cache_put
from config import settings

logger = logging.getLogger(__name__)

client = Groq(api_key=settings.GROQ_API_KEY)

TREND_PROMPT = """You are a job market trend analyst.

Given a sample of live job listings for a role in a country, identify market trends.

Return JSON with EXACTLY these keys:

{
  "market_outlook": "2-3 sentence narrative on 12-month prospects",
  "demand_trend": "rising",
  "emerging_skills": [
    {"skill": "name", "why": "one sentence", "demand": "high"}
  ],
  "declining_skills": [
    {"skill": "name", "why": "one sentence", "timeline": "12-24 months"}
  ],
  "salary_trend": "one sentence on how salaries are moving"
}

Rules:
- demand_trend: one of "rising", "stable", "cooling".
- demand: one of "high", "medium".
- emerging_skills: 3-5 items.
- declining_skills: 2-4 items.
- Base everything on the provided data. Do not invent skills not implied by the sample.
- Use plain ASCII only. Return JSON only. No prose.
"""

STOPWORDS = {
    "senior", "junior", "lead", "staff", "principal", "the", "and", "or",
    "of", "in", "at", "for", "to", "with", "a", "an", "for", "on", "by",
}


def _trend_cache_key(role: str, country: str) -> str:
    return hashlib.sha256(f"trend|{role}|{country}".encode("utf-8")).hexdigest()


def _extract_keywords(titles: list[str]) -> list[str]:
    words: list[str] = []
    for t in titles:
        for w in re.findall(r"[A-Za-z][A-Za-z+#.]+", t.lower()):
            if w not in STOPWORDS and len(w) > 2:
                words.append(w)
    return [w for w, _ in Counter(words).most_common(15)]


def _aggregate(jobs: list[dict]) -> dict:
    if not jobs:
        return {"count": 0}

    locations = Counter((j.get("location") or "Unknown") for j in jobs)
    companies = Counter((j.get("company") or "Unknown") for j in jobs)

    salaries: list[float] = []
    for j in jobs:
        if j.get("salary_min"):
            salaries.append(j["salary_min"])
        if j.get("salary_max"):
            salaries.append(j["salary_max"])
    salaries.sort()

    return {
        "count": len(jobs),
        "top_locations": locations.most_common(5),
        "top_companies": [c for c, _ in companies.most_common(8)],
        "title_keywords": _extract_keywords([j.get("title", "") for j in jobs]),
        "salary_min": salaries[0] if salaries else None,
        "salary_max": salaries[-1] if salaries else None,
        "salary_median": salaries[len(salaries) // 2] if salaries else None,
    }


def _confidence(count: int) -> str:
    if count >= 30:
        return "high"
    if count >= 10:
        return "medium"
    return "low"


def _call_groq(messages: list[dict]) -> str:
    try:
        r = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.3,
        )
    except RateLimitError:
        logger.warning("Trend: primary model rate-limited, using fallback")
        r = client.chat.completions.create(
            model=settings.GROQ_FALLBACK_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.3,
        )
    return r.choices[0].message.content


def analyze_trends(jobs: list[dict], role: str, country: str) -> dict:
    """
    Analyze market trends from a sample of job listings.
    Cached by (role, country) — trends are user-independent.
    """
    ck = _trend_cache_key(role, country)
    cached = cache_get(ck)
    if cached:
        logger.info("Trend cache hit for %s / %s", role, country)
        return cached

    if not jobs:
        empty = {
            "market_outlook": "Not enough live data to analyze trends for this role.",
            "demand_trend": "stable",
            "emerging_skills": [],
            "declining_skills": [],
            "salary_trend": "",
            "hot_locations": [],
            "top_companies": [],
            "salary_range": {"min": None, "max": None, "median": None},
            "sample_size": 0,
            "confidence": "low",
        }
        return empty

    agg = _aggregate(jobs)

    user_msg = (
        f"Role: {role}\n"
        f"Country: {country}\n"
        f"Sample size: {agg['count']} live listings\n\n"
        f"Top locations: {agg['top_locations']}\n"
        f"Top companies hiring: {agg['top_companies']}\n"
        f"Common keywords in job titles: {agg['title_keywords']}\n"
        f"Salary range: min={agg['salary_min']} max={agg['salary_max']} "
        f"median={agg['salary_median']}\n"
    )

    messages = [
        {"role": "system", "content": TREND_PROMPT},
        {"role": "user", "content": user_msg},
    ]

    try:
        raw = _call_groq(messages)
        result = json.loads(raw)
    except Exception:
        logger.exception("Trend analysis failed")
        result = {
            "market_outlook": "Trend analysis unavailable right now.",
            "demand_trend": "stable",
            "emerging_skills": [],
            "declining_skills": [],
            "salary_trend": "",
        }

    result["sample_size"] = agg["count"]
    result["confidence"] = _confidence(agg["count"])
    result["hot_locations"] = [
        {"city": c, "count": n} for c, n in agg["top_locations"]
    ]
    result["top_companies"] = agg["top_companies"][:5]
    result["salary_range"] = {
        "min": agg["salary_min"],
        "max": agg["salary_max"],
        "median": agg["salary_median"],
    }

    cache_put(ck, result)
    return result