# Evaluation Mapping

This document maps the Prompt Wars Challenge 2 evaluation criteria to specific features, planned files, and proof points within JanSutra.

| Evaluation Area | Addressed By Feature | Planned Files / Implementation | Proof Points |
| :--- | :--- | :--- | :--- |
| **1. Code Quality** | Modular React components, clean Express routes, separated business logic. | `client/src/components/*`, `server/src/routes/*`, `server/src/services/*` | Linter rules applied, consistent formatting, strict TypeScript/Prop-types, small function sizes, comprehensive README. |
| **2. Security** | Environment variables, server-only API calls, rate limiting, SatyaCheck guardrails. | `server/.env.example`, `server/src/middleware/rateLimit.js`, `server/src/services/geminiService.js` | No API keys in client, `SatyaCheck` prompt injection guardrails, no sensitive voter data stored. |
| **3. Efficiency** | Minimal stack, local JSON knowledge base, no heavy DB, static asset optimization. | `server/data/knowledge.json`, `client/vite.config.js` | Sub-10MB repository size, fast initial load times, low latency responses from server API. |
| **4. Testing** | Comprehensive unit testing for core logic, journeys, and security guardrails. | `server/tests/timeline.test.js`, `server/tests/neutrality.test.js` | High test coverage for `SatyaCheck` refusal rules, `JanPath` permutations, and `Mock Booth` logic. |
| **5. Accessibility** | **Sahaj Mode**, semantic HTML, keyboard navigation, ARIA attributes. | `client/src/components/SahajMode/*`, `client/index.css` | High Lighthouse Accessibility score, usable without mouse, clear contrast ratios, simplified copy. |
| **6. Google Services** | Gemini API (Server), Cloud Run deployment, Antigravity IDE usage, optional Civic Info API. | `Dockerfile`, `server/src/services/geminiService.js`, `docs/GOOGLE_SERVICES.md` | Active Cloud Run URL, structured JSON output from Gemini via system instructions. |
