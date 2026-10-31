import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { request } from 'node:http';
import { loadReference, markdownFile, referenceFile, renderMarkdown, repoRoot } from './reference.mjs';
import { startServer } from './server.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const write = process.argv.includes('--write');

function fail(message) {
    process.stderr.write(`${message}\n`);
    process.exit(1);
}

function listRouteFiles(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) listRouteFiles(path, acc);
        else if (name.endsWith('.js')) acc.push(path);
    }
    return acc;
}

function routePath(file, apiRoot) {
    const rel = relative(apiRoot, file).split(sep).join('/');
    return `/api/${rel.replace(/\.js$/, '')}`;
}

function assertReference(doc) {
    const ids = new Set();
    const paths = new Set();
    const required = [
        'id',
        'method',
        'path',
        'authentication',
        'summary',
        'parameters',
        'body',
        'response',
        'errors',
        'source',
        'callers',
        'notes',
        'acceptedMethods',
    ];
    for (const endpoint of doc.endpoints) {
        for (const key of required) {
            if (!(key in endpoint)) fail(`${endpoint.id || endpoint.path} is missing ${key}`);
        }
        if (ids.has(endpoint.id)) fail(`Duplicate id ${endpoint.id}`);
        ids.add(endpoint.id);
        if (paths.has(endpoint.path)) fail(`Duplicate path ${endpoint.path}`);
        paths.add(endpoint.path);
        if (
            !Array.isArray(endpoint.parameters) ||
            !Array.isArray(endpoint.errors) ||
            !Array.isArray(endpoint.callers)
        ) {
            fail(`${endpoint.id} parameters, errors and callers must be arrays`);
        }
        if (!endpoint.response?.variants?.length) fail(`${endpoint.id} needs response.variants`);
        if (endpoint.body) {
            if (!endpoint.body.contentType || !endpoint.body.description || !Array.isArray(endpoint.body.fields)) {
                fail(`${endpoint.id} body is incomplete`);
            }
        }
        for (const error of endpoint.errors) {
            if ((typeof error.status !== 'number' && typeof error.status !== 'string') || !error.when || !error.body) {
                fail(`${endpoint.id} has an incomplete error`);
            }
        }
    }

    const apiRoot = join(repoRoot(), 'src', 'pages', 'api');
    const files = listRouteFiles(apiRoot);
    const fromDisk = new Set(files.map((file) => routePath(file, apiRoot)));
    for (const path of fromDisk) {
        if (!paths.has(path)) fail(`Route ${path} is not in docs/internal-api.json`);
    }
    for (const path of paths) {
        if (!fromDisk.has(path)) fail(`Documented path ${path} has no file under src/pages/api`);
    }
    for (const endpoint of doc.endpoints) {
        const source = join(repoRoot(), endpoint.source);
        if (!statSync(source).isFile()) fail(`Missing source ${endpoint.source}`);
    }
}

function prettier(file) {
    const bin = join(repoRoot(), 'node_modules', 'prettier', 'bin', 'prettier.cjs');
    const config = join(repoRoot(), '.prettierrc.json');
    execFileSync(process.execPath, [bin, '--write', '--config', config, file], { stdio: 'inherit' });
}

function syncMarkdown(doc) {
    const target = markdownFile();
    if (write) {
        writeFileSync(target, renderMarkdown(doc));
        prettier(target);
        return;
    }
    const dir = mkdtempSync(join(tmpdir(), 'msg91-api-docs-'));
    const draft = join(dir, 'INTERNAL_API.md');
    writeFileSync(draft, renderMarkdown(doc));
    prettier(draft);
    const expected = readFileSync(draft, 'utf8');
    const actual = readFileSync(target, 'utf8');
    if (expected !== actual) {
        fail('docs/INTERNAL_API.md is out of date. Run node mcp/api-reference/check.mjs --write');
    }
}

function scanForCallsAndSecrets() {
    const serverFiles = ['server.mjs', 'reference.mjs'].map((name) => join(here, name));
    const published = [...serverFiles, join(here, 'README.md'), referenceFile(), markdownFile()];
    const bannedInCode = ['fetch(', 'axios', 'http.request', 'https.request', 'net.connect', 'child_process'];
    const bannedSecrets = ['cc258334_41ce_4f12_856a_dc4e207b74b4', 'm.9m.io/ipcy82y', 'LIC+Tower'];
    for (const file of serverFiles) {
        const text = readFileSync(file, 'utf8');
        for (const token of bannedInCode) {
            if (text.includes(token))
                fail(`${relative(repoRoot(), file)} contains ${token}. The MCP server must not call out.`);
        }
    }
    for (const file of published) {
        const text = readFileSync(file, 'utf8');
        for (const secret of bannedSecrets) {
            if (text.includes(secret))
                fail(`${relative(repoRoot(), file)} contains a value that must stay in the route handler only`);
        }
    }
}

function post(port, payload, { method = 'POST', path = '/mcp', hostHeader = `127.0.0.1:${port}` } = {}) {
    const body = payload === undefined ? null : typeof payload === 'string' ? payload : JSON.stringify(payload);
    return new Promise((resolve, reject) => {
        const req = request(
            {
                hostname: '127.0.0.1',
                port,
                path,
                method,
                headers: {
                    Host: hostHeader,
                    'Content-Type': 'application/json',
                    Accept: 'application/json, text/event-stream',
                    ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
                },
            },
            (res) => {
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => {
                    const raw = Buffer.concat(chunks).toString('utf8');
                    let json = null;
                    try {
                        json = raw ? JSON.parse(raw) : null;
                    } catch {
                        json = null;
                    }
                    resolve({ status: res.statusCode, json, raw });
                });
            }
        );
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

async function exercise(port, doc) {
    const init = await post(port, {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'check', version: '0' } },
    });
    if (init.status !== 200 || init.json?.result?.serverInfo?.name !== 'msg91-website-internal-api') {
        fail(`initialize failed: ${init.status} ${init.raw}`);
    }
    if (init.json.result.protocolVersion !== '2025-06-18') fail('initialize did not echo the protocol version');

    const note = await post(port, { jsonrpc: '2.0', method: 'notifications/initialized' });
    if (note.status !== 202) fail(`notification status ${note.status}`);

    const listed = await post(port, { jsonrpc: '2.0', id: 2, method: 'tools/list' });
    const tools = listed.json?.result?.tools?.map((tool) => tool.name);
    if (tools?.join(',') !== 'list_endpoints,read_endpoint') fail(`unexpected tools: ${tools}`);

    const index = await post(port, {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: { name: 'list_endpoints', arguments: {} },
    });
    const indexText = index.json?.result?.content?.[0]?.text || '';
    if (index.json?.result?.isError) fail(indexText);
    for (const endpoint of doc.endpoints) {
        if (!indexText.includes(endpoint.id) || !indexText.includes(endpoint.path)) {
            fail(`list_endpoints omitted ${endpoint.id}`);
        }
    }

    for (const endpoint of doc.endpoints) {
        const read = await post(port, {
            jsonrpc: '2.0',
            id: endpoint.id,
            method: 'tools/call',
            params: { name: 'read_endpoint', arguments: { id: endpoint.id } },
        });
        const text = read.json?.result?.content?.[0]?.text || '';
        if (read.json?.result?.isError) fail(text);
        for (const heading of ['Authentication', 'Parameters', 'Body', 'Response', 'Errors']) {
            if (!text.includes(heading)) fail(`${endpoint.id} response missing ${heading}`);
        }
        if (!text.includes(endpoint.method) || !text.includes(endpoint.path))
            fail(`${endpoint.id} missing method or path`);
    }

    const missing = await post(port, {
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: { name: 'read_endpoint', arguments: { id: 'nope' } },
    });
    if (!missing.json?.result?.isError) fail('unknown id should be a tool error');

    const byPath = await post(port, {
        jsonrpc: '2.0',
        id: 5,
        method: 'tools/call',
        params: { name: 'read_endpoint', arguments: { method: 'POST', path: '/api/curlConvert' } },
    });
    if (byPath.json?.result?.isError || !byPath.json?.result?.content?.[0]?.text?.includes('api-curl-convert')) {
        fail('read by method and path failed');
    }

    const ping = await post(port, { jsonrpc: '2.0', id: 6, method: 'ping' });
    if (ping.status !== 200 || !ping.json?.result) fail('ping failed');

    const unknown = await post(port, { jsonrpc: '2.0', id: 7, method: 'resources/list' });
    if (unknown.json?.error?.code !== -32601) fail('unknown method should be -32601');

    const bad = await post(port, '{');
    if (bad.json?.error?.code !== -32700) fail('parse error should be -32700');

    const get = await post(port, undefined, { method: 'GET' });
    if (get.status !== 405) fail(`GET should be 405, got ${get.status}`);

    const otherHost = await post(port, { jsonrpc: '2.0', id: 8, method: 'ping' }, { hostHeader: 'evil.example' });
    if (otherHost.status !== 403) fail(`unexpected host should be 403, got ${otherHost.status}`);

    const elsewhere = await post(port, { jsonrpc: '2.0', id: 9, method: 'ping' }, { path: '/api/data' });
    if (elsewhere.status !== 404) fail('a path other than /mcp should be 404');
}

const doc = loadReference();
assertReference(doc);
syncMarkdown(doc);
scanForCallsAndSecrets();
const running = await startServer({ host: '127.0.0.1', port: 0 });
try {
    await exercise(running.port, doc);
} finally {
    await running.close();
}
process.stdout.write(`Internal API MCP check passed (${doc.endpoints.length} endpoints).\n`);
