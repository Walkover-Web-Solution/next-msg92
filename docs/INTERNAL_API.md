---
covers: ['src/pages/api/**', 'docs/internal-api.json']
verified_at: 2f38d5a6
verified_on: 2026-10-29
---

# Internal API reference

These are the Next.js route handlers under src/pages/api. They belong to the public marketing site, not to the MSG91 product API. Calls the browser makes straight to API_BASE_URL, PRICING_URL, VOICE_API_URL, HELLO_API_URL and the other hosts in docs/CONTRACTS.md are outside this reference. The read-only MCP server in mcp/api-reference serves docs/internal-api.json and does not call any of these routes.

None of these routes check a session, cookie, API key, origin or rate limit. A route that calls MSG91 reads server environment variables itself. The caller of this site does not send those values.

This page is rendered from [internal-api.json](internal-api.json). Edit that file, then run `node mcp/api-reference/check.mjs --write`. The MCP server in `mcp/api-reference/` reads the JSON. It holds no secrets and does not call these routes.

Handlers that read `req.body` use the Next.js JSON body parser. A non-JSON body does not reach the handler.

## Endpoints

## POST /api/data

**Id:** `api-data`

Load the page JSON for a catch-all marketing URL from src/data.

### Authentication

None. The handler does not read a header, cookie or token.

### Parameters

None.

### Body

Content-Type: `application/json`.

The pageInfo object built by src/utils/getPageInfo.js. Next.js parses the JSON body before the handler runs. The only caller, getStaticProps in `src/pages/[[...slug]].js`, POSTs this object to ${BASE_URL}/api/data.

- `country` (string, required): 'global' or a country folder name such as 'in' or 'br-pt'. It selects which branch of the lookup runs.
- `page` (string, required): 'pricing' loads src/data/<country>/pricing.json. 'home' loads src/data/<country>/home.json, or src/data/global/home.json. Any other value is not used as a filename.
- `pathURL` (string, required): Used when page is neither 'home' nor 'pricing'. Global pages load src/data/global/<pathURL>.json. Other countries load src/data/<pathURL>.json, and pathURL already starts with the country segment (for example 'in/sms').
- `pathArray` (string[], optional): Present on the caller's body. The handler never reads it.
- `baseURL` (string, optional): Present on the caller's body. The handler never reads it.

### Response

A successful lookup is HTTP 200 and the JSON object from disk. The handler does not wrap it.

- **200** when The file exists and its top-level keys include neither common nor show:false.

    The page JSON object. Keys are component-registry names. Values are that component's data. The shape of each page is documented in docs/CONTRACTS.md.

- **200** when The file is missing, the path cannot be required, the JSON has a top-level common key, or show is false.

    src/data/notfound.json: { "HeadComp": { "title": string }, "NotFoundComp": { "title": string } }. getStaticProps treats a NotFoundComp key as a site 404. The HTTP status of this response is still 200.

### Errors

- **404** when The outer catch runs. That happens if notfound.json itself cannot be loaded or if writing the response throws. A missing page does not take this branch. Body: `{ "error": "page not found" }`

### Source

`src/pages/api/data.js`

### Callers

- `src/pages/[[...slug]].js`

Accepted methods: ANY.

### Notes

- The handler never reads req.method. The only caller sends POST. Other methods are not rejected.
- Query-string parameters are ignored.
- There is no fallback from a country folder to global. An unknown country or page returns notfound.json with HTTP 200.

## POST /api/getNestedData

**Id:** `api-get-nested-data`

Load a page JSON file from pathURL. Nothing in this repository calls this route.

### Authentication

None. The handler does not read a header, cookie or token.

### Parameters

None.

### Body

Content-Type: `application/json`.

Read from req.body with optional chaining. A missing body does not throw. country and pathURL are undefined, the file lookup fails, and the handler returns notfound.json with HTTP 200.

- `country` (string, required): Only compared with 'global'. It is not inserted into the filename. Any other value, including a missing value, takes the non-global branch.
- `pathURL` (string, required): When country is 'global', the file is src/data/global/<pathURL>.json. Otherwise the file is src/data/<pathURL>.json, so pathURL must already include the country folder.

### Response

HTTP 200 and the JSON object from disk, or notfound.json. The handler does not wrap it.

- **200** when The file exists and does not have a top-level common key.

    The page JSON object, unchanged. A file with show:false is returned as-is. This differs from POST /api/data, which replaces show:false with notfound.json.

- **200** when The file is missing, the require throws, or the JSON has a top-level common key.

    src/data/notfound.json: { "HeadComp": { "title": string }, "NotFoundComp": { "title": string } }.

### Errors

- **404** when The outer catch runs, which means notfound.json could not be loaded or the response could not be written. A missing page does not take this branch. Body: `{ "error": "page not found" }`

### Source

`src/pages/api/getNestedData.js`

### Callers

None.

Accepted methods: ANY.

### Notes

- The handler never reads req.method. POST is documented because the input is a JSON body.
- There is no home or pricing special case. Both are ordinary pathURL lookups.
- No file under src/ imports or fetches this path.

## POST /api/curlConvert

**Id:** `api-curl-convert`

Turn one hard-coded MSG91 cURL example into Python, Node, PHP, Ruby and cURL snippets.

### Authentication

None. The handler does not read a header, cookie or token.

### Parameters

None.

### Body

Content-Type: `application/json`.

The handler reads req.body.curlKey. If req.body itself is missing, the destructure throws and Next.js returns its generic 500 page.

- `curlKey` (string, required): One of sms, rcs, email, voice, whatsapp, numbers. Each key selects a cURL string hard-coded in src/pages/api/curlConvert.js. sms posts to https://control.msg91.com/api/v5/flow/. rcs posts to https://control.msg91.com/api/v5/rcs/send-rcs-message/bulk/. email posts to https://control.msg91.com/api/v5/email/send. voice posts to https://control.msg91.com/api/v5/voice/call/. whatsapp and numbers both post to https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/. The strings contain placeholder auth keys and sample fields, not live credentials.

### Response

JSON produced locally by the curlconverter package. This route does not call control.msg91.com.

- **200** when curlKey matches one of the six hard-coded strings and curlconverter succeeds.

    { "curl": "<the hard-coded cURL string>", "snippets": { "python": string, "node": string, "php": string, "ruby": string, "curl": "<the same cURL string>" } }

### Errors

- **405** when req.method is not POST. Body: `{ "error": "Only POST method allowed" }`
- **404** when curlKey is missing or is not one of the six keys. Body: `{ "error": "No matching fixed cURL found" }`
- **500** when curlconverter throws while converting the selected string. Body: `{ "error": "Conversion failed", "details": "<Error.message>" }`

### Source

`src/pages/api/curlConvert.js`

### Callers

- `src/components/CodeSnipped/CodeSnipped.js`

Accepted methods: POST.

### Notes

- CodeSnipped is rendered by BannerComp when data.code is set, and curlKey is data.slug. Pages that set code today are the sms, rcs and voice pages. email, whatsapp and numbers are accepted by the handler and are not used by those banners.
- The client shows data.snippets and surfaces data.error when the status is not OK.

## POST /api/apple-messages/url

**Id:** `api-apple-messages-url`

Ask the Apple Messages upstream for a link, and return that upstream body.

### Authentication

None. The caller sends no credential. The server calls IMESSAGE_URL with a JSON content type and no auth header.

### Parameters

None.

### Body

Content-Type: `application/json`.

Fields are trimmed. If req.body is missing, destructuring throws and Next.js returns its generic 500 page.

- `businessId` (string, required): Required after trim. Sent upstream as businessId.
- `intentId` (string, optional): Sent upstream as biz-intent-id. Omitted or blank becomes an empty string.
- `groupId` (string, optional): Sent upstream as biz-group-id. Omitted or blank becomes an empty string.
- `preFilledMessage` (string, optional): Sent upstream as body. Omitted or blank becomes an empty string.

### Response

On an upstream HTTP success, the handler responds 200 with the upstream JSON unchanged. The page component treats it as success only when success is true and url is present.

- **200** when IMESSAGE_URL returns a response axios accepts.

    The upstream JSON, passed through. The client in src/components/AppleMessagesLinkComp/AppleMessagesLinkComp.js requires success === true and a url string. Other fields are not read.

- **200** when The upstream request times out, returns an HTTP error, or cannot be reached. These are not forwarded as their upstream status.

    { "success": false, "message": string }. Timeout (10s, axios code ECONNABORTED) uses "Request timed out. Please check your connection and try again." A response status of 400, 401, 403, 404, 429 or 500 and above uses a fixed sentence, or error.response.data.message when that string exists. A request that sends no response uses "Network error. Please check your internet connection." Anything else uses "An unexpected error occurred. Please try again."

### Errors

- **405** when req.method is not POST. Body: `{ "success": false, "message": "Method not allowed" }`
- **400** when businessId is missing or blank after trim. Body: `{ "success": false, "message": "Business ID is required" }`

### Source

`src/pages/api/apple-messages/url.js`

### Callers

- `src/components/AppleMessagesLinkComp/AppleMessagesLinkComp.js`

Accepted methods: POST.

### Notes

- The upstream URL is the IMESSAGE_URL environment variable. The timeout is 10 seconds.
- The handler logs the axios error with console.error. It does not log the request body on success.
- Because upstream failures are returned as HTTP 200, the client cannot use res.ok to detect them. It checks success and url.

## GET /api/pricing/fetchDialPlanInfo

**Id:** `api-pricing-fetch-dial-plan-info`

Proxy a dial-plan rate table from the subscription pricing service.

### Authentication

None. The caller sends no credential. The server calls SUBSCRIPTION_PRICING_URL with no auth header.

### Parameters

- `service_id` (string, optional, in query): Forwarded to the upstream /fetchDialPlanInfo query. The handler does not check that it is present. The DialPlan component sends the service id from the selected plan.
- `dial_plan_id` (string, optional, in query): Forwarded upstream. The DialPlan component sends the dial plan id from the selected plan.
- `currency` (string, optional, in query): Forwarded upstream as given. The handler does not rewrite it.
- `limit` (string, optional, in query): Forwarded upstream. The DialPlan component sends 100 (DIAL_PLAN_PER_PAGE in src/components/PricingComp/constants.js).
- `offset` (string, optional, in query): Forwarded upstream. The DialPlan component sends the current page offset.
- `search` (string, optional, in query): Forwarded upstream. The DialPlan component sets it only when the search box is non-empty.

### Body

None.

### Response

The upstream status code and JSON body are passed through. This repository does not define the upstream schema. The fields below are the only ones the DialPlan component reads.

- **200** when The upstream responds with a status axios treats as success. The status written to the client is response.status, which is 200 for a normal success.

    Upstream JSON. On the success path the client reads data.headers[].key, data.headers[].userFriendlyName, data.data[] where each cell is { "value": string }, and data.metadata.total_pages. It treats the call as failed when hasError is set, and then reads message or the first string inside errors.

### Errors

- **upstream** when The upstream responds with an HTTP error and err.response is set. The handler returns that same status and err.response.data. There is no local error envelope. Body: `The upstream error body, unchanged. The client reads message, or the first value of errors.`
- **500** when The upstream call throws without err.response (network failure, timeout, or SUBSCRIPTION_PRICING_URL unset). The handler reads err.response.status and throws again. Next.js then writes its generic 500. Body: `Next.js default error response, not a JSON envelope from this handler.`

### Source

`src/pages/api/pricing/fetchDialPlanInfo.js`

### Callers

- `src/components/PricingComp/DialPlan/index.js`

Accepted methods: ANY.

### Notes

- The handler never reads req.method. The only caller sends GET.
- The client also sends ui_friendly=1. The handler ignores that query key and always sets ui_friendly to 1 on the upstream request.
- The upstream URL is ${SUBSCRIPTION_PRICING_URL}/fetchDialPlanInfo.
- Missing query keys are passed to axios as undefined, and axios omits them.

## GET /api/pricing/hello

**Id:** `api-pricing-hello`

Return Hello subscription plans (ms_id 7) normalised for the pricing table.

### Authentication

None. The caller sends no credential. The server calls SUBSCRIPTION_PRICING_URL with no auth header.

### Parameters

- `currency` (string, optional, in query): Read with String(req.query.currency || 'USD').toUpperCase(). Only the exact value BRL is kept. Every other value, including a missing value, becomes USD. The value is not trimmed, so 'BRL ' becomes USD.

### Body

None.

### Response

Failure is still HTTP 200. The client in src/components/HelloBrComp/PricingComp/Pricing.js reads pricingData, currency and brlFallback. It does not read unavailable.

- **200** when SUBSCRIPTION_PRICING_URL is set and GET ${SUBSCRIPTION_PRICING_URL}/plans?currency=<USD|BRL>&ms_id=7 succeeds.

    { "pricingData": Plan[], "currency": "USD" | "BRL" }. Plan is the object returned by src/utils/pricing/handlePlanStructure.js: { name, amount, type, discount, services, features }. name is the upstream plan name or null. amount is plan_amount for the requested currency, or null. type is plan_type.name (for example monthly or yearly) or null. discount is the upstream applied_discounts array. services is { name, freeCredit, followUpRate, dialPlan, chunkSize, postPaidAllowed } per plan service. dialPlan is { serviceId, dialPlanId } or null. features is { name, included } and drops features whose is_visible is set and not 1. included is true only when is_included is 1.

- **200** when currency was BRL, that request failed, and the same call with USD succeeded.

    { "pricingData": Plan[], "currency": "USD", "brlFallback": true }

- **200** when SUBSCRIPTION_PRICING_URL is unset.

    { "pricingData": [], "currency": "USD", "unavailable": true }

- **200** when The plans request failed, and the BRL-to-USD fallback also failed or the requested currency was not BRL.

    { "pricingData": [], "currency": "USD" }

### Errors

- **405** when req.method is not GET. The handler also sets the Allow header to GET. Body: `{ "error": "Method not allowed" }`

### Source

`src/pages/api/pricing/hello.js`

### Callers

- `src/components/HelloBrComp/PricingComp/Pricing.js`

Accepted methods: GET.

### Notes

- ms_id is hard-coded to 7, which is the Hello product in src/utils/pricing/getPricing.js.
- The raw list is data.data.data from the upstream JSON. handlePlanStructure keeps only plan_amounts whose currency.short_name equals the currency that was fetched.
- This route is separate from the server-rendered pricing pages, which call the pricing utils directly and do not go through /api/pricing/hello.

## POST /api/send-summit-whatsapp

**Id:** `api-send-summit-whatsapp`

Send the hard-coded Summit WhatsApp template to the phone number in the body.

### Authentication

None. Anyone who can reach the site can POST a name and phone. The server sends WHATSAPP_AUTHKEY itself as the authkey header on the upstream request. The caller never supplies that key.

### Parameters

None.

### Body

Content-Type: `application/json`.

req.body is treated as {} when it is missing.

- `name` (string, required): Any truthy value. It is placed in the template body parameter named name. There is no length or character check.
- `phone` (string, required): Any truthy value. The handler keeps digits only (phone.toString().replace(/\D/g, '')) and sends those digits as the template recipient. A truthy value with no digits, such as 'abc', still passes the presence check and is sent as an empty recipient.

### Response

The handler does not copy the upstream HTTP status. A JSON body from the upstream, including an upstream error body, is returned as HTTP 200.

- **200** when The three environment variables are set, fetch resolves, and the upstream body parses as JSON.

    { "success": true, "data": <upstream JSON> }

### Errors

- **405** when req.method is not POST. Body: `{ "error": "Method not allowed" }`
- **400** when name or phone is missing or falsy. Body: `{ "error": "Missing name or phone" }`
- **500** when WHATSAPP_AUTHKEY, SUMMIT_WA_INTEGRATED_NUMBER or SUMMIT_WA_API_URL is unset. Body: `{ "error": "WhatsApp credentials not configured" }`
- **500** when fetch throws, or the upstream body is not JSON. Body: `{ "error": "<Error.message>" } or { "error": "Failed to send WhatsApp message" } when the thrown value has no message.`

### Source

`src/pages/api/send-summit-whatsapp.js`

### Callers

- `src/components/EventRegistrationComp/RegistrationForm.js`

Accepted methods: POST.

### Notes

- The caller posts { name: fullName, phone: phoneNumber } and ignores the response. It runs only after the registration form's submit_url succeeds.
- src/data/global/event-registration.json has show:false, so POST /api/data will not serve that page. This route is still registered.
- The upstream body is a WhatsApp template send. integrated_number comes from SUMMIT_WA_INTEGRATED_NUMBER. content_type is template. The template name is event_ragistration. Language is en with policy deterministic. The namespace, the two button URLs and the template components are hard-coded in the handler. Do not copy those values into this reference.
- The handler logs the full outbound payload and the upstream JSON, which includes the phone number.
- Do not call this route to test it against production. A configured auth key sends a real MSG91-paid WhatsApp message. docs/CONTRACTS.md records the open-relay warning and the proposed guarded replacement, which is not implemented.
