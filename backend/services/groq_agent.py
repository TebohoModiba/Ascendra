import json
import logging

from groq import Groq, RateLimitError

from config import settings

logger = logging.getLogger(__name__)

client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """You are Ascendra, a career pathfinding agent.

Given a user's resume and their target role, produce a JSON object with EXACTLY these keys:

{
  "upskilling": ["3-5 concrete skills to learn next"],
  "assignments": ["3-5 portfolio projects / assignments to build"]
}

Rules:
- Be specific and actionable, not generic.
- Assume the user is technically capable.
- Use plain ASCII only (no smart quotes, em-dashes, or non-ASCII characters).
- Return JSON only. No prose, no markdown, no code fences.
"""


def _call(model: str, messages: list[dict]) -> str:
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        response_format={"type": "json_object"},
        temperature=0.3,
    )
    if response.usage:
        logger.info(
            "[groq] model=%s tokens=%s",
            model,
            response.usage.total_tokens,
        )
    return response.choices[0].message.content


def run_agent(resume: str, target_role: str) -> dict:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": f"Resume:\n{resume}\n\nTarget role: {target_role}",
        },
    ]

    try:
        raw = _call(settings.GROQ_MODEL, messages)
    except RateLimitError:
        logger.warning("Groq primary model rate-limited, using fallback")
        raw = _call(settings.GROQ_FALLBACK_MODEL, messages)

    return json.loads(raw)