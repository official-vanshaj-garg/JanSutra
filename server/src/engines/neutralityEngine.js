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
    // Replaced polynomial regex with deterministic bounded checks to prevent ReDoS
    const declarationPrefixes = ["i love ", "i support ", "i hate ", "vote for "];
    const votePatterns = ["i will vote for ", "i will vote to ", "i will always vote for ", "i will always vote to "];
    const bestWorstPatterns = [" party is best", " party is worst"];

    const isPartisan = 
        declarationPrefixes.some(p => lowerQuery.includes(p)) ||
        votePatterns.some(p => lowerQuery.includes(p)) ||
        bestWorstPatterns.some(p => lowerQuery.includes(p));
    
    if (isPartisan) {
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
    
    const piiRegex = /\b(my voter id|my epic|my aadhaar|my phone|my address|using this id|[0-9]{10}|[0-9]{12})\b/i;
    
    if (piiRegex.test(lowerQuery)) {
        return {
            intent: "sensitive_personal_data",
            safe: false,
            message: "Please do not share voter ID numbers, EPIC numbers, Aadhaar numbers, phone numbers, addresses, or other sensitive personal information here. JanSutra can explain the process and direct you to official portals."
        };
    }

    return { intent: "educational", safe: true };
}

module.exports = { analyzeIntent };
