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

test('dynamic partisan declaration refusal (DMK/TMK)', () => {
    const result1 = analyzeIntent('I love TMK party, I will always vote to them.');
    expect(result1.safe).toBe(false);
    expect(result1.intent).toBe('political_persuasion');

    const result2 = analyzeIntent('I love DMK party');
    expect(result2.safe).toBe(false);
    expect(result2.intent).toBe('political_persuasion');
});

test('safe educational query allows "party" and "vote"', () => {
    const result1 = analyzeIntent('What is a political party?');
    expect(result1.safe).toBe(true);
    expect(result1.intent).toBe('educational');

    const result2 = analyzeIntent('What documents should I understand before voting?');
    expect(result2.safe).toBe(true);
    expect(result2.intent).toBe('educational');
});
