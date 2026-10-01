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
    "trend_analysis": {
        "market_outlook": (
            "Demand for Senior Backend Engineers remains strong through 2026, "
            "with remote-friendly roles accelerating. Cloud-native and distributed "
            "systems expertise is now table stakes; pure framework knowledge is fading."
        ),
        "demand_trend": "rising",
        "emerging_skills": [
            {
                "skill": "Kubernetes",
                "why": "Most production deployments now assume container orchestration.",
                "demand": "high",
            },
            {
                "skill": "Event-driven architecture",
                "why": "Kafka and SQS show up in 40% of listings.",
                "demand": "high",
            },
            {
                "skill": "OpenTelemetry",
                "why": "Observability is becoming a hiring requirement.",
                "demand": "medium",
            },
        ],
        "declining_skills": [
            {
                "skill": "Manual deployment workflows",
                "why": "Automated CI/CD is now expected.",
                "timeline": "12-24 months",
            },
            {
                "skill": "Monolithic architectures",
                "why": "Microservices are the default for new builds.",
                "timeline": "24-36 months",
            },
        ],
        "salary_trend": (
            "Salaries are up 6% year-over-year, with remote roles compressing "
            "regional gaps."
        ),
        "hot_locations": [
            {"city": "New York, NY", "count": 12},
            {"city": "Remote", "count": 9},
            {"city": "San Francisco, CA", "count": 7},
        ],
        "top_companies": ["Decca Recruiting", "Lawfully", "Strategic Employment Partners"],
        "salary_range": {"min": 151023, "max": 230837, "median": 180000},
        "sample_size": 50,
        "confidence": "high",
    },
}