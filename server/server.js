require('dotenv').config();
if (process.env.NODE_ENV !== 'production') {
    console.log(`Gemini key configured: ${!!process.env.GEMINI_API_KEY}`);
}
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`JanSutra Server running on port ${PORT}`);
});
