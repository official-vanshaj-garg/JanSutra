# JanSutra API Contract

## Core Endpoints

### `GET /api/health`
- **Purpose**: Server health check.
- **Request**: None.
- **Response (200 OK)**:
  ```json
  { "status": "ok", "timestamp": "ISO-8601" }
  ```

### `POST /api/journey`
- **Purpose**: Generates a personalized voter timeline based on user context.
- **Request Body**:
  ```json
  {
    "context": {
      "isFirstTimeVoter": true,
      "isSeniorCitizen": false,
      "isPwD": false
    }
  }
  ```
- **Response (200 OK)**:
  ```json
  [
    { "title": "Check Eligibility", "description": "Ensure you are 18+..." },
    ...
  ]
  ```

### `POST /api/checklist`
- **Purpose**: Generates a personalized preparation checklist.
- **Request Body**: `{"context": { ... }}`
- **Response (200 OK)**:
  ```json
  [ "Valid ID (Aadhaar/PAN/Passport)", "EPIC Card" ]
  ```

### `POST /api/readiness`
- **Purpose**: Calculates the deterministic Civic Learning Readiness score.
- **Request Body**:
  ```json
  {
    "context": { ... },
    "journeyLength": 5,
    "checklistLength": 3
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "score": 60,
    "completed": ["Initiated JanPath Wizard", ...],
    "remaining": ["Verify Form 6 registration status", ...]
  }
  ```

### `POST /api/satya-check`
- **Purpose**: Local deterministic neutrality and PII validation engine.
- **Request Body**: `{"query": "User question"}` *(max 500 chars)*
- **Response (200 OK)**:
  ```json
  {
    "safe": false,
    "intent": "political_persuasion",
    "message": "JanSutra cannot provide political commentary..."
  }
  ```

### `POST /api/assistant/explain`
- **Purpose**: Requests an AI-generated educational explanation using Gemini, with deterministic safety layers.
- **Request Body**:
  ```json
  {
    "question": "How does VVPAT work?",
    "context": { ... }
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "answer": "VVPAT stands for Voter Verifiable Paper Audit Trail...",
    "safetyCategory": "educational_fallback",
    "usedFallback": true,
    "officialVerificationRequired": true
  }
  ```

### `GET /api/official-links`
- **Purpose**: Fetches static official Election Commission links.
- **Request**: None.
- **Response (200 OK)**:
  ```json
  [
    { "title": "Voter Portal", "url": "https://voters.eci.gov.in" },
    ...
  ]
  ```
