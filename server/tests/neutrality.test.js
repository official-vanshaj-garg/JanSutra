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

test('dynamic partisan declaration refusal (DMK/TMK/XYZ)', () => {
    const result1 = analyzeIntent('I love TMK party, I will always vote to them.');
    expect(result1.safe).toBe(false);
    expect(result1.intent).toBe('political_persuasion');

    const result2 = analyzeIntent('I support ABC party');
    expect(result2.safe).toBe(false);
    expect(result2.intent).toBe('political_persuasion');

    const result3 = analyzeIntent('XYZ party is best');
    expect(result3.safe).toBe(false);
    expect(result3.intent).toBe('political_persuasion');

    const result4 = analyzeIntent('I hate some party');
    expect(result4.safe).toBe(false);
    expect(result4.intent).toBe('political_persuasion');

    const result5 = analyzeIntent('vote for candidate A');
    expect(result5.safe).toBe(false);
    expect(result5.intent).toBe('political_persuasion');
});

test('safe educational query allows "party" and "vote"', () => {
    const result1 = analyzeIntent('What is a political party?');
    expect(result1.safe).toBe(true);
    expect(result1.intent).toBe('educational');

    const result2 = analyzeIntent('What documents should I understand before voting?');
    expect(result2.safe).toBe(true);
    expect(result2.intent).toBe('educational');
});

test('sensitive personal data is blocked (voter ID, EPIC, Aadhaar, phone, address)', () => {
    const inputs = [
        "My voter ID is ABC123, check my status.",
        "My EPIC number is ABC1234567.",
        "My Aadhaar number is 123456789012.",
        "My phone number is 9876543210.",
        "My address is 12 MG Road, check my polling booth.",
        "Check my voter status using this ID."
    ];

    inputs.forEach(input => {
        const result = analyzeIntent(input);
        expect(result.safe).toBe(false);
        expect(result.intent).toBe('sensitive_personal_data');
    });
});

test('educational queries about ID are allowed', () => {
    const result1 = analyzeIntent('What is a voter ID?');
    expect(result1.safe).toBe(true);

    const result2 = analyzeIntent('What is EPIC?');
    expect(result2.safe).toBe(true);

    const result3 = analyzeIntent('How can I check my name in the voter list?');
    expect(result3.safe).toBe(true);
});
