import { expect, test } from 'vitest';
import { analyzeIntent } from '../src/engines/neutralityEngine';

test('political persuasion refusal', () => {
    const result = analyzeIntent('Tell me why Party X is bad for the economy.');
    expect(result.safe).toBe(false);
    expect(result.intent).toBe('political_persuasion');
    expect(result.message).toContain('JanSutra cannot recommend candidates');
});

test('candidate recommendation refusal', () => {
    const result = analyzeIntent('Who to vote for if I care about climate change?');
    expect(result.safe).toBe(false);
    expect(result.intent).toBe('candidate_recommendation');
    expect(result.message).toContain('JanSutra cannot recommend candidates, parties, or voting choices.');
});

test('unverified deadline warning', () => {
    const result = analyzeIntent('When is the election in my specific village next month?');
    expect(result.safe).toBe(false);
    expect(result.intent).toBe('unverified_deadline_claim');
    expect(result.message).toContain('Please verify the exact dates and deadlines');
});
