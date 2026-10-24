---
covers: ['*']
verified_at: 701fd33a
verified_on: 2026-10-22
---

# Architectural & Design Decisions (ADRs)

These records are reconstructed from git history. Commit messages in this repo rarely give reasons, so each **Context** says whether the rationale is recorded or inferred. Check the relevant ADR before you undo a pattern. Unexplained choices are listed in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Decision Index

| Date       | Decision Record                                                                                                                                                                 | Status                               | Area Affected         | Key Rationale                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------- | ---------------------------------------------------------------------- |
| 2024-07-20 | [ADR-001: Compose pages from JSON via a string-keyed component registry](#adr-001-compose-pages-from-json-via-a-string-keyed-component-registry)                                | Accepted                             | Routing / Content     | Marketing copy and page layout change without code changes (inferred)  |
| 2023-07-05 | [ADR-002: Keep redirects and security headers in host files under `public/`](#adr-002-keep-redirects-and-security-headers-in-host-files-under-public)                           | Accepted                             | SEO / Hosting         | Preserve old URLs' search traffic                                      |
| 2025-09-12 | [ADR-003: Render pricing pages on the server with live prices](#adr-003-render-pricing-pages-on-the-server-with-live-prices)                                                    | Accepted                             | Pricing               | Prices in the first HTML response (inferred: SEO and no loading flash) |
| 2026-02-27 | [ADR-004: Forward landing-page query parameters to sign-up through cookies](#adr-004-forward-landing-page-query-parameters-to-sign-up-through-cookies)                          | Accepted                             | Sign-up / Attribution | Keep campaign attribution across navigation                            |
| 2026-05-07 | [ADR-005: No sign-in page on the marketing site](#adr-005-no-sign-in-page-on-the-marketing-site)                                                                                | Accepted (after reverts)             | Auth                  | Sign-in stays in the MSG91 app behind `LOGIN_URL`                      |
| 2025-12-08 | [ADR-006: Upgrade to Next.js 16 and React 19, keep the pages router](#adr-006-upgrade-to-nextjs-16-and-react-19-keep-the-pages-router)                                          | Accepted                             | Platform              | Stay on supported versions without an App Router migration             |
| 2026-10-24 | [ADR-007: One page renderer shared by the catch-all and experiment routes](#adr-007-one-page-renderer-shared-by-the-catch-all-and-experiment-routes)                            | Accepted                             | Routing / Content     | Registry moved to `sectionRegistry.js`                                 |
| 2026-10-24 | [ADR-008: Private admin inside this app, file-backed store, env-defined operators](#adr-008-private-admin-inside-this-app-file-backed-store-env-defined-operators)              | Accepted (store needs a shared disk) | Admin / Auth          | Not a customer sign-in; ADR-005 stands                                 |
| 2026-10-24 | [ADR-009: The repository is the only source of knowledge; the admin proposes changes](#adr-009-the-repository-is-the-only-source-of-knowledge-the-admin-proposes-changes)       | Accepted                             | Knowledge             | Drafts → PR → effective                                                |
| 2026-10-24 | [ADR-010: Same-URL experiments via proxy rewrite, conservative fixed-horizon evaluation](#adr-010-same-url-experiments-via-proxy-rewrite-conservative-fixed-horizon-evaluation) | Accepted                             | Experiments / SEO     | No third-party provider existed                                        |

---

## ADR-001: Compose pages from JSON via a string-keyed component registry

### Status

Accepted

### Context & Problem Statement

Before July 2024 pages were rendered by `src/pages/[country]/[page].js` with content in `src/content/`. Commit `443bfac0` ("add call component using string") replaced that route with the catch-all `src/pages/[[...slug]].js` and moved content to `src/data/`. Commit `eb169097` fixed the string lookup. No rationale is recorded. Inferred: non-developers can reorder or reuse sections by editing JSON, and one route serves every product and every country. <!-- verify:ignore -->

### Decision & Implementation

- `src/pages/[[...slug]].js` held a `Components` map (moved to `src/components/PageRenderer/sectionRegistry.js` on 2026-10-24, see ADR-007) from string key to React component. Several keys can alias one component, for example `IndustryFeatureComp: FeatureComp`.
- `getStaticProps` resolves country and page with `src/utils/getPageInfo.js`, POSTs that to `src/pages/api/data.js`, and renders the returned JSON's top-level keys in order.
- `fallback: 'blocking'` with `paths: []`: nothing is prerendered at build time, and each page is generated on its first request.

### Supporting Evidence & Past Incidents

- Commit `443bfac0`: "add call component using string" (2024-07-20).
- Commit `eb169097`: "fixed comp call by string" (2024-07-22).

### Consequences & Trade-offs

- **Positive:** New pages need only a JSON file. Country variants are separate JSON trees.
- **Negative / Constraints:** Static analysis can't tell which components are used. A component is live if **any** JSON key names it, so dead-code checks must search `src/data/**`. A misspelled key renders nothing and only logs `Component "<key>" is undefined` in the browser. `scripts/check-page-data.mjs` now catches that statically. `getStaticProps` fetching its own `/api/data` over HTTP couples build and request time to `BASE_URL`.

### Superseded / Rejected Alternatives

1. **`src/pages/[country]/[page].js` with `src/content/`:** Replaced in `443bfac0`. The reason isn't recorded. <!-- verify:ignore -->

---

## ADR-002: Keep redirects and security headers in host files under `public/`

### Status

Accepted

### Context & Problem Statement

The site replaced an older msg91.com, whose URLs (help articles, old blog slugs, pricing paths) still receive traffic. `public/_redirects` started in commits `7f69d579` and `dbe3e0ed` (2023-07-05, "redirects:1/2") and now has more than 1,300 lines. Later tickets keep adding to it, for example `1a59444c` "WEB91-172 | redirection added" and `4c169ebd` "WEB91-175 | Pricing page redirection".

### Decision & Implementation

- URL redirects live in `public/_redirects` and response headers in `public/_headers`. That is the Netlify/Cloudflare Pages file convention, so they are applied by the host, not by Next.js.
- `next.config.mjs` also sets security headers (`securityHeaders`), including `Cross-Origin-Opener-Policy: same-origin-allow-popups`. Its comment says the Google OAuth popup needs that to return the auth code.

### Supporting Evidence & Past Incidents

- `/pricing` renders an empty page at the app level (`src/data/global/pricing.json` has no section keys), but `public/_redirects` sends `/pricing` to `/pricing/hello`. That only works in an environment that applies `_redirects`.

### Consequences & Trade-offs

- **Positive:** Redirects need no code deploy logic and survive route refactors.
- **Negative / Constraints:** `npm start` locally does **not** apply them, so local behaviour differs from production for redirected URLs. Two header sources (`public/_headers` and `next.config.mjs:headers`) can disagree. For example, `_headers` sets `X-Frame-Options: DENY` and a strict `Content-Security-Policy`, which `next.config.mjs` doesn't. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

### Superseded / Rejected Alternatives

1. **`next.config.mjs` `redirects()`:** Not used. The reason isn't recorded.

---

## ADR-003: Render pricing pages on the server with live prices

### Status

Accepted

### Context & Problem Statement

Pricing used to be fetched in the browser. Between September 2025 and March 2026 each product's pricing moved to server rendering: Hello (`7ddedd17`, "HELLO PRICING SSR"), global pricing (`1a04d229`), email (`f7e42832`), WhatsApp (`926513e4`, "whatsapp pricing -> SSR"), voice (`15f341b9`) and SMS/OTP (`da2e5a0d`). The reason isn't stated. Inferred: crawlers and first paint get real prices.

### Decision & Implementation

- `src/pages/pricing/[products].js` (fixed country `us`) and `src/pages/[country]/pricing/[products].js` use `getServerSideProps` and call the fetchers in `src/utils/pricing/` (`getPricing`, `getVoicePricing`, `getSmsOtpPricing`).
- Results go to `src/components/PricingComp/index.js` as `pricingData` / `initialData`.
- For Hello in Brazil, the catch-all route also injects prices in `getStaticProps` (`data.Pricing.initialPricingData`).

### Supporting Evidence & Past Incidents

- WhatsApp pricing changes were reverted at least twice (`c515357e` "Revert PIYUSH | PROD | WhatsApp pricing update", `f28d747a`). Pricing changes are high-risk: test every product and currency.

### Consequences & Trade-offs

- **Positive:** Prices are in the HTML. There is one fetch path per product.
- **Negative / Constraints:** Pricing pages are `ƒ (Dynamic)` and depend on the pricing services being up at request time. If the fetcher returns nothing, or the slug is not in the country's `pricing.json` `products`, the route returns `notFound` (404). The SMS/OTP fetcher catches its own errors, and the client refetches (see [FLOWS.md](FLOWS.md)).

---

## ADR-004: Forward landing-page query parameters to sign-up through cookies

### Status

Accepted

### Context & Problem Statement

Marketing campaigns land visitors on any page with UTM and other query parameters. The sign-up flow needs them later, after navigation.

### Decision & Implementation

- `src/utils/setCookies.js:handleBrawserCookies` runs on every page from `src/pages/_app.js`. It stores the raw query string in the `msg91_query` cookie for 30 days. On `partners-and-integrations/<plugin>` pages without a query string, it stores a synthetic `utm_campaign=tigerplugin` query instead. Then it calls `setUtm` from `src/utils/utilis.js`. `src/components/signupComp/SignUp.js` reads these cookies and sends them with the sign-up request and redirect URL.
- Commits: `f3a69a0f` "shared cookies added" (2026-02-27), `362932a9` "added utm params in redirection url", `25f45ad3` "storing all cookies in cookies not only utm_" (2026-03-26).
- The catch-all route also sets a `country` cookie from `pageInfo.country` if none exists.

### Consequences & Trade-offs

- **Negative / Constraints:** Cookie names are a contract with the MSG91 sign-up backend. See [CONTRACTS.md](CONTRACTS.md) before renaming any of them. The `country` cookie is set with `max-age=3600` while the code comment says "1 year". Which one is intended is open.

---

## ADR-005: No sign-in page on the marketing site

### Status

Accepted (after repeated reverts)

### Context & Problem Statement

A `src/pages/signin.js` page was built, reverted and rebuilt several times: `863bc99e` "signin page revert" (2026-04-02), `a654afed` "Feat : Signin refactor" (2026-05-07), `02359c18` / `0cffbad9` revert and re-revert (2026-06-18), and finally `ea205eba` "revert signin page" (2026-06-19), which deleted it. <!-- verify:ignore -->

### Decision & Implementation

- Login links go to the MSG91 app via `LOGIN_URL` (`src/components/notificationBarComp/notificationBarComp.js`, `src/components/signupComp/StepOne/StepOne.js`, `src/components/ThankYouComp/ThankYouComp.js`).
- The OAuth callback pages remain. `src/pages/github-auth-token.js` forwards to `REDIRECT_URL` + `/signup` or `/signin`, and `src/pages/outlook-token.js` forwards to `/signin`. That is a route of the app behind `REDIRECT_URL`, not of this site ([OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-013).

### Consequences & Trade-offs

- Sign-in work continues on the `web` branch (`GoogleLogin.js`, `src/utils/otpSigninWidget.js`, `GOOGLE_CLIENT_ID`, `OTP_WIDGET_TOKEN_LOGIN` are used there), so those files and variables were kept on `main` during the 2026-10-22 cleanup. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-009.

### Superseded / Rejected Alternatives

1. **Sign-in on msg91.com (`src/pages/signin.js`):** Tried and reverted four times between April and June 2026. The reason isn't recorded. Don't reintroduce it without asking. <!-- verify:ignore -->

---

## ADR-006: Upgrade to Next.js 16 and React 19, keep the pages router

### Status

Accepted

### Context & Problem Statement

Commit `8da32c8e` ("081225 | nextjs update", 2025-12-08, branch `081225-nextjs-update`) moved `next` from `^15.0.0` to `^16.0.7`. The site still uses `src/pages/` (pages router) and does not use the App Router.

### Consequences & Trade-offs

- **Negative / Constraints:** Next.js 16 removed `next lint`, so `npm run lint` now fails (see [DEVELOPMENT.md](DEVELOPMENT.md)). The minimum Node version is 20.9. `README.md` still says Next.js 14, React 18 and Node 18.

---

## ADR-007: One page renderer shared by the catch-all and experiment routes

### Status

Accepted (2026-10-24, AI-readiness change set).

### Context & Problem Statement

Experiments must render a page's JSON with a few sections overridden, at the same URL, without copying the 90-entry registry or the data-loading code into a second route.

### Decision & Implementation

- `src/components/PageRenderer/sectionRegistry.js` holds the `Components` registry and `resolveSection` (Hello-BR overrides). `scripts/check-page-data.mjs` and `src/lib/checks/siteContent.js` read it.
- `src/utils/loadPageProps.js` holds the server-side loading (page info, `common.json`, `/api/data`, Hello-BR pricing).
- `src/components/PageRenderer/PageRenderer.js` renders the page. `src/pages/[[...slug]].js` is now routing only.

### Supporting Evidence

All 372 catch-all URLs returned byte-identical normalized HTML before and after (`scripts/snapshot-routes.mjs`, 460 URLs). The unused `specialPages` import in the catch-all was dropped.

### Consequences & Trade-offs

- **Positive:** one rendering path; adding a section still means one registry entry.
- **Negative:** the registry is no longer in the route file; docs and the check script were updated.

---

## ADR-008: Private admin inside this app, file-backed store, env-defined operators

### Status

Accepted. The store requires one persistent disk shared by all instances (Q-019).

### Context & Problem Statement

Operators need a private place for knowledge, research, analyses, settings and experiments. There was no CMS, no admin, no database and no operator auth in this repo; the MSG91 product has its own customer auth, which must not be mixed with internal strategy (ADR-005 forbids a _customer_ sign-in page here).

### Decision & Implementation

- `/admin` pages and `/api/admin/*` inside this Next.js app, server-side protected (`src/lib/admin/auth.js`). Operators and roles are listed in `ADMIN_USERS` (scrypt hashes); sessions are HMAC-signed HttpOnly cookies. This is an internal operator login, not a customer sign-in, so ADR-005 is unchanged.
- Durable state in `src/lib/admin/store.js`: JSON documents + JSONL logs under `ADMIN_DATA_DIR`, with locks and atomic writes, behind a small interface a database adapter can replace.
- No new runtime framework; added dependencies: `micromark` + `micromark-extension-gfm` (safe Markdown rendering in the admin) and `@anthropic-ai/sdk` (optional AI interpretation, server-only).

### Superseded / Rejected Alternatives

- **A database (Mongo/Postgres/Redis):** none is provisioned for this site and the hosting is unknown (Q-005); adding one would be infrastructure work outside this repo. Revisit when Q-019 is answered.
- **An external SaaS admin/CMS:** would duplicate the repository as a second source of truth.

---

## ADR-009: The repository is the only source of knowledge; the admin proposes changes

### Status

Accepted.

### Decision & Implementation

Knowledge docs stay in `AGENTS.md` and `docs/`. The admin reads the effective revision (working tree, or the GitHub base branch) and stores only _proposed changes_ with their base blob SHA. Submitting writes the working tree (`local`) or opens a PR (`github`); conflicts are detected by SHA; history and restore come from git. A change is effective only once merged, which is also when agents see it.

### Rejected Alternatives

- **Editable copy in a database synced to Markdown:** two editable sources drift; rejected by the brief and by this ADR.

---

## ADR-010: Same-URL experiments via proxy rewrite, conservative fixed-horizon evaluation

### Status

Accepted. No experiment has run on production traffic; the release switch is off by default.

### Context & Problem Statement

No feature-flag or experimentation provider is installed. Catch-all pages are cached SSG output, so per-visitor variants must not go through a shared cache, and search signals must not change.

### Decision & Implementation

- `src/proxy.js` assigns visitors by hashing `msg91_vid` and rewrites live experiment URLs to an SSR route that renders the arm with `private, no-store` at the same URL. No experiment → no change to any request.
- Treatments are section overrides on the page JSON (merge / replace / remove), so arms reuse existing components and contracts.
- Exposure is a client beacon after hydration; outcomes come from the real sign-up result. Events are validated against the deterministic assignment.
- Evaluation: fixed-horizon two-proportion tests with a planned sample, Bonferroni across challengers, a Haybittle–Peto interim boundary for repeated looks, and an SRM check. No Bayesian "probability to win" or uncorrected dashboards.

### Rejected Alternatives

- **Client-side swapping after load:** flicker and layout shift, and arms visible in the baseline HTML.
- **Separate variant URLs:** needs redirects and canonical handling for every test; kept as an option in [EXPERIMENTS.md](EXPERIMENTS.md#search-safety).
- **A homegrown sequential/Bayesian engine:** harder to validate; the chosen methods are standard and conservative.

---

## Lessons Learned & Incident Log

- **Incident / Bug:** Pricing and sign-in changes repeatedly reverted on `main` (see ADR-003 and ADR-005), as well as one-off reverts like `a4e5ea05` "Revert Cloudflare issue" and `701fd33a` "Revert Fixing" in `src/components/HeadComp/HeadComp.js`.
    - **Root Cause:** Not recorded. Changes reached `main` without a reproducible pre-merge check.
    - **Prevention Rule:** Follow `web` → `main` promotion and the checklist in [DEVELOPMENT.md](DEVELOPMENT.md). For pricing, check every product page and at least one country with a non-USD currency.
- **Incident / Bug:** JSON keys that name no registered component render nothing. `moreFeature` in every `knowledgebase.json` and in `src/data/in/hello.json` is such a key today.
    - **Root Cause:** The registry lookup in `src/pages/[[...slug]].js` fails silently on the server.
    - **Prevention Rule:** Run `node scripts/check-page-data.mjs` before every PR.
- **Incident / Bug:** Time-boxed banners were removed by hand (`fd9c481a` "remove banner after 5th sep. automatically", `f80f51e9`).
    - **Prevention Rule:** Give event banners an end date in code, as `src/components/SummitBanner/SummitBanner.js` does, instead of relying on someone remembering to remove them.
