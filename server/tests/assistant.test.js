import { expect, test } from 'vitest';
import { generateExplanation } from '../src/services/geminiService';
import { analyzeIntent } from '../src/engines/neutralityEngine';

test('missing GEMINI_API_KEY fallback', async () => {
    // Ensure we trigger the fallback (assuming ai is null if no key in env)
    const res = await generateExplanation({}, "How do I register to vote?");
    expect(res.usedFallback).toBe(true);
    expect(res.safetyCategory).toBe("fallback");
    expect(res.officialVerificationRequired).toBe(true);
});

test('political persuasion not sent to Gemini (layer 1)', () => {
    const intent = analyzeIntent("Why is Party X bad for the country?");
    expect(intent.safe).toBe(false);
    expect(intent.intent).toBe("political_persuasion");
});

test('candidate recommendation not sent to Gemini (layer 1)', () => {
    const intent = analyzeIntent("Who to vote for if I want change?");
    expect(intent.safe).toBe(false);
    expect(intent.intent).toBe("candidate_recommendation");
});

test('unverified deadline not sent to Gemini (layer 1)', () => {
    const intent = analyzeIntent("What is the exact date for voting in my village?");
    expect(intent.safe).toBe(false);
    expect(intent.intent).toBe("unverified_deadline_claim");
});

test('sensitive personal data not sent to Gemini (layer 1)', () => {
    const intent = analyzeIntent("My voter id number is ABC12345");
    expect(intent.safe).toBe(false);
    expect(intent.intent).toBe("sensitive_personal_data");
});

test('safe process question gets an explainable response or fallback', async () => {
    // It should either call Gemini (if key exists) or return fallback. 
    // Since we don't assume a valid key here, we expect the fallback structure.
    const res = await generateExplanation({}, "How does a VVPAT machine work?");
    expect(res).toHaveProperty('answer');
    expect(res).toHaveProperty('safetyCategory');
    expect(res).toHaveProperty('usedFallback');
    expect(res).toHaveProperty('officialVerificationRequired');
});

test('assistant response includes officialVerificationRequired when needed', async () => {
    // Using missing key fallback, it should always mandate verification.
    const res = await generateExplanation({}, "Where is my polling booth?");
    expect(res.officialVerificationRequired).toBe(true);
});
