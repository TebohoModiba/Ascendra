# Ascendra-Agentic

### Your career, on autopilot, at your terms. 

Ascendra Agentic is an autonomous, AI-driven career web platform that finds the gap between where a person is today and where they want to be, then builds a plan to close it. A user opens the site in their browser, enters their background, a target role and a location (a country, city, continent or the whole world) and gets back a personalized recommendation plan, which includes set of skills to learn, projects to build, qualifications to earn and real people or business to contact.  

Built by: **It Worked In Local** for the Agentic AI Hackathon. 

---

## Table of Contents

1. [The Problem We Are Solving](#1-the-problem-we-are-solving)
2. [What Ascendra Does](#2-what-ascendra-does)
3. [Core Skills: Gap Analysis](#3-core-skills-gap-analysis)
4. [Global by Design: Location Scoping](4-global-by-design-location-scoping)
5. [Career Movement Model](#5-career-movement-models)
6. [How the Agent Works](#6-how-the-agent-works)
7. [The Web App Experience](#7-the-web-app-experience)
8. [Tech Stack](#8-tech-stack)
9. [Project Structure](#9-project-structure)
10. [API Reference](#10-api-reference)
11. [Getting Started in Visual Studio Code](#11-getting-started-in-visual-studio)
12. [Working in Parallel with Mock Data](#12-working-in-parallel-with-mock-data)
13. [Deploying the Web App](#13-deploying-the-web-app)
14. [Responsible AI, Privacy and Limitations](#14-responsible-ai-privacy-and-limitations)
15. [Roadmap](#15-roadmap)
16. [Team](#16-team)

---

## 1. The Problem We Are Solving

Unemployment, and youth unemployment in particular, is one of the biggest economic and social challenges in the world. It is especially serious in South Africa, where we are based, but it affects young people in almost every region.

A big part of the problem is not that jobs do not exist. It is that people cannot see the route between what they can do today and what employers are asking for. Common blockers are:

- **Unclear requirements.** Job adverts list skills, tools and certifications that a graduate or job seeker has never been told about.
- **No guidance.** Career counsellors and mentors are hard to reach, and they are usually expensive or oversubscribed.
- **Outdated advice.** A CV tip or a course recommendation from two years ago may no longer match what the market wants.
- **No network.** Many opportunities never reach the job boards. Young people without professional contacts do not know who to approach.
- **Location blind spots.** Demand for a skill in Johannesburg can be very different from demand in Nairobi, Lagos, London or Toronto, and most advice ignores that.

**Our goal:** give every job seeker, wherever they are, a clear and current answer to the question *"What exactly do I need to do to get this job, in this place?"*, from any device with a web browser.

---

## 2. What Ascendra Does

A user opens the web app and gives it three things:

1. **Their background** (a pasted CV, a short summary, or a list of skills and experience).
2. **Their target role** (for example "Junior Data Analyst" or "Supply Chain Manager").
3. **Their search scope** (a country, a city, a continent, or "Global").

Ascendra then works through the problem on its own and shows the results on a dashboard:

| Output | What the user gets |
|---|---|
| **Skill Gap Analysis** | A clear list of skills they already have, skills that transfer, and skills they are missing for the target role in the chosen region. |
| **Upskilling Recommendations** | Prioritised learning steps to close the gaps, starting with the ones that matter most. |
| **Transition Assignments** | Practical portfolio projects that prove the missing skills to an employer. |
| **Networking Outreach** | Real contacts at target companies (found through Hunter.io) and a drafted message for each one. |

Because the market changes, the analysis is meant to be re-run regularly so the advice stays current instead of going stale.

---

## 3. Core Skill: Gap Analysis

Gap analysis is the heart of Ascendra. Everything else in the app (the courses, the projects, the outreach) is built on top of it, so it has to be right.

### What we mean by a gap

A gap is the difference between what a user has now and what the target role requires in the chosen location. Ascendra breaks that difference into four parts:

| Category | Meaning | Example (Financial Analyst → Corporate Strategy Manager) |
|---|---|---|
| **Matched skills** | The user already meets the requirement. | Financial modelling, quantitative analysis |
| **Transferable skills** | The user has something close that can be reframed. | Variance analysis reframed as market performance analysis |
| **Missing skills** | The user has nothing for this requirement yet. | Competitor profiling, M&A target identification |
| **Seniority delta** | The difference in scope and responsibility between the current level and the target level. | From executing reports to owning budgets and making strategic calls |

### How each gap is scored

Every missing or partial skill gets:

- **Importance:** how often and how strongly it appears for the target role in the chosen region.
- **Difficulty:** roughly how long it takes to learn.
- **Priority:** a combination of the two, so the user works on the highest-value gaps first.

The output also includes an overall **readiness score** (0 to 100) so users can see their progress each time they re-run the analysis.

### Why it matters for unemployment

Most people looking for work do not know which one or two missing skills are holding them back. By naming those specific gaps, and by tailoring them to a real location, Ascendra turns "I can't find a job" into "Here are the three things to fix, in this order."

---

## 4. Global by Design: Location Scoping

Ascendra is not limited to one country. The search and the gap analysis can be narrowed to any level of geography, and the results change with it. In the web app this is a simple scope selector on the input form.

| Scope level | Example values | What changes |
|---|---|---|
| **Global** | Worldwide | Broadest view of what the role requires everywhere, and remote-friendly opportunities. |
| **Continent** | Africa, Europe, Asia, North America | Regional trends, shared regulations and cross-border hiring patterns. |
| **Country** | South Africa, Kenya, Germany, Canada | National certifications, regulations, common tools and local hiring demand. |
| **City** | Johannesburg, Cape Town, Nairobi, London | The most specific view: which employers are hiring locally and what they ask for. |

### Why scoping matters

The same role can need different things in different places:

- Regulated fields have different certifications and compliance requirements by country.
- Some tools and software are dominant in one region and rare in another.
- Salary expectations and hiring speed differ by city.
- A user may be open to relocation or remote work, and the tool should be able to compare regions.

A user can also run the analysis for **more than one scope** and compare, for example "Johannesburg" against "Europe (remote)", to decide where to focus.

The scope is passed to the AI agent as part of every request, and it is used to filter which companies are searched for outreach contacts.

---

## 5. Career Movement Models

Ascendra supports three kinds of career move. The user does not need to pick one manually. The agent works out which one applies from the background and target role.

**Vertical progression.** Moving up in the same field, for example a Staff Nurse becoming a Nurse Manager. The gap is mostly about scope: budgets, leadership, compliance and strategic decision-making.

**Horizontal pivot.** Moving to a different function using existing skills, for example a Financial Analyst moving into Corporate Strategy. The gap is about what transfers and what has to be learned.

**Cross-industry transition.** Staying in the same type of role but changing sectors, for example logistics in automotive moving to aerospace supply chain. The gap includes new terminology, regulations and certifications.

---

## 6. How the Agent Works

Ascendra follows an agentic loop: it perceives information, reasons about it, decides what to do and then acts. It is not a single chatbot reply.

```
   User submits the form in the browser
   (background + target role + location scope)
                          |
                          v
              POST /api/analyze  (Next.js -> FastAPI)
                          |
                          v
            +---------------------------+
            |   1. PERCEPTION           |   Reads the background, understands the
            |   Understand the request  |   target role, applies the location scope
            +-------------+-------------+
                          |
                          v
            +---------------------------+
            |   2. GAP ANALYSIS         |   Compares the user with the role in the
            |   Find the difference     |   chosen region: matched, transferable,
            +-------------+-------------+   missing skills and seniority delta
                          |
                          v
            +---------------------------+
            |   3. PLANNER              |   Prioritises the gaps and builds
            |   Decide what to do       |   upskilling steps and assignments
            +-------------+-------------+
                          |
                          v
            +---------------------------+
            |   4. EXECUTION            |   Finds real contacts (Hunter.io) and
            |   Take action             |   drafts personalised outreach messages
            +-------------+-------------+
                          |
                          v
              JSON response -> suggestion cards on the dashboard
```

### The four stages

1. **Perception.** Reads the user's background and the target role, and applies the location scope so everything after it is region-aware.
2. **Gap analysis.** The core reasoning step. It produces the matched, transferable and missing skills, the seniority delta and the readiness score.
3. **Planner.** Turns the gaps into an ordered plan: what to learn first, and what project would prove each skill.
4. **Execution.** Acts on the plan by finding real people at relevant companies through Hunter.io and drafting context-aware messages the user can send.

### Structured outputs

The OpenAI calls use **Structured Outputs** with Pydantic schemas. This means the AI has to return data in an exact JSON shape, so the frontend can render it reliably without parsing free text.

### Keeping advice current

The vision is a system that keeps updating as the market changes. In the MVP, each run uses the model's current reasoning plus live contact data. The roadmap (section 15) covers scheduled re-analysis and live job-market data feeds.

---

## 7. The Web App Experience

Ascendra is a browser-based web app. It has no install step, and it works on desktop, tablet and phone.

### User flow

1. **Landing / input page.** The user fills in `UserInputForm.tsx`: background (text area), target role (text field) and location scope (a level dropdown plus a value field).
2. **Loading state.** `LoadingOverlay.tsx` shows a skeleton and a "the agent is thinking" message while the backend works. The agent can take several seconds, so this screen matters.
3. **Results dashboard.** `page.tsx` shows the readiness score and the gap summary, followed by three suggestion cards.
4. **Re-run.** The user can change the scope or target role and run the analysis again to compare results.

### Suggestion cards

| Card | Component | What it shows |
|---|---|---|
| **Upskilling** | `UpskillingCard.tsx` | The missing skills in priority order, with what to learn and why it matters in the chosen region. |
| **Assignment** | `AssignmentCard.tsx` | A portfolio project that proves the missing skills, with a short description and expected outcome. |
| **Outreach** | `OutreachCard.tsx` | Real contacts found through Hunter.io, each with a drafted connection message and a copy button. |

### Web design goals

- **Responsive layout** so it works on small phone screens, which is how many young job seekers will use it.
- **Lightweight pages** so it loads reasonably on slower or expensive mobile data.
- **Clear loading and error states** so users are never left staring at a blank page.
- **Accessible design:** readable contrast, keyboard navigation and proper labels on form fields.

---

## 8. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Web pages, input form, dashboard, suggestion cards |
| Backend | Python, FastAPI | REST API server and agent orchestration |
| AI | OpenAI API with Structured Outputs | Gap analysis, planning and message drafting |
| Validation | Pydantic | Schemas that define the AI's response shape |
| Contact data | Hunter.io API | Finding professional contacts at target companies |
| Editor | Visual Studio Code | Development, debugging and running both servers |
| Optional | Docker Compose | Run frontend and backend with one command |

---

## 9. Project Structure

```
pathfinder-mvp/
├── README.md
├── docker-compose.yml              # Optional: run backend + frontend with one command
├── .vscode/                        # Shared VS Code settings for the whole team
│   ├── extensions.json             # Recommended extensions
│   ├── launch.json                 # Debug configurations (frontend + backend)
│   └── tasks.json                  # One-click tasks to start the servers
│
├── frontend/                       # Person 1: TypeScript / React / Next.js
│   ├── package.json
│   ├── .env.local                  # NEXT_PUBLIC_API_URL (not committed)
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserInputForm.tsx   # Step 1: background, target role and location scope
│   │   │   ├── LoadingOverlay.tsx  # Step 2: skeleton / agent thinking spinner
│   │   │   └── SuggestionCards/
│   │   │       ├── UpskillingCard.tsx
│   │   │       ├── AssignmentCard.tsx
│   │   │       └── OutreachCard.tsx    # Hunter.io contacts + generated message
│   │   ├── types/
│   │   │   └── api.ts              # Shared TypeScript interfaces for backend responses
│   │   └── app/
│   │       └── page.tsx            # Main dashboard layout
│   └── public/
│
└── backend/                        # Person 2 & 3: Python FastAPI backend
    ├── requirements.txt
    ├── .env                        # API keys (not committed)
    ├── main.py                     # FastAPI entrypoint and CORS setup
    ├── config.py                   # Environment variables (OPENAI_API_KEY, HUNTER_API_KEY)
    ├── mock_data.py                # Mock response so everyone can work in parallel
    ├── models/
    │   └── schemas.py              # Pydantic schemas for OpenAI Structured Outputs
    └── services/
        ├── openai_agent.py         # Person 2: OpenAI prompt logic and JSON parser
        └── hunter_client.py        # Person 3: Hunter.io fetcher and email enricher
```

### Who owns what

| Person | Area | Files |
|---|---|---|
| Vaughan| Frontend | Everything inside `frontend/` |
| Teboho | AI agent | `services/openai_agent.py`, `models/schemas.py` |
| Nthabeleng | Contact data | `services/hunter_client.py`, `config.py` |

### How the two halves talk to each other

The frontend runs in the browser at `http://localhost:3000` and the backend runs at `http://localhost:8000`. Because they are on different ports, the backend must allow the frontend through **CORS**. This is set up in `main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ascendra Agentic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

When the app is deployed, add the real frontend URL to `allow_origins`.

---

## 10. API Reference

### `POST /api/analyze`

Runs the full agent loop and returns the gap analysis and suggestion cards.

**Request body**

```json
{
  "background": "Second-year IT student. Built a web app in ASP.NET Core, comfortable with SQL and C#. Some experience with UI design.",
  "target_role": "Junior Full-Stack Developer",
  "scope": {
    "level": "city",
    "value": "Johannesburg, South Africa"
  }
}
```

`scope.level` can be `global`, `continent`, `country` or `city`. When the level is `global`, `value` can be left out.

**Response body**

```json
{
  "scope_used": "Johannesburg, South Africa",
  "career_move_type": "vertical",
  "gap_analysis": {
    "readiness_score": 62,
    "matched_skills": ["C#", "SQL", "REST APIs"],
    "transferable_skills": [
      {
        "has": "ASP.NET Core MVC",
        "maps_to": "Node.js / Express backend development"
      }
    ],
    "missing_skills": [
      {
        "skill": "React",
        "importance": "high",
        "difficulty": "medium",
        "priority": 1
      }
    ],
    "seniority_delta": "Needs more experience working in a team and using version control workflows."
  },
  "upskilling": [
    {
      "skill": "React",
      "why_it_matters": "Listed in most junior full-stack roles in this region.",
      "suggested_steps": ["Complete a React fundamentals course", "Rebuild a past project using React"],
      "estimated_weeks": 4
    }
  ],
  "assignments": [
    {
      "title": "Job tracker web app",
      "description": "Build a full-stack app with a React frontend and an API backend.",
      "skills_proven": ["React", "REST APIs", "SQL"]
    }
  ],
  "outreach": [
    {
      "contact_name": "Example Person",
      "position": "Engineering Manager",
      "company": "Example Company",
      "email": "person@example.com",
      "confidence": 92,
      "message_draft": "Hi, I'm a second-year IT student building full-stack projects..."
    }
  ]
}
```

### Calling the API from the frontend

A simple `fetch` call from the Next.js app looks like this:

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ background, target_role, scope }),
});

if (!response.ok) {
  throw new Error("Something went wrong while analysing your profile.");
}

const data = await response.json();
```

### Schemas

The response above is defined in `backend/models/schemas.py`. Below is a simplified version of the gap analysis part:

```python
from pydantic import BaseModel
from typing import List

class MissingSkill(BaseModel):
    skill: str
    importance: str      # "high", "medium" or "low"
    difficulty: str      # "easy", "medium" or "hard"
    priority: int        # 1 is the most important gap to close

class TransferableSkill(BaseModel):
    has: str
    maps_to: str

class GapAnalysis(BaseModel):
    readiness_score: int             # 0 to 100
    matched_skills: List[str]
    transferable_skills: List[TransferableSkill]
    missing_skills: List[MissingSkill]
    seniority_delta: str
```

The matching TypeScript interfaces live in `frontend/src/types/api.ts` and must always be kept in sync with these schemas.

### Interactive API docs

FastAPI generates docs automatically. With the backend running, open `http://localhost:8000/docs` in your browser to test `POST /api/analyze` without needing the frontend.

---

## 11. Getting Started in Visual Studio Code

### Prerequisites

- [Visual Studio Code]
- Node.js 18 or newer
- Python 3.10 or newer
- Git (GitHub)
- A Groq API key, Tavily Search API, Duck Duck Go and Firecrawl (Free)
- A Hunter.io API key (a free account is enough for testing)

### 1. Clone the project and open it in VS Code

```bash
git clone <your-repo-url>
cd pathfinder-mvp
code .
```

Open the folder at the `pathfinder-mvp` level, so that both `frontend/` and `backend/` show in the Explorer.

### 2. Install the recommended extensions

When you open the project, VS Code will offer to install the extensions listed in `.vscode/extensions.json`. Accept them, or add this file yourself:

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.debugpy",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-azuretools.vscode-docker"
  ]
}
```

| Extension | Why we use it |
|---|---|
| Python and Debugpy | Running, linting and debugging the FastAPI backend |
| ESLint | Catching mistakes in the TypeScript and React code |
| Prettier | Keeping everyone's code formatted the same way |
| Tailwind CSS IntelliSense | Only needed if the frontend uses Tailwind |
| Docker | Only needed if you use Docker Compose |


### 3. Set up the backend

Open a terminal in VS Code (**Terminal > New Terminal**) and run:

```bash
cd backend
python -m venv venv

# Windows (Command Prompt or PowerShell)
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

If PowerShell blocks the activate script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once and try again.

Then tell VS Code to use this environment: press `Ctrl+Shift+P`, choose **Python: Select Interpreter** and pick the one inside `backend/venv`.

Create a file called `.env` inside `backend/`:

```
OPENAI_API_KEY=your_openai_key_here
HUNTER_API_KEY=your_hunter_key_here
USE_MOCK_DATA=false
```

Start the server:

```bash
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`.

### 4. Set up the frontend

Open a **second terminal** using the **+** button in the terminal panel (the backend needs to keep running in the first one):

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the web app:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. Hot reload is on, so the page updates every time you save a file.

### 5. One-click start with VS Code tasks

Add this to `.vscode/tasks.json` so anyone on the team can start both servers from **Terminal > Run Task**:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "uvicorn main:app --reload",
      "options": { "cwd": "${workspaceFolder}/backend" },
      "problemMatcher": []
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm run dev",
      "options": { "cwd": "${workspaceFolder}/frontend" },
      "problemMatcher": []
    },
    {
      "label": "Start Ascendra (Both)",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "problemMatcher": []
    }
  ]
}
```

Note that the backend task needs the virtual environment to be the selected interpreter, or you can activate it in the terminal first.

### 6. Debugging in VS Code

Add this to `.vscode/launch.json` to set breakpoints in both halves of the app:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug FastAPI Backend",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": ["main:app", "--reload"],
      "cwd": "${workspaceFolder}/backend",
      "envFile": "${workspaceFolder}/backend/.env"
    },
    {
      "name": "Debug Next.js Frontend",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "cwd": "${workspaceFolder}/frontend"
    }
  ]
}
```

Press `F5` and pick the configuration you want. To debug the frontend in the browser, use the browser's developer tools (`F12`) alongside VS Code.

### 7. Or run everything with Docker

```bash
docker-compose up --build
```

### Environment variables

| Variable | Where | Description |
|---|---|---|
| `OPENAI_API_KEY` | backend | Key for the OpenAI API |
| `HUNTER_API_KEY` | backend | Key for the Hunter.io API |
| `USE_MOCK_DATA` | backend | Set to `true` to return the mock response without calling any external API |
| `NEXT_PUBLIC_API_URL` | frontend | Backend URL, for example `http://localhost:3000` |

Never commit `.env` or `.env.local`. Make sure both are listed in `.gitignore`. Anything starting with `NEXT_PUBLIC_` is visible in the browser, so never put a secret key there. API keys stay on the backend only.

### Suggested Git workflow

- Each person works on their own branch, for example `feature/frontend-cards`, `feature/openai-agent` or `feature/hunter-client`.
- Commit small and often, and pull the latest `main` before starting new work.
- Merge through pull requests so someone else looks at the change first.

---

## 12. Working in Parallel with Mock Data

To stop team members blocking each other, `backend/mock_data.py` contains a complete example response in the exact shape of the real API.

- **Person 1** can build and style all the cards against the mock response before the AI agent is finished.
- **Person 2** can develop the prompts and schemas without waiting for the Hunter.io integration.
- **Person 3** can build the contact fetcher and plug it in when it works.

Set `USE_MOCK_DATA=true` in `backend/.env` and the API returns the mock response instantly, with no OpenAI or Hunter.io calls. When the real services are ready, set it back to `false`.

**Rule for the team:** if the shape of the response changes in `schemas.py`, update `mock_data.py` and `frontend/src/types/api.ts` in the same commit.

---

## 13. Deploying the Web App

For a live demo, the two halves can be hosted separately.

| Part | Suggested host | Notes |
|---|---|---|
| Frontend (Next.js) | Vercel | Connect the GitHub repo, set the root directory to `frontend`, and add `NEXT_PUBLIC_API_URL` as an environment variable. |
| Backend (FastAPI) | Render, Railway or a similar service | Set the root directory to `backend`, use `uvicorn main:app --host 0.0.0.0 --port $PORT` as the start command, and add the API keys as environment variables. |

After both are deployed:

1. Copy the backend's public URL into the frontend's `NEXT_PUBLIC_API_URL`.
2. Add the frontend's public URL to `allow_origins` in `main.py`.
3. Redeploy both and test the full flow in the browser.

Free hosting tiers may put the backend to sleep when idle, so open the app a few minutes before a live demo.

---

## 14. Responsible AI, Privacy and Limitations

Career advice affects real people's lives, so we treat the following seriously.

**Privacy.** CVs contain personal information. We follow the principles of South Africa's POPIA and similar laws such as GDPR:

- We only collect what is needed to run the analysis.
- User data is not stored permanently in the MVP.
- Users should be told clearly what is sent to third-party services (OpenAI and Hunter.io).

**Human in control.** Ascendra makes suggestions. It does not send messages or apply for jobs on the user's behalf. The user reviews and sends every outreach message themselves.

**Honest about accuracy.** AI-generated analysis can be wrong or out of date. Readiness scores and skill priorities are guidance, not guarantees, and users should verify important requirements (such as certifications) with official sources.

**Fairness.** We try not to favour any group. Recommendations should be based on skills and role requirements, not on a person's name, gender, age or background.

**Contact data.** Emails from Hunter.io are publicly sourced professional addresses. Outreach messages should be respectful, relevant and easy to ignore, and never spammy.

**Web security basics:**

- API keys live only on the backend and are never sent to the browser.
- CORS is limited to our own frontend URL.
- User input is validated by Pydantic before it reaches the AI.
- Rate limiting should be added before any public launch, so the API cannot be abused.

**Current limitations of the MVP:**

- Market data comes from the AI model's knowledge rather than a live job-board feed.
- Location-specific accuracy is stronger for well-documented regions and roles.
- Hunter.io free-tier limits restrict how many contacts can be fetched.
- No user accounts or saved history yet.

---

## 15. Roadmap

**Phase 1: MVP (hackathon)**
- Web input form with background, target role and location scope
- AI gap analysis with structured output
- Upskilling, assignment and outreach cards
- Hunter.io contact lookup

**Phase 2: Live market intelligence**
- Pull live job postings to measure real demand for skills by country and city
- Track hiring trends and detect skills that are rising or falling
- Company tooling and technology-stack detection from job descriptions

**Phase 3: Continuous updating**
- User accounts and saved analyses
- Scheduled re-analysis so plans update automatically as the market changes
- Progress tracking and readiness score history
- Notifications when a target role's requirements shift

**Phase 4: Wider reach**
- Progressive Web App support so the site can be installed on a phone
- LinkedIn profile optimisation and headline rewriting
- Multilingual support (including South African languages)
- Partnerships with universities, TVET colleges and youth employment programmes

---

## 16. Team

**Team name:** It Worked In Local

| Role | Responsibility |
|---|---|
| Vaughan Keannan Gouws| Frontend (Next.js, React, TypeScript), Project Documentation & Presentation |
| Teboho Modiba | AI agent (OpenAI prompts, Structured Outputs) and Backend Development |
| Nthabeleng Moloi | Contact data (Hunter.io integration) and API Keys (Groq API, Tavily Search API, Duck Duck Go and Firecrawl) |

---

*It worked in local. Now we're making it work for everyone.*
