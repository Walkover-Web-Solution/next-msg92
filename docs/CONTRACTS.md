---
covers:
    [
        'src/pages/api/**',
        'src/utils/**',
        'src/data/specialPages.json',
        'src/data/availableCountries.json',
        'src/data/countries.json',
    ]
verified_at: 701fd33a
verified_on: 2026-10-22
---

# Contracts & Data Schemas

This is a plain-JavaScript site, so there are no TypeScript types. The JSON files under `src/data/` define the contracts, together with the request and response shapes that `src/pages/api/` and the MSG91 backends use. All shapes below come from the code. Env var names are listed here, but their meanings and defaults are in [DEVELOPMENT.md](DEVELOPMENT.md). The request lifecycle is in [ARCHITECTURE.md](ARCHITECTURE.md), and user journeys such as sign-up and pricing are in [FLOWS.md](FLOWS.md).

## Authoritative Type Definitions

| Domain Entity                   | Shape owner     | Source File                                                    | Description                                                                                                |
| ------------------------------- | --------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `pageInfo` (catch-all routes)   | object literal  | `src/utils/getPageInfo.js:getPageInfo`                         | Route identity parsed from the URL slug. It is POSTed to `/api/data` and passed to every section component |
| `pageInfo` (pricing routes)     | object literal  | `src/pages/[country]/pricing/[products].js:getServerSideProps` | A different shape, built by hand for `/pricing/<product>`                                                  |
| Page data                       | JSON file       | `src/data/<country>/<page>.json` <!-- verify:ignore -->        | An ordered map from component-registry key to that component's `data` prop                                 |
| Common (chrome) data            | JSON file       | `src/data/global/common.json` (one per country folder)         | Data for the notification bar, menu and footer                                                             |
| Pricing page data               | JSON file       | `src/data/global/pricing.json` (one per country folder)        | `products` + `pageData[<product>]`. This is **not** a component map                                        |
| Country list (site locales)     | JSON array      | `src/data/availableCountries.json`                             | The 10 locale folders that are recognised as the first URL segment                                         |
| Country list (ISO and currency) | JSON array      | `src/data/countries.json`                                      | 248 countries. Used for currency and country-name lookups                                                  |
| Slug registries                 | JSON object     | `src/data/specialPages.json`                                   | Slug lists used to build URLs, hreflang tags and pricing links                                             |
| Subscription plan (normalised)  | function output | `src/utils/pricing/handlePlanStructure.js:handlePlanStructure` | Flattens raw subscription plans into one row per plan and currency                                         |

### `pageInfo` (from `getPageInfo`)

```js
// /in/sms             → { country:'in',     page:'sms',  pathArray:['in','sms'], pathURL:'in/sms', baseURL:'sms' }
// /sms                → { country:'global', page:'sms',  pathArray:['sms'],      pathURL:'sms',    baseURL:'sms' }
// /                   → { country:'global', page:'home', pathArray:[],           pathURL:'',       baseURL:'' }
// /whatsapp/compare/x → { country:'global', page:'whatsapp', pathURL:'whatsapp/compare/x', ... }
{ country: string /* 'global' | availableCountries[].shortname.toLowerCase() */,
  page: string, pathArray: string[], pathURL: string, baseURL: string /* path without the country prefix */ }
```

`page` is always the first segment after the country. Deeper segments are encoded only in `pathURL`. The pricing routes pass a different shape: `{ country, product, page: product, baseURL: 'pricing/<product>', pathURL }`. They have no `pathArray`. Guide pages use `src/utils/getGuidePageInfo.js:getGuidePageInfo`, which returns `{ pageNo, country: 'global' }`.

### Page JSON (`src/data/<country>/<page>.json`) <!-- verify:ignore -->

```jsonc
{
  "HeadComp":     { "title": "…", "description": "…" },   // key = key in the Components map
  "BannerComp":   { /* passed as data={…} to BannerComp */ },
  "FeatureComp":  { … },
  "PreFooterComp":{ … }
  // optional flags read by /api/data:
  // "show": false   → the page is served as notfound.json (404). Currently only global/event-registration.json
  // "common": true  → the file can never be served as a page (only common.json has this)
}
```

- The order of the keys is the render order. Each key must exist in the `Components` map in `src/pages/[[...slug]].js`. An unknown key is skipped with a `console.error`, and the page still renders.
- Every component receives `{ data, pageInfo, browserPathCase }`.
- When `BannerComp.code` is truthy, the component calls `POST /api/curlConvert` with `curlKey = BannerComp.slug`. Only `sms`, `rcs` and `voice` use this today.
- `src/data/notfound.json` has the keys `HeadComp` and `NotFoundComp`. `getStaticProps` checks for `NotFoundComp` and returns `notFound: true`.

> [!WARNING]
> Country pages do **not** fall back to global. `/us/sms` returns 404 unless `src/data/us/sms.json` exists. To add a page for a country, create the file in that country's folder.

### `common.json`

```jsonc
{ "common": true,
  "notification": { "support": "Contact Us", "login": "Login", "hide": ["signup", …] },   // hide = page slugs
  "menu":   { "products", "products_list":[{ "name", "products":[{ "name","slug","description" }] }],
              "integrations", "integrations_list", "pricing", "pricing_list", "apidocs", "signup_btn", "hide" },
  "footer": { "hide", "products", "utilities", "channels", "resources", "discover", "policies", "downloads", "social", "address" } }
```

`src/utils/getCommonCompData.js:getCommonCompData` loads this file with a `require()` call, not through the API.

### `pricing.json` (per country)

```jsonc
{ "products": { "applications":[{ "name","slug","icon" }], "channels":[…] /*, "services" optional */ },
  "pageData": { "<product>": { "HeadComp", "heading", "pricingPlans", "dialPlan", "comparePlans", "connectComp", "faqComp" } } }
```

A product slug that is missing from `products.*[].slug` returns 404 on the pricing route. `/pricing` (no product) is redirected to `/pricing/hello` in `public/_redirects`.

### Lookup JSON

```jsonc
// availableCountries.json: 10 entries. shortname.toLowerCase() is the URL segment and the data folder
{ "shortname":"BR-PT", "route":"br", "name":"Brazil", "code":55, "language":"…", "currency":"USD",
  "htmlLang":"pt-BR", "hreflang":"…", "hide"?: true, "languages"?: [{ "language":"Portuguese", "link":"br-pt" }] }
// countries.json: 248 entries, all with exactly these keys
{ "shortname":"AF", "name":"Afghanistan", "code":93, "currency":"INR" }
// specialPages.json
{ "global":[…26 slugs that are never country-prefixed], "products":[…17], "countries":["in","br","br-pt","ae","ph","fil-ph","sg","es","gb","us"],
  "pricing":["hello","campaign","segmento","otp","sms","rcs","email","whatsapp","voice","otpwidget"], "justNested":[…12 nested paths] }
```

> [!WARNING]
> There are two country lists, and they have to agree. `getPageInfo` and `_document` (for `<html lang>`) read `availableCountries.json`, while `getURL` reads `specialPages.json` → `countries`. A new locale needs an entry in both files, plus a data folder that contains a `common.json`.

> [!WARNING]
> The `currency` values in `countries.json` are pricing buckets, not ISO currencies. For example, Afghanistan is `INR` and Albania is `GBP`. `src/utils/pricing/getCurrencySymbol.js:GetCurrencySymbol` uses them as they are. `br-pt` is aliased to `br`, and `fil-ph` to `ph`.

## Backend API Endpoints & Contracts

### Internal Next API routes (`src/pages/api/`)

The field-by-field reference (method, path, authentication, parameters, body, response, errors) is [INTERNAL_API.md](INTERNAL_API.md), rendered from [internal-api.json](internal-api.json). The read-only MCP server in `mcp/api-reference/` serves that JSON and does not call these routes. How to run it is in [DEVELOPMENT.md](DEVELOPMENT.md#internal-api-mcp-server).

These routes are public. None of them check auth, origin or rate limits.

| Method          | Endpoint Path                    | Request                                                                  | Response (200)                                                                 | Errors                                                                                       | Env / upstream                                                                                   | Caller                                                               |
| --------------- | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| any (POST used) | `/api/data`                      | body = `pageInfo`                                                        | page JSON, or `notfound.json`                                                  | 404 `{error:'page not found'}` (in practice unreachable)                                     | none. Uses `require('@/data/…')`                                                                 | `src/pages/[[...slug]].js:getStaticProps` via `${BASE_URL}/api/data` |
| any             | `/api/getNestedData`             | `{ country, pathURL }`                                                   | page JSON, or `notfound.json`                                                  | 404 (unreachable)                                                                            | none                                                                                             | **no callers in repo**                                               |
| POST            | `/api/curlConvert`               | `{ curlKey: 'sms'\|'rcs'\|'email'\|'voice'\|'whatsapp'\|'numbers' }`     | `{ curl, snippets:{ python,node,php,ruby,curl } }`                             | 405, 404 unknown key, 500 `{error,details}`                                                  | `curlconverter` package. The cURL strings are hard-coded and target `control.msg91.com/api/v5/*` | `src/components/CodeSnipped/CodeSnipped.js`                          |
| POST            | `/api/apple-messages/url`        | `{ businessId*, intentId, groupId, preFilledMessage }`                   | upstream body as returned (the client expects `{ success:true, url }`)         | 405, 400 `{success:false,message}`. **Upstream errors return 200** `{success:false,message}` | `IMESSAGE_URL` (axios, 10 s timeout)                                                             | `src/components/AppleMessagesLinkComp/AppleMessagesLinkComp.js`      |
| GET             | `/api/pricing/fetchDialPlanInfo` | query `service_id, dial_plan_id, currency, limit, offset, search`        | upstream JSON (`{ headers:[{key,userFriendlyName}], data:[{<key>:{value}}] }`) | the upstream status and body are passed through                                              | `SUBSCRIPTION_PRICING_URL` + `/fetchDialPlanInfo` (forces `ui_friendly=1`)                       | `src/components/PricingComp/DialPlan/index.js`                       |
| GET             | `/api/pricing/hello`             | query `currency` (only `BRL` is honoured; any other value becomes `USD`) | `{ pricingData: Plan[], currency, brlFallback?:true, unavailable?:true }`      | 405. **Always 200**, with `pricingData: []` on failure                                       | `SUBSCRIPTION_PRICING_URL` + `/plans?ms_id=7`                                                    | `src/components/HelloBrComp/PricingComp/Pricing.js`                  |
| POST            | `/api/send-summit-whatsapp`      | `{ name*, phone* }`                                                      | `{ success:true, data:<upstream> }`                                            | 405, 400, 500 `{error}`                                                                      | `WHATSAPP_AUTHKEY`, `SUMMIT_WA_INTEGRATED_NUMBER`, `SUMMIT_WA_API_URL`                           | `src/components/EventRegistrationComp/RegistrationForm.js`           |

Outbound payload of `send-summit-whatsapp`, with the `authkey` header taken from `WHATSAPP_AUTHKEY`:

```jsonc
{ "integrated_number": "<SUMMIT_WA_INTEGRATED_NUMBER>", "content_type": "template",
  "payload": { "messaging_product": "whatsapp", "type": "template",
    "template": { "name": "event_ragistration", "language": { "code": "en", "policy": "deterministic" }, "namespace": "…",
      "to_and_components": [{ "to": ["<digits of phone>"], "components": { "body_name": { "type":"text","value":"<name>","parameter_name":"name" }, "button_1": {…}, "button_2": {…} } }] } } }
```

Outbound payload of `apple-messages/url`: `{ businessId, "biz-intent-id", "biz-group-id", body }`.

> [!WARNING]
> `/api/send-summit-whatsapp` is still deployed, but `src/data/global/event-registration.json` has `show:false` and the Summit banner expired on 2026-09-05. Anyone can POST `{name, phone}` to it and send an MSG91-paid WhatsApp template to any number. The route also logs the phone number. Remove the route or add a guard before you change anything nearby.

> [!WARNING]
> In `/api/pricing/fetchDialPlanInfo`, the catch block reads `err.response.status`. A network error or timeout has no `response`, so the handler throws and Next returns a generic 500.

### `Plan` row (from `handlePlanStructure`)

```js
{ name, amount, type /* plan_type.name, e.g. monthly/yearly */, discount: applied_discounts[],
  services: [{ name, freeCredit, followUpRate, dialPlan: { serviceId, dialPlanId } | null, chunkSize, postPaidAllowed }],
  features: [{ name, included: boolean }] }
```

In `src/utils/pricing/getPricing.js`, the `msIds` map sends product slugs to the subscription `ms_id`. The map is: `hello` 7, `segmento` 2, `email` 1, `rcs` 9, `whatsapp` 5 and `otpwidget` 8.

### External MSG91 and third-party calls

| Base (env)                                                    | Path + params                                                                                                                                                 | Called from                                                                                                                                                         | Side                     | Response used                                                                                                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `SUBSCRIPTION_PRICING_URL`                                    | `GET /plans?currency&ms_id`                                                                                                                                   | `src/utils/pricing/getPricing.js`, `src/utils/pricing/getSubscription.js` (used by PricingHello, NewHelloPricingComp and CostComparisionComp), `/api/pricing/hello` | server (SSR) and browser | `data.data` → raw plans with `plan_amounts`, `plan_services`, `plan_features`                                                                   |
| `SUBSCRIPTION_PRICING_URL`                                    | `GET /fetchDialPlanInfo`                                                                                                                                      | `/api/pricing/fetchDialPlanInfo`                                                                                                                                    | server                   | see above                                                                                                                                       |
| `PRICING_URL`                                                 | `GET /api/v5/web/fetchPricingDetails?amount&currency&originCountry&destinationCountry`                                                                        | `src/utils/pricing/getSmsOtpPricing.js` (SSR) and `src/components/PricingComp/PricingSMS/PricingSMSOTP.js:GetSmsOtpPricing` (browser)                               | both                     | `data.data` is keyed by a route id. `PricingSMSOTP` reads key `4` (sms), or `106` for otp (`19` when `PRICING_URL` is `https://test.msg91.com`) |
| `VOICE_API_URL`                                               | `GET /public/country/`, `/public/dialplanPricing/?currency`, `/public/pricing/?cid&dialplan_id[&export=1]`                                                    | `src/utils/pricing/getVoicePricing.js` (SSR) and `PricingVoice.js` (browser)                                                                                        | both                     | country list, `data.dialplan_id`, `data[]` plans, `data.url` (export)                                                                           |
| `API_BASE_URL`                                                | `POST /api/v5/nexus/checkSession`, `validateEmailSignUp`, `validateGithubSignUp` and `finalRegister`, then a redirect to `/api/nexusRedirection.php?session=` | `src/components/signupComp/SignUp.js`                                                                                                                               | browser                  | `{ status, hasError, errors, data:{ sessionDetails:{PHPSESSID}, data:{ nextStep, invitations } } }`                                             |
| `API_BASE_URL`                                                | `GET /api/v5/web/getCountries`, `getAllServices`, `getIndustry`, `getStatesByCountryId/:id` and `getCitiesByStateId/:id`                                      | `src/components/signupComp/StepThree/StepThree.js`                                                                                                                  | browser                  | lookup lists                                                                                                                                    |
| `HELLO_API_URL`                                               | `GET /public/bot/template?with_widget=true&page`                                                                                                              | `src/utils/getBotTemplates.js` (on `/demochatbot`)                                                                                                                  | server                   | `{ success, data }`                                                                                                                             |
| `WIDGET_SCRIPT`, `SUMMIT_WIDGET_SCRIPT`, `CHAT_WIDGET_URL`    | script tags (OTP widget: `window.initSendOTP/sendOtp/retryOtp/verifyOtp`; Hello chat: `initChatWidget`)                                                       | SignUp, MobileOtpField, HeadComp, 404, ChatBotDemoComp                                                                                                              | browser                  | `getWidgetData().processes[]`                                                                                                                   |
| IP geolocation (`api.db-ip.com`, `get.geojs.io`, `ipwho.is`)  | `GET`                                                                                                                                                         | `SummitBanner.js`                                                                                                                                                   | browser                  | `countryCode`, `city`, `region`                                                                                                                 |
| `data.submit_url` (from JSON, currently a `flow.sokt.io` URL) | `POST {name,phone,email,dob,website,transport}`                                                                                                               | `RegistrationForm.js`                                                                                                                                               | browser                  | `response.ok` only                                                                                                                              |

Sign-up request bodies sent to `API_BASE_URL` (UTM keys are spread in from the `msg91_query` cookie):

```jsonc
// validateEmailSignUp | validateGithubSignUp
{ "session": "<sessionId cookie>", "mobileToken": "<OTP widget token>", "emailToken"?: "…", "code"?: "<github>", "state"?: "…", "utm_source"?: "…", "source"?: "…" }
// finalRegister
{ "companyDetails": { industry, state, cityId, customCity, country, city, zipcode, address, gstNo, countryId, stateId, companyName, service, vatNo } | {},
  "userDetails": { "firstName", "lastName" }, "acceptInviteForCompanies": [], "rejectInviteForCompanies": [], "session": "<sessionId>" }
```

`PricingSMSOTP` and `PricingVoice` call MSG91 pricing APIs directly from the browser, so those APIs must allow CORS from the site origin. None of these upstreams are proxied, except the routes listed in the internal API table.

## Authentication & Authorization Assumptions

- **Public site.** The site has no user auth of its own. API routes are unauthenticated.
- **Sign-up session.** The `PHPSESSID` returned by the nexus APIs is stored in the plain JS cookie `sessionId` for 30 days. It is passed back to the server in the body (`session`) and in the final redirect query. It is not sent as a header.
- **OAuth.** GitHub sign-in builds the authorize URL from `GITHUB_CLIENT_ID` and redirects back to `REDIRECT_URL` + `/github-auth-token`. That page (`src/pages/github-auth-token.js`) and `src/pages/outlook-token.js` forward the query string to `REDIRECT_URL` + `/signin` or `/signup`. The control panel exchanges the code. The site never sees a token.
- **Client-exposed config.** Every key in `next.config.mjs` → `env` is inlined at build time wherever `process.env.<KEY>` appears. If that code is in the client bundle, the value ships to browsers. This is how the OTP and chat widget tokens (`OTP_WIDGET_TOKEN`, `WIDGET_AUTH_TOKEN`, `SUMMIT_OTP_WIDGET_TOKEN`, `SUMMIT_WIDGET_AUTH_TOKEN`, `CHAT_WIDGET_TOKEN`, `ECOMMERCE_WIDGET_TOKEN`) reach browsers, and they are designed to be public.

> [!WARNING]
> `WHATSAPP_AUTHKEY` is a server secret, but it is also listed in `next.config.mjs` `env`. Today only `src/pages/api/send-summit-whatsapp.js` reads it, so it is inlined only into the server bundle. If any component ever references `process.env.WHATSAPP_AUTHKEY`, the key leaks to every visitor. Server secrets belong in plain `process.env` at runtime, not in `env`.

> [!WARNING]
> Until 2026-10-22, `src/components/signupComp/StepThree/StepThree.js` hard-coded a `Cookie` header with session identifiers (`PHPSESSID`, `HELLO_APP_HASH`, `PROXY_APP_HASH`) on its five lookup calls. Browsers drop that header, so it never had an effect, and it has now been removed. The values are still in git history and need invalidating ([OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-002). Never send credentials from browser code. <!-- verify:ignore -->

## Standard Error Envelope

The site has no shared envelope. Each source uses its own shape:

```jsonc
{ "error": "Only POST method allowed" }                 // curlConvert (405)
{ "error": "Method not allowed" }                       // send-summit-whatsapp (405), pricing/hello (405, Allow: GET)
{ "success": false, "message": "Business ID is required" } // apple-messages/url (400 and all upstream errors, as 200)
{ "pricingData": [], "currency": "USD" }               // pricing/hello: failure is silent, 200
{ "status": "success" | …, "hasError": true, "errors": ["…"] | "…" }   // MSG91 nexus APIs; UI toasts errors[0] ?? errors
{ "hasError": true, "message"?: "…", "errors"?: { field: ["…"] } }       // fetchDialPlanInfo (DialPlan reads message or first errors value)
```

## Persistence & Client Cache Contracts

| Store Name                                                                       | Storage Key                    | Format                                            | Lifetime                                                    | Owner / Invalidator                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cookie                                                                           | `country`                      | locale slug (`in`, `global`, …)                   | `max-age=3600` (1 h. The comment in the code says "1 year") | written in `src/pages/[[...slug]].js:Page` if it is missing, and by the language/country picker in `src/components/notificationBarComp/notificationBarComp.js:handleCookies`. **No reader in this repo**                                                                |
| cookie                                                                           | `msg91_query`                  | raw query string, e.g. `?utm_source=…&source=…`   | 30 days                                                     | `src/utils/setCookies.js:handleBrawserCookies` (every page, via `_app`). Partner pages under `partners-and-integrations/<plugin>` default it to `utm_campaign=tigerplugin`. `src/components/signupComp/StepTwo/StepTwo.js:updateSourceInUrlAndCookie` rewrites `source` |
| cookie                                                                           | `sessionId`                    | PHPSESSID                                         | 30 days                                                     | `src/components/signupComp/SignUp.js:setSession`                                                                                                                                                                                                                        |
| cookie (shared, `domain=.msg91.com; Secure; SameSite=Lax` when not on localhost) | every query param on `/signup` | string                                            | 1 day                                                       | `src/components/signupComp/SignUp.js:componentDidMount` → `src/utils/utilis.js:setSharedCookie`                                                                                                                                                                         |
| cookie (shared)                                                                  | `signup_date`                  | `YYYY-MM-DD`                                      | 30 days                                                     | `StepThree.js`                                                                                                                                                                                                                                                          |
| cookie (shared)                                                                  | `interested_services`          | JSON array of service labels                      | 30 days                                                     | `StepThree.js` (service multi-select)                                                                                                                                                                                                                                   |
| sessionStorage                                                                   | `msg91SummitBannerClosed`      | `'1'`                                             | tab                                                         | `SummitBanner.js` (cleared by `?preview_banner=true` or `?indore=true`)                                                                                                                                                                                                 |
| sessionStorage                                                                   | `msg91_user_geo`               | `{city,country,region}` JSON                      | tab                                                         | `SummitBanner.js`                                                                                                                                                                                                                                                       |
| DOM                                                                              | `.utm` anchors                 | `href` query merged with the `msg91_query` params | per render                                                  | `src/utils/utilis.js:setUtm`                                                                                                                                                                                                                                            |

The site uses no localStorage, IndexedDB or query-cache library.

> [!WARNING]
> `src/utils/utilis.js:getUtmFromCookies` returns **every** readable cookie, not only UTM ones. `SignUp.js` appends all of them to the redirect URL, including `sessionId`, `_ga`, Clarity cookies and `country`. Filter the keys before you add new cookies.

## Analytics & Telemetry Event Contracts

| Tool               | ID            | Loaded in                                                                                  | Events                                                                                                                     |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Google Tag Manager | `GTM-NWZKLRJ` | `src/components/HeadComp/HeadComp.js:HeadComp` and `src/pages/404.js` (`afterInteractive`) | Only the default GTM bootstrap push. No code calls `dataLayer.push`, so all events are configured inside the GTM container |
| Microsoft Clarity  | `ru7xog184s`  | the same two files                                                                         | automatic session recording. No custom `clarity()` calls                                                                   |

There is no consent banner, so both tools load on every page, including non-production builds. Any tracked click or conversion therefore depends on DOM selectors inside GTM, and renaming CSS classes or ids can silently break those tags (see [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md)). The UTM attribution described above is carried to the control panel through cookies and the redirect query, not through analytics.

## Required / Unavailable Backend Capabilities

No frontend feature currently calls an endpoint that does not exist. `GOOGLE_CLIENT_ID`, `ZOHO_CLIENT_ID`, `MSAL_CLIENT_ID` and `OTP_WIDGET_TOKEN_LOGIN` are declared in `next.config.mjs`, but nothing on `main` reads them. The `web` branch does: they belong to the sign-in/sign-up work there, so they were kept. `src/components/signupComp/utils/GoogleLogin.js` uses `@react-oauth/google`, but no component imports it, and the repo has no `GoogleOAuthProvider` <!-- verify:ignore -->. Google, Zoho and Microsoft sign-in are therefore not wired up on this site.

### Proposed Endpoint: guarded Summit WhatsApp trigger

- **Purpose:** keep the post-registration WhatsApp confirmation without an open relay.
- **Required body:** `{ "name": "string (required)", "phone": "string (required)", "otpToken": "string (required: OTP-widget verified token for phone)" }`. The server should verify the token with MSG91 before it sends.
- **Expected 200:** `{ "success": true }`. Return 401 or 403 when the token is invalid or the event is closed.
- **Blocking status:** this is not implemented. Until it is, the safe action is to delete or disable `src/pages/api/send-summit-whatsapp.js`.
