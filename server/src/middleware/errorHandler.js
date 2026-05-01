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
function errorHandler(err, req, res, _next) {
    // Never log raw error objects that may contain API keys or sensitive context.
    const message = err.message || 'An unexpected error occurred';
    const status = err.status || err.statusCode || 500;

    console.error(JSON.stringify({
        event: 'server_error',
        status,
        message
    }));

    res.status(status).json({ error: message });
}

module.exports = { errorHandler };
