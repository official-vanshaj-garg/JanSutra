const express = require('express');
const router = express.Router();
const { generateChecklist } = require('../engines/checklistEngine');

router.post('/', (req, res) => {
    const checklist = generateChecklist(req.body || {});
    res.json({ checklist });
});

module.exports = router;
