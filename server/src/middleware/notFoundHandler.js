/**
 * Handles requests to /api/* routes that don't match any defined endpoint.
 * Returns a structured JSON 404 rather than falling through to the React
 * catch-all (which would serve index.html for an API miss — incorrect behavior).
 */
function notFoundHandler(req, res) {
    res.status(404).json({
        error: 'API endpoint not found'
    });
}

module.exports = { notFoundHandler };
