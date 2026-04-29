function generateChecklist(userContext) {
    let checklist = [
        "Voter ID or Approved ID Document",
        "Voter Information Slip"
    ];

    if (userContext.isPwD) {
        checklist.push("Download PwD App");
        checklist.push("Request Wheelchair Assistance");
        checklist.push("Review Companion Rules");
    }

    return checklist;
}

module.exports = { generateChecklist };
