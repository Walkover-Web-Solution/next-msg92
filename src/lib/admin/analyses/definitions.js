// Analysis definitions. Each answers one operator question with deterministic checks; AI (when
// connected) only interprets the findings. A definition returns:
//   { status: 'succeeded' | 'insufficient_data' | 'not_connected', facts, findings, nextAction, dataWindow }
// and never invents data: a missing source is reported as `not_connected` with the steps to fix it.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkRegistry, checkMetadata, checkSitemap, checkClaims, listPages } from '@/lib/checks/siteContent';
import { listDocs } from '@/lib/admin/knowledge/service';
import { listExperiments, results, pause } from '@/lib/admin/experiments/service';
import { runResearch, researchOverview } from '@/lib/admin/research';

// Content hash of the inputs a repo-based check reads, so unchanged inputs are not re-analysed.
export function repoRevision(
    globs = ['src/data', 'src/components/PageRenderer/sectionRegistry.js', 'public/sitemap.xml']
) {
    const hash = crypto.createHash('sha1');
    const visit = (target) => {
        if (!fs.existsSync(target)) return;
        const stat = fs.statSync(target);
        if (stat.isDirectory())
            fs.readdirSync(target)
                .sort()
                .forEach((name) => visit(path.join(target, name)));
        else hash.update(target).update(fs.readFileSync(target));
    };
    globs.forEach((g) => visit(path.join(process.cwd(), g)));
    return hash.digest('hex').slice(0, 12);
}

export const ANALYSES = [
    {
        id: 'page-registry',
        title: 'Page sections render',
        question: 'Does every section key in page JSON map to a registered component?',
        everyHours: 24,
        revision: () => repoRevision(['src/data', 'src/components/PageRenderer/sectionRegistry.js']),
        run: async () => {
            const result = checkRegistry();
            return {
                status: 'succeeded',
                facts: {
                    pages: result.pages,
                    registeredComponents: result.registered,
                    unregisteredKeys: result.problems.length,
                },
                findings: result.problems
                    .slice(0, 50)
                    .map((p) => ({ severity: 'high', text: `${p.file}: "${p.key}" renders nothing` })),
                nextAction: result.problems.length
                    ? 'Register the component or fix the key, then run node scripts/check-page-data.mjs.'
                    : 'None.',
                dataWindow: 'Current repository revision',
            };
        },
    },
    {
        id: 'seo-metadata',
        title: 'Search metadata & sitemap',
        question: 'Do pages have usable titles, descriptions and sitemap entries?',
        everyHours: 24,
        interpret: true,
        revision: () => repoRevision(),
        run: async () => {
            const meta = checkMetadata();
            const sitemap = checkSitemap();
            const byIssue = {};
            meta.findings.forEach((f) => {
                const key = f.issue.replace(/\d+ chars/, 'N chars');
                byIssue[key] = (byIssue[key] || 0) + 1;
            });
            return {
                status: 'succeeded',
                facts: {
                    pages: meta.pages,
                    metadataIssues: meta.findings.length,
                    issueCounts: byIssue,
                    sitemapEntries: sitemap.listed,
                    pagesMissingFromSitemap: sitemap.missing.length,
                    sitemapEntriesWithoutPage: sitemap.orphaned.length,
                },
                findings: [
                    ...sitemap.missing
                        .slice(0, 15)
                        .map((url) => ({ severity: 'medium', text: `Not in sitemap.xml: ${url}` })),
                    ...meta.findings
                        .filter((f) => /missing/.test(f.issue))
                        .slice(0, 15)
                        .map((f) => ({ severity: 'high', text: `${f.url}: ${f.issue}` })),
                    ...meta.findings
                        .filter((f) => !/missing/.test(f.issue))
                        .slice(0, 15)
                        .map((f) => ({ severity: 'low', text: `${f.url}: ${f.issue}` })),
                ],
                nextAction:
                    'Fix missing metadata first, then add live pages to public/sitemap.xml (docs/SEO.md lists the rules).',
                dataWindow: 'Current repository revision (no Search Console data)',
            };
        },
    },
    {
        id: 'claims-consistency',
        title: 'Claim consistency',
        question: 'Do repeated numeric claims agree across pages and countries?',
        everyHours: 24 * 7,
        interpret: true,
        revision: () => repoRevision(['src/data']),
        run: async () => {
            const topics = checkClaims();
            const inconsistent = topics.filter((t) => t.variants.length > 1);
            return {
                status: 'succeeded',
                facts: { topics: topics.length, inconsistentTopics: inconsistent.length },
                findings: inconsistent.map((t) => ({
                    severity: 'medium',
                    text: `${t.topic}: ${t.variants.map((v) => `"${v.value}" on ${v.pages} page(s)`).join(', ')}`,
                    examples: t.variants.flatMap((v) => v.examples.slice(0, 2)),
                })),
                nextAction:
                    'Agree one value with evidence per claim in the docs/POSITIONING.md claim register, then update every page that repeats it.',
                dataWindow: 'Current repository revision',
            };
        },
    },
    {
        id: 'knowledge-freshness',
        title: 'Knowledge freshness',
        question: 'Which knowledge documents are missing, stale or unowned?',
        everyHours: 24,
        run: async ({ settings }) => {
            const docs = await listDocs(settings.knowledge.freshnessDays);
            const findings = docs
                .filter((d) => !d.exists || d.stale || !d.owner || d.openChanges?.length)
                .map((d) => ({
                    severity: !d.exists ? 'high' : d.stale ? 'medium' : 'low',
                    text: `${d.path}: ${[!d.exists && 'missing', d.exists && d.stale && `verified ${d.verifiedOn || 'never'}`, d.exists && !d.owner && 'no owner', d.openChanges?.length && `${d.openChanges.length} open change(s)`].filter(Boolean).join(', ')}`,
                }));
            return {
                status: 'succeeded',
                facts: {
                    documents: docs.length,
                    stale: docs.filter((d) => d.stale).length,
                    unowned: docs.filter((d) => !d.owner).length,
                },
                findings,
                nextAction: findings.length
                    ? 'Re-verify stale documents against the code and name owners in their frontmatter.'
                    : 'None.',
                dataWindow: `Freshness threshold ${settings.knowledge.freshnessDays} days`,
            };
        },
    },
    {
        id: 'experiment-health',
        title: 'Experiment health & results',
        question: 'Are running experiments allocating, tracking and evaluating correctly?',
        everyHours: 6,
        run: async ({ settings, system }) => {
            const experiments = (await listExperiments()).filter((e) =>
                ['running', 'paused', 'rolling_out'].includes(e.status)
            );
            if (!experiments.length)
                return {
                    status: 'insufficient_data',
                    facts: { active: 0 },
                    findings: [],
                    nextAction: 'No active experiments.',
                    dataWindow: '—',
                };
            const findings = [];
            for (const exp of experiments) {
                const res = await results(exp);
                const primary = res.evaluations[exp.primaryMetric];
                const started = exp.versions[exp.versions.length - 1].startedAt;
                const days = started ? (Date.now() - new Date(started)) / 86_400_000 : 0;
                const totalN = primary?.arms.reduce((s, a) => s + a.n, 0) || 0;
                if (exp.status === 'running' && days > 1 / 24 && !res.lastEventAt)
                    findings.push({
                        severity: 'high',
                        text: `${exp.id}: running for ${days.toFixed(1)} days with no exposure events — tracking may be broken.`,
                    });
                if (primary?.srm?.mismatch)
                    findings.push({
                        severity: 'high',
                        text: `${exp.id}: sample ratio mismatch (p=${primary.srm.pValue.toExponential(1)}). Do not interpret results.`,
                    });
                if (res.conflicts)
                    findings.push({
                        severity: 'medium',
                        text: `${exp.id}: ${res.conflicts} visitor(s) seen in more than one arm were excluded.`,
                    });
                if (exp.reviewBy && new Date(exp.reviewBy) < new Date())
                    findings.push({ severity: 'medium', text: `${exp.id}: review date ${exp.reviewBy} has passed.` });
                if (days > Number(exp.maxDays))
                    findings.push({
                        severity: 'medium',
                        text: `${exp.id}: past its ${exp.maxDays}-day limit; decide (promote or keep baseline) or stop.`,
                    });
                for (const c of primary?.comparisons || []) {
                    findings.push({
                        severity: c.verdict === 'harmful' ? 'high' : 'info',
                        text: `${exp.id} arm ${c.key}: ${c.verdict} — ${c.explanation}`,
                    });
                    if (
                        c.verdict === 'harmful' &&
                        settings.experiments.autoStopHarmful &&
                        exp.status === 'running' &&
                        !primary.srm.mismatch
                    ) {
                        await pause(system, exp.id, `Auto-paused: arm ${c.key} crossed the harmful interim boundary.`);
                        findings.push({
                            severity: 'high',
                            text: `${exp.id}: auto-paused under the guardrail rule (Settings → Experiments).`,
                        });
                    }
                }
                findings.push({
                    severity: 'info',
                    text: `${exp.id} v${exp.version}: ${totalN} customer visitors exposed; excluded traffic ${JSON.stringify(res.excluded)}.`,
                });
            }
            return {
                status: 'succeeded',
                facts: { active: experiments.length },
                findings,
                nextAction: 'Act on high-severity findings first; low traffic stays inconclusive.',
                dataWindow: 'Since each version started',
            };
        },
    },
    {
        id: 'competitor-monitor',
        title: 'Competitor source changes',
        question: 'Which watched competitor pages changed since the last check?',
        everyHours: 24,
        interpret: true,
        run: async ({ settings, trigger, by }) => {
            if (settings.research.paused && trigger !== 'manual')
                return {
                    status: 'insufficient_data',
                    facts: {},
                    findings: [],
                    nextAction: 'Research is paused.',
                    dataWindow: '—',
                };
            const run = await runResearch({ trigger, by });
            const overview = await researchOverview();
            if (run.status === 'skipped')
                return {
                    status: 'insufficient_data',
                    facts: { reason: run.reason },
                    findings: [],
                    nextAction: run.reason,
                    dataWindow: '—',
                };
            return {
                status: 'succeeded',
                facts: {
                    researchRun: run.id,
                    fetched: run.fetched,
                    changed: run.changed.length,
                    unchanged: run.unchanged,
                    failed: run.failed.length,
                    runStatus: run.status,
                },
                findings: [
                    ...run.changed.map((c) => ({
                        severity: 'medium',
                        text: `Changed: ${c.entryId} — ${c.label || c.url}`,
                        url: c.url,
                    })),
                    ...run.failed.map((f) => ({
                        severity: 'low',
                        text: `Could not check ${f.entryId} (${f.url}): ${f.reason}`,
                    })),
                ],
                nextAction: run.changed.length
                    ? 'Review the changed pages and record dated findings in Research; update docs/COMPETITORS.md if a conclusion changes.'
                    : `No watched page changed. ${overview.watchlist.entries.filter((e) => e.due).length} entries still due.`,
                dataWindow: 'Due watchlist entries at run time',
            };
        },
    },
    {
        id: 'http-status',
        title: 'Live page status',
        question: 'Do the site’s pages return 200 on the deployed origin?',
        everyHours: 24,
        run: async ({ settings }) => {
            const origin = process.env.ANALYSIS_TARGET_URL || process.env.BASE_URL;
            if (!origin)
                return {
                    status: 'not_connected',
                    facts: {},
                    findings: [],
                    nextAction: 'Set ANALYSIS_TARGET_URL (or BASE_URL) to the origin to check.',
                    dataWindow: '—',
                };
            const urls = listPages().map((p) => p.url);
            const limit = settings.analyses.budget.maxUrlFetchesPerRun;
            const sample = urls.slice(0, limit);
            const bad = [];
            const queue = [...sample];
            await Promise.all(
                Array.from({ length: 4 }, async () => {
                    while (queue.length) {
                        const url = queue.shift();
                        try {
                            const res = await fetch(origin + url, {
                                redirect: 'manual',
                                headers: { 'User-Agent': 'MSG91-website-admin-check/1.0' },
                                signal: AbortSignal.timeout(20_000),
                            });
                            if (res.status !== 200) bad.push({ url, status: res.status });
                        } catch (error) {
                            bad.push({ url, status: error.name === 'TimeoutError' ? 'timeout' : 'error' });
                        }
                    }
                })
            );
            return {
                status: 'succeeded',
                facts: {
                    origin,
                    checked: sample.length,
                    totalPages: urls.length,
                    partial: sample.length < urls.length,
                    nonOk: bad.length,
                },
                findings: bad.map((b) => ({ severity: 'high', text: `${b.url} → ${b.status}` })),
                nextAction: bad.length
                    ? 'Open each failing URL; a 404 for a published JSON page usually means a missing country file or BASE_URL problem.'
                    : sample.length < urls.length
                      ? `Checked ${sample.length} of ${urls.length}; raise the URL budget to cover all.`
                      : 'None.',
                dataWindow: `Live fetch of ${origin}`,
            };
        },
    },
    {
        id: 'core-web-vitals',
        title: 'Core Web Vitals (field data)',
        question: 'How do real Chrome users experience loading, responsiveness and stability?',
        everyHours: 24 * 7,
        run: async () => {
            if (!process.env.CRUX_API_KEY) {
                return {
                    status: 'not_connected',
                    facts: {},
                    findings: [],
                    nextAction: 'Create a Chrome UX Report API key in Google Cloud and set CRUX_API_KEY on the server.',
                    dataWindow: '—',
                };
            }
            const origin = process.env.CRUX_ORIGIN || 'https://msg91.com';
            const facts = { origin };
            const findings = [];
            for (const formFactor of ['PHONE', 'DESKTOP']) {
                const res = await fetch(
                    `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.CRUX_API_KEY}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ origin, formFactor }),
                        signal: AbortSignal.timeout(15_000),
                    }
                );
                if (res.status === 404) {
                    findings.push({ severity: 'info', text: `${formFactor}: not enough CrUX data for ${origin}.` });
                    continue;
                }
                if (!res.ok) throw new Error(`CrUX API ${res.status}`);
                const { record } = await res.json();
                const p75 = (m) => record.metrics?.[m]?.percentiles?.p75;
                const values = {
                    lcpMs: p75('largest_contentful_paint'),
                    inpMs: p75('interaction_to_next_paint'),
                    cls: p75('cumulative_layout_shift'),
                };
                facts[formFactor.toLowerCase()] = { ...values, period: record.collectionPeriod };
                const lcp = Number(values.lcpMs);
                const inp = Number(values.inpMs);
                const cls = Number(values.cls);
                if (lcp > 2500)
                    findings.push({
                        severity: lcp > 4000 ? 'high' : 'medium',
                        text: `${formFactor} LCP p75 ${lcp} ms (good ≤ 2500)`,
                    });
                if (inp > 200)
                    findings.push({
                        severity: inp > 500 ? 'high' : 'medium',
                        text: `${formFactor} INP p75 ${inp} ms (good ≤ 200)`,
                    });
                if (cls > 0.1)
                    findings.push({
                        severity: cls > 0.25 ? 'high' : 'medium',
                        text: `${formFactor} CLS p75 ${cls} (good ≤ 0.1)`,
                    });
            }
            return {
                status: 'succeeded',
                facts,
                findings,
                nextAction: findings.some((f) => f.severity !== 'info')
                    ? 'Profile the worst metric on the highest-traffic template with Lighthouse, then re-check after deploy.'
                    : 'All measured metrics are in the good range.',
                dataWindow: 'CrUX 28-day rolling window (field data)',
            };
        },
    },
    {
        id: 'search-console',
        title: 'Search performance',
        question: 'Which pages and queries bring search visits, and what is not indexed?',
        everyHours: 24 * 7,
        run: async () => ({
            status: 'not_connected',
            facts: {},
            findings: [],
            nextAction:
                'Grant a service account read access to the msg91.com Search Console property and add a connector (contract in docs/CONTRACTS.md). No search data is shown until then.',
            dataWindow: '—',
        }),
    },
    {
        id: 'conversion-funnel',
        title: 'Visit → sign-up funnel',
        question: 'Where do visitors drop between landing and completed sign-up?',
        everyHours: 24,
        run: async () => ({
            status: 'not_connected',
            facts: {},
            findings: [],
            nextAction:
                'Site-wide funnel data lives in GTM/GA and the MSG91 sign-up backend, neither connected here. Experiment-level conversions are measured (Experiments). See docs/MEASUREMENT.md for the connector contract.',
            dataWindow: '—',
        }),
    },
];

export function findAnalysis(id) {
    return ANALYSES.find((a) => a.id === id) || null;
}

// Which analyses an event should trigger.
export const EVENT_TRIGGERS = {
    deploy: ['http-status', 'page-registry', 'seo-metadata'],
    'experiment.launch': ['experiment-health'],
    'knowledge.effective': ['knowledge-freshness'],
};
