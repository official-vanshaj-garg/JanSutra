const express = require('express');
const router = express.Router();
const { logEvent, ALLOWED_EVENTS } = require('../services/telemetryService');

router.post('/', (req, res) => {
    const { eventName, metadata } = req.body;
    
    if (!eventName || !ALLOWED_EVENTS.includes(eventName)) {
        return res.status(400).json({ error: 'Invalid or missing event name' });
    }
    
    // Whitelist client-side events to prevent abuse
    const CLIENT_ALLOWED_EVENTS = ['sahaj_mode_enabled', 'mock_booth_completed'];
    if (!CLIENT_ALLOWED_EVENTS.includes(eventName)) {
        return res.status(403).json({ error: 'Event not allowed from client' });
    }
    
    logEvent(eventName, metadata || {});
    
    res.json({ status: 'ok' });
});

module.exports = router;
