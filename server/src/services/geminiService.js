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

const { MAX_GEMINI_PROMPT_CHARS } = require('../constants/appConstants');
const { sanitizeUserContext, sanitizeErrorMessage } = require('../utils/sanitizers');
const { analyzeIntent } = require('../engines/neutralityEngine');

async function generateExplanation(context, question) {
    if (!ai) {
        return {
            answer: getDeterministicFallback(question),
            safetyCategory: "fallback",
            usedFallback: true,
            officialVerificationRequired: true
        };
    }

    const sanitizedContext = sanitizeUserContext(context);
    const configuredModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const fallbackModel = configuredModel === 'gemini-2.5-flash-lite' ? 'gemini-2.5-flash' : 'gemini-2.5-flash-lite';

    // Harden prompt with clear delimiters to prevent context bleeding
    const prompt = `
=== SYSTEM INSTRUCTION ===
${SYSTEM_INSTRUCTION}

=== USER CONTEXT ===
${JSON.stringify(sanitizedContext)}

=== USER QUESTION ===
${question}

=== OUTPUT FORMAT ===
Provide an educational explanation in the requested JSON schema.
`;

    if (prompt.length > MAX_GEMINI_PROMPT_CHARS) {
        console.warn("Prompt length exceeded limit, falling back to deterministic response.");
        return {
            answer: getDeterministicFallback(question),
            safetyCategory: "prompt_too_large",
            usedFallback: true,
            officialVerificationRequired: true
        };
    }

    const getModelOptions = (modelName) => ({
        model: modelName,
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

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let response = null;
    let success = false;

    try {
        try {
            response = await ai.models.generateContent(getModelOptions(configuredModel));
            success = true;
        } catch (initialError) {
            const safeCategory = sanitizeErrorMessage(initialError);
            console.warn(`Gemini Error [${safeCategory}] on ${configuredModel}`);
            
            if (safeCategory === 'unavailable' || safeCategory === 'rate_or_quota') {
                await delay(500);
                try {
                    response = await ai.models.generateContent(getModelOptions(configuredModel));
                    success = true;
                } catch (_retryError) {
                    console.warn(`Retry failed for ${configuredModel}`);
                }
            }
        }

        if (!success) {
            try {
                response = await ai.models.generateContent(getModelOptions(fallbackModel));
                success = true;
            } catch (fallbackError) {
                console.warn(`Fallback model ${fallbackModel} failed: ${sanitizeErrorMessage(fallbackError)}`);
            }
        }

        if (success && response) {
            const result = JSON.parse(response.text);
            
            // Post-Generation Safety Validation
            // Run the answer through SatyaCheck logic to ensure AI didn't hallucinate unsafe content
            const safetyAudit = analyzeIntent(result.answer);
            if (!safetyAudit.safe) {
                console.warn(`AI hallucinated unsafe content [${safetyAudit.intent}]. Triggering fallback.`);
                return {
                    answer: getDeterministicFallback(question),
                    safetyCategory: "hallucination_blocked",
                    usedFallback: true,
                    officialVerificationRequired: true
                };
            }

            return {
                ...result,
                usedFallback: false
            };
        } else {
            throw new Error("Both primary and fallback models failed");
        }
    } catch (error) {
        console.error(`AI Service Exhausted: ${sanitizeErrorMessage(error)}`);
        return {
            answer: getDeterministicFallback(question),
            safetyCategory: "educational_fallback",
            usedFallback: true,
            officialVerificationRequired: true
        };
    }
}

function getDeterministicFallback(question) {
    const q = question.toLowerCase();
    
    if (q.includes('vvpat')) {
        return "VVPAT stands for Voter Verifiable Paper Audit Trail. It helps voters briefly verify that their selected choice was recorded as intended. JanSutra explains the process for education only; always verify official instructions through Election Commission portals.";
    }
    if (q.includes('evm')) {
        return "EVM stands for Electronic Voting Machine. It consists of a Control Unit and a Balloting Unit. Voters press the button next to their chosen candidate's symbol. Always verify official instructions through Election Commission portals.";
    }
    if (q.includes('voter id') || q.includes('epic')) {
        return "A Voter ID, or EPIC (Electors Photo Identity Card), is an official document issued by the Election Commission to eligible voters. You must carry it or an approved alternate ID to the polling booth.";
    }
    if (q.includes('voter list')) {
        return "The electoral roll, or voter list, is the official list of registered voters. You can only vote if your name is on this list. You can check your status on the official Voter's Service Portal.";
    }
    if (q.includes('documents')) {
        return "While the Voter ID (EPIC) is standard, the Election Commission usually allows several alternate photo IDs (like Aadhaar, PAN card, Passport). Please check the official EC guidelines for the exact list of approved documents.";
    }
    if (q.includes('polling booth')) {
        return "Your polling booth is the designated location where you cast your vote. You can find your specific polling station details by searching the official Voter's Service Portal with your EPIC number.";
    }
    if (q.includes('political party') || q.includes('party in election') || (q.includes('explain') && q.includes('part'))) {
        return "A political party is an organization of people with shared ideas or policy goals that contests elections and may form a government if elected. JanSutra does not recommend any party or candidate; it only explains the election process and encourages users to verify official information.";
    }
    if (q.includes('registration') || q.includes('register')) {
        return "To register to vote, eligible citizens usually need to submit Form 6. This can be done online through the official Voter's Service Portal or offline via your local Booth Level Officer (BLO).";
    }
    if (q.includes('counting') || q.includes('results')) {
        return "After voting concludes, EVMs are sealed and securely stored until Counting Day. Results are declared by the Election Commission and can be tracked live on their official results portal.";
    }
    if (q.includes('nota')) {
        return "NOTA stands for 'None of the Above'. It is an option on the EVM that allows voters to officially reject all contesting candidates in their constituency.";
    }
    
    return "JanSutra provides educational guidance on the election process. For live updates, verification, and personalized eligibility, please consult the official Election Commission portals.";
}

module.exports = { generateExplanation };
