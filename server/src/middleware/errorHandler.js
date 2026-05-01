/**
 * Centralized 4-argument Express error-handling middleware.
 * Must be registered AFTER all routes in app.js.
 * Catches any error passed via next(err) and returns a safe,
 * consistent JSON error response without leaking stack traces.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const { sanitizeErrorMessage } = require('../utils/sanitizers');

function errorHandler(err, req, res, _next) {
    const safeCategory = sanitizeErrorMessage(err);
    const message = err.message || 'An unexpected error occurred';
    const status = err.status || err.statusCode || 500;

    console.error(JSON.stringify({
        event: 'server_error',
        status,
        category: safeCategory,
        // Only log the message if it's not a 500 or if it's explicitly safe
        message: status < 500 ? message : 'Internal Server Error'
    }));

    res.status(status).json({ 
        error: status < 500 ? message : 'Internal Server Error',
        category: safeCategory 
    });
}

module.exports = { errorHandler };
