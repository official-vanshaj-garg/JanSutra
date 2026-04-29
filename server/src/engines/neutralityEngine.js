function analyzeIntent(query) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("who to vote") || lowerQuery.includes("recommend") || lowerQuery.includes("best party")) {
        return {
            intent: "candidate_recommendation",
            safe: false,
            message: "I am an educational tool and cannot recommend candidates or parties. I encourage you to read the official manifestos of the candidates in your constituency to make an informed decision."
        };
    }

    if (lowerQuery.includes("bad for") || lowerQuery.includes("policy") || lowerQuery.includes("debate")) {
        return {
            intent: "political_persuasion",
            safe: false,
            message: "I do not analyze political parties, policies, or provide opinions. My purpose is to help you understand the voting process, registration, and polling day procedures."
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
