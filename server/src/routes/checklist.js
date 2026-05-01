const express = require('express');
const router = express.Router();
const { generateChecklist } = require('../engines/checklistEngine');
const { sanitizeUserContext } = require('../utils/sanitizers');

router.post('/', (req, res, next) => {
    try {
        // Consistent context extraction: support both wrapped {context:{}} and flat {} payloads
        const rawContext = (req.body && req.body.context) || req.body || {};
        const userContext = sanitizeUserContext(rawContext);
        
        const checklist = generateChecklist(userContext);
        res.json({ checklist });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
