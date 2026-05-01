import { expect, test } from 'vitest';
import { sanitizeUserContext, sanitizeErrorMessage } from '../src/utils/sanitizers';

test('sanitizeUserContext should only allow known booleans', () => {
    const input = {
        isFirstTimeVoter: true,
        isSeniorCitizen: 'yes',
        isPwD: 1,
        malicious: 'hack',
        nested: { a: 1 }
    };
    const output = sanitizeUserContext(input);
    
    expect(output).toEqual({
        isFirstTimeVoter: true,
        isSeniorCitizen: true, // converted to bool
        isPwD: true, // converted to bool
    });
    expect(output).not.toHaveProperty('malicious');
    expect(output).not.toHaveProperty('nested');
});

test('sanitizeErrorMessage should map errors to categories', () => {
    expect(sanitizeErrorMessage(new Error('invalid api_key'))).toBe('invalid_key');
    expect(sanitizeErrorMessage({ status: 429, message: 'quota exceeded' })).toBe('rate_or_quota');
    expect(sanitizeErrorMessage({ status: 503 })).toBe('unavailable');
    expect(sanitizeErrorMessage(new Error('some random error'))).toBe('unknown');
});
