// Browser helpers for experiment events. Outcome events are sent only when the visitor takes part
// in an experiment (the proxy sets `msg91_exp_on`), so normal traffic makes no extra requests.
// The server validates every event against the visitor's assignment; see src/lib/experiments/events.js.
const ENDPOINT = '/api/exp/event';

export function sendExperimentEvent(payload) {
    if (typeof window === 'undefined') return;
    const body = JSON.stringify(payload);
    try {
        if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' })))
            return;
    } catch {
        // fall through to fetch
    }
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(
        () => {}
    );
}

export function trackExperimentOutcome(metric) {
    if (typeof document === 'undefined' || !/(?:^|;\s*)msg91_exp_on=1/.test(document.cookie)) return;
    sendExperimentEvent({ type: 'outcome', metric });
}
