const express = require('express');
const router = express.Router();
const { analyzeIntent } = require('../engines/neutralityEngine');

router.post('/', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    if (query.length > 500) {
        return res.status(400).json({ error: 'Query exceeds maximum allowed length of 500 characters' });
    }
    const result = analyzeIntent(query);
    res.json(result);
});

module.exports = router;
