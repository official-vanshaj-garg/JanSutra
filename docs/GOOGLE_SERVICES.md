# JanSutra: Google Services Integration

JanSutra maximizes the Hack2Skill **Google Services** evaluation metric by deeply integrating an array of Cloud and AI technologies.

### 1. Google Gemini AI Engine
- **Service**: `@google/genai` (Gemini 2.5 Flash / Lite)
- **Role**: Powers the *Ask JanSutra* assistant.
- **Implementation**: Strictly backend-only. The API heavily restricts Gemini using strict `systemInstruction` arrays and deterministic `responseSchema` validation.
- **Resilience**: Features automatic 503 retry mechanisms and gracefully falls back to deterministic local educational answers if the API is offline.

### 2. Google Cloud Run (Serverless App)
- **Service**: Google Cloud Run
- **Role**: Primary application hosting.
- **Implementation**: Deploys the unified React (Vite) and Express application inside a single highly-optimized container, ensuring instant scaling from zero and eliminating cold-boot lag.

### 3. Google Secret Manager
- **Service**: Google Cloud Secret Manager
- **Role**: Secure credential handling.
- **Implementation**: JanSutra's `GEMINI_API_KEY` is completely hidden from version control and local configurations in production. Cloud Run mounts the key securely at runtime via Secret Manager bindings. See [Secret Manager Deployment](./SECRET_MANAGER_DEPLOYMENT.md) for setup details.

### 4. Firestore Anonymous Telemetry (Civic Trust Layer)
- **Service**: Google Cloud Firestore (`@google-cloud/firestore`)
- **Role**: Ethical, anonymous usage metrics tracking.
- **Implementation**: 
  - Uses a strict **fire-and-forget** architecture so the application never hangs if the database goes down.
  - **Opt-in Only**: Must be manually enabled via `TELEMETRY_ENABLED=true`.
  - **Zero PII**: Explicitly drops raw text inputs and personal identifiable information. Only logs abstract categorical metadata (e.g., `firstTimeVoter`, `satyacheck_blocked`).

### 5. Structured Cloud Logging
- **Service**: Google Cloud Logging
- **Role**: Production auditing.
- **Implementation**: Output streams strictly sanitized JSON structures (e.g., `{"event":"satyacheck_blocked", "category":"political_persuasion"}`). This enables robust Cloud Logging dashboards to instantly flag neutrality breaches or fallback spikes.

### 6. Google Antigravity (Agentic AI)
- JanSutra was conceptualized, built, tested, and audited alongside the **Google Deepmind Antigravity Agent**.
