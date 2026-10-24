// Optional in-process scheduler for long-running `next start` servers. Off unless
// ADMIN_SCHEDULER=inprocess. With several server instances, prefer an external cron calling
// POST /api/admin/cron/tick (dedupe keys keep overlapping ticks safe either way).
export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.ADMIN_SCHEDULER !== 'inprocess') return;
    const { tick } = await import('@/lib/admin/analyses/runner');
    const minutes = Math.max(1, Number(process.env.ADMIN_SCHEDULER_MINUTES || 10));
    const timer = setInterval(() => {
        tick().catch((error) => console.error('[scheduler] tick failed', error));
    }, minutes * 60_000);
    timer.unref?.();
    console.log(`[scheduler] in-process analyses scheduler every ${minutes} min`);
}
