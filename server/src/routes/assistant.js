const express = require('express');
const router = express.Router();
const { analyzeIntent } = require('../engines/neutralityEngine');
const { generateExplanation } = require('../services/geminiService');

router.post('/explain', async (req, res) => {
    const { context, question } = req.body;
    
    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }
    if (question.length > 500) {
        return res.status(400).json({ error: 'Question exceeds maximum allowed length of 500 characters' });
    }

    // Layer 1: Deterministic check
    const intentResult = analyzeIntent(question);
    
    if (!intentResult.safe) {
        return res.json({
            answer: intentResult.message,
            safetyCategory: intentResult.intent,
            usedFallback: true,
            officialVerificationRequired: true
        });
    }

    // Layer 2: Gemini Generation
    const explanation = await generateExplanation(context, question);
    
    res.json(explanation);
});

module.exports = router;
