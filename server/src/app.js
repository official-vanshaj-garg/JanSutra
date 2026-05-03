const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');

const { JSON_BODY_LIMIT, STATIC_CACHE_MAX_AGE } = require('./constants/appConstants');
const { apiLimiter } = require('./middleware/rateLimiter');
const { notFoundHandler } = require('./middleware/notFoundHandler');
const { errorHandler } = require('./middleware/errorHandler');

const healthRoute = require('./routes/health');
const journeyRoute = require('./routes/journey');
const checklistRoute = require('./routes/checklist');
const satyaCheckRoute = require('./routes/satyaCheck');
const simulationRoute = require('./routes/simulation');
const officialLinksRoute = require('./routes/officialLinks');
const assistantRoute = require('./routes/assistant');
const readinessRoute = require('./routes/readiness');
const telemetryRoute = require('./routes/telemetry');

const app = express();

// Trust the first proxy (Cloud Run load balancer)
app.set('trust proxy', 1);

// Security and Efficiency Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            frameAncestors: ["'none'"],
            formAction: ["'self'"]
        }
    }
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: JSON_BODY_LIMIT }));

// Apply general rate limit to all API routes
app.use('/api', apiLimiter);

// API Routes
app.use('/api/health', healthRoute);
app.use('/api/journey', journeyRoute);
app.use('/api/checklist', checklistRoute);
app.use('/api/satya-check', satyaCheckRoute);
app.use('/api/simulation', simulationRoute);
app.use('/api/official-links', officialLinksRoute);
app.use('/api/assistant', assistantRoute);
app.use('/api/readiness', readinessRoute);
app.use('/api/telemetry', telemetryRoute);

// API 404: any /api/* path not matched above returns JSON (not index.html)
app.use('/api/{*path}', notFoundHandler);

// Serve Static React App in Production with caching
app.use(express.static(path.join(__dirname, '../public'), { maxAge: STATIC_CACHE_MAX_AGE }));

// Catch-all route to serve index.html for React Router (client-side routes)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Centralized error handler — must be last
app.use(errorHandler);

module.exports = app;
