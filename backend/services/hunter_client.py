import logging

import httpx
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from config import settings

logger = logging.getLogger(__name__)

BASE = "https://api.hunter.io/v2"

# Local-parts that are not useful for cold outreach
GENERIC_PREFIXES = (
    "info", "hello", "office", "help", "support", "contact",
    "marketing", "team", "admin", "noreply", "no-reply",
    "sales", "billing", "press", "careers", "jobs", "hr",
)

# Positions we want to surface first
HIGH_VALUE_ROLE_HINTS = (
    "recruit", "talent", "hiring", "manager", "lead", "head",
    "founder", "ceo", "cto", "director", "vp",
)


def _full_name(e: dict) -> str | None:
    first = (e.get("first_name") or "").strip()
    last = (e.get("last_name") or "").strip()
    full = f"{first} {last}".strip()
    return full or None


def _is_generic(email: str) -> bool:
    prefix = email.split("@")[0].lower()
    return any(prefix.startswith(g) for g in GENERIC_PREFIXES)


def _relevance_score(contact: dict) -> tuple:
    has_name = 1 if contact["name"] else 0
    position = (contact["position"] or "").lower()
    is_decision_maker = 1 if any(h in position for h in HIGH_VALUE_ROLE_HINTS) else 0
    confidence = contact["confidence"] or 0
    return (is_decision_maker, has_name, confidence)


@retry(
    stop=stop_after_attempt(2),
    wait=wait_exponential(multiplier=1, min=1, max=4),
    retry=retry_if_exception_type((httpx.TimeoutException, httpx.ConnectError)),
    reraise=True,
)
async def _domain_search(domain: str, limit: int) -> dict:
    async with httpx.AsyncClient(timeout=15) as c:
        r = await c.get(
            f"{BASE}/domain-search",
            params={
                "domain": domain,
                "api_key": settings.HUNTER_API_KEY,
                "limit": limit,
            },
        )
        if r.status_code >= 500:
            r.raise_for_status()
        return r.json() if r.status_code == 200 else {}


async def find_contacts(
    domain: str,
    limit: int = 2,
    include_generic: bool = False,
) -> list[dict]:
    """
    Look up contacts for a company domain.

    Args:
        domain: e.g. "stripe.com"
        limit: max contacts to return (default 2 saves Hunter quota)
        include_generic: keep info@ / hello@ addresses

    Returns:
        List of {name, email, position, confidence}, best first.
    """
    if not domain:
        return []

    try:
        data = await _domain_search(domain, limit=limit * 3)
    except httpx.HTTPError as e:
        logger.warning("Hunter request failed for %s: %s", domain, e)
        return []

    emails = data.get("data", {}).get("emails", [])
    if not emails:
        return []

    contacts = [
        {
            "name": _full_name(e),
            "email": e.get("value", ""),
            "position": e.get("position") or None,
            "confidence": e.get("confidence"),
        }
        for e in emails
        if e.get("value")
    ]

    if not include_generic:
        contacts = [c for c in contacts if not _is_generic(c["email"])]

    contacts.sort(key=_relevance_score, reverse=True)
    return contacts[:limit]