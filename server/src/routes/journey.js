const express = require('express');
const router = express.Router();
const { generateJourney } = require('../engines/journeyEngine');
const { logEvent } = require('../services/telemetryService');
const { sanitizeUserContext } = require('../utils/sanitizers');

router.post('/', (req, res, next) => {
    try {
        const rawContext = (req.body && req.body.context) || req.body || {};
        const context = sanitizeUserContext(rawContext);
        const journey = generateJourney(context);
        
        logEvent('path_generated', {
            persona: {
                firstTime: !!context.isFirstTimeVoter,
                senior: !!context.isSeniorCitizen,
                pwd: !!context.isPwD
            }
        });
        
        res.json({ journey });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
