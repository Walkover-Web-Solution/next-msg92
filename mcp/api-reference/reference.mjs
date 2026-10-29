import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

export function repoRoot() {
    return root;
}

export function referenceFile() {
    return join(root, 'docs', 'internal-api.json');
}

export function markdownFile() {
    return join(root, 'docs', 'INTERNAL_API.md');
}

export function loadReference() {
    const doc = JSON.parse(readFileSync(referenceFile(), 'utf8'));
    if (!doc || !Array.isArray(doc.endpoints)) {
        throw new Error('docs/internal-api.json has no endpoints array');
    }
    return doc;
}

function methodMatches(endpoint, method) {
    if (endpoint.method.toUpperCase() === method) return true;
    const accepted = endpoint.acceptedMethods || [];
    if (accepted.includes('ANY')) return true;
    return accepted.some((item) => String(item).toUpperCase() === method);
}

export function listEndpointsText(doc) {
    const lines = [
        doc.title,
        doc.scope,
        '',
        doc.authentication,
        '',
        `${doc.endpoints.length} endpoints. Read one with read_endpoint and its id.`,
        '',
    ];
    for (const endpoint of doc.endpoints) {
        lines.push(`- ${endpoint.id}  ${endpoint.method} ${endpoint.path}  ${endpoint.summary}`);
    }
    return lines.join('\n');
}

function formatEndpoint(endpoint) {
    const lines = [
        `${endpoint.method} ${endpoint.path}`,
        `Id: ${endpoint.id}`,
        '',
        'Authentication',
        endpoint.authentication,
        '',
        'Summary',
        endpoint.summary,
        '',
        'Parameters',
    ];

    if (!endpoint.parameters?.length) {
        lines.push('None.');
    } else {
        for (const param of endpoint.parameters) {
            const required = param.required ? 'required' : 'optional';
            lines.push(`- ${param.name} (${param.type}, ${required}, in ${param.in}): ${param.description}`);
        }
    }

    lines.push('', 'Body');
    if (!endpoint.body) {
        lines.push('None.');
    } else {
        lines.push(`Content-Type: ${endpoint.body.contentType}`);
        lines.push(endpoint.body.description);
        for (const field of endpoint.body.fields || []) {
            const required = field.required ? 'required' : 'optional';
            lines.push(`- ${field.name} (${field.type}, ${required}): ${field.description}`);
        }
    }

    lines.push('', 'Response', endpoint.response.description);
    for (const variant of endpoint.response.variants || []) {
        lines.push(`- ${variant.status} when ${variant.when} Body: ${variant.body}`);
    }

    lines.push('', 'Errors');
    if (!endpoint.errors?.length) {
        lines.push('None.');
    } else {
        for (const error of endpoint.errors) {
            lines.push(`- ${error.status} when ${error.when} Body: ${error.body}`);
        }
    }

    lines.push('', 'Source', endpoint.source, '', 'Callers');
    if (!endpoint.callers?.length) {
        lines.push('None.');
    } else {
        for (const caller of endpoint.callers) lines.push(`- ${caller}`);
    }

    if (endpoint.notes?.length) {
        lines.push('', 'Notes');
        for (const note of endpoint.notes) lines.push(`- ${note}`);
    }

    if (endpoint.acceptedMethods?.length) {
        lines.push('', `Accepted methods: ${endpoint.acceptedMethods.join(', ')}`);
    }

    return lines.join('\n');
}

export function readEndpointText(doc, args) {
    const id = typeof args?.id === 'string' ? args.id.trim() : '';
    const method = typeof args?.method === 'string' ? args.method.trim().toUpperCase() : '';
    const rawPath = typeof args?.path === 'string' ? args.path.trim() : '';
    const path = rawPath && !rawPath.startsWith('/') ? `/${rawPath}` : rawPath;

    if (!id && !(method && path)) {
        const ids = doc.endpoints.map((endpoint) => endpoint.id).join(', ');
        return {
            isError: true,
            text: `Pass id, or method and path. Ids: ${ids}`,
        };
    }

    if (id) {
        const endpoint = doc.endpoints.find((item) => item.id === id);
        if (!endpoint) {
            const ids = doc.endpoints.map((item) => item.id).join(', ');
            return { isError: true, text: `No endpoint with id ${id}. Ids: ${ids}` };
        }
        return { isError: false, text: formatEndpoint(endpoint) };
    }

    const matches = doc.endpoints.filter((item) => item.path === path && methodMatches(item, method));
    if (matches.length === 1) return { isError: false, text: formatEndpoint(matches[0]) };

    const samePath = doc.endpoints.filter((item) => item.path === path);
    if (samePath.length === 1) {
        const endpoint = samePath[0];
        return {
            isError: true,
            text: `${method} ${path} is not how this route is called. It is documented as ${endpoint.method} ${endpoint.path} (id ${endpoint.id}). Accepted methods: ${(endpoint.acceptedMethods || [endpoint.method]).join(', ')}.`,
        };
    }

    return {
        isError: true,
        text: `No endpoint for ${method} ${path}. Call list_endpoints for the ids.`,
    };
}

function paragraph(text) {
    return text.trim();
}

export function renderMarkdown(doc) {
    const chunks = [
        '---',
        "covers: ['src/pages/api/**', 'docs/internal-api.json']",
        'verified_at: 2f38d5a6',
        'verified_on: 2026-10-29',
        '---',
        '',
        '# Internal API reference',
        '',
        paragraph(doc.scope),
        '',
        paragraph(doc.authentication),
        '',
        'This page is rendered from [internal-api.json](internal-api.json). Edit that file, then run `node mcp/api-reference/check.mjs --write`. The MCP server in `mcp/api-reference/` reads the JSON. It holds no secrets and does not call these routes.',
        '',
        'Handlers that read `req.body` use the Next.js JSON body parser. A non-JSON body does not reach the handler.',
        '',
        '## Endpoints',
        '',
    ];

    for (const endpoint of doc.endpoints) {
        chunks.push(`## ${endpoint.method} ${endpoint.path}`, '', `**Id:** \`${endpoint.id}\``, '');
        chunks.push(paragraph(endpoint.summary), '');
        chunks.push('### Authentication', '', paragraph(endpoint.authentication), '');
        chunks.push('### Parameters', '');
        if (!endpoint.parameters?.length) {
            chunks.push('None.', '');
        } else {
            for (const param of endpoint.parameters) {
                const required = param.required ? 'required' : 'optional';
                chunks.push(`- \`${param.name}\` (${param.type}, ${required}, in ${param.in}): ${param.description}`);
            }
            chunks.push('');
        }
        chunks.push('### Body', '');
        if (!endpoint.body) {
            chunks.push('None.', '');
        } else {
            chunks.push(
                `Content-Type: \`${endpoint.body.contentType}\`.`,
                '',
                paragraph(endpoint.body.description),
                ''
            );
            for (const field of endpoint.body.fields || []) {
                const required = field.required ? 'required' : 'optional';
                chunks.push(`- \`${field.name}\` (${field.type}, ${required}): ${field.description}`);
            }
            chunks.push('');
        }
        chunks.push('### Response', '', paragraph(endpoint.response.description), '');
        for (const variant of endpoint.response.variants || []) {
            chunks.push(`- **${variant.status}** when ${variant.when}`, '', `    ${variant.body}`, '');
        }
        chunks.push('### Errors', '');
        if (!endpoint.errors?.length) {
            chunks.push('None.', '');
        } else {
            for (const error of endpoint.errors) {
                chunks.push(`- **${error.status}** when ${error.when} Body: \`${error.body}\``);
            }
            chunks.push('');
        }
        chunks.push('### Source', '', `\`${endpoint.source}\``, '');
        chunks.push('### Callers', '');
        if (!endpoint.callers?.length) {
            chunks.push('None.', '');
        } else {
            for (const caller of endpoint.callers) chunks.push(`- \`${caller}\``);
            chunks.push('');
        }
        if (endpoint.acceptedMethods?.length) {
            chunks.push(`Accepted methods: ${endpoint.acceptedMethods.join(', ')}.`, '');
        }
        if (endpoint.notes?.length) {
            chunks.push('### Notes', '');
            for (const note of endpoint.notes) chunks.push(`- ${note}`);
            chunks.push('');
        }
    }

    return chunks.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}
