const express = require('express');
const cors = require('cors');
const path = require('path');

const healthRoute = require('./routes/health');
const journeyRoute = require('./routes/journey');
const checklistRoute = require('./routes/checklist');
const satyaCheckRoute = require('./routes/satyaCheck');
const simulationRoute = require('./routes/simulation');
const officialLinksRoute = require('./routes/officialLinks');
const assistantRoute = require('./routes/assistant');
const readinessRoute = require('./routes/readiness');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/health', healthRoute);
app.use('/api/journey', journeyRoute);
app.use('/api/checklist', checklistRoute);
app.use('/api/satya-check', satyaCheckRoute);
app.use('/api/simulation', simulationRoute);
app.use('/api/official-links', officialLinksRoute);
app.use('/api/assistant', assistantRoute);
app.use('/api/readiness', readinessRoute);

// Serve Static React App in Production
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve index.html for React Router (if needed) and direct links
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
