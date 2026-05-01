const express = require('express');
const router = express.Router();
const { analyzeIntent } = require('../engines/neutralityEngine');
const { logEvent } = require('../services/telemetryService');
const { validateTextInput } = require('../middleware/validateInput');

router.post('/', validateTextInput('query'), (req, res, next) => {
    try {
        const { query } = req.body;
        const result = analyzeIntent(query);

        if (!result.safe) {
            logEvent('satyacheck_blocked', { category: result.intent });
        }

        res.json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
