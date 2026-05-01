# JanSutra Threat Model

JanSutra is a civic education assistant. While it intentionally avoids storing user data, it operates in a sensitive domain (elections, political neutrality) and must defend against specific threat categories.

## Threat Categories and Mitigations

| Threat | Category | Mitigation in JanSutra |
| :--- | :--- | :--- |
| **PII Leakage** | Privacy | `neutralityEngine.js` blocks voter ID, Aadhaar, EPIC, phone, and address inputs before any AI processing. Telemetry strictly reconstructs metadata without raw strings. |
| **Political Persuasion via AI** | Safety | SatyaCheck (`neutralityEngine.js`) intercepts political persuasion and candidate recommendations deterministically, before any Gemini call. The Gemini `systemInstruction` array also prohibits political outputs. |
| **Prompt Injection** | Security | The system instruction is server-side only. No user-supplied text is interpolated into the system prompt itself. User questions are passed as `content`, not as system role context. |
| **Gemini Outage / Rate Limit** | Resilience | `geminiService.js` implements a 500ms retry for 503/429 errors, cascading model fallback (Flash → Lite), and a final deterministic local educational fallback. The app remains fully functional offline. |
| **Firestore Telemetry Abuse** | Privacy | `telemetryService.js` enforces an explicit event allowlist and a strict typed per-field metadata reconstruction. No free-text strings can enter Firestore. |
| **Secret Exposure** | Security | `GEMINI_API_KEY` is loaded via `dotenv` locally (gitignored) and via Google Secret Manager in production. The key is never logged. `server/.env` is excluded in `.gitignore` with `!.env.example` exception. |
| **API Abuse / Oversized Payloads** | Security/Efficiency | Express body limit set to `16kb` (from `appConstants.js`). `validateInput.js` middleware limits query/question fields to `500` characters, returning structured `400` responses. |
| **API Endpoint Discovery** | Security | Any unknown `/api/*` route returns a structured JSON `404` (not `index.html`). This prevents confusion and potential path traversal probing. |
| **Deployment Failure** | Reliability | CI pipeline runs lint, tests, and build on every push to `main`. Dockerfile uses multi-stage build. Cloud Run provides automatic rollback on failed deployments. |

## Residual Risks

- **Gemini AI Hallucination**: Mitigated by system instruction constraints and the `officialVerificationRequired` flag in all AI responses. The UI always prompts users to verify with official EC portals.
- **Indirect PII Exposure**: If a user asks a question that incidentally contains PII but does not match the regex pattern, the text is sent to Gemini (not stored). Mitigated by Gemini's own safety filters and the 500-character input limit.

## Key Security Files

| File | Role |
| :--- | :--- |
| `server/src/engines/neutralityEngine.js` | Deterministic PII and political persuasion blocking |
| `server/src/middleware/validateInput.js` | Input length enforcement |
| `server/src/middleware/errorHandler.js` | Structured error responses (no stack trace exposure) |
| `server/src/middleware/notFoundHandler.js` | API 404 JSON guard |
| `server/src/services/telemetryService.js` | Privacy-safe event ingestion |
| `server/src/services/geminiService.js` | AI resilience and fallback |
| `docs/SECRET_MANAGER_DEPLOYMENT.md` | Production credential security runbook |
