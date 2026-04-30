function analyzeIntent(query) {
    const lowerQuery = query.toLowerCase();

    const recommendationKeywords = [
        "who to vote", "recommend", "best party", "who should i vote", 
        "which party should i", "which candidate is best", "tell me the best candidate", 
        "which leader should i choose"
    ];
    
    if (recommendationKeywords.some(kw => lowerQuery.includes(kw))) {
        return {
            intent: "candidate_recommendation",
            safe: false,
            message: "JanSutra cannot recommend candidates, parties, or voting choices. I can help you understand the election process, how to verify official information, and how to make your own informed decision."
        };
    }

    // Block dynamic partisan declarations (e.g. "I love TMK party", "I will vote for XYZ")
    const partisanRegex = /(i (love|support|hate) [a-z0-9 ]+ party|i will (always )?vote (to|for) [a-z0-9 ]+|[a-z0-9 ]+ party is (best|worst)|vote for [a-z0-9 ]+)/i;
    
    if (partisanRegex.test(lowerQuery)) {
        return {
            intent: "political_persuasion",
            safe: false,
            message: "JanSutra cannot recommend candidates, parties, or voting choices. I can help you understand the election process, how to verify official information, and how to make your own informed decision."
        };
    }

    const persuasionKeywords = [
        "bad for", "policy", "debate", "should i support", "who is better for india",
        "convince me to vote", "bjp", "congress", "aap", "trinamool", "cpm", "bsp", "ncp"
    ];

    if (persuasionKeywords.some(kw => lowerQuery.includes(kw))) {
        return {
            intent: "political_persuasion",
            safe: false,
            message: "JanSutra cannot recommend candidates, parties, or voting choices. I can help you understand the election process, how to verify official information, and how to make your own informed decision."
        };
    }

    if (lowerQuery.includes("exact date") || lowerQuery.includes("when is the election") || lowerQuery.includes("deadline for")) {
        return {
            intent: "unverified_deadline_claim",
            safe: false,
            message: "Election dates vary by constituency and can change. Please verify the exact dates and deadlines for your area directly on the official Election Commission portal."
        };
    }
    
    if (lowerQuery.includes("voter id number is") || lowerQuery.includes("aadhar")) {
        return {
            intent: "sensitive_personal_data",
            safe: false,
            message: "For your security, please do not share your Voter ID number with me. To check if you are on the electoral roll, please visit the official Election Commission website."
        };
    }

    return { intent: "educational", safe: true };
}

module.exports = { analyzeIntent };
