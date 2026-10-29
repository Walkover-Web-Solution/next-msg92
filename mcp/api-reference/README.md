# Internal API reference MCP

Read-only [Model Context Protocol](https://modelcontextprotocol.io) server for the marketing site's own Next.js routes. It serves [docs/internal-api.json](../../docs/internal-api.json). The human-readable copy is [docs/INTERNAL_API.md](../../docs/INTERNAL_API.md).

The process holds no secrets. It does not call the website, MSG91, or any other host. It only reads the JSON file from disk.

## Run

From the repository root, with Node 20 or newer:

```bash
node mcp/api-reference/server.mjs
```

Or `npm run mcp:api-docs`.

An agent connects to the path `/mcp`. On a laptop that is:

`http://127.0.0.1:8787/mcp`

Cursor, or any other MCP client that speaks streamable HTTP, uses that URL. The transport is HTTP POST of a single JSON-RPC message. There is no session and no SSE stream. `GET /mcp` returns 405.

Example client entry:

```json
{
    "mcpServers": {
        "msg91-website-internal-api": {
            "url": "http://127.0.0.1:8787/mcp"
        }
    }
}
```

Tools:

- `list_endpoints` takes no arguments and lists every route under `src/pages/api`.
- `read_endpoint` takes `id`, or `method` and `path`, and returns authentication, parameters, body, response and errors.

## Host

Run the same process on a small Node host. Do not mount it on msg91.com and do not add it as a Next.js route. The marketing site and this server are separate.

```bash
HOST=0.0.0.0 PORT=8787 MCP_PUBLIC_HOST=api-docs.example.com node mcp/api-reference/server.mjs
```

The public URL is `https://api-docs.example.com/mcp` when TLS terminates in front of that process. The path is still `/mcp`.

| Variable              | Default     | Purpose                                                                                     |
| --------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `HOST`                | `127.0.0.1` | Bind address. Use `0.0.0.0` only on a host you intend to publish.                           |
| `PORT`                | `8787`      | Listen port.                                                                                |
| `MCP_PUBLIC_HOST`     | unset       | Comma-separated Host header names besides localhost. Required when the server is not local. |
| `MCP_ALLOWED_ORIGINS` | unset       | Comma-separated browser `Origin` values. Requests with no Origin are allowed. Not a secret. |

These variables belong to this process only. They are not Next.js `env` keys and they are not in `.env.example`. None of them is a credential.

Requests whose Host header is not localhost and not listed in `MCP_PUBLIC_HOST` receive 403.

## Check

```bash
node mcp/api-reference/check.mjs
```

The check compares the documented paths with `src/pages/api`, refreshes nothing, and performs the MCP handshake against a temporary port. After editing `docs/internal-api.json`, regenerate the markdown:

```bash
node mcp/api-reference/check.mjs --write
```
