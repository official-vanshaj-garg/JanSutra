const express = require('express');
const router = express.Router();
const { analyzeIntent } = require('../engines/neutralityEngine');

router.post('/', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    const result = analyzeIntent(query);
    res.json(result);
});

module.exports = router;
