import { expect, test } from 'vitest';
import { calculateReadiness } from '../src/engines/readinessEngine';

test('readiness score calculates correctly for general user', () => {
    const userContext = {};
    const result = calculateReadiness(userContext, 5, 3);
    
    expect(result.score).toBe(80);
    expect(result.completed).toContain("Initiated JanPath Wizard");
    expect(result.completed).toContain("Personalized Journey Generated");
    expect(result.remaining).toContain("Verify your name on the official electoral roll");
});

test('first-time voter score differs from general user', () => {
    const userContext = { isFirstTimeVoter: true };
    const result = calculateReadiness(userContext, 5, 3);
    
    expect(result.score).toBe(60);
    expect(result.remaining).toContain("Verify your Form 6 registration status");
});

test('multi-need profile gets recommended next steps and lower score', () => {
    const userContext = { isFirstTimeVoter: true, isPwD: true };
    const result = calculateReadiness(userContext, 5, 3);
    
    expect(result.score).toBe(55);
    expect(result.remaining).toContain("Verify registration and coordinate special accommodations");
});

test('score is always between 0 and 100 with empty data', () => {
    const userContext = { isFirstTimeVoter: true, isSeniorCitizen: true, isPwD: true };
    const result = calculateReadiness(userContext, 0, 0); // No journey or checklist generated
    
    expect(result.score).toBe(0); // Base 0, minus 15 capped at 0
    expect(result.remaining).toContain("Complete your election timeline");
});
