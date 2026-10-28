# MSG91 Website (next-msg92)

This is the public marketing site for MSG91, a CPaaS. It serves msg91.com. It explains MSG91's messaging products (SMS, OTP, WhatsApp, Voice, Email, RCS, Hello…) to developers and businesses, shows country-specific pricing, and turns visitors into sign-ups. It runs on Next.js 16 with the pages router and React 19, in plain JavaScript, styled with Tailwind + DaisyUI + SCSS. Most pages are ordered lists of section components declared in JSON under `src/data/`. The MSG91 product itself (dashboard, messaging APIs, billing) lives elsewhere. A private operator admin at `/admin` holds the site's marketing knowledge, competitor research, analyses, settings and controlled A/B/C experiments.

## Commands

| Task                               | Command                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Install dependencies               | `npm ci`                                                                                   |
| Run dev server                     | `npm run dev` (http://localhost:3030)                                                      |
| Build for production               | `BASE_URL=http://localhost:3030 npm run build`                                             |
| Preview production build           | `BASE_URL=http://localhost:3030 npm start`                                                 |
| Check page JSON ↔ section registry | `node scripts/check-page-data.mjs`                                                         |
| Unit/integration tests (Node ≥ 22) | `npm test`                                                                                 |
| Route regression snapshot          | `node scripts/snapshot-routes.mjs snapshot <file>` then `compare <a> <b>` (server running) |
| Create an admin operator           | `node scripts/admin-user.mjs <email> <viewer\|editor\|owner>`                              |
| Format                             | `npx prettier --write <files>` (the pre-commit hook does this on staged files)             |

There is no typecheck. `npm run lint` is broken: Next.js 16 removed `next lint` ([OPEN_QUESTIONS.md Q-016](docs/OPEN_QUESTIONS.md)). Env vars are listed in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Reading Order Before You Change Anything

Read only what the request touches, in this order:

1. **Purpose & boundaries:** [docs/VISION.md](docs/VISION.md) (approved audience and sign-up goal).
2. **Marketing truth** (copy, pages, campaigns): [docs/POSITIONING.md](docs/POSITIONING.md) (audiences, promise, CTAs, claim register), [docs/DESIGN.md](docs/DESIGN.md) (voice, terminology, tokens, components), [docs/SEO.md](docs/SEO.md) (page map, canonical/hreflang, sitemaps), [docs/COMPETITORS.md](docs/COMPETITORS.md) (dated evidence, claim risks).
3. **How it works:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) (JSON pages, routing, countries, pricing, admin, experimentation), [docs/FLOWS.md](docs/FLOWS.md) (visitor and operator journeys), [docs/CONTRACTS.md](docs/CONTRACTS.md) (APIs, page JSON, cookies, events, missing backend contracts).
4. **Evidence & tests:** [docs/MEASUREMENT.md](docs/MEASUREMENT.md) (what is measurable), [docs/EXPERIMENTS.md](docs/EXPERIMENTS.md) (A/B/C policy), [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) (setup, checks, admin operations, PR flow).
5. **History & gaps:** [docs/DECISIONS.md](docs/DECISIONS.md) before undoing a pattern; [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md) for unknowns and blockers.

The private admin (`/admin`) edits these same files through reviewed changes; there is no other copy. A doc is effective only once merged.

## Project Rules & Boundaries

1. **Every top-level key in a page JSON must be registered in `Components` in `src/components/PageRenderer/sectionRegistry.js`.** An unknown key renders nothing, and the only sign is a browser `console.error`. Run `node scripts/check-page-data.mjs` before every PR ([ADR-001](docs/DECISIONS.md#adr-001-compose-pages-from-json-via-a-string-keyed-component-registry)).
2. **A component with no importer may still be live.** If any JSON under `src/data/` names its registry key, it renders. Search `src/data/**` and the `web` branch before deleting a component or a registry key.
3. **A page exists once per country folder.** URL `/<cc>/<page>` reads `src/data/<cc>/<page>.json` and `/<page>` reads `src/data/global/<page>.json`, with no fallback between them. Make content changes in every folder that has the page.
4. **Read secrets only inside `src/pages/api/`.** Every key in the `next.config.mjs` `env` block is inlined into the client bundle wherever a component references it. `WHATSAPP_AUTHKEY` must stay server-only.
5. **`BASE_URL` must be the origin of the running app.** `getStaticProps` in the catch-all fetches `${BASE_URL}/api/data`. It also switches `robots` to `noindex` unless it equals `https://msg91.com`.
6. **Never change or remove a public URL without a redirect line in `public/_redirects`.** Organic search traffic depends on old URLs. The sitemaps in `public/` are edited by hand.
7. **Never remove `public/js/waWidget.js` or `public/js/appleMessagesWidget.js`.** Customer sites embed them through `src/utils/generateWidgetScript.js`.
8. **Every page JSON needs a `HeadComp` block.** It supplies the title, description, canonical, hreflang, GTM, Clarity and chat widget ([DESIGN.md](docs/DESIGN.md)).
9. **Unpublish a page with `"show": false`, and never name a section key `common`.** `src/pages/api/data.js` turns either one into a 404.
10. **Pricing has two routes that must change together:** `src/pages/pricing/[products].js` and `src/pages/[country]/pricing/[products].js`. Test at least one non-USD country. Pricing changes have been reverted repeatedly ([ADR-003](docs/DECISIONS.md#adr-003-render-pricing-pages-on-the-server-with-live-prices)).
11. **Customer sign-in lives in the MSG91 app (`LOGIN_URL`).** Don't add a customer sign-in page here without asking (`/admin/login` is the internal operator login, ADR-008): it was tried and reverted four times ([ADR-005](docs/DECISIONS.md#adr-005-no-sign-in-page-on-the-marketing-site)). A sign-up rewrite (`SignupCompNew`) is in progress on `web`, so coordinate before editing `src/components/signupComp/`. <!-- verify:ignore -->
12. **Cookie names are a contract with the sign-up backend.** `msg91_query`, the UTM cookies and `country` are written by `src/utils/setCookies.js` and `src/utils/utilis.js`. Don't rename them ([CONTRACTS.md](docs/CONTRACTS.md)).
13. **Tailwind does not scan `src/data/` or `_posts/`.** A class used only in JSON or MDX is not generated. Use classes that already exist in components, or add the class to a scanned file.
14. **Don't fabricate integrations or data.** If a feature needs a backend capability that doesn't exist, write the contract in [docs/CONTRACTS.md](docs/CONTRACTS.md) and build only what works without it. Show missing data as "not connected", never as zero.
15. **Admin code is server-only.** `src/lib/admin/*`, `src/lib/checks/*` and admin secrets are used only from `getServerSideProps`, `src/pages/api/admin/*`, `src/proxy.js` or `src/instrumentation.js`. Every admin page/API checks the role server-side (`withAdminPage` / `withAdmin`).
16. **Experiments follow [docs/EXPERIMENTS.md](docs/EXPERIMENTS.md).** At most two challengers per URL, treatments as section overrides, no unverified claims in arms, launch only by an owner with the release switch on. Never edit a page's JSON while an experiment runs on it; promote through the admin.
17. **Claims need evidence.** A number, customer, logo, testimonial or comparison must be in the claim register in [docs/POSITIONING.md](docs/POSITIONING.md) with a source, and must agree across countries.

## Where Things Are

- `src/pages/[[...slug]].js`: the catch-all route. It renders through `src/components/PageRenderer/` (`sectionRegistry.js` maps JSON keys to components) with data from `src/utils/loadPageProps.js`.
- `src/data/<country>/` and `src/data/global/`: page JSON per country. `common.json` holds the menu, footer and notification bar. `availableCountries.json` lists the supported countries.
- `src/components/`: section components (`*Comp`), shared pieces in `src/components/Shared/` and `src/components/UIComponent/`, pricing UI in `src/components/PricingComp/`, sign-up in `src/components/signupComp/`.
- `src/pages/api/`: server routes for page data, pricing proxies, the curl converter, the Apple Messages link and the summit WhatsApp sender.
- `src/utils/`: URL/country parsing, cookies, pricing fetchers (`src/utils/pricing/`), widget helpers.
- `src/pages/guide/` and `_posts/blog/`: about 280 MDX blog posts served at `/guide`.
- `src/styles/`, `tailwind.config.js`: SCSS partials and the DaisyUI `msg91` theme.
- `public/`: assets, sitemaps, `robots.txt`, `_redirects`, `_headers`, embeddable widget scripts.
- `src/proxy.js`, `src/pages/exp-view/`, `src/lib/experiments/`, `src/utils/experimentEvents.js`: A/B/C experiment routing, rendering, assignment, events and statistics.
- `src/pages/admin/`, `src/pages/api/admin/`, `src/lib/admin/`, `src/components/Admin/`: the private admin (knowledge, research, analyses, experiments, settings). State lives in `ADMIN_DATA_DIR` (git-ignored).
- `test/`, `scripts/`: Node tests, registry check, route snapshot, admin-user generator.
- `docs/`: this knowledge base. The index is [docs/README.md](docs/README.md); detailed research reports are in `docs/research/`.

## PR & Deployment Flow

- **Branches:** each ticket gets two branches, `WEBxxx-web` (PR into `web`) and `WEBxxx-main` (PR into `main`). See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md#pr-workflow--deployment-pipeline).
- **Pipeline:** feature branch → PR into `web` (testing) → PR into `main` (production, msg91.com). This was confirmed by the team on 2026-10-22. The host and how deploys are triggered are not in the repo ([OPEN_QUESTIONS.md Q-005](docs/OPEN_QUESTIONS.md)).
- **Pre-PR gate:** `node scripts/check-page-data.mjs`, the production build, and a browser check of every affected page in every affected country.

## Workflow For Every Request

1. **Understand the need.** Treat the request as raw input: infer the underlying problem, the desired outcome and short acceptance criteria, while keeping explicit constraints.
2. **Check direction.** Compare with VISION/POSITIONING. If it conflicts, explain and recommend an aligned alternative; only an authorised owner changes direction, and that change goes into the owning doc explicitly. Never approve your own proposal.
3. **Find the shared cause.** Diagnose the root cause and search for equivalent instances (every country folder, every page using the component). Fix confirmed shared causes in scope; list wider redesigns or unrelated defects as proposals or OPEN_QUESTIONS rows.
4. **Check impact before editing:** connected pages and countries, shared components, API/cookie/event contracts, claims, SEO signals (URLs, canonical, hreflang, sitemap), analytics, permissions, and any running experiment on the page.
5. **Verify backends exist.** Missing capability → contract in CONTRACTS.md, continue independent work, never fake it.
6. **Change and verify:** small reviewable commits; registry check, `npm test`, build, route snapshot for refactors, and a browser check (375 px and 1280 px, console clean) of every affected page and country.
7. **Maintain knowledge in the same change:** update the owning doc (owners in [docs/README.md](docs/README.md)), diagrams, page map, contracts and decisions; for long work keep a short progress note so a fresh agent can resume.
8. **Report:** what changed, preview/PR reference, checks run with results, docs updated, what was not verified and remaining blockers. Production deploys, experiment launches and outward actions follow the PR flow and the admin's release authority.

## Verification & Knowledge Maintenance Expectations

- **Baseline first:** run the check script, `npm test` and the build before editing, and note existing failures (lint is already broken).
- **Preserve:** routes, URLs and redirects, SEO metadata, the analytics tags, cookie names, the look of every country variant, the embed scripts, and the experiment/admin contracts.
- **Evidence before removal:** check imports, JSON registry keys, `require`/`import()`, routes, `"show": false`, CSS/Tailwind use, `public/` references, external embeds and the `web` branch. When unsure, keep the code and add a row to [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md).
- **Docs in the same PR:** a change to routes, registry keys, JSON shapes, env vars, API calls, cookies, events, metrics or claims updates the owning doc in `docs/`. If you change direction, update [docs/VISION.md](docs/VISION.md) or [docs/POSITIONING.md](docs/POSITIONING.md) explicitly.

Short reminder for any request: _Treat this request as raw input; infer the underlying outcome while preserving explicit constraints. Read AGENTS.md and the relevant approved marketing/technical context. Investigate the shared cause and confirmed similar instances within scope. Protect connected journeys, brand truth, SEO, measurement and permissions. Verify the change, maintain affected knowledge, and report evidence and blockers. Ask only blocking questions._
