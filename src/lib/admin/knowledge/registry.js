// The knowledge documents the admin exposes. Each one lives in the repository and the repository
// is the only source of truth: the admin reads the effective revision and writes changes back as
// reviewed commits. Keep this list in step with the reading order in AGENTS.md.
export const KNOWLEDGE_DOCS = [
    {
        id: 'agents',
        path: 'AGENTS.md',
        title: 'Agent entry point',
        group: 'engineering',
        owns: 'Reading order, project rules, workflow, operator guidance for agents',
    },
    {
        id: 'vision',
        path: 'docs/VISION.md',
        title: 'Vision',
        group: 'marketing',
        owns: 'Purpose, ICP, principles, priorities, non-goals',
    },
    {
        id: 'positioning',
        path: 'docs/POSITIONING.md',
        title: 'Positioning',
        group: 'marketing',
        owns: 'Audiences, promise, differentiators, offers, CTAs, claim register',
    },
    {
        id: 'design',
        path: 'docs/DESIGN.md',
        title: 'Brand & design',
        group: 'marketing',
        owns: 'Voice, terminology, tokens, components, accessibility',
    },
    {
        id: 'seo',
        path: 'docs/SEO.md',
        title: 'SEO & page map',
        group: 'marketing',
        owns: 'Search intent, page map, canonical/indexing, sitemaps, redirects',
    },
    {
        id: 'competitors',
        path: 'docs/COMPETITORS.md',
        title: 'Competitors',
        group: 'marketing',
        owns: 'Competitors, substitutes, dated evidence, positioning gaps',
    },
    {
        id: 'measurement',
        path: 'docs/MEASUREMENT.md',
        title: 'Measurement',
        group: 'marketing',
        owns: 'Conversion journey, metric and event definitions, data gaps',
    },
    {
        id: 'experiments',
        path: 'docs/EXPERIMENTS.md',
        title: 'Experiment policy',
        group: 'marketing',
        owns: 'Experiment rules, decision method, approvals, retirement',
    },
    {
        id: 'architecture',
        path: 'docs/ARCHITECTURE.md',
        title: 'Architecture',
        group: 'engineering',
        owns: 'Structure, routing, rendering, admin, experimentation',
    },
    {
        id: 'flows',
        path: 'docs/FLOWS.md',
        title: 'Flows',
        group: 'engineering',
        owns: 'Visitor and admin journeys, failures, recovery',
    },
    {
        id: 'contracts',
        path: 'docs/CONTRACTS.md',
        title: 'Contracts',
        group: 'engineering',
        owns: 'APIs, page JSON, cookies, analytics and experiment events',
    },
    {
        id: 'development',
        path: 'docs/DEVELOPMENT.md',
        title: 'Development',
        group: 'engineering',
        owns: 'Setup, env vars, checks, admin operations, deployment',
    },
    {
        id: 'decisions',
        path: 'docs/DECISIONS.md',
        title: 'Decisions',
        group: 'engineering',
        owns: 'ADRs, superseded choices, lessons',
    },
    {
        id: 'open-questions',
        path: 'docs/OPEN_QUESTIONS.md',
        title: 'Open questions',
        group: 'engineering',
        owns: 'Unknowns, blockers, owners, resolution criteria',
    },
];

export function findDoc(id) {
    return KNOWLEDGE_DOCS.find((doc) => doc.id === id) || null;
}
