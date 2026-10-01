MOCK_RESPONSE = {
    "readiness_score": 62,
    "career_move_type": "vertical",
    "gap_analysis": {
        "matched_skills": ["Python", "PostgreSQL", "REST APIs"],
        "transferable_skills": [
            {
                "has": "Django ORM experience",
                "maps_to": "SQLAlchemy / async ORM patterns",
            }
        ],
        "missing_skills": [
            {
                "skill": "Distributed systems design",
                "importance": "high",
                "difficulty": "hard",
                "priority": 1,
            },
            {
                "skill": "Kubernetes",
                "importance": "high",
                "difficulty": "medium",
                "priority": 2,
            },
            {
                "skill": "Observability (Prometheus, Grafana)",
                "importance": "medium",
                "difficulty": "easy",
                "priority": 3,
            },
        ],
        "seniority_delta": (
            "Moving from executing tasks to owning architecture decisions "
            "and mentoring junior engineers."
        ),
    },
    "upskilling": [
        {
            "skill": "Distributed systems design",
            "why_it_matters": "Senior roles expect you to reason about scaling, consistency, and failure modes.",
            "suggested_steps": [
                "Read Designing Data-Intensive Applications",
                "Build a sharded key-value store",
            ],
            "estimated_weeks": 8,
        },
        {
            "skill": "Kubernetes",
            "why_it_matters": "Most senior backend roles now deploy on K8s.",
            "suggested_steps": [
                "Complete CKA fundamentals course",
                "Deploy a 3-tier app to a local cluster",
            ],
            "estimated_weeks": 6,
        },
    ],
    "assignments": [
        "Build a multi-service e-commerce backend on Kubernetes",
        "Create an event-driven order pipeline with Kafka",
        "Deploy a 3-tier app with full CI/CD on GitHub Actions",
    ],
    "jobs": [
        {
            "title": "Senior Backend Engineer",
            "company": "Acme Corp",
            "location": "Remote",
            "url": "https://example.com/job/1",
            "salary_min": 180000,
            "salary_max": 220000,
        }
    ],
    "contacts": [
        {
            "name": "Jane Doe",
            "email": "jane@acme.com",
            "position": "Engineering Manager",
            "confidence": 92,
            "company": "Acme Corp",
        }
    ],
}