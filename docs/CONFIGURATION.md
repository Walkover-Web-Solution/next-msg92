---
covers:
    [
        'next.config.mjs',
        '.env.example',
        '.gitignore',
        'package.json',
        'package-lock.json',
        'jsconfig.json',
        'tailwind.config.js',
        'postcss.config.mjs',
        '.prettierrc.json',
        '.browserslistrc',
        'public/robots.txt',
        'public/_headers',
        'public/_redirects',
        'src/pages/_document.js',
    ]
verified_at: 98fefc31
verified_on: 2026-10-29
---

# Configuration

Every setting named here was read from the repository at `98fefc31`. This file does not contain secret values. Where a value is a literal in the repo (a port, a boolean, a public comparison string), it is stated. Tokens, client ids and API keys are not copied.

How to install and run the app is in [DEVELOPMENT.md](DEVELOPMENT.md). Request and response shapes are in [CONTRACTS.md](CONTRACTS.md).

## How environment variables are loaded

`next.config.mjs` calls `dotenv.config()` and keeps `parsed` (the `.env` file only). `getEnvValue(key)` returns `process.env[key]` when that is set, otherwise the file value. The `env` block then copies a fixed list of names into Next.js. Next.js inlines `process.env.NAME` at build time in every module that references that name, including client bundles. A name that no module references is not inlined, even if it sits in the `env` block.

There is no `.env` in the repo. `.gitignore` ignores `.env`, `.env.local`, `.env.prod` and `.env.test`. `.env.example` is committed.

`.env.example` lines look like `KEY: KEY`. `dotenv` 16.4.5 (the version in `package.json`) parses that form. Checked by running `dotenv.parse` on `.env.example`: each present key is set to the placeholder string of its own name. Copying the file to `.env` without editing therefore does not leave the variables empty.

`NODE_ENV` is not in the `env` block. `src/components/SummitBanner/SummitBanner.js` reads it. Next.js sets it.

## Environment variables

Required means a flow named in [FLOWS.md](FLOWS.md) or [ARCHITECTURE.md](ARCHITECTURE.md) calls it. "Read in `src/`" is from a search for `process.env.NAME`. Client-exposed means at least one reference is outside `src/pages/api/`.

| Name                          | In `.env.example` | Read in `src/` | Where it is read                                                                                                                                           | Client-exposed |
| ----------------------------- | ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `BASE_URL`                    | Yes               | Yes            | Catch-all fetch, canonical and hreflang, link builders, widget and QR script URLs, `HeadComp` and `404` robots check                                       | Yes            |
| `API_BASE_URL`                | Yes               | Yes            | `src/components/signupComp/SignUp.js`, `src/components/signupComp/StepThree/StepThree.js`                                                                  | Yes            |
| `REDIRECT_URL`                | Yes               | Yes            | `src/utils/utilis.js`, `src/pages/github-auth-token.js`, `src/pages/outlook-token.js`, `src/components/signupComp/utils/GoogleLogin.js`                    | Yes            |
| `PRICING_URL`                 | Yes               | Yes            | `src/utils/pricing/getSmsOtpPricing.js`, `src/components/PricingComp/PricingSMS/PricingSMSOTP.js`                                                          | Yes            |
| `SUBSCRIPTION_PRICING_URL`    | Yes               | Yes            | `src/utils/pricing/getPricing.js`, `src/utils/pricing/getSubscription.js`, `src/pages/api/pricing/hello.js`, `src/pages/api/pricing/fetchDialPlanInfo.js`  | Yes            |
| `VOICE_API_URL`               | Yes               | Yes            | `src/utils/pricing/getVoicePricing.js`, `src/components/PricingComp/PricingVoice/PricingVoice.js`                                                          | Yes            |
| `LOGIN_URL`                   | Yes               | Yes            | `src/components/notificationBarComp/notificationBarComp.js`, `src/components/signupComp/StepOne/StepOne.js`, `src/components/ThankYouComp/ThankYouComp.js` | Yes            |
| `HELLO_API_URL`               | Yes               | Yes            | `src/utils/getBotTemplates.js`                                                                                                                             | Yes            |
| `IMESSAGE_URL`                | Yes               | Yes            | `src/pages/api/apple-messages/url.js` only                                                                                                                 | No             |
| `GOOGLE_CLIENT_ID`            | Yes               | No             | Declared in `next.config.mjs` only. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-009                                                                       | No             |
| `ZOHO_CLIENT_ID`              | Yes               | No             | Same                                                                                                                                                       | No             |
| `GITHUB_CLIENT_ID`            | Yes               | Yes            | `src/utils/utilis.js:loginWithGitHubAccount`                                                                                                               | Yes            |
| `MSAL_CLIENT_ID`              | Yes               | No             | Declared in `next.config.mjs` only. Q-009                                                                                                                  | No             |
| `OTP_WIDGET_TOKEN`            | Yes               | Yes            | `src/components/signupComp/SignUp.js`                                                                                                                      | Yes            |
| `OTP_WIDGET_TOKEN_LOGIN`      | Yes               | No             | Declared in `next.config.mjs` only. Q-009                                                                                                                  | No             |
| `WIDGET_AUTH_TOKEN`           | Yes               | Yes            | `src/components/signupComp/SignUp.js`                                                                                                                      | Yes            |
| `WIDGET_SCRIPT`               | Yes               | Yes            | `src/components/signupComp/SignUp.js`, `src/utils/otpSigninWidget.js` (`otpSigninWidget.js` itself is not imported)                                        | Yes            |
| `SUMMIT_OTP_WIDGET_TOKEN`     | Yes               | Yes            | `src/components/EventRegistrationComp/MobileOtpField.js`                                                                                                   | Yes            |
| `SUMMIT_WIDGET_AUTH_TOKEN`    | Yes               | Yes            | Same file                                                                                                                                                  | Yes            |
| `SUMMIT_WIDGET_SCRIPT`        | Yes               | Yes            | Same file                                                                                                                                                  | Yes            |
| `CHAT_WIDGET_TOKEN`           | Yes               | Yes            | `src/components/HeadComp/HeadComp.js`, `src/pages/404.js`                                                                                                  | Yes            |
| `ECOMMERCE_WIDGET_TOKEN`      | No                | Yes            | `src/components/HeadComp/HeadComp.js` (ecommerce pages). Q-020                                                                                             | Yes            |
| `CHAT_WIDGET_URL`             | No                | Yes            | `HeadComp.js`, `src/pages/404.js`, `src/components/ChatBotDemoComp/ChatBotDemoComp.js`. Q-020                                                              | Yes            |
| `WHATSAPP_AUTHKEY`            | Yes               | Yes            | `src/pages/api/send-summit-whatsapp.js` only. Do not reference it from a component                                                                         | No             |
| `SUMMIT_WA_INTEGRATED_NUMBER` | Yes               | Yes            | Same API route                                                                                                                                             | No             |
| `SUMMIT_WA_API_URL`           | Yes               | Yes            | Same API route                                                                                                                                             | No             |

`WHATSAPP_AUTHKEY`, `SUMMIT_WA_INTEGRATED_NUMBER` and `SUMMIT_WA_API_URL` stay server-only only while nothing outside `src/pages/api/` references them. The `env` block would inline them into a client bundle if a component named them.

### Comparisons and fallbacks written in code

These are not extra environment variables. They are strings the code compares or uses when a variable is missing.

| Behavior                             | Where                                                     | What the code does                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Indexing                             | `src/components/HeadComp/HeadComp.js`, `src/pages/404.js` | When `BASE_URL` is not `https://msg91.com`, both emit `noindex,nofollow` for `robots`, `googlebot` and `bingbot`. Guide pages do not have this check (Q-014)              |
| Login link when `LOGIN_URL` is unset | `notificationBarComp.js`, `StepOne.js`, `ThankYouComp.js` | The `href` falls back to `https://control.msg91.com/signin/`                                                                                                              |
| SMS/OTP tier field                   | `src/components/PricingComp/PricingSMS/PricingSMSOTP.js`  | `pricingEnv` is `4` for SMS. For OTP it is `19` when `PRICING_URL` is `https://test.msg91.com`, otherwise `106`. The file does not say what those fields are (Q-021)      |
| Analytics ids                        | `HeadComp.js`, `404.js`                                   | Google Tag Manager and Microsoft Clarity ids are literals in those two files. They are not environment variables                                                          |
| GitHub OAuth                         | `src/utils/utilis.js`                                     | The authorize URL is `https://github.com/login/oauth/authorize` with `client_id` from `GITHUB_CLIENT_ID` and `redirect_uri` from `REDIRECT_URL` plus `/github-auth-token` |

## Next.js config (`next.config.mjs`)

| Setting                       | Value in the file                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `trailingSlash`               | `false`                                                                                                                |
| `reactStrictMode`             | `false`                                                                                                                |
| `productionBrowserSourceMaps` | `true`                                                                                                                 |
| `images.remotePatterns`       | One pattern: protocol `https`, hostname `placehold.co`                                                                 |
| `headers()`                   | On `/(.*)`, the `securityHeaders` list below. On `/lotties/(.*)`, `Cache-Control: public, max-age=31536000, immutable` |
| `env`                         | The names in the table above. No other names                                                                           |

Header names set by `securityHeaders` for every route: `Strict-Transport-Security`, `X-Frame-Options` (`DENY`), `X-Content-Type-Options` (`nosniff`), `Cross-Origin-Opener-Policy` (`same-origin-allow-popups`), `Cross-Origin-Resource-Policy` (`same-origin`). The file's comment says the opener policy is for the Google OAuth popup.

There is no `redirects()` function and no `src/middleware.js` or root `middleware.js`. Host redirects are `public/_redirects` (1,361 lines at this commit). Next.js does not read that file or `public/_headers`. Which host applies them is [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) Q-005.

`public/_headers` sets its own `X-Frame-Options`, `Content-Security-Policy` (including `script-src 'self'`), `X-XSS-Protection`, `Referrer-Policy`, `Strict-Transport-Security`, and `Access-Control-Allow-*` limited to `https://msg91.com` and `GET`. A second block names `ALLOW-FROM` for two shopify hosts. Those values can disagree with `next.config.mjs`.

## Document and path settings

| Setting            | Where                                 | What it does                                                                                                                                          |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<html lang>`      | `src/pages/_document.js`              | First URL segment, uppercased, matched to `availableCountries.json` `shortname`. Uses `htmlLang`, or `en`                                             |
| `data-theme`       | `src/pages/_document.js`              | Hard-coded `light`                                                                                                                                    |
| `@/` alias         | `jsconfig.json`                       | `@/*` → `./src/*`                                                                                                                                     |
| Dev and start port | `package.json` scripts                | `next dev -p 3030`, `next start -p 3030`. `next build` has no port                                                                                    |
| `npm run lint`     | `package.json`                        | Runs `next lint`. Next.js 16 removed that command (Q-016). There is no ESLint config file                                                             |
| `lint-staged`      | `package.json`                        | Glob `*.{js,jsx,ts,tsx,md, mdx, html,css}` (the spaces are in the file). Prettier writes matches. `mdx` and `html` do not match (Q-015)               |
| Prettier           | `.prettierrc.json`                    | 4-space tabs, semicolons, single quotes, `jsxSingleQuote`, `printWidth` 120, `trailingComma` es5, `quoteProps` preserve                               |
| Browserslist       | `.browserslistrc`                     | `> 0.5%`, `last 2 versions`, `not ie <= 11`, `not op_mini all`                                                                                        |
| Tailwind `content` | `tailwind.config.js`                  | `src/pages`, `src/components` (js/ts/jsx/tsx/mdx and scss), `src/app`, `src/styles`. It does not list `src/data/` or `_posts/`                        |
| DaisyUI theme      | `tailwind.config.js` `daisyui.themes` | One theme, named `msg91`. Color literals live in that file and in `src/styles/`                                                                       |
| PostCSS            | `postcss.config.mjs`                  | Plugin `tailwindcss` only                                                                                                                             |
| `robots.txt`       | `public/robots.txt`                   | `User-agent: *`, an empty `Disallow`, `Disallow: /cgi-bin/`, `Disallow: /us/case-studies/oxebox/feed/`, and three sitemap URLs on `https://msg91.com` |

`package.json` has no `engines` field. The lockfile pins `next` to 16.0.7, and that package's `engines.node` is `>=20.9.0`. There is no `.nvmrc`.

## Not configuration

Cookie names (`msg91_query`, `country`, and the names `setSharedCookie` writes) are a contract with the sign-up backend. They are listed in [CONTRACTS.md](CONTRACTS.md), not here. Page copy lives in `src/data/`.
