const express = require('express');
const router = express.Router();
const { analyzeIntent } = require('../engines/neutralityEngine');
const { generateExplanation } = require('../services/geminiService');
const { logEvent } = require('../services/telemetryService');
const { validateTextInput } = require('../middleware/validateInput');
const { assistantLimiter } = require('../middleware/rateLimiter');
const { sanitizeUserContext } = require('../utils/sanitizers');

router.post('/explain', assistantLimiter, validateTextInput('question'), async (req, res, next) => {
    try {
        const { context, question } = req.body;
        const sanitizedContext = sanitizeUserContext(context);

        // Layer 1: Deterministic neutrality check
        const intentResult = analyzeIntent(question);

        if (!intentResult.safe) {
            logEvent('satyacheck_blocked', { category: intentResult.intent });
            return res.json({
                answer: intentResult.message,
                safetyCategory: intentResult.intent,
                usedFallback: true,
                officialVerificationRequired: true
            });
        }

        // Layer 2: Gemini Generation with fallback
        const explanation = await generateExplanation(sanitizedContext, question);

        if (explanation.usedFallback) {
            logEvent('assistant_fallback_used', { source: explanation.safetyCategory || 'educational_fallback' });
        } else {
            logEvent('assistant_answered', { safe: true });
        }

        res.json(explanation);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
