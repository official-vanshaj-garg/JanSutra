
function generateJourney(userContext) {
    let journey = [];

    if (userContext.isFirstTimeVoter) {
        journey.push("Form 6 Registration");
    }

    journey.push("Check Name on Voter List");
    journey.push("Collect Valid ID Documents");

    if (userContext.isSeniorCitizen) {
        journey.push("Explore Form 12D (Home Voting)");
    }

    journey.push("Find Polling Booth");
    journey.push("Mock Booth Rehearsal");

    return journey;
}

module.exports = { generateJourney };
