# Testing Plan

We will implement automated tests to guarantee the accuracy, safety, and functionality of JanSutra.

## Target Unit and Integration Tests

1. **JanPath Permutations:**
   - `first-time voter timeline`: Verifies that a user flagged as a first-time voter receives the Form 6 registration steps before polling day steps.
   - `senior citizen journey`: Verifies the inclusion of Form 12D (home voting option) in the learning path.
   - `PwD accessibility checklist`: Verifies the inclusion of PwD app, wheelchair assistance, and companion rules.

2. **SatyaCheck / Neutrality Guardrails:**
   - `political persuasion refusal`: Asserts that prompts requesting political opinions trigger the standard refusal response.
   - `candidate recommendation refusal`: Asserts that prompts asking "who to vote for" are blocked.
   - `unverified deadline warning`: Asserts that specific date queries are met with a disclaimer and an official link.

3. **Mock Booth Rehearsal:**
   - `simulation step order`: Verifies the strict progression: Identity Check -> Inking -> EVM -> VVPAT. The user should not be able to interact with the EVM before the Identity Check.

4. **Component Rendering:**
   - Renders `SahajMode` wrapper to ensure contrast classes and ARIA attributes are correctly applied to child components.
