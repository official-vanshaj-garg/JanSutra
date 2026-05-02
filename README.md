# JanSutra

JanSutra is a **neutral, educational platform** designed to demystify the Indian election process for first-time voters, senior citizens, and persons with disabilities. 

- **Live Site**: [https://jansutra-22389764914.asia-south1.run.app](https://jansutra-22389764914.asia-south1.run.app)
- **GitHub Repository**: [https://github.com/official-vanshaj-garg/JanSutra](https://github.com/official-vanshaj-garg/JanSutra)

**Disclaimer:** JanSutra is an educational practice lab. It is NOT an official election authority. It does not provide final live election deadlines, constituency-specific polling booth locations, or candidate recommendations.

---

## 🏆 Hack2Skill Evaluation Evidence

| Metric | Implemented Proof |
| :--- | :--- |
| **Code Quality** | **npm run verify** gate, ESLint, centralized middleware (`validateInput`, `errorHandler`, `notFoundHandler`), and constant-driven engines. |
| **Security** | Rate limiting (`express-rate-limit`), context sanitization, post-generation AI safety audit, PII blocking, and non-root Docker runtime. |
| **Efficiency** | Static asset caching (1d), compression, fire-and-forget telemetry, and multi-model Gemini fallbacks (Flash/Lite). |
| **Testing** | **54/54 passing tests** (Vitest + Supertest), including security hardening, telemetry sanitization, and deterministic logic. |
| **Accessibility** | Sahaj Mode (high contrast), semantic HTML5, persona-based adaptive journeys (Senior/PwD), and WCAG-aligned UI. |
| **Google Services** | Gemini API, Cloud Run, Firestore, Secret Manager, Cloud Logging, and Antigravity AI orchestration. |
| **Problem Alignment** | Direct solution for **Voter Education (Option B)** focusing on election process literacy and disinformation defense. |

---

## 🏗️ Architecture

```text
[ Client (React/Vite) ] <---> [ Express API (Cloud Run) ]
                                     |
                +--------------------+--------------------+
                |                    |                    |
      [ SatyaCheck Firewall ]  [ Deterministic Engines ] [ Gemini Assistant ]
                |                    |                    |
        (Input Validation)    (Timeline/Checklist)    (Safe Explanations)
                |                    |                    |
                +--------------------+--------------------+
                                     |
                   +-----------------+-----------------+
                   |                                   |
       [ Secret Manager ]                      [ Firestore Telemetry ]
       (API Key Protection)                   (Anonymous Event Logs)
```

---

## 🛡️ Security Layers

| Layer | Implementation |
| :--- | :--- |
| **HTTP Headers** | `helmet` configured for XSS, Clickjacking, and Sniffing protection. |
| **Rate Limiting** | General `/api` limit (200/15min) + Strict `/api/assistant` limit (50/15min). |
| **Input Validation** | Centralized `validateInput.js` middleware with 500-char limits. |
| **Neutrality Firewall** | `SatyaCheck` engine blocks candidate recommendations and partisan queries. |
| **PII Blocking** | Deterministic interception of Voter IDs, Aadhaar, and phone numbers. |
| **AI Output Validation** | Post-generation safety audit ensures Gemini never hallucinates unsafe content. |
| **Error Handling** | Sanitized error mapping prevents stack trace or API key leakage in logs. |
| **Container Security** | **Non-root** `node` user runtime in Docker to limit host impact. |
| **Secret Management** | `GEMINI_API_KEY` stored in **Google Secret Manager**, never in code. |

---

## 🛠️ Google Services

| Service | Integration Role |
| :--- | :--- |
| **Google Antigravity** | Agentic AI co-development for architecture, security hardening, and audit. |
| **Gemini API** | Multi-model fallback (Flash/Lite) for neutral educational explanations. |
| **Google Cloud Run** | Unified serverless hosting with request timeouts (30s) and trust-proxy config. |
| **Google Secret Manager** | Secure production handling of API keys and deployment secrets. |
| **Google Firestore** | Anonymous, fire-and-forget telemetry for categorical usage metrics. |
| **Google Cloud Logging** | Structured JSON logs for production auditing and neutrality monitoring. |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and timestamp. |
| `POST` | `/api/journey` | Generates a persona-based election timeline. |
| `POST` | `/api/checklist` | Generates a persona-based preparation checklist. |
| `POST` | `/api/readiness` | Calculates civic readiness score based on journey/checklist. |
| `POST` | `/api/satya-check` | Tests a query against the neutrality and PII firewall. |
| `GET` | `/api/simulation` | Fetches steps for the Mock Booth simulation. |
| `POST` | `/api/simulation/next` | Validates step-by-step sequential polling movement. |
| `GET` | `/api/official-links` | Returns verified Election Commission portal links. |
| `POST` | `/api/assistant/explain` | Gemini-powered educational assistant with guardrails. |
| `POST` | `/api/telemetry` | Records anonymous usage events (Opt-in). |

---

## 🔒 Privacy-First Design
- **No Login Required**: Zero user authentication or identity tracking.
- **No Voter Database**: We do not store or ask for real voter identities.
- **No Raw Storage**: User questions and AI responses are never stored in plain text.
- **No PII Collection**: Absolute blocking of Voter ID, Aadhaar, EPIC, phone, or address.
- **Anonymous Telemetry**: Firestore logs only sanitized metadata (e.g., `scoreBand: medium`).

---

## 🧪 Testing & Quality
JanSutra maintains a rigorous quality gate with **54 automated tests** covering security, logic, and integration.

- **`npm run verify`**: The primary gate — runs Lint, Test, and Build in sequence.
- **Vitest + Supertest**: Used for API route validation and schema enforcement.
- **Security Tests**: Verify rate limiting, context sanitization, and step validation.
- **Assistant Tests**: Ensure model fallbacks and safe deterministic responses.

```bash
npm run verify
```

---

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Vanilla CSS (Sahaj Mode) |
| **Backend** | Node.js, Express |
| **AI** | Google Gemini (Flash-Lite), SatyaCheck Firewall |
| **Google Cloud** | Cloud Run, Firestore, Secret Manager, Cloud Logging |
| **Testing** | Vitest, Supertest |
| **Security** | Helmet, express-rate-limit, Sanitizers |
| **Deployment** | Docker (Non-root), Cloud Build |

---

## 🚀 Getting Started

### Local Run
1. Install: `npm run install:all`
2. Configure `server/.env`:
   ```env
   GEMINI_API_KEY=your_key
   GEMINI_MODEL=gemini-2.5-flash
   TELEMETRY_ENABLED=false
   FIRESTORE_COLLECTION=jansutra_events
   PORT=3000
   ```
3. Run: `cd client && npm run dev` and `cd server && npm run dev`

### Cloud Run Deploy
```bash
gcloud run deploy jansutra \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --set-env-vars GEMINI_MODEL="gemini-2.5-flash",TELEMETRY_ENABLED="true",FIRESTORE_COLLECTION="jansutra_events"
```

---

## 👥 Maintainer

<table>
  <tr>
    <td align="center"><b>Vanshaj Garg</b><br/>📧 <a href="mailto:official.vanshaj.garg@gmail.com">official.vanshaj.garg@gmail.com</a><br/>🔗 <a href="https://www.linkedin.com/in/vanshajgargg">LinkedIn</a></td>
  </tr>
</table>
