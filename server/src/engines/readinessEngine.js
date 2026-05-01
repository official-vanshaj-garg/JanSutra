const {
    READINESS_JOURNEY_WEIGHT,
    READINESS_CHECKLIST_WEIGHT,
    READINESS_GENERAL_BONUS,
    READINESS_SINGLE_NEED_PENALTY,
    READINESS_SENIOR_PWD_PENALTY,
    READINESS_MULTI_NEED_PENALTY,
} = require('../constants/appConstants');

function calculateReadiness(userContext, journeyLength, checklistLength) {
    let score = 0;
    const completed = ['Initiated JanPath Wizard'];
    const remaining = [];

    if (journeyLength > 0) {
        score += READINESS_JOURNEY_WEIGHT;
        completed.push('Personalized Journey Generated');
    } else {
        remaining.push('Complete your election timeline');
    }

    if (checklistLength > 0) {
        score += READINESS_CHECKLIST_WEIGHT;
        completed.push('Preparation Checklist Generated');
    } else {
        remaining.push('Review necessary documents');
    }

    let needsCount = 0;
    if (userContext.isFirstTimeVoter) needsCount++;
    if (userContext.isSeniorCitizen) needsCount++;
    if (userContext.isPwD) needsCount++;

    if (needsCount === 0) {
        score += READINESS_GENERAL_BONUS;
        remaining.push('Verify your name on the official electoral roll');
    } else if (needsCount === 1) {
        if (userContext.isFirstTimeVoter) {
            score += READINESS_SINGLE_NEED_PENALTY;
            remaining.push('Verify your Form 6 registration status');
            remaining.push('Familiarize yourself with the EVM/VVPAT process');
        } else if (userContext.isSeniorCitizen) {
            score += READINESS_SENIOR_PWD_PENALTY;
            remaining.push('Check eligibility for Form 12D (Home Voting)');
        } else if (userContext.isPwD) {
            score += READINESS_SENIOR_PWD_PENALTY;
            remaining.push('Check accessibility features at your polling station');
        }
    } else {
        score += READINESS_MULTI_NEED_PENALTY;
        remaining.push('Verify registration and coordinate special accommodations');
    }

    // Cap at 100, minimum 0
    score = Math.min(100, Math.max(0, score));

    return { score, completed, remaining };
}

module.exports = { calculateReadiness };
