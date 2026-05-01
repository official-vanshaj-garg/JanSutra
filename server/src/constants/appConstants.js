/**
 * Application-wide constants for JanSutra server.
 * Centralizing these values eliminates magic numbers and ensures
 * consistent configuration across routes, middleware, and engines.
 */

// Security and Prompt Limits
const MAX_QUERY_LENGTH = 500;
const MAX_GEMINI_PROMPT_CHARS = 2000;

// Rate Limits
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_GENERAL_MAX = 200;
const RATE_LIMIT_ASSISTANT_MAX = 50;

// Server Timeouts
const SERVER_REQUEST_TIMEOUT_MS = 30000; // 30 seconds
const SERVER_HEADERS_TIMEOUT_MS = 31000;

// Express body parser
const JSON_BODY_LIMIT = '16kb';

// Static asset caching (1 day)
const STATIC_CACHE_MAX_AGE = '1d';

// Readiness score weights
const READINESS_JOURNEY_WEIGHT = 35;
const READINESS_CHECKLIST_WEIGHT = 35;
const READINESS_GENERAL_BONUS = 10;
const READINESS_SINGLE_NEED_PENALTY = -10;
const READINESS_SENIOR_PWD_PENALTY = -5;
const READINESS_MULTI_NEED_PENALTY = -15;

module.exports = {
    MAX_QUERY_LENGTH,
    MAX_GEMINI_PROMPT_CHARS,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_GENERAL_MAX,
    RATE_LIMIT_ASSISTANT_MAX,
    SERVER_REQUEST_TIMEOUT_MS,
    SERVER_HEADERS_TIMEOUT_MS,
    JSON_BODY_LIMIT,
    STATIC_CACHE_MAX_AGE,
    READINESS_JOURNEY_WEIGHT,
    READINESS_CHECKLIST_WEIGHT,
    READINESS_GENERAL_BONUS,
    READINESS_SINGLE_NEED_PENALTY,
    READINESS_SENIOR_PWD_PENALTY,
    READINESS_MULTI_NEED_PENALTY,
};
