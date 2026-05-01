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
| **API Abuse / Rate Limiting** | Security | `rateLimiter.js` implements a 200 req/15min general limit and a 50 req/15min strict limit for AI. Body limits are set to `16kb`. |
| **Context Bleeding / Injection** | Security | `sanitizers.js` drops unwhitelisted context fields. `geminiService.js` uses strict delimiters and enforces a `2000` char max prompt length. |
| **AI Hallucination / Escape** | Safety | `geminiService.js` runs a post-generation safety audit on all AI answers using `neutralityEngine.js` before returning to client. |
| **Server Resource Exhaustion** | Reliability | `server.js` enforces 30s request timeouts and 31s header timeouts to prevent hung connections. |
| **Container Compromise** | Infrastructure | `Dockerfile` runs the production runtime as a non-root `node` user to limit blast radius. |
| **Safe Error Disclosure** | Privacy | `errorHandler.js` and `sanitizers.js` map all errors to safe categories, hiding stack traces and API secrets. |

## Residual Risks

- **Gemini AI Hallucination**: Mitigated by system instruction constraints, the `hallucination_blocked` post-generation audit, and the `officialVerificationRequired` flag.
- **Indirect PII Exposure**: Mitigated by pre-Gemini PII regex, 500-char query limits, and 2000-char total prompt limits.

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
