---
verified_at: 71fc2742
verified_on: 2026-11-22
last_docs_pr_branch: web
---

# Documentation maintenance log

Weekly agent maintenance for this knowledge base. The middleware-owned block in `AGENTS.md` and files under `docs/guidance/` are not edited here.

## Reviewed revision

| Field           | Value                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Git commit      | `71fc2742` (branch `web`, 2026-11-22)                                                                                              |
| Prior baseline  | `701fd33a` (2026-10-22 docs cleanup)                                                                                               |
| Commits between | 672 (mostly product/content; doc-affecting: SignupCompNew, `signin.js`, `/api/gst-details`, dial-plan proxy fix, AE Hello content) |

## Checks run (2026-11-22)

| Check                                          | Result                                                                           |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `node scripts/check-page-data.mjs`             | 1 unregistered key: `prefooter` in `src/data/ae/hello.json` (new since baseline) |
| `BASE_URL=http://localhost:3030 npm run build` | Pass (Node from environment after `npm ci`)                                      |
| `npm run lint`                                 | Not re-run (still broken per Q-016)                                              |
| Redirect line count                            | 1362 in `public/_redirects`                                                      |

## Coverage map

Status: **verified** = checked against code at `71fc2742`; **partial** = documented with known gaps; **n/a** = not applicable to this repo.

| Topic                       | Authoritative location                                             | Status                                                   |
| --------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------- |
| Product vision & boundaries | [VISION.md](VISION.md)                                             | partial (KPIs/non-goals still need humans)               |
| User journeys               | [FLOWS.md](FLOWS.md)                                               | verified (sign-in/sign-up branch notes updated this run) |
| Architecture & routing      | [ARCHITECTURE.md](ARCHITECTURE.md)                                 | verified                                                 |
| UI & SEO                    | [DESIGN.md](DESIGN.md)                                             | partial (a11y not audited)                               |
| APIs, cookies, JSON shapes  | [CONTRACTS.md](CONTRACTS.md)                                       | verified (`/api/gst-details` added this run)             |
| Setup & verification        | [DEVELOPMENT.md](DEVELOPMENT.md)                                   | verified                                                 |
| ADRs                        | [DECISIONS.md](DECISIONS.md)                                       | verified (ADR-005 branch divergence noted)               |
| Unknowns & security         | [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md)                             | verified (Q-019 added)                                   |
| Agent entry & rules         | [../AGENTS.md](../AGENTS.md)                                       | verified                                                 |
| Experiments / A-B           | [FLOWS.md](FLOWS.md) + `isAbSignupActive` in `src/utils/utilis.js` | partial (bucket rules not in repo)                       |
| Performance budgets         | —                                                                  | n/a (no budgets in repo)                                 |
| Automated tests             | [DEVELOPMENT.md](DEVELOPMENT.md)                                   | n/a (no test runner)                                     |
| CI / deploy                 | [DEVELOPMENT.md](DEVELOPMENT.md), Q-005                            | partial (host not in repo)                               |
| Infrastructure as code      | —                                                                  | n/a                                                      |
| llms.txt                    | —                                                                  | n/a (file not present)                                   |

## Unfinished work (next run)

1. **Merge decision:** `web` has `src/pages/signin.js` and `SignupCompNew`; `main` does not (Q-009). Reconcile with [ADR-005](DECISIONS.md#adr-005-no-sign-in-page-on-the-marketing-site) before production merge.
2. **Content:** Move or remove top-level `prefooter` in `src/data/ae/hello.json` (Q-019). `NewHelloComp` is not on that page today.
3. **`moreFeature` keys** still unregistered (Q-007).
4. **Secrets:** Add `GST_JWT_COMPANY_ID` and `GST_JWT_SECRET` to `.env.example` when the team confirms naming (server-only; not in `next.config.mjs` `env`).
5. **Human owners:** Q-001–Q-005 security/deploy items unchanged from 2026-10-22.

## Branch vs `main` (auth)

On **`web`** at `71fc2742`: `/signin` is a static page (`src/pages/signin.js`) with Google, Microsoft, Zoho, GitHub and OTP login. Sign-up uses `SignupParentComp`, which A/B-tests legacy `SignUp` vs `SignupCompNew` via `?absignup=a` or `isAbSignupActive()`. **`main`** may differ until Q-009 is resolved; do not assume parity when editing docs on either branch.
