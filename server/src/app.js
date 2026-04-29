const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');
const journeyRoute = require('./routes/journey');
const checklistRoute = require('./routes/checklist');
const satyaCheckRoute = require('./routes/satyaCheck');
const simulationRoute = require('./routes/simulation');
const officialLinksRoute = require('./routes/officialLinks');
const assistantRoute = require('./routes/assistant');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoute);
app.use('/api/journey', journeyRoute);
app.use('/api/checklist', checklistRoute);
app.use('/api/satya-check', satyaCheckRoute);
app.use('/api/simulation', simulationRoute);
app.use('/api/official-links', officialLinksRoute);
app.use('/api/assistant', assistantRoute);

module.exports = app;
