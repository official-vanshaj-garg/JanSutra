import { expect, test, vi } from 'vitest';
import { logEvent } from '../src/services/telemetryService';

test('telemetry disabled never crashes', async () => {
    // If it crashes, the promise will reject and test will fail.
    await expect(logEvent('path_generated', { persona: { firstTime: true } })).resolves.not.toThrow();
});

test('telemetry rejects invalid event names silently', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await logEvent('invalid_hacker_event', { secret: 'data' });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('invalid_event_name'));
    consoleSpy.mockRestore();
});

test('telemetry logs structured events for satyacheck_blocked', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    await logEvent('satyacheck_blocked', { category: 'political_persuasion' });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('satyacheck_blocked'));
    consoleSpy.mockRestore();
});
