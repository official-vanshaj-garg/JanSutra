# JanSutra

JanSutra is a **neutral, educational platform** designed to demystify the Indian election process for first-time voters, senior citizens, and persons with disabilities. 

It provides an interactive **JanPath Wizard** to map out personalized voting journeys, a **Mock Booth** simulation, and an AI-powered **Assistant Panel** backed by Gemini, all safeguarded by a deterministic neutrality engine (SatyaCheck).

**Disclaimer:** JanSutra is an educational practice lab. It is NOT an official election authority. It does not provide final live election deadlines, constituency-specific polling booth locations, or candidate recommendations.

---

## 🎯 Chosen Vertical
**Voter Education and Engagement (Option B)**

## 🌟 What makes JanSutra different?
- **Not a generic chatbot**: JanSutra is a structured, interactive election literacy lab.
- **Deterministic-first civic learning**: The core timelines and checklists are generated safely without AI hallucinations.
- **Mock booth rehearsal**: Hands-on learning simulation using neutral dummy candidates.
- **SatyaCheck neutrality guardrail**: A transparent, dual-layer safety engine that blocks political recommendations and sensitive PII.
- **Sahaj accessibility mode**: A robust high-contrast, large-font UI built for elderly and visually impaired users.
- **Civic readiness score**: A gamified, deterministic percentage to track learning progress.
- **Official verification first**: Pushes users directly to Election Commission portals instead of guessing live data.

## 🧠 Approach & Logic
JanSutra is built with a **Deterministic-First** architecture. This ensures absolute neutrality and prevents the AI from generating political hallucinations.

1. **Layer 1 (Deterministic SatyaCheck)**: All inputs pass through a strict rule-based engine. If a query requests political persuasion, candidate recommendation, unverified deadlines, or sensitive personal data, it is immediately blocked with a hardcoded safe response.
2. **Layer 2 (Gemini Integration)**: If deemed safe, the context is passed to the Gemini API, heavily constrained by system instructions to act only as an educational explainer.

## ⚙️ How the Solution Works
1. **JanPath Wizard**: Users select their personas (e.g., First-Time Voter, Senior Citizen).
2. **Deterministic Engines**: The server generates an accessible, step-by-step Timeline and Preparation Checklist.
3. **Mock Booth**: Users practice the polling day flow using abstract dummy candidates (e.g., Candidate Apple 🍎, Candidate Sun ☀️).
4. **Ask JanSutra**: Users can ask the Gemini-powered assistant follow-up questions, which are heavily filtered.
5. **Sahaj Mode**: A one-click toggle for high-contrast, large-font readability.

## 🛠 Google Services Used
- **Google Gemini API**: Utilized via `@google/genai` to provide simple, natural-language explanations of complex polling steps.
- **Google Cloud Run**: The application is containerized into a single Docker image (Express serving static Vite React build) for serverless deployment on Google Cloud Run.

## 🛡️ Security & Neutrality Notes
- **Zero PII**: No database is used. The app does not ask for or store Voter ID numbers, names, or phone numbers.
- **No Political Entities**: No real Indian political parties, candidates, or symbols exist anywhere in the codebase.
- **No Client-Side Secrets**: The `GEMINI_API_KEY` is kept strictly on the Node.js server. The client only communicates with our backend wrapper.

## ♿ Accessibility Notes
- Fully semantic HTML (`fieldset`, `legend`, `main`).
- ARIA-labels on dynamic components (`aria-labelledby`, `aria-hidden`).
- "Sahaj Mode" specifically targets visually impaired and elderly users with an ultra-high contrast CSS variable override.
- Fully mobile responsive.

## 🧪 Testing Instructions
The server contains rigid unit tests to verify the deterministic engine and the Gemini fallback logic.
```bash
npm run test
# This runs the Vitest suite ensuring SatyaCheck intercepts unsafe queries.
```

## 💻 Local Run Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up environment variables:
   Create `server/.env` and add:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=3000
   ```
4. Start development environments:
   - Client: `cd client && npm run dev`
   - Server: `cd server && npm run dev`

## ☁️ Cloud Run Deployment Instructions
JanSutra is designed to be deployed as a single unified service. The provided `Dockerfile` builds the React frontend and configures the Express server to serve it statically.

1. Ensure you have the `gcloud` CLI installed and authenticated.
2. Set your Google Cloud project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Deploy directly using Cloud Run:
   ```bash
   gcloud run deploy jansutra \
     --source . \
     --region asia-south1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```
