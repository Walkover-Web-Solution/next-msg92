// Server-only audit trail: every admin mutation appends who did what, when, to what.
import { appendLog, readLog } from '@/lib/admin/store';

export async function audit(session, action, target, detail = {}) {
    await appendLog('audit', { at: new Date().toISOString(), by: session?.email || 'system', action, target, detail });
}

export async function recentAudit(limit = 50, filter) {
    const entries = await readLog('audit');
    return entries
        .filter((entry) => !filter || filter(entry))
        .slice(-limit)
        .reverse();
}
