#!/usr/bin/env node
// Records status, SEO signals and a normalized HTML hash for every public URL the site serves,
// so a refactor can be checked for regressions against a snapshot taken before it.
//
//   node scripts/snapshot-routes.mjs snapshot <out.json> [--base http://localhost:3030]
//   node scripts/snapshot-routes.mjs compare <before.json> <after.json>
//
// The server at --base must be running a production build (`npm start`).

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dataDir = join(root, 'src/data');
const countries = JSON.parse(readFileSync(join(dataDir, 'availableCountries.json'), 'utf8')).map((c) =>
    c.shortname.toLowerCase()
);

function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

export function listUrls() {
    const urls = new Set();
    for (const folder of ['global', ...countries]) {
        const base = join(dataDir, folder);
        for (const file of walk(base).filter((f) => f.endsWith('.json'))) {
            const rel = relative(base, file)
                .split(sep)
                .join('/')
                .replace(/\.json$/, '');
            if (rel === 'common' || rel === 'pricing') continue;
            const prefix = folder === 'global' ? '' : `/${folder}`;
            urls.add(rel === 'home' ? prefix || '/' : `${prefix}/${rel}`);
        }
        const pricing = JSON.parse(readFileSync(join(base, 'pricing.json'), 'utf8'));
        for (const group of Object.values(pricing.products || {})) {
            for (const product of group) {
                urls.add(`${folder === 'global' ? '' : `/${folder}`}/pricing/${product.slug}`);
            }
        }
    }
    const posts = readdirSync(join(root, '_posts/blog'))
        .filter((f) => f.endsWith('.mdx'))
        .sort()
        .slice(0, 5)
        .map((f) => `/guide/${f.split('.')[0]}`);
    ['/guide', '/guide?page=2', '/demochatbot', '/verify', '/does-not-exist', '/xx/pricing/sms', ...posts].forEach(
        (u) => urls.add(u)
    );
    return [...urls].sort();
}

const pick = (html, re) => (html.match(re)?.[1] || '').trim();

function normalize(html) {
    return html
        .replace(/\/_next\/static\/[^"' ]+/g, '/_next/static/X')
        .replace(/"buildId":"[^"]+"/g, '"buildId":"X"')
        .replace(/nonce="[^"]*"/g, '');
}

async function snapshotUrl(base, url) {
    try {
        const res = await fetch(base + url, { redirect: 'manual' });
        const html = await res.text();
        return {
            status: res.status,
            title: pick(html, /<title[^>]*>([^<]*)<\/title>/i),
            description: pick(html, /<meta name="description" content="([^"]*)"/i),
            canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
            robots: pick(html, /<meta name="robots" content="([^"]*)"/i),
            h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
                .replace(/<[^>]+>/g, '')
                .slice(0, 120),
            hreflang: (html.match(/hreflang=/g) || []).length,
            hash: createHash('sha1').update(normalize(html)).digest('hex').slice(0, 12),
        };
    } catch (error) {
        return { status: 'error', error: String(error.message || error) };
    }
}

async function snapshot(out, base) {
    const urls = listUrls();
    const result = {};
    const queue = [...urls];
    const workers = Array.from({ length: 6 }, async () => {
        while (queue.length) {
            const url = queue.shift();
            result[url] = await snapshotUrl(base, url);
        }
    });
    await Promise.all(workers);
    const sorted = Object.fromEntries(
        Object.keys(result)
            .sort()
            .map((k) => [k, result[k]])
    );
    writeFileSync(out, JSON.stringify({ base, takenAt: new Date().toISOString(), urls: sorted }, null, 2));
    const statuses = Object.values(sorted).reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {});
    console.log(`Snapshot of ${urls.length} URLs written to ${out}`, statuses);
}

function compare(beforePath, afterPath) {
    const before = JSON.parse(readFileSync(beforePath, 'utf8')).urls;
    const after = JSON.parse(readFileSync(afterPath, 'utf8')).urls;
    const fields = ['status', 'title', 'description', 'canonical', 'robots', 'h1', 'hreflang', 'hash'];
    let differences = 0;
    for (const url of new Set([...Object.keys(before), ...Object.keys(after)])) {
        const a = before[url];
        const b = after[url];
        if (!a || !b) {
            console.log(`${url}: ${a ? 'missing after' : 'new after'}`);
            differences++;
            continue;
        }
        const changed = fields.filter((f) => a[f] !== b[f]);
        if (changed.length) {
            differences++;
            console.log(
                `${url}: ${changed.map((f) => `${f} ${JSON.stringify(a[f])} -> ${JSON.stringify(b[f])}`).join('; ')}`
            );
        }
    }
    console.log(differences ? `${differences} URL(s) differ.` : 'No differences.');
    process.exitCode = differences ? 1 : 0;
}

const [command, ...args] = process.argv.slice(2);
const baseIndex = args.indexOf('--base');
const base = baseIndex >= 0 ? args[baseIndex + 1] : 'http://localhost:3030';
if (command === 'snapshot' && args[0]) await snapshot(args[0], base);
else if (command === 'compare' && args[1]) compare(args[0], args[1]);
else if (command === 'list') console.log(listUrls().join('\n'));
else {
    console.error('Usage: snapshot <out.json> [--base URL] | compare <before.json> <after.json> | list');
    process.exitCode = 2;
}
