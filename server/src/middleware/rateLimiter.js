const rateLimit = require('express-rate-limit');
const { 
    RATE_LIMIT_WINDOW_MS, 
    RATE_LIMIT_GENERAL_MAX, 
    RATE_LIMIT_ASSISTANT_MAX 
} = require('../constants/appConstants');

/**
 * General rate limiter for all API routes.
 */
const apiLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_GENERAL_MAX,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Stricter rate limiter specifically for AI assistant requests
 * to prevent API quota exhaustion and abuse.
 */
const assistantLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_ASSISTANT_MAX,
    message: { error: 'Daily assistant limit reached for your IP. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { apiLimiter, assistantLimiter };
