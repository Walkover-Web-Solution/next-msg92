---
covers:
    [
        'src/components/HeadComp/**',
        'src/data/specialPages.json',
        'src/data/availableCountries.json',
        'public/sitemap*.xml',
        'public/robots.txt',
        'public/_redirects',
        'src/pages/guide/**',
    ]
status: current implementation recovered from code and crawl files — keyword opportunities are proposals, not search evidence
owner: unknown (SEO owner not recorded in the repo)
verified_at: f4275980
verified_on: 2026-10-24
---

# SEO & Search Map

This doc covers how msg91.com is meant to be found: which URLs exist, what each group is for, how canonical/hreflang/robots/sitemaps behave, and what is known to be broken. Tag-level rules for writing a page's metadata are in [DESIGN.md](DESIGN.md#seo--metadata-expectations). This doc is the page map and the search-behaviour record. Routing internals are in [ARCHITECTURE.md](ARCHITECTURE.md).

> [!IMPORTANT]
> **There is no search evidence in this repo.** No Search Console, rankings, query or crawl-stats access was available on 2026-10-24. Everything below comes from code, JSON and the files in `public/`. Anything labelled "opportunity" is a proposal. Don't promise rankings or inclusion in AI search features. Follow Google's primary guidance: [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [website testing](https://developers.google.com/search/docs/crawling-indexing/website-testing), [AI features](https://developers.google.com/search/docs/appearance/ai-features). No special AI-specific files or markup are required, so don't invent any.

## Page Map & Search Intent

There are 339 page JSON files (`global` + 10 country folders; one, `event-registration`, is hidden with `"show": false`), plus the pricing routes, about 280 guide posts and a few code pages.

| Group                  | Representative URLs                                                                                                                   | Audience / intent                                    | Canonical & indexing intent                                                                                                           | Hreflang                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Home                   | `/`, `/in`, `/us` … (11)                                                                                                              | Brand / navigational, "cloud communication platform" | Index. Self-canonical                                                                                                                 | Full set + x-default → `/`                          |
| Channel products       | `/sms`, `/otp`, `/whatsapp`, `/email`, `/voice`, `/rcs`, `/numbers`, `/push-notification`, `/one-api` (+ country copies)              | Commercial: "SMS API", "OTP service", "WhatsApp API" | Index. Self-canonical, including the country prefix                                                                                   | Full set                                            |
| Applications           | `/hello`, `/campaign`, `/segmento`, `/knowledgebase`, `/reports`, `/chatbot`, `/whatsapp/chatbot`                                     | Commercial: help desk, CDP, automation               | Index                                                                                                                                 | Full set                                            |
| Pricing                | `/pricing/<product>`, `/<cc>/pricing/<product>` (10 products × 11)                                                                    | Transactional: "<product> pricing"                   | Index. SSR with live prices ([ADR-003](DECISIONS.md))                                                                                 | Full set (pricing is exempt from the `global` skip) |
| Compare                | `/compare`, `/compare/msg91-vs-{twilio,messagebird,interakt,wati,aisensy,freshchat,intercom,tawk,delightchat}`, `/whatsapp/compare/*` | Commercial investigation: "X alternative", "X vs Y"  | Index. Global only                                                                                                                    | None (`justNested` / global)                        |
| Integrations, partners | `/partners-and-integrations`, `/partners-and-integrations/{shopify,hubspot,freshworks,tally}`, `/become-a-partner`                    | "MSG91 + <tool>" and partner programme               | Index                                                                                                                                 | None for nested pages                               |
| Free tools             | `/free-whatsapp-link-generator`, `/free-apple-messages-for-business-link-generator`, `/shorturl`, `/file-hosting`                     | Informational / tool queries (top of funnel)         | Index                                                                                                                                 | Full set                                            |
| Programmes / campaigns | `/startups`, `/hello-for-startups`, `/textlocal-alternative`, `/cost-comparision`                                                     | Audience-specific                                    | Index. `textlocal-alternative` is date-bound and stale ([POSITIONING.md](POSITIONING.md#campaigns-separate-from-product-positioning)) | Varies                                              |
| Case studies           | `/case-studies`, `/case-studies/<customer>` (28)                                                                                      | Proof, brand + customer queries                      | Index. Pages render `HeadComp` themselves                                                                                             | None                                                |
| Guide / blog           | `/guide`, `/guide/<slug>` (≈280 MDX)                                                                                                  | Informational long-tail                              | Index. Canonical hard-coded to `https://msg91.com/guide/<slug>`                                                                       | None                                                |
| Policies               | `/privacy-policy`, `/terms-of-use`, `/gdpr`, `/no-spam`, `/refund-policy`, `/sla/hello` …                                             | Trust / legal                                        | Index (no intent to rank)                                                                                                             | None (`global`)                                     |
| Utility                | `/signup`, `/thank-you`, `/verify`, `/github-auth-token`, `/outlook-token`, `/demochatbot`                                            | Not search landing pages                             | **Should not need to rank.** `/signup` is in the sitemap. `/thank-you` and the callback pages have no noindex                         | —                                                   |

`/help/*` (184 sitemap URLs) and `/marketplace` are served by other systems (`public/_redirects` line 1 proxies `/marketplace` to `marketplace.msg91.com`). This repo has no pages for them.

## Canonical, Hreflang & Robots Rules (from code)

- **Canonical:** `src/components/HeadComp/HreflangTagComp.js` builds `BASE_URL + '/' + pathURL`. Every page is self-canonical, including its country prefix. Built by string concatenation, so `BASE_URL` must be exactly `https://msg91.com`.
- **Hreflang:** `x-default` and `en` both point to the un-prefixed global URL. One alternate is emitted per entry in `src/data/availableCountries.json`, including hidden ones (`br`, …). Alternates are skipped for slugs in `specialPages.global` (26; pricing excepted), `specialPages.justNested` (12) and `case-studies`.
- **Hreflang to missing pages:** `cost-comparision` and `ecommerce-store` exist only in `global` but are not in `specialPages.global`. Each emits 10 country alternates that return 404. Fix: add them to `specialPages.global`, or create the country pages.
- **Robots meta:** `HeadComp` emits `noindex,nofollow` (robots, googlebot, bingbot) when `BASE_URL !== 'https://msg91.com'`. That value is inlined at **build** time. `src/pages/guide/[slug].js` and `src/pages/guide/index.js` have no such guard, so a testing build of the guide is indexable ([OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-014). `/guide` (index) also has no canonical.
- **`public/robots.txt`:** allows everything except `/cgi-bin/` and `/us/case-studies/oxebox/feed/`, and lists the three sitemaps. It has a stray empty `Disallow:` line, which is harmless. The private admin area and preview routes must be blocked by **authentication**, not by robots rules, plus `X-Robots-Tag: noindex`. A `Disallow` line would only advertise the paths.

## Rendering Assumptions

| Route                           | Mode                                                                 | Search implication                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Catch-all JSON pages            | SSG on first request (`fallback: 'blocking'`), cached until redeploy | Full HTML on first byte. Content changes need a deploy                                                                                  |
| `/pricing/*`, `/<cc>/pricing/*` | SSR per request against MSG91 pricing APIs                           | If the pricing API fails, the route returns **404**, which can drop pricing URLs from the index during an outage ([FLOWS.md](FLOWS.md)) |
| `/guide/<slug>`                 | SSG at build (`fallback: false`)                                     | New posts need a rebuild                                                                                                                |
| `/guide`, `/demochatbot`        | SSR                                                                  | —                                                                                                                                       |

`SEOComp` and FAQ answers are server-rendered HTML strings, so they are crawlable.

## Structured Data & Social Previews

- **JSON-LD** (`WebSite` + `Organization`) is emitted **only when `pageInfo.country === 'in'`** (`src/components/HeadComp/HeadComp.js`), through `next/script` `afterInteractive`. It is injected by JavaScript, not present in the initial HTML.
- **Defect:** the `WebSite` `SearchAction` targets `https://msg91.com/in/search?q={search_term_string}`. No search route exists in this repo. Either remove the `SearchAction` or point it at a real search URL. Structured data must describe visible, working features.
- **No** `Product`, `FAQPage`, `Article` or `BreadcrumbList` markup exists anywhere. Add markup only when it matches content visible on the page.
- **Open Graph:** `og:title`/`og:description` reuse the title and description. `og:image` is the relative path `/assets/brand/favicon.svg` (an SVG favicon, which most social platforms won't render). `og:url` is hard-coded to `https://msg91.com/` on every page. The JSON fields `ogTitle`, `ogDescription` and `keywords` are ignored. Guide posts set their own `og:*`.

## Metadata Quality (computed 2026-10-24 over visible page JSON)

| Check                                  | Result                                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Pages without a `HeadComp` key         | 28. All are case studies that render `HeadComp` from their own component, so effectively 0                                      |
| Missing title                          | 0 of 310                                                                                                                        |
| Title longer than 60 characters        | 96 of 310 (e.g. `/chatbot` 81, `/case-studies` 70, `/compare/msg91-vs-aisensy` 67, `/certificates` 63)                          |
| Missing description                    | 2 (`/case-studies`, `/thank-you`)                                                                                               |
| Description longer than 160 characters | 145 of 310 (e.g. `/certificates` 204, `/chatbot` 195, `/compare/msg91-vs-delightchat` 194)                                      |
| Description shorter than 70 characters | 1 (`/sla/hello`)                                                                                                                |
| Duplicate titles                       | 10 title groups covering 88 URLs. All are the same page copied across country folders. No two **different** pages share a title |
| Title quality                          | Some are bare words: `/campaign` "SMS Campaign", `/shorturl` "ShortUrl", `/ecommerce-store` "Ecommerce Store"                   |

Country copies share title and description text. Hreflang tells search engines the copies are alternates, so this is acceptable, but localized titles would help users.

## Sitemaps (hand-maintained, no generator)

| File                        | Entries                                    | Notes                                                            |
| --------------------------- | ------------------------------------------ | ---------------------------------------------------------------- |
| `public/sitemap.xml`        | 690 `<loc>` (242 with hreflang alternates) | Newest `<lastmod>` is `2025-10-31`. Not updated for about a year |
| `public/sitemap_images.xml` | 233                                        | —                                                                |
| `public/sitemap_video.xml`  | 33                                         | —                                                                |

Coverage, computed by comparing `<loc>` paths with page JSON, pricing slugs and guide posts:

- **Pages that serve 200 but are not listed as `<loc>`: 246.** That is 110 pricing URLs, 37 guide posts and about 99 others. The un-prefixed global pages (`/`, `/hello`, `/email`, `/campaign`, `/file-hosting`, `/free-whatsapp-link-generator`, `/hello-for-startups`, `/compare/msg91-vs-tawk`, …) appear only as `x-default` alternates of the country entries, never as their own `<loc>`. Newer pages (`file-hosting`, `cost-comparision`, `ecommerce-store`) are missing entirely.
- **`<loc>` URLs with no page in this repo: 207.** 184 are `/help/*` (another system), 6 are `/pdf/*` (static files) and the rest are older paths. Check the `/help/*` entries with their owner, and remove dead ones.
- No hidden (`show: false`) page is in the sitemap, and every `<loc>` uses `https://msg91.com`.

**Opportunity (proposed):** generate the sitemap from `src/data/` + `specialPages.json` + `_posts/blog/` at build time, so it can't drift. Until then, add a sitemap entry by hand in the same PR as any new page ([DEVELOPMENT.md](DEVELOPMENT.md)).

## Redirects (`public/_redirects`)

- 1,334 rules in Netlify/Cloudflare format. 1,168 have no status (that host format defaults to 301), 162 are explicit `301`, and 1 is a `200` proxy (`/marketplace`).
- **Whether the production host applies this file is unconfirmed** ([OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-005). Next.js ignores it, and `npm start` does not apply it.
- **Issues found:**
    - 96 rules redirect to `/`. Redirecting unrelated removed URLs to the home page is treated as a soft 404, so map them to the closest relevant page, or let them return 404/410.
    - 34 source paths appear more than once (e.g. `/blog`, `/blog/13-sms-marketing-tactics/`). Only the first match wins.
    - 3 malformed lines contain spaces in paths (lines 662, 901, 948: `/sms-pricing/Costa Rica`, `/ documentation`, `/in/regional sms/`).
    - 2 rules redirect live guide posts (`/guide/magento-sms-extension-for-msg91-by-magecomp/`, `/guide/a-journey-from-sms-to-communication-megacorp/` → `/guide`). Their MDX still exists.
- **Rule:** never change or remove a public URL without a redirect to the closest equivalent ([AGENTS.md](../AGENTS.md) rule 6). Follow Google's [URL change guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes): one-to-one 301s, update internal links and sitemaps.

## Experiments & Search

Rules for A/B/C tests ([EXPERIMENTS.md](EXPERIMENTS.md)), from Google's [website testing guidance](https://developers.google.com/search/docs/crawling-indexing/website-testing):

1. **Same-URL tests** (the variant is served at the original URL by server-side assignment) keep the original self-canonical. Don't change the canonical, title or hreflang between arms unless that is the hypothesis being tested, and say so in the experiment record.
2. **No crawler-specific content.** Never choose an arm by user agent. Bots get assigned like anyone else. Bot traffic is excluded from **analysis**, not from serving.
3. **Redirect tests** (separate variant URLs) must use **302** (temporary) redirects. Variant URLs must carry `rel=canonical` to the original, and must not appear in the sitemap.
4. **Variant responses must not be cached publicly** (`Cache-Control: private`), so one visitor's arm can't be served to others, crawlers included.
5. **Retire promptly.** When a test ends, ship the winner to the original URL, remove the test routing and any variant URLs, and 301 any variant URL that was exposed.
6. Conversion tests do not measure ranking effects. Don't read search performance changes from an A/B test.

## Known Issues (summary)

| ID   | Issue                                                                              | Where                                        | Impact                                       |
| ---- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| S-01 | Global pages missing from the sitemap as `<loc>`; sitemap stale since 2025-10-31   | `public/sitemap.xml`                         | Slower discovery of new pages                |
| S-02 | `SearchAction` points to a non-existent `/in/search`                               | `src/components/HeadComp/HeadComp.js`        | Invalid structured data                      |
| S-03 | Hreflang alternates to 404 for `cost-comparision`, `ecommerce-store`               | `src/data/specialPages.json`                 | Hreflang errors                              |
| S-04 | Guide pages indexable on non-production builds; `/guide` has no canonical          | `src/pages/guide/`                           | Duplicate content risk from testing hosts    |
| S-05 | 96 redirects to `/`, duplicate and malformed redirect lines                        | `public/_redirects`                          | Soft 404s, unpredictable redirects           |
| S-06 | `og:image` is an SVG favicon; `og:url` is fixed to the home page                   | `HeadComp`                                   | Poor social previews                         |
| S-07 | 96 long titles, 145 long descriptions                                              | page JSON `HeadComp`                         | Truncated snippets                           |
| S-08 | Stale date-bound landing page (`textlocal-alternative`, "before October 31, 2025") | `src/data/global/textlocal-alternative.json` | Misleading copy on an indexed page           |
| S-09 | Pricing route returns 404 when the pricing API fails                               | `src/pages/pricing/[products].js`            | Indexed pricing URLs can drop during outages |
| S-10 | `/thank-you` and OAuth callback pages are indexable                                | page JSON / `src/pages/*.js`                 | Thin pages in the index                      |

## Proposed Keyword Opportunities (not evidence)

Unvalidated hypotheses, drawn from the page groups above. Validate them with Search Console data before acting.

- Comparison intent: comparison pages exist for 9 competitors but no hub links them from product pages.
- Integration intent: only 4 integration detail pages exist, while the partners page claims "100+" integrations (see the [claim register](POSITIONING.md#claim-to-evidence-register)).
- Pricing intent: 110 pricing URLs are absent from the sitemap. Listing them is low effort.
