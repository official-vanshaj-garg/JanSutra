const express = require('express');
const router = express.Router();
const { generateJourney } = require('../engines/journeyEngine');

router.post('/', (req, res) => {
    const journey = generateJourney(req.body || {});
    res.json({ journey });
});

module.exports = router;
