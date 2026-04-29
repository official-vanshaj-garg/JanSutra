const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
let ai = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

const SYSTEM_INSTRUCTION = `
You are JanSutra, a neutral election process education assistant.
You are not an official election authority.
Never recommend a party or candidate.
Never persuade political choice.
Never provide final live deadlines, eligibility, polling booth, or candidate information.
For live or location-specific election details, instruct users to verify through official election authority portals.
Keep answers simple, accessible, and step-by-step.
Use India-first civic education language, but stay neutral and inclusive.
`;

async function generateExplanation(context, question) {
    if (!ai) {
        return {
            answer: "JanSutra is currently operating in offline deterministic mode. To get an AI-generated explanation, an API key is required. Please refer to our static official links for guidance.",
            safetyCategory: "fallback",
            usedFallback: true,
            officialVerificationRequired: true
        };
    }

    const prompt = `
User Context: ${JSON.stringify(context || {})}
User Question: ${question}

Provide an educational explanation based on the system instructions.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        answer: { type: "STRING" },
                        safetyCategory: { type: "STRING" },
                        officialVerificationRequired: { type: "BOOLEAN" }
                    },
                    required: ["answer", "safetyCategory", "officialVerificationRequired"]
                }
            }
        });

        const result = JSON.parse(response.text);
        return {
            ...result,
            usedFallback: false
        };
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        return {
            answer: "JanSutra is currently experiencing high load. Please refer to the official Election Commission portals for guidance.",
            safetyCategory: "error_fallback",
            usedFallback: true,
            officialVerificationRequired: true
        };
    }
}

module.exports = { generateExplanation };
