const { Firestore } = require('@google-cloud/firestore');

const TELEMETRY_ENABLED = process.env.TELEMETRY_ENABLED === 'true';
const FIRESTORE_COLLECTION = process.env.FIRESTORE_COLLECTION || 'jansutra_events';

let firestore = null;
if (TELEMETRY_ENABLED) {
    try {
        firestore = new Firestore();
    } catch (err) {
        console.error(JSON.stringify({ event: 'telemetry_skipped', reason: 'firestore_init_failed', error: err.message }));
    }
}

const ALLOWED_EVENTS = [
    'path_generated',
    'readiness_generated',
    'mock_booth_completed',
    'satyacheck_blocked',
    'assistant_answered',
    'assistant_fallback_used',
    'sahaj_mode_enabled'
];

async function logEvent(eventName, metadata = {}) {
    if (!ALLOWED_EVENTS.includes(eventName)) {
        console.error(JSON.stringify({ event: 'telemetry_skipped', reason: 'invalid_event_name', eventName }));
        return;
    }

    // Only allow specific safe metadata keys with strict validation
    const safeMetadata = {};
    
    if (metadata.category && typeof metadata.category === 'string') {
        safeMetadata.category = metadata.category.substring(0, 100);
    }
    if (metadata.safe !== undefined) {
        safeMetadata.safe = !!metadata.safe;
    }
    if (metadata.usedFallback !== undefined) {
        safeMetadata.usedFallback = !!metadata.usedFallback;
    }
    if (metadata.scoreBand && typeof metadata.scoreBand === 'string') {
        safeMetadata.scoreBand = metadata.scoreBand.substring(0, 20);
    }
    if (metadata.source && typeof metadata.source === 'string') {
        safeMetadata.source = metadata.source.substring(0, 100);
    }
    
    if (metadata.persona && typeof metadata.persona === 'object') {
        safeMetadata.persona = {
            firstTime: !!metadata.persona.firstTime,
            senior: !!metadata.persona.senior,
            pwd: !!metadata.persona.pwd
        };
    }

    const payload = {
        eventName,
        timestamp: new Date().toISOString(),
        ...safeMetadata
    };

    if (eventName === 'satyacheck_blocked') {
        console.info(JSON.stringify({ event: 'satyacheck_blocked', category: payload.category }));
    } else if (eventName === 'assistant_fallback_used') {
        console.info(JSON.stringify({ event: 'assistant_fallback_used', source: payload.source || 'unknown' }));
    }

    if (!TELEMETRY_ENABLED || !firestore) {
        if (eventName !== 'satyacheck_blocked' && eventName !== 'assistant_fallback_used') {
            console.info(JSON.stringify({ event: 'telemetry_skipped', reason: 'disabled', eventName }));
        }
        return;
    }

    try {
        // Non-blocking fire and forget
        firestore.collection(FIRESTORE_COLLECTION).add(payload).catch(err => {
            console.error(JSON.stringify({ event: 'telemetry_skipped', reason: 'firestore_write_failed', error: err.message }));
        });
        console.info(JSON.stringify({ event: 'telemetry_written', eventName }));
    } catch (err) {
        console.error(JSON.stringify({ event: 'telemetry_skipped', reason: 'firestore_sync_error', error: err.message }));
    }
}

module.exports = { logEvent, ALLOWED_EVENTS };
