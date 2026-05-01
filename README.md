# JanSutra

JanSutra is a **neutral, educational platform** designed to demystify the Indian election process for first-time voters, senior citizens, and persons with disabilities. 

- **Live Site**: [https://jansutra-22389764914.asia-south1.run.app](https://jansutra-22389764914.asia-south1.run.app)
- **GitHub Repository**: [https://github.com/official-vanshaj-garg/JanSutra](https://github.com/official-vanshaj-garg/JanSutra)

It provides an interactive **JanPath Wizard** to map out personalized voting journeys, a **Mock Booth** simulation, and an AI-powered **Assistant Panel** backed by Gemini, all safeguarded by a deterministic neutrality engine (SatyaCheck).

## 🏆 Hack2Skill Evaluation Evidence

| Metric | Implemented Proof |
| :--- | :--- |
| **Code Quality** | Centralized Express middleware (`validateInput`, `errorHandler`, `notFoundHandler`), constant-driven engines, and linting gates. |
| **Security** | Rate limiting, context sanitization, post-generation AI output validation, PII blocking, and Secret Manager integration. |
| **Efficiency** | Static caching (1d maxAge), fire-and-forget anonymous telemetry, and lightweight Flash-Lite Gemini model. |
| **Testing** | **54/54 passing tests** (Vitest + Supertest), including security hardening, telemetry sanitization, and API integration. |
| **Accessibility** | Dedicated "Sahaj Mode", semantic HTML5, personas (Senior/PwD), and WCAG-aligned inclusive UX. |
| **Google Services** | Gemini AI, Cloud Run, Firestore, Secret Manager, Cloud Logging, and Antigravity Agent. |
| **Problem Alignment** | Direct solution for Voter Education (Option B) focusing on process literacy and disinformation defense. |

### 🛠 Google Services Implemented

| Service | Usage in JanSutra |
| :--- | :--- |
| **Google Antigravity** | Agentic AI co-development for architecture and audit. |
| **Google Gemini API** | Multi-model fallback (Flash/Lite) for educational explanations. |
| **Google Cloud Run** | Unified serverless deployment for scalability and performance. |
| **Google Secret Manager** | Secure handling of GEMINI_API_KEY without environment exposure. |
| **Google Firestore** | Opt-in anonymous telemetry for usage metrics (no PII). |
| **Google Cloud Logging** | Structured JSON logs for production auditing and monitoring. |

### 🔒 Privacy-First Difference
- **Zero Login**: No user authentication or identity tracking required.
- **Zero PII Storage**: Never stores Voter ID, Aadhaar, EPIC, phone numbers, or addresses.
- **Zero Raw Data**: No storage of raw user questions or conversational prompts.
- **Zero Partisanship**: No tracking of political opinions or candidate preferences.
- **Anonymous Metrics**: Firestore only stores sanitized event metadata (e.g., `scoreBand: medium`).

### 🧪 Test Summary
- **54/54 tests passing** (Vitest suite).
- **Security Hardening**: Tests for rate limiting, context sanitization, and step validation.
- **API Integration**: Full route coverage using `supertest`.
- **Privacy Tests**: Dedicated validation for telemetry sanitization and PII blocking.
- **Neutrality Tests**: Guardrail verification for political and candidate recommendation blocking.

---

**Disclaimer:** JanSutra is an educational practice lab. It is NOT an official election authority. It does not provide final live election deadlines, constituency-specific polling booth locations, or candidate recommendations.

---

## 🎯 Chosen Vertical
**Voter Education and Engagement (Option B)**

## 🌟 What makes JanSutra different?
- **Not a generic chatbot**: JanSutra is a structured, interactive election literacy lab.
- **Deterministic-first civic learning**: The core timelines and checklists are generated safely without AI hallucinations.
- **Mock booth rehearsal**: Hands-on learning simulation using neutral dummy candidates.
- **SatyaCheck neutrality guardrail**: A transparent, dual-layer safety engine that blocks political recommendations and sensitive PII.
- **Sahaj accessibility mode**: A robust high-contrast, large-font UI built for elderly and visually impaired users.
- **Civic readiness score**: A gamified, deterministic percentage to track learning progress.
- **Official verification first**: Pushes users directly to Election Commission portals instead of guessing live data.

## 🧠 Approach & Logic
JanSutra is built with a **Deterministic-First** architecture. This ensures absolute neutrality and prevents the AI from generating political hallucinations.

1. **Layer 1 (Deterministic SatyaCheck)**: All inputs pass through a strict rule-based engine. If a query requests political persuasion, candidate recommendation, unverified deadlines, or sensitive personal data, it is immediately blocked with a hardcoded safe response.
2. **Layer 2 (Gemini Integration)**: If deemed safe, the context is passed to the Gemini API, heavily constrained by system instructions to act only as an educational explainer.

### 📚 Core Documentation
- [API Contract](./docs/API_CONTRACT.md): Comprehensive breakdown of all endpoints, inputs, and strict output schemas.
- [Evaluation Evidence Mapping](./docs/EVALUATION_EVIDENCE.md): Direct mappings of JanSutra's architecture to the Hack2Skill judging metrics.
- [Google Services](./docs/GOOGLE_SERVICES.md): Detailed explanation of all integrated Google Cloud and AI services.
- [Secret Manager Deployment](./docs/SECRET_MANAGER_DEPLOYMENT.md): Guide for secure production secret handling.
- [Security and Neutrality](./docs/SECURITY_AND_NEUTRALITY.md): Explicit guardrails and SatyaCheck refusal rules.
- [Threat Model](./docs/THREAT_MODEL.md): Analysis of threat categories and specific mitigations in JanSutra.
- [AI Code Provenance](./docs/AI_CODE_PROVENANCE.md): Records of AI involvement, deterministic components, and governance.

## ⚙️ How the Solution Works
1. **JanPath Wizard**: Users select their personas (e.g., First-Time Voter, Senior Citizen).
2. **Deterministic Engines**: The server generates an accessible, step-by-step Timeline and Preparation Checklist.
3. **Mock Booth**: Users practice the polling day flow using abstract dummy candidates (e.g., Candidate Apple 🍎, Candidate Sun ☀️).
4. **Ask JanSutra**: Users can ask the Gemini-powered assistant follow-up questions, which are heavily filtered.
5. **Sahaj Mode**: A one-click toggle for high-contrast, large-font readability.


## 🛡️ Security & Neutrality Notes
- **Zero PII Storage**: No personal voter database is used. Firestore stores only sanitized anonymous event metadata and never stores raw questions, voter IDs, Aadhaar, EPIC, phone numbers, addresses, party preferences, or candidate preferences.
- **No Political Entities**: No real Indian political parties, candidates, or symbols exist anywhere in the codebase.
- **No Client-Side Secrets**: The `GEMINI_API_KEY` is kept strictly on the Node.js server. The client only communicates with our backend wrapper.

## ♿ Accessibility Notes
- Fully semantic HTML (`fieldset`, `legend`, `main`).
- ARIA-labels on dynamic components (`aria-labelledby`, `aria-hidden`).
- "Sahaj Mode" specifically targets visually impaired and elderly users with an ultra-high contrast CSS variable override.
- Fully mobile responsive.

## 🧪 Testing Instructions
The server contains rigid unit tests to verify the deterministic engine and the Gemini fallback logic.
```bash
npm run test
# This runs the Vitest suite ensuring SatyaCheck intercepts unsafe queries.
```

## 💻 Local Run Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up environment variables:
   Create `server/.env` and add:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   TELEMETRY_ENABLED=false
   FIRESTORE_COLLECTION=jansutra_events
   PORT=3000
   ```
4. Start development environments:
   - Client: `cd client && npm run dev`
   - Server: `cd server && npm run dev`

## ☁️ Cloud Run Deployment Instructions
JanSutra is designed to be deployed as a single unified service. The provided `Dockerfile` builds the React frontend and configures the Express server to serve it statically.

1. Ensure you have the `gcloud` CLI installed and authenticated.
2. Set your Google Cloud project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
   3. Deploy directly using Cloud Run (Secret Manager recommended for API Key):
      ```bash
      gcloud run deploy jansutra \
        --source . \
        --region asia-south1 \
        --allow-unauthenticated \
        --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest \
        --set-env-vars GEMINI_MODEL="gemini-2.5-flash",TELEMETRY_ENABLED="true",FIRESTORE_COLLECTION="jansutra_events"
      ```

## 👥 Maintainer

<table>
  <tr>
    <td align="center"><b>Vanshaj Garg</b><br/>📧 <a href="mailto:official.vanshaj.garg@gmail.com">official.vanshaj.garg@gmail.com</a><br/>🔗 <a href="https://www.linkedin.com/in/vanshajgargg">LinkedIn</a></td>
  </tr>
</table>
