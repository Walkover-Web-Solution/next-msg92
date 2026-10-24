// Server-only, optional AI interpretation of deterministic findings. Off unless Settings → AI is
// enabled and ANTHROPIC_API_KEY is set on the server. Only compact, non-personal findings are sent
// (counts, URLs, file paths, public competitor page changes); never visitor data or raw events.
// Output is labelled as a recommendation, never as approved strategy or verified behaviour.
import Anthropic from '@anthropic-ai/sdk';
import { appendLog, readLog } from '@/lib/admin/store';

// USD per million tokens, from the published price list (claude-opus-5-5: $4 in / $20 out).
const PRICES = { 'claude-opus-5-5': [4, 20], 'claude-sonnet-5-5': [2, 10], 'claude-haiku-5-5': [0.1, 0.5] };

export function aiStatus(settings) {
    if (!process.env.ANTHROPIC_API_KEY)
        return { connected: false, reason: 'ANTHROPIC_API_KEY is not set on the server.' };
    if (!settings.ai.enabled) return { connected: false, reason: 'AI interpretation is switched off in Settings.' };
    return { connected: true, model: settings.ai.model };
}

async function callsToday() {
    const today = new Date().toISOString().slice(0, 10);
    return (await readLog('ai-usage')).filter((u) => u.at.startsWith(today)).length;
}

// Returns { status: 'ok' | 'not_connected' | 'budget_exhausted' | 'failed', text?, model?, costUsd? }.
export async function interpret({ task, findings }, settings) {
    const status = aiStatus(settings);
    if (!status.connected) return { status: 'not_connected', reason: status.reason };
    if ((await callsToday()) >= settings.analyses.budget.maxAiCallsPerDay) {
        return {
            status: 'budget_exhausted',
            reason: 'Daily AI call budget reached; resumes tomorrow or after raising the budget.',
        };
    }
    const client = new Anthropic();
    const model = settings.ai.model;
    try {
        const response = await client.beta.messages.create({
            model,
            max_tokens: 2000,
            betas: ['server-side-fallback-2026-07-01'],
            fallbacks: 'default',
            output_config: { effort: settings.ai.effort || 'low' },
            system:
                'You review findings from automated checks of the MSG91 marketing website (msg91.com). ' +
                'Interpret the findings for a marketing and engineering operator: what matters most, likely cause, and one or two concrete next actions. ' +
                'Only use the facts given. Mark anything uncertain. Do not invent metrics, competitors, customers or claims. ' +
                'Your output is a recommendation for a human to approve; it is not approved strategy. Reply in under 180 words of plain text.',
            messages: [
                {
                    role: 'user',
                    content: `Task: ${task}\n\nFindings (JSON):\n${JSON.stringify(findings).slice(0, 30_000)}`,
                },
            ],
        });
        if (response.stop_reason === 'refusal') return { status: 'failed', reason: 'The model declined this request.' };
        const text = response.content
            .filter((block) => block.type === 'text')
            .map((block) => block.text)
            .join('\n')
            .trim();
        const [inPrice, outPrice] = PRICES[response.model] || PRICES[model] || [0, 0];
        const costUsd = (response.usage.input_tokens * inPrice + response.usage.output_tokens * outPrice) / 1e6;
        await appendLog('ai-usage', {
            at: new Date().toISOString(),
            task,
            model: response.model,
            input: response.usage.input_tokens,
            output: response.usage.output_tokens,
            costUsd,
        });
        return { status: 'ok', text, model: response.model, costUsd };
    } catch (error) {
        if (error instanceof Anthropic.RateLimitError)
            return { status: 'failed', reason: 'Rate limited by the model API; will retry on the next run.' };
        if (error instanceof Anthropic.AuthenticationError)
            return { status: 'failed', reason: 'The model API rejected ANTHROPIC_API_KEY.' };
        if (error instanceof Anthropic.APIError)
            return { status: 'failed', reason: `Model API error ${error.status}.` };
        return { status: 'failed', reason: error.message };
    }
}

export async function aiSpend(days = 30) {
    const since = new Date(Date.now() - days * 86_400_000).toISOString();
    const usage = (await readLog('ai-usage')).filter((u) => u.at >= since);
    return { calls: usage.length, costUsd: usage.reduce((s, u) => s + (u.costUsd || 0), 0) };
}
