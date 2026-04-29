# Google Services Integration

JanSutra leverages Google Cloud and Developer tools to ensure scalability, security, and high-quality AI interactions.

1. **Google Antigravity:**
   - Used for the entire development lifecycle, enabling agentic coding, rapid prototyping of the React UI, and streamlined documentation generation.

2. **Gemini API:**
   - **Purpose:** Used via the Node.js SDK on the server to provide dynamic, personalized, and neutral explanations of civic processes.
   - **Safety:** Utilizes structured JSON output and rigorous system instructions to classify user intent (SatyaCheck) and prevent political bias.

3. **Google Cloud Run:**
   - **Purpose:** Serverless deployment of our containerized Node.js application.
   - **Benefits:** Ensures we can handle spikes in traffic during election seasons, provides secure HTTPS endpoints, and manages our environment variables securely without exposing them in the client.

4. **Google Civic Information API (Optional Context):**
   - While highly effective for U.S. use cases, JanSutra is designed with an India-first approach.
   - **Why we link directly to ECI:** For Indian elections, authoritative real-time voter roll data is tightly controlled by the Election Commission of India. Instead of pretending to have live official data, JanSutra focuses on *process education* and directs users to the official ECI/Voters' Service Portal for live verification, aligning with absolute neutrality and factual accuracy.
