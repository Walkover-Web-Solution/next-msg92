// Checks that every top-level key in the page JSON under src/data/ is registered in the
// `Components` map in src/components/PageRenderer/sectionRegistry.js. An unregistered key renders nothing and only
// logs a console error in the browser, so typos ship silently without this check.
// Usage: node scripts/check-page-data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'src/data');
const registrySource = fs.readFileSync(path.join(root, 'src/components/PageRenderer/sectionRegistry.js'), 'utf8');

const registryBlock = registrySource.match(/export const Components = \{([\s\S]*?)\n\};/);
if (!registryBlock) {
    console.error('Could not find `export const Components = {...}` in src/components/PageRenderer/sectionRegistry.js');
    process.exit(2);
}
const registered = new Set(
    registryBlock[1]
        .split('\n')
        .map((line) => line.replace(/\/\/.*$/, '').trim())
        .filter(Boolean)
        .map((line) => line.split(/[:,]/)[0].trim())
        .filter((key) => /^\w+$/.test(key))
);

// Keys that src/pages/api/data.js reads itself instead of rendering.
const nonComponentKeys = new Set(['show']);

// Known unregistered keys present at the time this check was added. They render nothing today;
// see docs/OPEN_QUESTIONS.md before registering or deleting them. Don't add new entries here.
const knownUnregisteredKeys = new Set(['moreFeature']);

// pricing.json is read by src/pages/pricing/[products].js and src/pages/[country]/pricing/[products].js,
// not by the catch-all route, so its keys are not section components.
const notCatchAllPages = new Set(['pricing.json']);

// Page folders are the country folders listed in availableCountries.json plus `global`.
const countries = JSON.parse(fs.readFileSync(path.join(dataDir, 'availableCountries.json'), 'utf8'));
const pageFolders = ['global', ...new Set(countries.map((c) => c.shortname.toLowerCase()))];

const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(full);
        return entry.name.endsWith('.json') && entry.name !== 'common.json' && !notCatchAllPages.has(entry.name)
            ? [full]
            : [];
    });

const problems = [];
let pageCount = 0;
for (const folder of pageFolders) {
    const dir = path.join(dataDir, folder);
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
        pageCount++;
        const json = JSON.parse(fs.readFileSync(file, 'utf8'));
        for (const key of Object.keys(json)) {
            if (!registered.has(key) && !nonComponentKeys.has(key) && !knownUnregisteredKeys.has(key)) {
                problems.push(
                    `${path.relative(root, file)}: "${key}" is not registered in src/components/PageRenderer/sectionRegistry.js`
                );
            }
        }
    }
}

if (problems.length) {
    console.error(problems.join('\n'));
    console.error(`\n${problems.length} unregistered key(s) in ${pageCount} page files.`);
    process.exit(1);
}
console.log(`OK: ${pageCount} page files, ${registered.size} registered components.`);
