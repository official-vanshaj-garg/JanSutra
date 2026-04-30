import { expect, test } from 'vitest';
import request from 'supertest';
import app from '../src/app';

test('GET /api/health should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
});

test('POST /api/journey should return generated timeline', async () => {
    const res = await request(app)
        .post('/api/journey')
        .send({ context: { isFirstTimeVoter: true } });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('journey');
    expect(res.body.journey).toBeInstanceOf(Array);
});

test('POST /api/checklist should return preparation steps', async () => {
    const res = await request(app)
        .post('/api/checklist')
        .send({ context: { isSeniorCitizen: true } });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('checklist');
    expect(res.body.checklist).toBeInstanceOf(Array);
});

test('POST /api/readiness should calculate score', async () => {
    const res = await request(app)
        .post('/api/readiness')
        .send({ context: { isFirstTimeVoter: true }, journeyLength: 5, checklistLength: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('score');
    expect(res.body).toHaveProperty('completed');
    expect(res.body).toHaveProperty('remaining');
});

test('POST /api/satya-check safe query', async () => {
    const res = await request(app)
        .post('/api/satya-check')
        .send({ query: 'How does EVM work?' });
    expect(res.status).toBe(200);
    expect(res.body.safe).toBe(true);
});

test('POST /api/satya-check blocked PII', async () => {
    const res = await request(app)
        .post('/api/satya-check')
        .send({ query: 'My Aadhaar is 1234 5678 9012' });
    expect(res.status).toBe(200);
    expect(res.body.safe).toBe(false);
    expect(res.body.intent).toBe('sensitive_personal_data');
});

test('POST /api/assistant/explain fallback/safe behavior', async () => {
    // We send a safe query. It will either hit Gemini or offline fallback.
    const res = await request(app)
        .post('/api/assistant/explain')
        .send({ question: 'How does VVPAT work?', context: {} });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('answer');
    expect(res.body).toHaveProperty('safetyCategory');
});

test('POST /api/assistant/explain rejects over-length input', async () => {
    const res = await request(app)
        .post('/api/assistant/explain')
        .send({ question: 'a'.repeat(501), context: {} });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('exceeds maximum allowed length');
});

test('GET /api/official-links returns object', async () => {
    const res = await request(app).get('/api/official-links');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('votersPortal');
});
