---
verified_at: 701fd33a
verified_on: 2026-10-24
---

# Docs index

These docs are written for AI coding agents and new engineers. Every claim was checked against the code at the commit in the verified_at frontmatter field, and the cleanup of 2026-10-22 was applied on top. Start at [../AGENTS.md](../AGENTS.md).

| Doc                                    | Read it when                                            | Owns                                                                              |
| -------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [VISION.md](VISION.md)                 | Judging whether a request should be done                | Audience, purpose, principles, non-goals                                          |
| [POSITIONING.md](POSITIONING.md)       | Writing or changing copy, CTAs, offers, campaigns       | Audiences, promise, differentiators, CTAs, claim-to-evidence register             |
| [SEO.md](SEO.md)                       | Adding, moving or retiring a page; metadata; sitemaps   | Page map, search intent, canonical/hreflang/robots, redirects, known SEO issues   |
| [COMPETITORS.md](COMPETITORS.md)       | Comparison pages, differentiation, pricing claims       | Dated competitor evidence, substitutes, claim risks (reports in `research/`)      |
| [MEASUREMENT.md](MEASUREMENT.md)       | Defining or reading any metric                          | Conversion journey, metric/event definitions, consent, gaps                       |
| [EXPERIMENTS.md](EXPERIMENTS.md)       | Proposing, running or ending an A/B/C test              | Experiment policy, decision method, approvals (live registry is in `/admin`)      |
| [ARCHITECTURE.md](ARCHITECTURE.md)     | First, for any code change                              | JSON-driven pages, routing, countries, pricing routes, state, where new things go |
| [FLOWS.md](FLOWS.md)                   | Changing sign-up, pricing, landing, forms or free tools | User journeys, branches, failure behaviour                                        |
| [DESIGN.md](DESIGN.md)                 | Changing UI or copy                                     | Brand voice & terminology, tokens, section-component contract, shared components  |
| [CONTRACTS.md](CONTRACTS.md)           | Calling or changing an API, cookie or JSON shape        | `/api/*` routes, MSG91 backend calls, page-JSON schema, cookies, analytics        |
| [DEVELOPMENT.md](DEVELOPMENT.md)       | Setting up, verifying, opening a PR                     | Commands, env vars, verification checklist, PR flow                               |
| [DECISIONS.md](DECISIONS.md)           | Before undoing an existing pattern                      | ADRs and lessons from reverts                                                     |
| [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) | Something looks wrong or unexplained                    | Unknowns, security items, verification gaps, cleanup log                          |

`README.md` and `README-BASIC.md` at the repo root are the original human-facing guides. The facts here win where they disagree.

The private admin (`/admin/knowledge`) shows these files with status, owner and verification date, and proposes edits as reviewed changes; the files here stay the only source.

## Needs a human

- Which host deploys `web` and `main`, and does it apply `public/_redirects` and `public/_headers`? See [DEVELOPMENT.md](DEVELOPMENT.md#pr-workflow--deployment-pipeline) and [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-005.
- Success metrics and priorities: [VISION.md](VISION.md#strategic-priorities--success-measures).
- Non-goals (the current ones are inferred): [VISION.md](VISION.md#boundaries--non-goals).
- The open WhatsApp relay and the committed session values: [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-001 and Q-002.
- Whether alternative OAuth sign-up is coming to `main`: [FLOWS.md](FLOWS.md) and Q-009.
- Owners for each doc, the experiment release authority and the watchlist approver: [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-020.
- Where the admin store lives in production and who wires the scheduler: Q-019, Q-025.
- Which conflicting claims are true: Q-027.
