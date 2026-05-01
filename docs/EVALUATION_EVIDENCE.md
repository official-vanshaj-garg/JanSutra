# Evaluation Evidence Mapping

This document maps the 6 Hack2Skill judging metrics to specific code and architectural decisions in JanSutra.

### 1. Code Quality
- **Clear Separation of Concerns**: React frontend components (`client/src/components/`) are purely presentational/stateless where possible. Backend logic is separated into Express routes (`server/src/routes/`) and deterministic engines (`server/src/engines/`).
- **Middleware Integration**: Express utilizes `helmet` (security headers) and `compression` (gzip) for modern code quality standards.
- **Robust Error Handling**: `<ErrorBoundary>` protects the React component tree from runtime crashes.

### 2. Security
- **Data Privacy**: The deterministic `neutralityEngine.js` explicitly intercepts and blocks Sensitive Personal Information (PII) including Voter IDs, Aadhaar numbers, and phone numbers before they can be sent to Google Gemini.
- **Hardened Neutrality**: SatyaCheck acts as a strict firewall. All Gemini output is also validated post-generation to ensure no political persuasion or candidate recommendations leak through.
- **API Protection**: `rateLimiter.js` prevents DDoS/abuse. `validateInput.js` enforces strict length limits. `sanitizers.js` drops unexpected context fields. Secrets are handled via Secret Manager.

### 3. Efficiency
- **Lightweight Architecture**: JanSutra uses localized deterministic state arrays rather than heavy database lookups (Firestore), allowing instant context generation.
- **Optimized Payloads**: Express uses the `compression` middleware to gzip responses.
- **Static Caching**: Production React assets are served with `maxAge: '1d'` caching headers.
- **Automated Fallbacks**: The Gemini integration employs a fast 500ms retry block for 503 errors and cross-switches models to prevent hanging connections.

### 4. Testing
- **Comprehensive Coverage**: **54/54 automated tests** via `Vitest` and `Supertest`.
- **API Integration Tests**: `api.test.js` guarantees all routes return correct HTTP status codes and valid schemas.
- **Security & Hardening**: `security.test.js` verifies rate limits, context sanitization, and step validation.
- **CI/CD Pipeline**: A GitHub Actions workflow (`ci.yml`) executes the full `npm run verify` suite (Lint + Test + Build) on every push to `main`.

### 5. Accessibility
- **Sahaj Mode**: A dedicated toggle dynamically adjusts contrast, font weight, and structural layout to support visual impairments.
- **Inclusive Design**: The deterministic `journeyEngine.js` adapts its outputs specifically for Senior Citizens and Persons with Disabilities (PwD), promoting inclusive civic participation (e.g., Form 12D Home Voting).

### 6. Google Services
- **Gemini 2.5 Flash / Lite Integration**: Successfully implements Google's advanced language models for the core educational engine.
- **Graceful Degradation**: Features a fully functioning fallback loop so the application remains robust even during Google GenAI SDK rate limits or service unavailability.
- **System Instructions**: The Gemini SDK leverages strict `systemInstructions` and `responseSchema` configurations for deterministic JSON output.

### 7. Problem Statement Alignment
- Delivers an **India-first**, fully secure election literacy lab designed to eliminate misinformation while maintaining complete non-partisanship and privacy.
