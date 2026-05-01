/**
 * Application-wide constants for JanSutra server.
 * Centralizing these values eliminates magic numbers and ensures
 * consistent configuration across routes, middleware, and engines.
 */

// Input validation
const MAX_QUERY_LENGTH = 500;

// Express body parser
const JSON_BODY_LIMIT = '16kb';

// Static asset caching (1 day)
const STATIC_CACHE_MAX_AGE = '1d';

// Readiness score weights (must sum to 80 for base, adjustments apply after)
const READINESS_JOURNEY_WEIGHT = 35;
const READINESS_CHECKLIST_WEIGHT = 35;
const READINESS_GENERAL_BONUS = 10;
const READINESS_SINGLE_NEED_PENALTY = -10;
const READINESS_SENIOR_PWD_PENALTY = -5;
const READINESS_MULTI_NEED_PENALTY = -15;

module.exports = {
    MAX_QUERY_LENGTH,
    JSON_BODY_LIMIT,
    STATIC_CACHE_MAX_AGE,
    READINESS_JOURNEY_WEIGHT,
    READINESS_CHECKLIST_WEIGHT,
    READINESS_GENERAL_BONUS,
    READINESS_SINGLE_NEED_PENALTY,
    READINESS_SENIOR_PWD_PENALTY,
    READINESS_MULTI_NEED_PENALTY,
};
