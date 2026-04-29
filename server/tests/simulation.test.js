import { expect, test } from 'vitest';
import { getSimulationSteps, validateStepOrder } from '../src/engines/simulationEngine';

test('simulation step order', () => {
    const steps = getSimulationSteps();
    expect(steps).toEqual(['Identity Check', 'Inking', 'EVM', 'VVPAT']);

    // Valid progression
    let validation = validateStepOrder('Identity Check', 'Inking');
    expect(validation.valid).toBe(true);

    // Invalid skip
    validation = validateStepOrder('Identity Check', 'EVM');
    expect(validation.valid).toBe(false);
    expect(validation.message).toContain('Cannot skip to EVM');
});
