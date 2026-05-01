const { MAX_QUERY_LENGTH } = require('../constants/appConstants');

/**
 * Express middleware factory for validating text query inputs.
 * Extracts a named field from req.body, checks for presence,
 * and enforces a maximum character length.
 *
 * @param {string} fieldName - The body field to validate (e.g., 'query', 'question').
 * @returns {Function} Express middleware function.
 */
function validateTextInput(fieldName) {
    return (req, res, next) => {
        const value = req.body && req.body[fieldName];

        if (!value || typeof value !== 'string' || !value.trim()) {
            return res.status(400).json({
                error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
            });
        }

        if (value.length > MAX_QUERY_LENGTH) {
            return res.status(400).json({
                error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} exceeds maximum allowed length of ${MAX_QUERY_LENGTH} characters`
            });
        }

        next();
    };
}

module.exports = { validateTextInput };
