---
verified_at: 701fd33a
verified_on: 2026-10-22
---

# Docs index

These docs are written for AI coding agents and new engineers. Every claim was checked against the code at the commit in the verified_at frontmatter field, and the cleanup of 2026-10-22 was applied on top. Start at [../AGENTS.md](../AGENTS.md).

| Doc                                    | Read it when                                              | Owns                                                                                                                                |
| -------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [VISION.md](VISION.md)                 | Judging whether a request should be done                  | Audience, purpose, principles, non-goals                                                                                            |
| [ARCHITECTURE.md](ARCHITECTURE.md)     | First, for any code change                                | JSON-driven pages, routing, countries, pricing routes, state, where new things go                                                   |
| [FLOWS.md](FLOWS.md)                   | Changing sign-up, pricing, landing, forms or free tools   | User journeys, branches, failure behaviour                                                                                          |
| [DESIGN.md](DESIGN.md)                 | Changing UI, copy or SEO                                  | Tokens, section-component contract, shared components, SEO rules                                                                    |
| [CONTRACTS.md](CONTRACTS.md)           | Calling or changing an API, cookie or JSON shape          | `/api/*` routes, MSG91 backend calls, page-JSON schema, cookies, analytics                                                          |
| [INTERNAL_API.md](INTERNAL_API.md)     | Looking up one internal route without reading the handler | Per-endpoint reference rendered from [internal-api.json](internal-api.json). The MCP server in `mcp/api-reference/` serves the JSON |
| [DEVELOPMENT.md](DEVELOPMENT.md)       | Setting up, verifying, opening a PR                       | Commands, env vars, verification checklist, PR flow                                                                                 |
| [DECISIONS.md](DECISIONS.md)           | Before undoing an existing pattern                        | ADRs and lessons from reverts                                                                                                       |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Something looks wrong or unexplained                      | Unknowns, security items, verification gaps, cleanup log                                                                            |

`README.md` and `README-BASIC.md` at the repo root are the original human-facing guides. The facts here win where they disagree.

## Needs a human

- Which host deploys `web` and `main`, and does it apply `public/_redirects` and `public/_headers`? See [DEVELOPMENT.md](DEVELOPMENT.md#pr-workflow--deployment-pipeline) and [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-005.
- Success metrics and priorities: [VISION.md](VISION.md#strategic-priorities--success-measures).
- Non-goals (the current ones are inferred): [VISION.md](VISION.md#boundaries--non-goals).
- The open WhatsApp relay and the committed session values: [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-001 and Q-002.
- Whether alternative OAuth sign-up is coming to `main`: [FLOWS.md](FLOWS.md) and Q-009.
