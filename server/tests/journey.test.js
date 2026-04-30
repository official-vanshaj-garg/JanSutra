import { expect, test } from 'vitest';
import { generateJourney } from '../src/engines/journeyEngine';
import { generateChecklist } from '../src/engines/checklistEngine';

test('first-time voter timeline', () => {
    const journey = generateJourney({ isFirstTimeVoter: true });
    expect(Array.isArray(journey)).toBe(true);
    expect(journey[0]).toBe('Form 6 Registration');
    expect(journey).toContain('Mock Booth Rehearsal');
});

test('senior citizen journey', () => {
    const journey = generateJourney({ isSeniorCitizen: true });
    expect(Array.isArray(journey)).toBe(true);
    expect(journey).toContain('Explore Form 12D (Home Voting)');
});

test('PwD accessibility checklist', () => {
    const checklist = generateChecklist({ isPwD: true });
    expect(Array.isArray(checklist)).toBe(true);
    expect(checklist).toContain('Download PwD App');
    expect(checklist).toContain('Request Wheelchair Assistance');
    expect(checklist).toContain('Review Companion Rules');
});
