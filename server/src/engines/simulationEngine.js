function getSimulationSteps() {
    return [
        "Identity Check",
        "Inking",
        "EVM",
        "VVPAT"
    ];
}

function validateStepOrder(currentStep, targetStep) {
    const steps = getSimulationSteps();
    
    if (!steps.includes(currentStep) || !steps.includes(targetStep)) {
        return { valid: false, message: "Invalid simulation step provided." };
    }

    const currentIndex = steps.indexOf(currentStep);
    const targetIndex = steps.indexOf(targetStep);

    if (targetIndex > currentIndex + 1) {
        return { valid: false, message: `Cannot skip to ${targetStep}. Complete ${steps[currentIndex + 1]} first.` };
    }
    return { valid: true };
}

module.exports = { getSimulationSteps, validateStepOrder };
