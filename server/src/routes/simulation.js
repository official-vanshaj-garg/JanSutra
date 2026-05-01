const express = require('express');
const router = express.Router();
const { getSimulationSteps, validateStepOrder } = require('../engines/simulationEngine');

router.get('/', (req, res) => {
    const steps = getSimulationSteps();
    res.json({ steps });
});

router.post('/next', (req, res) => {
    const { currentStep, targetStep } = req.body;
    const validation = validateStepOrder(currentStep, targetStep);
    
    // If the steps themselves are unknown/invalid, return 400
    if (validation.message && validation.message.includes("Invalid simulation step")) {
        return res.status(400).json(validation);
    }
    
    res.json(validation);
});

module.exports = router;
