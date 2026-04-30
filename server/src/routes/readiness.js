const express = require('express');
const router = express.Router();
const { calculateReadiness } = require('../engines/readinessEngine');
const { generateJourney } = require('../engines/journeyEngine');
const { generateChecklist } = require('../engines/checklistEngine');

const { logEvent } = require('../services/telemetryService');

router.post('/', (req, res) => {
    const userContext = req.body.context || req.body || {};
    
    // We calculate lengths dynamically to ensure data integrity
    const journey = generateJourney(userContext);
    const checklist = generateChecklist(userContext);

    const readiness = calculateReadiness(userContext, journey.length, checklist.length);
    
    const scoreBand = readiness.score >= 80 ? 'high' : (readiness.score >= 60 ? 'medium' : 'low');
    
    logEvent('readiness_generated', { scoreBand });
    
    res.json(readiness);
});

module.exports = router;
