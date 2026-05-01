const express = require('express');
const router = express.Router();
const { calculateReadiness } = require('../engines/readinessEngine');
const { generateJourney } = require('../engines/journeyEngine');
const { generateChecklist } = require('../engines/checklistEngine');

const { logEvent } = require('../services/telemetryService');
const { sanitizeUserContext } = require('../utils/sanitizers');

router.post('/', (req, res, next) => {
    try {
        const rawContext = (req.body && req.body.context) || req.body || {};
        const userContext = sanitizeUserContext(rawContext);
        
        // We calculate lengths dynamically to ensure data integrity
        const journey = generateJourney(userContext);
        const checklist = generateChecklist(userContext);

        const readiness = calculateReadiness(userContext, journey.length, checklist.length);
        
        const scoreBand = readiness.score >= 80 ? 'high' : (readiness.score >= 60 ? 'medium' : 'low');
        
        logEvent('readiness_generated', { scoreBand });
        
        res.json(readiness);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
