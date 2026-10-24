// Deterministic checks over the repository's page JSON, shared by scripts and admin analyses.
// Pure Node (no Next.js aliases) so scripts/ can import it too.
import fs from 'node:fs';
import path from 'node:path';

export function repoPaths(root = process.cwd()) {
    return {
        root,
        dataDir: path.join(root, 'src/data'),
        registry: path.join(root, 'src/components/PageRenderer/sectionRegistry.js'),
        sitemap: path.join(root, 'public/sitemap.xml'),
    };
}

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });
}

// Every catch-all page: { url, file, folder, data }.
export function listPages(root = process.cwd()) {
    const { dataDir } = repoPaths(root);
    const countries = JSON.parse(fs.readFileSync(path.join(dataDir, 'availableCountries.json'), 'utf8')).map((c) =>
        c.shortname.toLowerCase()
    );
    const pages = [];
    for (const folder of ['global', ...new Set(countries)]) {
        const base = path.join(dataDir, folder);
        if (!fs.existsSync(base)) continue;
        for (const file of walk(base).filter((f) => f.endsWith('.json'))) {
            const rel = path
                .relative(base, file)
                .split(path.sep)
                .join('/')
                .replace(/\.json$/, '');
            if (rel === 'common' || rel === 'pricing') continue;
            const prefix = folder === 'global' ? '' : `/${folder}`;
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            if (data.show === false || data.common) continue;
            pages.push({
                url: rel === 'home' ? prefix || '/' : `${prefix}/${rel}`,
                file: path.relative(root, file),
                folder,
                data,
            });
        }
    }
    return pages;
}

export function registeredKeys(root = process.cwd()) {
    const source = fs.readFileSync(repoPaths(root).registry, 'utf8');
    const block = source.match(/export const Components = \{([\s\S]*?)\n\};/);
    if (!block) throw new Error('Could not find the Components registry');
    return new Set(
        block[1]
            .split('\n')
            .map((line) => line.replace(/\/\/.*$/, '').trim())
            .filter(Boolean)
            .map((line) => line.split(/[:,]/)[0].trim())
            .filter((key) => /^\w+$/.test(key))
    );
}

export function checkRegistry(root = process.cwd(), allow = new Set(['show', 'moreFeature'])) {
    const keys = registeredKeys(root);
    const problems = [];
    const pages = listPages(root);
    for (const page of pages) {
        for (const key of Object.keys(page.data)) {
            if (!keys.has(key) && !allow.has(key)) problems.push({ file: page.file, key });
        }
    }
    return { pages: pages.length, registered: keys.size, problems };
}

// Metadata checks against docs/SEO.md targets: title ≤ 60, description 70–160, unique per folder.
export function checkMetadata(root = process.cwd()) {
    const pages = listPages(root);
    const findings = [];
    const titles = new Map();
    for (const page of pages) {
        const head = page.data.HeadComp;
        const selfHeaded = ['CaseStudyPageComp', 'CaseStudyPageCompOld', 'SignUp'].some((k) => k in page.data);
        if (!head) {
            if (!selfHeaded)
                findings.push({
                    url: page.url,
                    file: page.file,
                    issue: 'missing HeadComp (no title, description, canonical or analytics)',
                });
            continue;
        }
        const title = String(head.title || '');
        const description = String(head.description || '');
        if (!title) findings.push({ url: page.url, file: page.file, issue: 'missing title' });
        else if (title.length > 60)
            findings.push({ url: page.url, file: page.file, issue: `title ${title.length} chars (> 60)` });
        if (!description) findings.push({ url: page.url, file: page.file, issue: 'missing description' });
        else if (description.length > 160 || description.length < 70)
            findings.push({
                url: page.url,
                file: page.file,
                issue: `description ${description.length} chars (target 70–160)`,
            });
        const key = `${page.folder}:${title.toLowerCase()}`;
        if (title) titles.set(key, [...(titles.get(key) || []), page.url]);
    }
    for (const [key, urls] of titles) {
        if (urls.length > 1) findings.push({ url: urls.join(', '), issue: `duplicate title in ${key.split(':')[0]}` });
    }
    return { pages: pages.length, findings };
}

export function checkSitemap(root = process.cwd()) {
    const { sitemap } = repoPaths(root);
    const xml = fs.readFileSync(sitemap, 'utf8');
    const listed = new Set(
        [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => {
            const url = new URL(m[1]);
            return url.pathname.replace(/\/$/, '') || '/';
        })
    );
    const pages = listPages(root).map((p) => p.url);
    const missing = pages.filter((url) => !listed.has(url));
    const orphaned = [...listed].filter(
        (url) => !pages.includes(url) && !url.startsWith('/guide') && !url.includes('/pricing/')
    );
    return { pages: pages.length, listed: listed.size, missing, orphaned };
}

// Repeated quantitative claims and their variants, e.g. "30,000+ businesses" vs "40K clients".
const CLAIM_PATTERNS = [
    {
        topic: 'customer count',
        re: /(?<![A-Za-z\d])(\d[\d,.]*\s*(?:k|K|\+|,000\+?)?\+?)\s+(?:global\s+)?(?:businesses|customers|clients|brands|companies)/g,
    },
    { topic: 'countries', re: /(\d[\d,]*\+?)\s*countries/g },
    { topic: 'uptime', re: /(\d{2}(?:\.\d+)?%)\s*(?:uptime|availability|SLA)/gi },
    { topic: 'integrations', re: /(\d[\d,]*\+?)\s*integrations/gi },
    { topic: 'operators', re: /(\d[\d,]*\+?)\s*(?:direct\s+)?operator/gi },
];

export function checkClaims(root = process.cwd()) {
    const pages = listPages(root);
    const topics = {};
    for (const page of pages) {
        const text = JSON.stringify(page.data).replace(/<[^>]+>/g, ' ');
        for (const { topic, re } of CLAIM_PATTERNS) {
            for (const match of text.matchAll(re)) {
                const value = match[1].replace(/\s+/g, '').toLowerCase();
                const entry = (topics[topic] ||= {});
                (entry[value] ||= new Set()).add(page.url);
            }
        }
    }
    return Object.entries(topics).map(([topic, values]) => ({
        topic,
        variants: Object.entries(values)
            .map(([value, urls]) => ({ value, pages: urls.size, examples: [...urls].slice(0, 4) }))
            .sort((a, b) => b.pages - a.pages),
    }));
}
