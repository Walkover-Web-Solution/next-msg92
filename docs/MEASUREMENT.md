---
status: current implementation; metric targets not approved (no KPIs recorded)
owner: unassigned (marketing/analytics owner — see OPEN_QUESTIONS Q-022)
verified_at: f4275980 + admin/experimentation change set
verified_on: 2026-10-24
---

# Measurement

What this site can measure today, how each metric is defined, and what it cannot see. Event and cookie shapes are owned by [CONTRACTS.md](CONTRACTS.md); experiment rules by [EXPERIMENTS.md](EXPERIMENTS.md). Never present a metric this doc marks "not connected" as a number, and never turn missing data into zero.

## Conversion Journey

| #   | Step                                          | Where it happens                                                 | Observable here?                                                      |
| --- | --------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | Relevant visit (search, ad, referral, direct) | Any page; landing query stored as `msg91_query` cookie           | Not readable here. GTM/GA receive it inside Google                    |
| 2   | Click a sign-up or sales CTA                  | Section components (`Get Started`, `Schedule a Meeting`)         | Not readable here. Only GTM DOM triggers, configured outside the repo |
| 3   | Start sign-up                                 | `/signup` → `SignUp.setStep(2)`                                  | Yes, for experiment participants: `signup_started`                    |
| 4   | Verify identity (OTP email/GitHub + mobile)   | `SignUp.validateUserForCompany` success                          | Yes, for experiment participants: `signup_verified`                   |
| 5   | Complete registration                         | `SignUp.finalSubmit` → `finalRegister` returns `status: success` | Yes, for experiment participants: `signup_completed`                  |
| 6   | Qualified lead / activation in the product    | MSG91 dashboard and backend                                      | **Not connected.** Needs a backend export (Q-023)                     |

The approved goal is sign-up conversion ([VISION.md](VISION.md)). Until a backend signal for qualified sign-ups exists, `signup_completed` is the strongest outcome the site can observe.

## Metric Definitions

| Metric                                                       | Numerator                                         | Denominator / audience                                    | Source                                                                       | Dedup                                                       | Window & timezone                                                                  | Limits                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `signup_completed` rate (primary-eligible)                   | Visitors with a `signup_completed` event          | Customer-classified visitors exposed to an experiment arm | `src/lib/experiments/events.js` from `trackExperimentOutcome` in `SignUp.js` | One per visitor per experiment version                      | Outcome within `attributionDays` (default 30) after first exposure; timestamps UTC | Only visitors who were in an experiment; browser beacon can be blocked by extensions |
| `signup_verified` rate (primary-eligible, default guardrail) | `signup_verified` events                          | Same                                                      | Same                                                                         | Same                                                        | Same                                                                               | Also counts users who then log into an existing account                              |
| `signup_started` rate (supporting only)                      | `signup_started` events                           | Same                                                      | Same                                                                         | Same                                                        | Same                                                                               | Not eligible as a primary outcome (an intent signal)                                 |
| Exposure                                                     | Visitors whose assigned arm rendered and hydrated | Assigned visitors (assignment happens in `src/proxy.js`)  | `ExperimentExposure` beacon                                                  | First exposure wins; visitors seen in two arms are excluded | —                                                                                  | No JavaScript → no exposure, so those visitors are not counted                       |
| Allocation health (SRM)                                      | Exposures per arm                                 | Configured weights                                        | `src/lib/experiments/stats.js:sampleRatioMismatch`                           | —                                                           | Version lifetime                                                                   | Needs ≥ 100 exposures                                                                |
| Core Web Vitals p75 (LCP, INP, CLS)                          | —                                                 | Real Chrome users of `CRUX_ORIGIN`                        | Chrome UX Report API (analysis `core-web-vitals`)                            | —                                                           | CrUX 28-day rolling window                                                         | **Not connected** until `CRUX_API_KEY` is set. Field data, not lab data              |
| Page status                                                  | URLs not returning 200                            | Page JSON inventory                                       | Analysis `http-status`                                                       | —                                                           | At run time                                                                        | Capped by `maxUrlFetchesPerRun` (the result says when it is partial)                 |

Traffic classes (from `classifyTraffic`): `customer`, `bot` (user-agent pattern), `internal` (browser that signed into the admin: `msg91_internal` cookie), `synthetic` (`x-msg91-synthetic: 1`, used by tracking validation), `preview` (never recorded). Only `customer` traffic is evaluated; the others are shown as excluded counts.

## Existing Analytics (unchanged)

- Google Tag Manager `GTM-NWZKLRJ` and Microsoft Clarity load from `HeadComp` on every page ([CONTRACTS.md](CONTRACTS.md#analytics--telemetry-event-contracts)). The repo has no access to their data.
- Experiment exposures also push `{ event: 'experiment_exposure', experiment_id, experiment_version, experiment_arm }` to `window.dataLayer`, so GTM can forward them to GA if someone configures a tag. That is optional and not required for the admin results.

## Consent, Retention, Minimisation

- There is no consent banner (Q-004). Experiments therefore refuse to launch on locales listed in Settings → `consentLockedLocales` (default `es`, `gb`).
- `msg91_vid` is a random UUID (no personal data). Event logs store an HMAC of it (`EXPERIMENT_HASH_SECRET`), the arm, a traffic class, a timestamp and the page path. No email, phone, IP or user agent is stored.
- Retention is not yet defined (Q-024). Logs live under `ADMIN_DATA_DIR/exp/<id>/v<version>.jsonl`; deleting an experiment's folder removes its data.
- AI interpretation (optional) receives only aggregated findings, never events or visitor identifiers.

## Freshness

Experiment results are computed on page load from the event logs (no cache). Analyses show their run time and data window; a run older than twice its schedule is shown as **stale**. Unconnected sources show **not connected** with the next step.

## Instrumentation Gaps

1. No backend confirmation of qualified sign-ups or activation (Q-023). Contract needed: a daily export or webhook from the MSG91 sign-up backend with `{ signup_id, created_at, utm_*, msg91_vid? }`.
2. No Search Console or GA data access (Q-021). Contract needed: a read-only service account; see [CONTRACTS.md](CONTRACTS.md#required--unavailable-backend-capabilities).
3. CTA clicks are only visible inside GTM.
4. Pricing calculators and contact forms emit no outcome events yet. Add `trackExperimentOutcome('<metric>')` and a `METRICS` entry when an experiment needs them.
