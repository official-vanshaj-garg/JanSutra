require('dotenv').config();
const app = require('./src/app');
const { SERVER_REQUEST_TIMEOUT_MS, SERVER_HEADERS_TIMEOUT_MS } = require('./src/constants/appConstants');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`JanSutra Server running on port ${PORT}`);
});

// Configure timeouts to prevent hung connections
server.requestTimeout = SERVER_REQUEST_TIMEOUT_MS;
server.headersTimeout = SERVER_HEADERS_TIMEOUT_MS;
