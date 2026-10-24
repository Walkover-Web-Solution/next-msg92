---
covers: ['*']
verified_at: 701fd33a
verified_on: 2026-10-22
---

# Product Vision & Strategic Direction

This repository is the public marketing website for MSG91 (msg91.com), a cloud communication platform (CPaaS). Its job is to explain MSG91's products to developers and businesses, show pricing for their country, and turn visitors into sign-ups. It is not the MSG91 product itself: the dashboard, messaging APIs and billing live in other systems, which this site links to or calls.

## Authoritative Sources & Status

- **Approved Direction:** Confirmed by the user, 2026-10-22: the primary audience is developers and businesses buying CPaaS, and the site exists to convert them into sign-ups across country-localized pages. Changes flow feature branch → `web` (testing) → `main` (production). Everything else below is recovered from the code and the repository README and is labelled as such.
- **Current Implementation:** As of `701fd33a`: product, pricing, comparison, case-study, policy and free-tool pages composed from JSON in `src/data/`, about 280 MDX blog posts under `/guide`, a multi-step sign-up flow, and country variants for IN, BR, BR-PT, AE, PH, FIL-PH, SG, ES, GB, US plus a `global` default (`src/data/availableCountries.json`). See [ARCHITECTURE.md](ARCHITECTURE.md).
- **Proposals & Roadmaps:** None are recorded in the repository (no roadmap, PRD or issue templates). Feature work arrives as `WEBxxx-*` branches named after tickets in an external tracker.
- **Unknowns & Ambiguities:** See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Target Audience & Ideal Customer Profile (ICP)

- **Primary Persona (approved):** Developers and businesses evaluating or buying CPaaS: people who need to send OTPs, SMS, WhatsApp, voice, email or RCS messages, or run customer support (Hello), and who compare MSG91 with alternatives on features and price.
- **Secondary Personas (inferred from pages, not confirmed):**
    - Startups applying for the startup programme (`src/data/global/startups.json`, `src/data/global/hello-for-startups.json`).
    - Partners and integrators (`src/data/global/become-a-partner.json`, `src/data/global/partners-and-integrations/`).
    - Event attendees registering for MSG91 events (`src/components/EventRegistrationComp/`).
    - Readers arriving through SEO content (`_posts/blog/`, served at `/guide`) and free tools.

## Problems Solved & Value Proposition

Detailed audiences, messages, CTAs and the claim register are in [POSITIONING.md](POSITIONING.md); alternatives in [COMPETITORS.md](COMPETITORS.md). This section stays high level.

What the site markets is taken from the product menu in `src/data/global/common.json` (`menu.products_list`) and the home page metadata in `src/data/global/home.json`. The differentiators below are the site's own claims, not verified facts.

| Customer Problem                                     | How We Solve It                                                                                          | Unique Value / Differentiator                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Need to verify users and send transactional messages | OTP, SMS, RCS, Email, Voice, WhatsApp, Push Notification and Numbers product pages                       | One vendor for every channel; "One API" for multi-channel sending (`src/data/global/one-api.json`) |
| Need customer support and engagement tooling         | Hello (ticketing and chat), Campaign (event-based automation), Segment (`segmento`) pages                | Applications built on the same channels                                                            |
| Need to know the price before committing             | Country- and currency-aware pricing pages (`src/pages/pricing/[products].js`) and calculators            | Live prices fetched from MSG91 pricing services, not hard-coded                                    |
| Choosing between vendors                             | `compare/msg91-vs-*` pages, the Textlocal migration page, cost-comparison page                           | Side-by-side comparisons written by MSG91                                                          |
| Small, quick jobs                                    | Free tools: WhatsApp link generator, Apple Messages link generator, URL shortener and file hosting pages | Free entry points that lead to sign-up                                                             |

## Core Principles & Design Philosophy

These are **inferred** from how the code is built. Confirm them before treating them as rules.

1. **Content lives in data, not in code:** pages are ordered lists of section components declared in JSON (`src/data/<country>/<page>.json`), so marketing copy changes are JSON edits. Prefer reusing an existing section component over a page-specific one.
2. **Localize per country:** each supported country has its own data folder, currency and `hreflang` (`src/data/availableCountries.json`). A page change usually needs the same change in every country folder that has that page.
3. **SEO is a first-class requirement:** every page carries title/description metadata, hreflang tags and canonical URLs (`src/components/HeadComp/`), plus sitemaps and about 1,360 redirect rules (`public/_redirects`). Breaking a URL loses search traffic.
4. **Every page leads to sign-up:** sign-up and login links appear in the menu, notification bar and pre-footer (`src/components/PreFooterComp/`, `src/components/notificationBarComp/`).

## Strategic Priorities & Success Measures

> [!TODO]
> Not determinable from the repository: there are no KPIs, analytics goals or priorities in the code or docs. Google Tag Manager and Microsoft Clarity are loaded (see [CONTRACTS.md](CONTRACTS.md)), but no conversion targets are defined. Needs a human.

- **Top Priorities:** The approved goal is sign-up conversion from the ICP above. Anything more specific (which products or countries come first) needs a human.
- **Key Success Metrics:** Not recorded. What the site can measure today (and what it cannot) is in [MEASUREMENT.md](MEASUREMENT.md); targets are Q-022.

## Boundaries & Non-Goals

> [!TODO]
> Not confirmed by the user. The boundaries below are inferred from what the repository does not contain.

- **Explicit Non-Goal (inferred):** This site is not the MSG91 application. Account management, sending messages, billing and reporting belong to the MSG91 dashboard (linked via `LOGIN_URL`) and backend APIs. Don't build product features here; describe the missing backend contract in [CONTRACTS.md](CONTRACTS.md) instead.
- **Anti-Patterns:** Hard-coding prices or copy in components instead of JSON; adding a page for one country and forgetting the others; changing or removing public URLs without a redirect in `public/_redirects`.

## How Future Agents Must Evaluate Requests

When evaluating any user or feature request, follow this protocol:

1. **Align with Approved Direction:** Compare the request against the ICP and the conversion goal above. A change that makes it harder for a developer or business to understand a product, see its price, or sign up needs a strong reason.
2. **Improve Unclear Requests:** If a request is ambiguous ("update the WhatsApp page"), ask which countries and which section, then propose the JSON and component changes before writing code.
3. **Flag Conflicts:** If a request contradicts an approved principle or non-goal (for example, building dashboard functionality into the marketing site), explain the conflict and recommend declining or changing the request.
4. **Explicit Direction Changes:** If the user intentionally changes product direction, make that decision explicit, confirm it, and update this document in the same change.
5. **Contract Boundaries (No Fabricated Integrations):** If a requested feature needs a backend capability that doesn't exist, describe the required API or contract in [CONTRACTS.md](CONTRACTS.md). **Never fabricate mock endpoints or fake working integrations that give a false impression of backend readiness.**
