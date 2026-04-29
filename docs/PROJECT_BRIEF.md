# JanSutra: Project Brief

## Project Overview
**Project Name:** JanSutra
**Tagline:** Thread your way through the election process.

**Core Idea:**
JanSutra is an interactive, India-first election process practice lab designed to help users understand registration, voter list checking, documents, polling day steps, EVM/VVPAT basics, counting/results, and official verification. It provides personalized, neutral, accessible, and easy-to-follow civic education rather than functioning as a basic or conversational AI chatbot.

**Challenge Statement:**
Prompt Wars Challenge 2: Election Process Education.
Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

## Product Modules

1. **JanPath**
   A personalized election journey engine. It gathers user context (e.g., first-time voter status, student/future voter, senior citizen, person with disability, migrant/away-from-home voter, preferred language, help type) and generates a tailored, step-by-step election learning path.

2. **Mock Booth Rehearsal**
   A neutral, fictional, non-political simulation of polling day. It teaches the voting process using dummy candidates/symbols only. It explains the queue, identity verification, EVM/VVPAT mechanics, secret ballot, and verification from official sources.

3. **SatyaCheck**
   A misinformation and neutrality guard. It classifies user questions into defined categories (process education, timeline, official resource, political persuasion, candidate/party recommendation, sensitive personal data, unverified deadline claim) and actively refuses political persuasion while redirecting to neutral civic education.

4. **Sahaj Mode**
   An accessibility-first "simple mode" featuring larger text, short explanations, a keyboard-friendly UI, clear headings, semantic HTML, and simple Hindi/English-ready copy.

5. **Official Verification Panel**
   A dedicated panel pointing users to official election authority resources (like the ECI/Voters' Service Portal for India). It ensures users verify deadlines and polling details directly with authorities and never claims unofficial deadlines as final.

## Recommended Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **AI Integration:** Gemini API (accessed strictly from the server via `GEMINI_API_KEY`)
- **Knowledge Base:** Small local JSON knowledge base (no external database)
- **Deployment:** Google Cloud Run
- **Testing Framework:** Vitest/Jest (for timeline, checklist, simulation, and neutrality logic)
