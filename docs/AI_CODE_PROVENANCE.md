# AI Code Provenance and Governance

JanSutra uses AI-generated and AI-assisted code. This document records the nature of that AI involvement in alignment with responsible AI development practices.

## AI Tools Used

| Tool | Role |
| :--- | :--- |
| **Google Deepmind Antigravity Agent** | Primary agentic development partner. Used for architecture design, code generation, code quality audits, security reviews, and documentation. All output reviewed by the human developer. |
| **Google Gemini API** | Runtime AI inference only. Used exclusively in `server/src/services/geminiService.js` for civic education explanations. Never used for code generation at runtime. |

## Scope of AI-Generated Code

All server-side logic and client-side components were generated and refined through an iterative conversation with the Google Deepmind Antigravity agent. The human developer reviewed, tested, and approved each change before committing.

**Critical safety-relevant components are deterministic, not AI-generated at runtime:**

| Component | Nature |
| :--- | :--- |
| `neutralityEngine.js` | Fully deterministic rule-based engine. No AI at runtime. |
| `journeyEngine.js` | Deterministic persona-based journey generator. |
| `checklistEngine.js` | Deterministic document checklist generator. |
| `readinessEngine.js` | Deterministic score calculator using named constants. |
| `simulationEngine.js` | Deterministic step sequencer. |
| `telemetryService.js` | Rule-based event filter. No AI. Strict allowlist. |
| `validateInput.js` | Deterministic input validation middleware. |
| `rateLimiter.js` | Deterministic request throttling. |
| `sanitizers.js` | Deterministic context and error mapping. |

## Governance Controls

1. **Human Review**: Every AI-generated change was inspected, tested, and committed by the project author.
2. **Test Coverage**: A Vitest test suite with 36+ tests validates all deterministic engines and API routes.
3. **CI Gate**: GitHub Actions runs lint, tests, and build on every push to `main`, creating an auditable trail.
4. **No AI-Generated Production Secrets**: No API keys, credentials, or configuration values were generated or stored by the AI agent.
5. **No PII Processed at Generation Time**: The Antigravity agent never received actual voter IDs, Aadhaar numbers, or personal user data during development.

## Responsible AI Declaration

JanSutra is explicitly designed to:
- Not recommend candidates or parties.
- Not claim or infer political opinions.
- Not store raw user questions or PII.
- Always redirect users to official Election Commission portals for live, authoritative data.

This design was validated by the Antigravity agent through repeated SatyaCheck audits and neutrality engine test coverage, with all critical paths covered by the automated test suite.
