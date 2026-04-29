const express = require('express');
const router = express.Router();
const officialLinks = require('../data/officialLinks.json');

router.get('/', (req, res) => {
    res.json(officialLinks);
});

module.exports = router;
