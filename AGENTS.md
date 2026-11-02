# MSG91 Website (next-msg92)

This is the public marketing site for MSG91, a CPaaS. It serves msg91.com. It explains MSG91's messaging products (SMS, OTP, WhatsApp, Voice, Email, RCS, Hello…) to developers and businesses, shows country-specific pricing, and turns visitors into sign-ups. It runs on Next.js 16 with the pages router and React 19, in plain JavaScript, styled with Tailwind + DaisyUI + SCSS. Most pages are ordered lists of section components declared in JSON under `src/data/`. The MSG91 product itself (dashboard, messaging APIs, billing) lives elsewhere.

## Commands

| Task                                 | Command                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| Install dependencies                 | `npm ci`                                                                       |
| Run dev server                       | `npm run dev` (http://localhost:3030)                                          |
| Build for production                 | `BASE_URL=http://localhost:3030 npm run build`                                 |
| Preview production build             | `BASE_URL=http://localhost:3030 npm start`                                     |
| Check page JSON ↔ component registry | `node scripts/check-page-data.mjs`                                             |
| Format                               | `npx prettier --write <files>` (the pre-commit hook does this on staged files) |

There is no typecheck and there are no tests. `npm run lint` is broken: Next.js 16 removed `next lint` ([OPEN_QUESTIONS.md Q-016](docs/OPEN_QUESTIONS.md)). Env vars are listed in [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Reading Order Before You Change Code

1. **Product Purpose & Boundaries:** [docs/VISION.md](docs/VISION.md). Judge every request against the approved audience and the sign-up goal. Never invent vision or fake a backend integration.
2. **Mental Model & Data Flow:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Read this before adding a page or a section component: it covers the JSON-driven page composition, routing, country folders and pricing routes.
3. **User Journey Context:** [docs/FLOWS.md](docs/FLOWS.md). Landing, sign-up, pricing, contact/events and the free tools.
4. **Visual & UI Standards:** [docs/DESIGN.md](docs/DESIGN.md). Tokens, the section-component prop contract, shared components, SEO via `HeadComp`.
5. **API & Persistence:** [docs/CONTRACTS.md](docs/CONTRACTS.md). Internal `/api/*` routes, MSG91 backend calls, page-JSON shapes, cookies, analytics.
6. **Environment & Verification:** [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Setup, env vars, the checklist, the PR flow.
7. **Lessons & Past Choices:** [docs/DECISIONS.md](docs/DECISIONS.md). Read it before you undo a pattern.
8. **Known Ambiguities:** [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md). Open security items, unknowns and the cleanup log.

## Project Rules & Boundaries

1. **Every top-level key in a page JSON must be registered in `Components` in `src/pages/[[...slug]].js`.** An unknown key renders nothing, and the only sign is a browser `console.error`. Run `node scripts/check-page-data.mjs` before every PR ([ADR-001](docs/DECISIONS.md#adr-001-compose-pages-from-json-via-a-string-keyed-component-registry)).
2. **A component with no importer may still be live.** If any JSON under `src/data/` names its registry key, it renders. Search `src/data/**` and the `web` branch before deleting a component or a registry key.
3. **A page exists once per country folder.** URL `/<cc>/<page>` reads `src/data/<cc>/<page>.json` and `/<page>` reads `src/data/global/<page>.json`, with no fallback between them. Make content changes in every folder that has the page.
4. **Read secrets only inside `src/pages/api/`.** Every key in the `next.config.mjs` `env` block is inlined into the client bundle wherever a component references it. `WHATSAPP_AUTHKEY` must stay server-only.
5. **`BASE_URL` must be the origin of the running app.** `getStaticProps` in the catch-all fetches `${BASE_URL}/api/data`. It also switches `robots` to `noindex` unless it equals `https://msg91.com`.
6. **Never change or remove a public URL without a redirect line in `public/_redirects`.** Organic search traffic depends on old URLs. The sitemaps in `public/` are edited by hand.
7. **Never remove `public/js/waWidget.js` or `public/js/appleMessagesWidget.js`.** Customer sites embed them through `src/utils/generateWidgetScript.js`.
8. **Every page JSON needs a `HeadComp` block.** It supplies the title, description, canonical, hreflang, GTM, Clarity and chat widget ([DESIGN.md](docs/DESIGN.md)).
9. **Unpublish a page with `"show": false`, and never name a section key `common`.** `src/pages/api/data.js` turns either one into a 404.
10. **Pricing has two routes that must change together:** `src/pages/pricing/[products].js` and `src/pages/[country]/pricing/[products].js`. Test at least one non-USD country. Pricing changes have been reverted repeatedly ([ADR-003](docs/DECISIONS.md#adr-003-render-pricing-pages-on-the-server-with-live-prices)).
11. **Sign-in lives in the MSG91 app (`LOGIN_URL`).** Don't add a sign-in page here without asking: it was tried and reverted four times ([ADR-005](docs/DECISIONS.md#adr-005-no-sign-in-page-on-the-marketing-site)). A sign-up rewrite (`SignupCompNew`) is in progress on `web`, so coordinate before editing `src/components/signupComp/`. <!-- verify:ignore -->
12. **Cookie names are a contract with the sign-up backend.** `msg91_query`, the UTM cookies and `country` are written by `src/utils/setCookies.js` and `src/utils/utilis.js`. Don't rename them ([CONTRACTS.md](docs/CONTRACTS.md)).
13. **Tailwind does not scan `src/data/` or `_posts/`.** A class used only in JSON or MDX is not generated. Use classes that already exist in components, or add the class to a scanned file.
14. **Don't fabricate integrations.** If a feature needs a backend capability that doesn't exist, write the contract in [docs/CONTRACTS.md](docs/CONTRACTS.md) and stop.

## Where Things Are

- `src/pages/[[...slug]].js`: the catch-all route and the component registry. Most pages render here.
- `src/data/<country>/` and `src/data/global/`: page JSON per country. `common.json` holds the menu, footer and notification bar. `availableCountries.json` lists the supported countries.
- `src/components/`: section components (`*Comp`), shared pieces in `src/components/Shared/` and `src/components/UIComponent/`, pricing UI in `src/components/PricingComp/`, sign-up in `src/components/signupComp/`.
- `src/pages/api/`: server routes for page data, pricing proxies, the curl converter, the Apple Messages link and the summit WhatsApp sender.
- `src/utils/`: URL/country parsing, cookies, pricing fetchers (`src/utils/pricing/`), widget helpers.
- `src/pages/guide/` and `_posts/blog/`: about 280 MDX blog posts served at `/guide`.
- `src/styles/`, `tailwind.config.js`: SCSS partials and the DaisyUI `msg91` theme.
- `public/`: assets, sitemaps, `robots.txt`, `_redirects`, `_headers`, embeddable widget scripts.
- `docs/`: this knowledge base. The index is [docs/README.md](docs/README.md).

## PR & Deployment Flow

- **Branches:** each ticket gets two branches, `WEBxxx-web` (PR into `web`) and `WEBxxx-main` (PR into `main`). See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md#pr-workflow--deployment-pipeline).
- **Pipeline:** feature branch → PR into `web` (testing) → PR into `main` (production, msg91.com). This was confirmed by the team on 2026-10-22. The host and how deploys are triggered are not in the repo ([OPEN_QUESTIONS.md Q-005](docs/OPEN_QUESTIONS.md)).
- **Pre-PR gate:** `node scripts/check-page-data.mjs`, the production build, and a browser check of every affected page in every affected country.

## Verification & Knowledge Maintenance Expectations

- **Baseline first:** run the check script and the build before editing, and note existing failures (lint is already broken).
- **Preserve:** routes, URLs and redirects, SEO metadata, the analytics tags, cookie names, the look of every country variant, and the embed scripts.
- **Evidence before removal:** check imports, JSON registry keys, `require`/`import()`, routes, `"show": false`, CSS/Tailwind use, `public/` references, external embeds and the `web` branch. When unsure, keep the code and add a row to [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md).
- **Docs in the same PR:** a change to routes, registry keys, JSON shapes, env vars, API calls or cookies updates the owning doc in `docs/` (owners are listed in [docs/README.md](docs/README.md)). If you change direction, update [docs/VISION.md](docs/VISION.md) explicitly.
