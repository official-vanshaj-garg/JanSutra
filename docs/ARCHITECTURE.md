# Architecture

JanSutra uses a lightweight, decoupled Client-Server architecture optimized for speed, neutrality, and security.

## Folder Structure

```text
JanSutra/
├── client/                  # React + Vite Application
│   ├── src/
│   │   ├── components/      # UI Components (JanPath, MockBooth, SahajMode)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client to interface with server
│   │   ├── App.jsx
│   │   └── index.css        # Vanilla CSS, Tailwind, or standard CSS variables
│   └── package.json
├── server/                  # Node.js + Express Server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Rate limiting, error handling, validation
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Gemini API integration & SatyaCheck logic
│   │   └── app.js           # Express app setup
│   ├── data/                # Local JSON Knowledge Base
│   │   └── knowledge.json   # Base civic rules & election facts
│   ├── tests/               # Unit and integration tests
│   └── package.json
├── tests/                   # Shared/core tests if needed
├── docs/                    # Planning and architecture documentation
├── Dockerfile               # Unified Cloud Run deployment
└── README.md                # Main project documentation
```

## Data Flow
1. **User Input:** User interacts with the React client (e.g., answering JanPath onboarding questions).
2. **API Request:** Client sends a sanitized JSON payload to the Express server.
3. **SatyaCheck Interception:** Server middleware validates the request and checks for sensitive/political intents.
4. **Gemini Processing:** If valid, the server securely constructs a prompt appending the local `knowledge.json` context and system instructions. It calls the Gemini API via the Node.js SDK.
5. **Response Formatting:** Gemini returns structured data (JSON). The server strips any remaining unsafe content, packages it with official links, and sends it back to the client.
6. **UI Rendering:** Client displays the personalized journey, Mock Booth step, or verification panel.

## Deployment Strategy
The production build of the Vite React frontend in `client/` will be served statically by the Express backend in `server/`. The entire application will be containerized using a single root-level Dockerfile and deployed as one unified service to Google Cloud Run.

## Safe Usage of Gemini API
- **Server Only:** The `GEMINI_API_KEY` is strictly stored as an environment variable in the server. The client never communicates with Google's APIs directly.
- **System Prompting:** Gemini is wrapped in rigid system prompts forcing it to adopt a neutral, educational persona.
- **Structured Output:** We enforce `response_mime_type: "application/json"` to ensure the AI output maps exactly to our UI components.
