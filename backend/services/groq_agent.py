import json
import logging

from groq import Groq, RateLimitError

from config import settings

logger = logging.getLogger(__name__)

client = Groq(api_key=settings.GROQ_API_KEY)

SYSTEM_PROMPT = """You are Ascendra, a career pathfinding agent.

Given a user's resume, their target role, and optionally live job titles from the market, produce a JSON object with EXACTLY these keys:

{
  "readiness_score": 62,
  "career_move_type": "vertical",
  "gap_analysis": {
    "matched_skills": ["skills the user already has that the role needs"],
    "transferable_skills": [
      {"has": "what they have", "maps_to": "what it transfers to"}
    ],
    "missing_skills": [
      {
        "skill": "name",
        "importance": "high",
        "difficulty": "medium",
        "priority": 1
      }
    ],
    "seniority_delta": "one sentence on the scope/responsibility gap"
  },
  "upskilling": [
    {
      "skill": "name",
      "why_it_matters": "why this matters for this role/region",
      "suggested_steps": ["step 1", "step 2"],
      "estimated_weeks": 4
    }
  ],
  "assignments": ["3-5 portfolio projects to build"]
}

Rules:
- readiness_score: integer 0-100. 0 = no overlap, 100 = ready today.
- career_move_type: one of "vertical", "horizontal", "cross-industry".
- importance: "high", "medium", or "low".
- difficulty: "easy", "medium", or "hard".
- priority: 1 = most urgent. Sequential integers.
- Order upskilling by priority (highest first).
- If live job titles are provided, ground your analysis in what employers are actually asking for.
- Use plain ASCII only. No smart quotes or em-dashes.
- Return JSON only. No prose.
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


def run_agent(
    resume: str,
    target_role: str,
    job_titles: list[str] | None = None,
) -> dict:
    context = ""
    if job_titles:
        titles = ", ".join(job_titles[:5])
        context = (
            f"\n\nLive job titles currently hiring for this role in this market: "
            f"{titles}\nGround your analysis in what these employers actually ask for."
        )

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                f"Resume:\n{resume}\n\n"
                f"Target role: {target_role}{context}"
            ),
        },
    ]

    try:
        raw = _call(settings.GROQ_MODEL, messages)
    except RateLimitError:
        logger.warning("Groq primary model rate-limited, using fallback")
        raw = _call(settings.GROQ_FALLBACK_MODEL, messages)

    return json.loads(raw)