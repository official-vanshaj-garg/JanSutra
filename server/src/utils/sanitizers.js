/**
 * Sanitizes user context to ensure only known, safe primitive fields
 * are passed to internal engines or external AI services.
 * Drops any unexpected or nested objects to prevent prompt injection 
 * or payload bloat.
 */
function sanitizeUserContext(context) {
    if (!context || typeof context !== 'object') return {};

    const sanitized = {};
    const allowedBooleans = ['isFirstTimeVoter', 'isSeniorCitizen', 'isPwD'];
    
    allowedBooleans.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(context, key)) {
            sanitized[key] = !!context[key];
        } else {
            sanitized[key] = false;
        }
    });

    return sanitized;
}

/**
 * Maps complex or sensitive error messages to safe, predefined categories.
 * Prevents leaking system details or API keys in logs or responses.
 */
function sanitizeErrorMessage(err) {
    const msg = (err.message || "").toLowerCase();
    const status = err.status || 0;

    if (msg.includes('api_key') || msg.includes('invalid key')) return 'invalid_key';
    if (status === 429 || msg.includes('429') || msg.includes('quota')) return 'rate_or_quota';
    if (status === 503 || msg.includes('503') || msg.includes('unavailable')) return 'unavailable';
    if (status === 400 || msg.includes('400') || msg.includes('bad request')) return 'bad_request';
    
    return 'unknown';
}

module.exports = { sanitizeUserContext, sanitizeErrorMessage };
