<div align="center">

<img src="https://img.shields.io/badge/Hack2Skill-Submission-orange?style=for-the-badge" alt="Hack2Skill" />
<img src="https://img.shields.io/badge/Tests-54%2F54%20Passing-brightgreen?style=for-the-badge&logo=vitest" alt="Tests" />
<img src="https://img.shields.io/badge/Google_Cloud-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="Cloud Run" />
<img src="https://img.shields.io/badge/AI-Gemini_API-8E44AD?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />

<br/><br/>

# 🗳️ JanSutra

### *Demystifying Democracy for Every Indian Voter*

**JanSutra** is a neutral, educational platform built to simplify the Indian election process for **first-time voters**, **senior citizens**, and **persons with disabilities** — powered by Google Gemini and deployed on Google Cloud Run.

<br/>

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Now-0A66C2?style=for-the-badge)](https://jansutra-22389764914.asia-south1.run.app)
[![GitHub Repo](https://img.shields.io/badge/⭐_GitHub-Star_the_Repo-181717?style=for-the-badge&logo=github)](https://github.com/official-vanshaj-garg/JanSutra)

<br/>

> ⚠️ **Disclaimer:** JanSutra is an educational practice lab. It is **NOT** an official election authority and does not provide live election deadlines, constituency-specific polling locations, or candidate recommendations.

</div>

---

## 📋 Table of Contents

- [Why JanSutra?](#-why-jansutra)
- [Hack2Skill Evaluation](#-hack2skill-evaluation-evidence)
- [Architecture](#️-architecture)
- [Security Layers](#️-security-layers)
- [Google Services](#️-google-services)
- [API Reference](#-api-reference)
- [Privacy-First Design](#-privacy-first-design)
- [Testing & Quality](#-testing--quality)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Maintainer](#-maintainer)

---

## 💡 Why JanSutra?

Millions of eligible Indian voters — especially first-timers, elderly citizens, and persons with disabilities — feel overwhelmed by the electoral process. JanSutra bridges this gap by offering:

- 🧭 **Persona-based journeys** tailored for Senior, PwD, and First-Time Voter profiles
- 🛡️ **SatyaCheck Firewall** that ensures responses remain strictly neutral and educational
- ♿ **Sahaj Mode** — a high-contrast, accessible UI aligned with WCAG guidelines
- 🤖 **Gemini-powered explanations** with built-in safety audits and PII blocking
- 🎭 **Mock Booth Simulation** to walk voters through the polling experience step-by-step

---

## 🏆 Hack2Skill Evaluation Evidence

| Metric | Implementation |
| :--- | :--- |
| 🧹 **Code Quality** | `npm run verify` gate, ESLint, centralized middleware (`validateInput`, `errorHandler`, `notFoundHandler`), and constant-driven engines |
| 🔐 **Security** | Rate limiting, context sanitization, post-generation AI safety audit, PII blocking, and non-root Docker runtime |
| ⚡ **Efficiency** | Static asset caching (1 day), compression, fire-and-forget telemetry, and multi-model Gemini fallbacks (Flash/Lite) |
| ✅ **Testing** | **54/54 passing tests** (Vitest + Supertest) covering security hardening, telemetry sanitization, and deterministic logic |
| ♿ **Accessibility** | Sahaj Mode (high contrast), semantic HTML5, persona-based adaptive journeys (Senior/PwD), WCAG-aligned UI |
| ☁️ **Google Services** | Gemini API, Cloud Run, Firestore, Secret Manager, Cloud Logging, and Antigravity AI orchestration |
| 🎯 **Problem Alignment** | Direct solution for **Voter Education (Option B)** — election process literacy and disinformation defense |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Client (React / Vite)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────┐
│              Express API  ·  Google Cloud Run                │
│                                                              │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────┐  │
│  │  SatyaCheck     │  │  Deterministic   │  │  Gemini    │  │
│  │  Firewall       │  │  Engines         │  │  Assistant │  │
│  │                 │  │                  │  │            │  │
│  │ Input Validation│  │Timeline/Checklist│  │Safe Explain│  │
│  └────────┬────────┘  └────────┬─────────┘  └─────┬──────┘  │
│           └───────────────────┬┴──────────────────┘         │
│                               │                             │
│           ┌───────────────────┴──────────────────┐          │
│           │                                      │          │
│  ┌────────▼──────────┐              ┌────────────▼───────┐  │
│  │  Secret Manager   │              │  Firestore         │  │
│  │  (API Key Vault)  │              │  (Anon Telemetry)  │  │
│  └───────────────────┘              └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Layers

JanSutra is built **security-first**, with multiple layers protecting both users and the platform.

| Layer | Implementation |
| :--- | :--- |
| 🪖 **HTTP Headers** | `helmet` configured for XSS, Clickjacking, and MIME Sniffing protection |
| 🚦 **Rate Limiting** | General `/api` limit (200 req/15 min) · Strict `/api/assistant` limit (50 req/15 min) |
| 🔎 **Input Validation** | Centralized `validateInput.js` middleware with 500-character limits |
| ⚖️ **Neutrality Firewall** | `SatyaCheck` engine blocks candidate recommendations and partisan queries |
| 🚫 **PII Blocking** | Deterministic interception of Voter IDs, Aadhaar, EPIC, and phone numbers |
| 🤖 **AI Output Audit** | Post-generation safety audit ensures Gemini responses never contain unsafe content |
| 🪵 **Error Handling** | Sanitized error mapping prevents stack traces or API key leakage in logs |
| 🐳 **Container Security** | Non-root `node` user runtime in Docker to limit host surface area |
| 🔑 **Secret Management** | `GEMINI_API_KEY` stored in **Google Secret Manager** — never in source code |

---

## ☁️ Google Services

| Service | Role in JanSutra |
| :--- | :--- |
| **Google Antigravity** | Agentic AI co-development for architecture design, security hardening, and audit |
| **Gemini API** | Multi-model fallback (Flash → Lite) for neutral, safe educational explanations |
| **Google Cloud Run** | Unified serverless hosting with 30s request timeouts and trust-proxy config |
| **Google Secret Manager** | Secure production handling of API keys and deployment secrets |
| **Google Firestore** | Anonymous, fire-and-forget telemetry for categorical usage metrics |
| **Google Cloud Logging** | Structured JSON logs for production auditing and neutrality monitoring |

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Service health status and timestamp |
| `POST` | `/api/journey` | Generates a persona-based election timeline |
| `POST` | `/api/checklist` | Generates a persona-based preparation checklist |
| `POST` | `/api/readiness` | Calculates civic readiness score from journey/checklist data |
| `POST` | `/api/satya-check` | Tests a query against the neutrality and PII firewall |
| `GET` | `/api/simulation` | Fetches steps for the Mock Booth simulation |
| `POST` | `/api/simulation/next` | Validates step-by-step sequential polling movement |
| `GET` | `/api/official-links` | Returns verified Election Commission portal links |
| `POST` | `/api/assistant/explain` | Gemini-powered educational assistant with full guardrails |
| `POST` | `/api/telemetry` | Records anonymous usage events (opt-in only) |

---

## 🔒 Privacy-First Design

JanSutra collects **nothing identifiable** about its users. This is a hard architectural guarantee, not a policy.

| Principle | What It Means |
| :--- | :--- |
| 🔓 **No Login Required** | Zero user authentication or identity tracking — ever |
| 🗳️ **No Voter Database** | We never store or request real voter identities |
| 📭 **No Raw Storage** | User questions and AI responses are never stored in plain text |
| 🙈 **No PII Collection** | Absolute blocking of Voter ID, Aadhaar, EPIC, phone, or address data |
| 📊 **Anonymous Telemetry** | Firestore logs only sanitized metadata (e.g., `scoreBand: "medium"`) |

---

## 🧪 Testing & Quality

JanSutra enforces a **zero-compromise quality gate** through automated testing.

```bash
npm run verify   # Runs Lint → Test → Build in sequence
```

| Area | Coverage |
| :--- | :--- |
| **Total Tests** | ✅ 54 / 54 passing |
| **Framework** | Vitest + Supertest |
| **Security Tests** | Rate limiting, context sanitization, step validation |
| **Assistant Tests** | Model fallbacks and deterministic safe responses |
| **Logic Tests** | Timeline/checklist engines and readiness score determinism |

---

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Vanilla CSS (with Sahaj Mode) |
| **Backend** | Node.js, Express |
| **AI / ML** | Google Gemini (Flash → Lite fallback), SatyaCheck Firewall |
| **Google Cloud** | Cloud Run · Firestore · Secret Manager · Cloud Logging |
| **Testing** | Vitest, Supertest |
| **Security** | Helmet, express-rate-limit, custom sanitizers |
| **Deployment** | Docker (non-root), Cloud Build |

---

## 🚀 Getting Started

### Run Locally

**1. Install dependencies**
```bash
npm run install:all
```

**2. Configure environment** — create `server/.env`:
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
TELEMETRY_ENABLED=false
FIRESTORE_COLLECTION=jansutra_events
PORT=3000
```

**3. Start development servers**
```bash
# Terminal 1 — Frontend
cd client && npm run dev

# Terminal 2 — Backend
cd server && npm run dev
```

---

### Deploy to Google Cloud Run

```bash
gcloud run deploy jansutra \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --set-env-vars GEMINI_MODEL="gemini-2.5-flash",TELEMETRY_ENABLED="true",FIRESTORE_COLLECTION="jansutra_events"
```

---

## 👤 Maintainer

<div align="center">

<br/>

**Vanshaj Garg**

[![Email](https://img.shields.io/badge/Email-official.vanshaj.garg%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:official.vanshaj.garg@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vanshajgargg-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanshajgargg)

<br/>

---

<sub>Built with ❤️ for Indian democracy · Powered by Google Cloud & Gemini AI</sub>

</div>