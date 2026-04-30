# Evaluation Evidence Mapping

This document maps the 6 Hack2Skill judging metrics to specific code and architectural decisions in JanSutra.

### 1. Code Quality
- **Clear Separation of Concerns**: React frontend components (`client/src/components/`) are purely presentational/stateless where possible. Backend logic is separated into Express routes (`server/src/routes/`) and deterministic engines (`server/src/engines/`).
- **Middleware Integration**: Express utilizes `helmet` (security headers) and `compression` (gzip) for modern code quality standards.
- **Robust Error Handling**: `<ErrorBoundary>` protects the React component tree from runtime crashes.

### 2. Security
- **Data Privacy**: The deterministic `neutralityEngine.js` explicitly intercepts and blocks Sensitive Personal Information (PII) including Voter IDs, Aadhaar numbers, and phone numbers before they can be sent to Google Gemini.
- **Political Neutrality**: SatyaCheck acts as a strict firewall blocking candidate recommendations and political persuasion.
- **API Protection**: `helmet` prevents XSS and clickjacking. `express.json` is limited to 16kb, and endpoints enforce 500-character input limits. Secrets are managed securely via `dotenv` and strictly `.gitignore`d.

### 3. Efficiency
- **Lightweight Architecture**: JanSutra uses localized deterministic state arrays rather than heavy database lookups (Firestore), allowing instant context generation.
- **Optimized Payloads**: Express uses the `compression` middleware to gzip responses.
- **Static Caching**: Production React assets are served with `maxAge: '1d'` caching headers.
- **Automated Fallbacks**: The Gemini integration employs a fast 500ms retry block for 503 errors and cross-switches models to prevent hanging connections.

### 4. Testing
- **Comprehensive Coverage**: 24+ automated tests via `Vitest` and `Supertest`.
- **API Integration Tests**: `api.test.js` guarantees all routes return correct HTTP status codes and valid schemas.
- **CI/CD Pipeline**: A GitHub Actions workflow (`.github/workflows/ci.yml`) automatically builds the client, installs server dependencies, and executes the test suite on every push/PR.

### 5. Accessibility
- **Sahaj Mode**: A dedicated toggle dynamically adjusts contrast, font weight, and structural layout to support visual impairments.
- **Inclusive Design**: The deterministic `journeyEngine.js` adapts its outputs specifically for Senior Citizens and Persons with Disabilities (PwD), promoting inclusive civic participation (e.g., Form 12D Home Voting).

### 6. Google Services
- **Gemini 2.5 Flash / Lite Integration**: Successfully implements Google's advanced language models for the core educational engine.
- **Graceful Degradation**: Features a fully functioning fallback loop so the application remains robust even during Google GenAI SDK rate limits or service unavailability.
- **System Instructions**: The Gemini SDK leverages strict `systemInstructions` and `responseSchema` configurations for deterministic JSON output.

### 7. Problem Statement Alignment
- Delivers an **India-first**, fully secure election literacy lab designed to eliminate misinformation while maintaining complete non-partisanship and privacy.
