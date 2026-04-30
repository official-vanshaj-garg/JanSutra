function calculateReadiness(userContext, journeyLength, checklistLength) {
    let score = 0;
    let completed = ["Initiated JanPath Wizard"];
    let remaining = [];

    if (journeyLength > 0) {
        score += 35;
        completed.push("Personalized Journey Generated");
    } else {
        remaining.push("Complete your election timeline");
    }

    if (checklistLength > 0) {
        score += 35;
        completed.push("Preparation Checklist Generated");
    } else {
        remaining.push("Review necessary documents");
    }

    let needsCount = 0;
    if (userContext.isFirstTimeVoter) needsCount++;
    if (userContext.isSeniorCitizen) needsCount++;
    if (userContext.isPwD) needsCount++;

    if (needsCount === 0) {
        score += 10;
        remaining.push("Verify your name on the official electoral roll");
    } else if (needsCount === 1) {
        if (userContext.isFirstTimeVoter) {
            score -= 10;
            remaining.push("Verify your Form 6 registration status");
            remaining.push("Familiarize yourself with the EVM/VVPAT process");
        } else if (userContext.isSeniorCitizen) {
            score -= 5;
            remaining.push("Check eligibility for Form 12D (Home Voting)");
        } else if (userContext.isPwD) {
            score -= 5;
            remaining.push("Check accessibility features at your polling station");
        }
    } else {
        score -= 15;
        remaining.push("Verify registration and coordinate special accommodations");
    }

    // Cap at 100, minimum 0
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    return {
        score,
        completed,
        remaining
    };
}

module.exports = { calculateReadiness };
