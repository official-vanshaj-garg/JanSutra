# Architecture

JanSutra uses a lightweight, decoupled Client-Server architecture optimized for speed, neutrality, and security.

## Folder Structure

```text
JanSutra/
├── frontend/                # React + Vite Application
│   ├── src/
│   │   ├── components/      # UI Components (JanPath, MockBooth, SahajMode)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client to interface with backend
│   │   ├── App.jsx
│   │   └── index.css        # Vanilla CSS, Tailwind, or standard CSS variables
│   └── package.json
├── backend/                 # Node.js + Express Server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Rate limiting, error handling, validation
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Gemini API integration & SatyaCheck logic
│   │   └── app.js           # Express app setup
│   ├── data/                # Local JSON Knowledge Base
│   │   └── knowledge.json   # Base civic rules & election facts
│   ├── tests/               # Unit and integration tests
│   ├── Dockerfile           # For Cloud Run deployment
│   └── package.json
├── docs/                    # Planning and architecture documentation
└── README.md                # Main project documentation
```

## Data Flow
1. **User Input:** User interacts with the React frontend (e.g., answering JanPath onboarding questions).
2. **API Request:** Frontend sends a sanitized JSON payload to the Express backend.
3. **SatyaCheck Interception:** Backend middleware validates the request and checks for sensitive/political intents.
4. **Gemini Processing:** If valid, the backend securely constructs a prompt appending the local `knowledge.json` context and system instructions. It calls the Gemini API via the Node.js SDK.
5. **Response Formatting:** Gemini returns structured data (JSON). The backend strips any remaining unsafe content, packages it with official links, and sends it back to the client.
6. **UI Rendering:** Frontend displays the personalized journey, Mock Booth step, or verification panel.

## Safe Usage of Gemini API
- **Backend Only:** The `GEMINI_API_KEY` is strictly stored as an environment variable in the backend. The frontend never communicates with Google's APIs directly.
- **System Prompting:** Gemini is wrapped in rigid system prompts forcing it to adopt a neutral, educational persona.
- **Structured Output:** We enforce `response_mime_type: "application/json"` to ensure the AI output maps exactly to our UI components.
