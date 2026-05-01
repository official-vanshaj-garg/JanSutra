import { expect, test } from 'vitest';
import request from 'supertest';
import app from '../src/app';

// --- Health ---
test('GET /api/health should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
});

// --- Journey ---
test('POST /api/journey should return generated timeline', async () => {
    const res = await request(app)
        .post('/api/journey')
        .send({ context: { isFirstTimeVoter: true } });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('journey');
    expect(res.body.journey).toBeInstanceOf(Array);
});

// --- Checklist ---
test('POST /api/checklist should return preparation steps', async () => {
    const res = await request(app)
        .post('/api/checklist')
        .send({ context: { isSeniorCitizen: true } });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('checklist');
    expect(res.body.checklist).toBeInstanceOf(Array);
});

// --- Readiness ---
test('POST /api/readiness should calculate score', async () => {
    const res = await request(app)
        .post('/api/readiness')
        .send({ context: { isFirstTimeVoter: true }, journeyLength: 5, checklistLength: 3 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('score');
    expect(res.body).toHaveProperty('completed');
    expect(res.body).toHaveProperty('remaining');
});

// --- SatyaCheck ---
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

test('POST /api/satya-check overlong input returns 400', async () => {
    const res = await request(app)
        .post('/api/satya-check')
        .send({ query: 'q'.repeat(501) });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('exceeds maximum allowed length');
});

// --- Assistant ---
test('POST /api/assistant/explain fallback/safe behavior', async () => {
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

// --- Official Links ---
test('GET /api/official-links returns object', async () => {
    const res = await request(app).get('/api/official-links');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('votersPortal');
});

// --- Simulation ---
test('GET /api/simulation returns steps array', async () => {
    const res = await request(app).get('/api/simulation');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('steps');
    expect(res.body.steps).toBeInstanceOf(Array);
    expect(res.body.steps.length).toBeGreaterThan(0);
});

test('POST /api/simulation/next valid sequential step', async () => {
    const res = await request(app)
        .post('/api/simulation/next')
        .send({ currentStep: 'Identity Check', targetStep: 'Inking' });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
});

test('POST /api/simulation/next skip rejected', async () => {
    const res = await request(app)
        .post('/api/simulation/next')
        .send({ currentStep: 'Identity Check', targetStep: 'EVM' });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(false);
    expect(res.body.message).toContain('Cannot skip');
});

// --- Telemetry ---
test('POST /api/telemetry valid whitelisted client event returns ok', async () => {
    const res = await request(app)
        .post('/api/telemetry')
        .send({ eventName: 'mock_booth_completed', metadata: {} });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
});

test('POST /api/telemetry invalid event name returns 400', async () => {
    const res = await request(app)
        .post('/api/telemetry')
        .send({ eventName: 'hacker_event', metadata: {} });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
});

test('POST /api/telemetry server-only event returns 403 from client', async () => {
    const res = await request(app)
        .post('/api/telemetry')
        .send({ eventName: 'path_generated', metadata: {} });
    expect(res.status).toBe(403);
});

// --- API 404 ---
test('GET /api/unknown returns JSON 404 not HTML', async () => {
    const res = await request(app).get('/api/unknown-route-xyz');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body).toHaveProperty('error');
});
