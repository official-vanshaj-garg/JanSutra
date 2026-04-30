const express = require('express');
const router = express.Router();
const { calculateReadiness } = require('../engines/readinessEngine');
const { generateJourney } = require('../engines/journeyEngine');
const { generateChecklist } = require('../engines/checklistEngine');

router.post('/', (req, res) => {
    const userContext = req.body;
    
    // We calculate lengths dynamically to ensure data integrity
    const journey = generateJourney(userContext);
    const checklist = generateChecklist(userContext);

    const readiness = calculateReadiness(userContext, journey.length, checklist.length);
    res.json(readiness);
});

module.exports = router;
