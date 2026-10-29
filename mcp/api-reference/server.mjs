import { realpathSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { listEndpointsText, loadReference, readEndpointText } from './reference.mjs';

const MCP_PATH = '/mcp';
const PROTOCOL_FALLBACK = '2025-06-18';
const SERVER_INFO = { name: 'msg91-website-internal-api', version: '1.0.0' };
const BODY_LIMIT = 1_000_000;

const TOOLS = [
    {
        name: 'list_endpoints',
        title: 'List internal API endpoints',
        description:
            'List the Next.js routes under src/pages/api for the MSG91 marketing site. Returns id, method, path and a one-line summary for each. Does not call the site.',
        inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
        },
    },
    {
        name: 'read_endpoint',
        title: 'Read one internal API endpoint',
        description:
            'Read one endpoint from the internal API reference: method, path, authentication, parameters, body, response and errors. Pass id, or method together with path. Does not call the site.',
        inputSchema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'Endpoint id from list_endpoints, such as api-data.',
                },
                method: {
                    type: 'string',
                    description: 'HTTP method, used with path when id is omitted.',
                },
                path: {
                    type: 'string',
                    description: 'Request path, such as /api/data, used with method when id is omitted.',
                },
            },
            additionalProperties: false,
        },
    },
];

function rpcResult(id, result) {
    return { jsonrpc: '2.0', id, result };
}

function rpcError(id, code, message) {
    return { jsonrpc: '2.0', id: id ?? null, error: { code, message } };
}

function toolResult(text, isError = false) {
    const result = { content: [{ type: 'text', text }] };
    if (isError) result.isError = true;
    return result;
}

function allowedHost(req) {
    const host = String(req.headers.host || '')
        .split(':')[0]
        .replace(/^\[|\]$/g, '')
        .toLowerCase();
    const extra = String(process.env.MCP_PUBLIC_HOST || '')
        .split(',')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);
    return host === 'localhost' || host === '127.0.0.1' || host === '::1' || extra.includes(host);
}

function allowedOrigin(req) {
    const origin = req.headers.origin;
    if (!origin) return true;
    let hostname = '';
    try {
        hostname = new URL(origin).hostname.toLowerCase();
    } catch {
        return false;
    }
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return true;
    const extra = String(process.env.MCP_ALLOWED_ORIGINS || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    return extra.includes(origin);
}

export function handleRpc(message) {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        return { kind: 'response', status: 200, body: rpcError(null, -32600, 'Invalid Request') };
    }
    const hasId = Object.prototype.hasOwnProperty.call(message, 'id');
    const method = message.method;
    if (message.jsonrpc !== '2.0' || typeof method !== 'string') {
        return { kind: 'response', status: 200, body: rpcError(hasId ? message.id : null, -32600, 'Invalid Request') };
    }
    if (!hasId) {
        if (method.startsWith('notifications/')) return { kind: 'notification' };
        return { kind: 'response', status: 200, body: rpcError(null, -32600, 'Invalid Request') };
    }

    if (method === 'initialize') {
        const requested = message.params?.protocolVersion;
        const protocolVersion =
            typeof requested === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(requested) ? requested : PROTOCOL_FALLBACK;
        return {
            kind: 'response',
            status: 200,
            protocolVersion,
            body: rpcResult(message.id, {
                protocolVersion,
                capabilities: { tools: { listChanged: false } },
                serverInfo: SERVER_INFO,
                instructions:
                    'Read-only reference for the Next.js routes under src/pages/api of the MSG91 marketing site. Call list_endpoints, then read_endpoint. This server holds no secrets and does not call the website or any upstream.',
            }),
        };
    }

    if (method === 'ping') {
        return { kind: 'response', status: 200, body: rpcResult(message.id, {}) };
    }

    if (method === 'tools/list') {
        return { kind: 'response', status: 200, body: rpcResult(message.id, { tools: TOOLS }) };
    }

    if (method === 'tools/call') {
        const name = message.params?.name;
        const args =
            message.params?.arguments && typeof message.params.arguments === 'object' ? message.params.arguments : {};
        let reference;
        try {
            reference = loadReference();
        } catch (error) {
            return {
                kind: 'response',
                status: 200,
                body: rpcResult(message.id, toolResult(`API reference could not be read: ${error.message}`, true)),
            };
        }
        if (name === 'list_endpoints') {
            return {
                kind: 'response',
                status: 200,
                body: rpcResult(message.id, toolResult(listEndpointsText(reference))),
            };
        }
        if (name === 'read_endpoint') {
            const outcome = readEndpointText(reference, args);
            return {
                kind: 'response',
                status: 200,
                body: rpcResult(message.id, toolResult(outcome.text, outcome.isError)),
            };
        }
        return {
            kind: 'response',
            status: 200,
            body: rpcResult(
                message.id,
                toolResult(`Unknown tool: ${String(name)}. Tools: list_endpoints, read_endpoint.`, true)
            ),
        };
    }

    return { kind: 'response', status: 200, body: rpcError(message.id, -32601, `Method not found: ${method}`) };
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        let size = 0;
        req.on('data', (chunk) => {
            size += chunk.length;
            if (size > BODY_LIMIT) {
                reject(Object.assign(new Error('Body too large'), { statusCode: 413 }));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });
        req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        req.on('error', reject);
    });
}

function sendJson(res, status, body, extraHeaders) {
    const payload = JSON.stringify(body);
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'Cache-Control': 'no-store',
        ...extraHeaders,
    });
    res.end(payload);
}

function corsHeaders(req) {
    const origin = req.headers.origin;
    if (!origin || !allowedOrigin(req)) return {};
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version',
        Vary: 'Origin',
    };
}

export function createMcpServer() {
    return createServer(async (req, res) => {
        try {
            const url = new URL(req.url || '/', 'http://127.0.0.1');
            if (url.pathname !== MCP_PATH) {
                sendJson(res, 404, rpcError(null, -32601, 'Not found. The MCP path is /mcp.'));
                return;
            }
            if (!allowedHost(req) || !allowedOrigin(req)) {
                sendJson(res, 403, rpcError(null, -32000, 'Host or Origin is not allowed.'));
                return;
            }
            if (req.method === 'OPTIONS') {
                res.writeHead(204, corsHeaders(req));
                res.end();
                return;
            }
            if (req.method !== 'POST') {
                sendJson(
                    res,
                    405,
                    rpcError(null, -32601, 'Only POST is accepted. This server does not open an SSE stream.'),
                    {
                        Allow: 'POST',
                        ...corsHeaders(req),
                    }
                );
                return;
            }

            let raw = '';
            try {
                raw = await readBody(req);
            } catch (error) {
                sendJson(
                    res,
                    error.statusCode || 400,
                    rpcError(null, -32700, error.message || 'Could not read the body')
                );
                return;
            }

            let message;
            try {
                message = JSON.parse(raw);
            } catch {
                sendJson(res, 200, rpcError(null, -32700, 'Parse error'), corsHeaders(req));
                return;
            }

            if (Array.isArray(message)) {
                sendJson(res, 200, rpcError(null, -32600, 'Batch requests are not supported'), corsHeaders(req));
                return;
            }

            const outcome = handleRpc(message);
            if (outcome.kind === 'notification') {
                res.writeHead(202, corsHeaders(req));
                res.end();
                return;
            }
            const headers = { ...corsHeaders(req) };
            if (outcome.protocolVersion) headers['Mcp-Protocol-Version'] = outcome.protocolVersion;
            sendJson(res, outcome.status, outcome.body, headers);
        } catch {
            if (!res.headersSent) sendJson(res, 500, rpcError(null, -32603, 'Internal error'));
        }
    });
}

export function startServer({ host = '127.0.0.1', port = 8787 } = {}) {
    const server = createMcpServer();
    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, host, () => {
            const address = server.address();
            resolve({
                server,
                host,
                port: address.port,
                path: MCP_PATH,
                url: `http://${host}:${address.port}${MCP_PATH}`,
                close: () =>
                    new Promise((done, fail) => {
                        server.close((error) => (error ? fail(error) : done()));
                    }),
            });
        });
    });
}

function main() {
    const host = process.env.HOST || '127.0.0.1';
    const port = Number(process.env.PORT || 8787);
    startServer({ host, port })
        .then((running) => {
            process.stdout.write(`MSG91 internal API reference MCP listening on http://${host}:${running.port}/mcp\n`);
        })
        .catch((error) => {
            process.stderr.write(`${error.message}\n`);
            process.exit(1);
        });
}

const invokedDirectly =
    process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
if (invokedDirectly) main();
