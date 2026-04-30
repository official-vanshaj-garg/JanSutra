const express = require('express');
const router = express.Router();
const { generateJourney } = require('../engines/journeyEngine');

const { logEvent } = require('../services/telemetryService');

router.post('/', (req, res) => {
    const context = req.body.context || req.body || {};
    const journey = generateJourney(context);
    
    logEvent('path_generated', {
        persona: {
            firstTime: !!context.isFirstTimeVoter,
            senior: !!context.isSeniorCitizen,
            pwd: !!context.isPwD
        }
    });
    
    res.json({ journey });
});

module.exports = router;
