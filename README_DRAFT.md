# JanSutra

*Thread your way through the election process.*

**Prompt Wars Challenge 2: Election Process Education**

## Overview
JanSutra is an interactive, India-first election process practice lab. It goes beyond a simple chatbot by offering a structured, personalized learning environment for citizens to understand registration, document requirements, polling day procedures, and EVM/VVPAT mechanics.

We designed JanSutra to be a serious, production-minded civic education product focusing on neutrality, accessibility, and authoritative verification.

## Core Features
- **JanPath:** A personalized election journey engine tailored to first-time voters, senior citizens, PwDs, and migrants.
- **Mock Booth Rehearsal:** A neutral, fictional simulation of polling day to demystify the EVM, VVPAT, and polling station procedures using dummy candidates.
- **SatyaCheck:** A robust guardrail system that actively classifies intents and refuses political persuasion, candidate recommendations, and sensitive data requests.
- **Sahaj Mode:** An accessibility-first simple mode with clear contrast, large text, and semantic structure.
- **Official Verification Panel:** Always redirects users to authoritative Election Commission sources for checking voter rolls and deadlines.

## The Approach and Logic
Elections are sensitive. Our logic is built on **Education over Prediction** and **Neutrality over Engagement**.
- We use a small local JSON knowledge base for core civic facts.
- The Gemini API is used strictly from the backend to generate personalized educational narratives and perform intent classification (SatyaCheck).
- We do not store any PII, nor do we require a database.
- We deliberately avoid displaying real political parties or candidates in our simulations to maintain absolute neutrality.

## Assumptions
- Users have basic internet connectivity.
- Users are looking for procedural guidance, not live election results or political advice.
- Official ECI portals remain the ultimate source of truth for dynamic deadlines.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- AI: Gemini API
- Deployment: Google Cloud Run

## Documentation
Please review the `docs/` folder for comprehensive planning, architecture, and testing details:
- [Evaluation Mapping](docs/EVALUATION_MAPPING.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Security & Neutrality](docs/SECURITY_AND_NEUTRALITY.md)
- [Accessibility Plan](docs/ACCESSIBILITY_PLAN.md)
- [Testing Plan](docs/TESTING_PLAN.md)
- [Google Services Usage](docs/GOOGLE_SERVICES.md)
