---
status: implemented policy (defaults); release authority and approvers to be confirmed (Q-020)
owner: unassigned (marketing lead + engineering owner)
verified_at: f4275980 + admin/experimentation change set
verified_on: 2026-10-24
---

# Experiment Policy

How the site runs A/B/C tests. The **live registry** (experiments, versions, allocation, decisions) is the admin store, viewed at `/admin/experiments`. This file is policy only; never keep a second list of live variants here. Metrics are defined in [MEASUREMENT.md](MEASUREMENT.md); implementation is in [ARCHITECTURE.md](ARCHITECTURE.md#experimentation).

## When to Experiment

- Test a meaningful hypothesis about copy, layout, offer or CTA on a JSON-driven page, where the answer would change a decision.
- Do not test bug fixes, accessibility fixes, legal or claim corrections. Ship them.
- Do not test unverified claims, new prices, new customer logos or testimonials. A claim must be in the [POSITIONING.md](POSITIONING.md) claim register with evidence before any arm uses it.

## Limits

- One baseline and at most two challengers per URL (`maxChallengers`, 1–2). Three arms is a maximum, not a target.
- One experiment per URL at a time (running, paused or rolling out). More challengers are **queued** on the experiment.
- Slots are reserved under a lock in `src/lib/admin/experiments/service.js`, so concurrent agents cannot exceed the limit.
- Pricing routes cannot be tested (they are not JSON-driven). Locales in `consentLockedLocales` cannot be tested until consent exists.

## Before Launch (enforced checklist)

Hypothesis (change, audience, expected effect) · audience · stable assignment unit (`msg91_vid`) · exposure definition · primary outcome that is a completed conversion (`signup_completed` or `signup_verified`) · at least one guardrail · baseline rate and minimum detectable effect (they plan the sample size) · review date · maximum days (≤ 90) · named approver · rollback plan · every challenger changes something · treatments valid against the current page JSON · tracking validated for this version · no overlapping experiment · surface not consent-locked.

Then: an **owner** launches, and only while Settings → `experiments.allowLaunch` (the release switch) is on. Synthetic fixtures can never launch.

## Assignment, Exposure, Outcomes

- `src/proxy.js` assigns arms by hashing `(msg91_vid, experiment id, version)` and rewrites to `/exp-view/...`, which renders the arm **at the same URL** with `Cache-Control: private, no-store`. No shared cache can serve one visitor's arm to another.
- Exposure = the arm rendered and hydrated (`ExperimentExposure` beacon). Assignment without exposure is not counted.
- Outcomes are attributed to the experiment versions in the visitor's `msg91_exp` cookie, validated against the deterministic assignment, within `attributionDays` after first exposure.
- Bots, internal (admin) browsers, synthetic and preview traffic are excluded from evaluation and shown separately.

## Decision Method

- **Fixed horizon:** the sample per arm is planned from the baseline rate, MDE, alpha and power. Before every arm reaches it, results show **collecting** and are not decisions.
- **Multiple challengers:** Bonferroni (alpha ÷ number of challengers).
- **Repeated looks:** Haybittle–Peto interim boundary (|z| ≥ `interimZ`, default 3.29 ≈ p < 0.001). Crossing it downward marks an arm **harmful**; with `autoStopHarmful` on, the experiment-health analysis pauses the experiment.
- **Validity first:** a sample-ratio mismatch (p < 0.001) or no exposures after launch marks results **invalid** until tracking is fixed. Do not interpret a decline before tracking is verified.
- **Low traffic stays inconclusive.** Fewer than 30 visitors in an arm is **insufficient data**. At the planned sample with p ≥ adjusted alpha the result is **inconclusive**: keep the baseline.
- Clicks, scroll and time on page are not outcomes.

## Changes While Running

Treatments, weights, primary metric and surface cannot change while running. Pause first. Once an experiment has started, a material change starts a **new version** (results restart; old versions stay readable). Non-material fields (notes, review date, approver) can change any time.

## Ending an Experiment

| Action               | Who             | Effect                                                                                                                      |
| -------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Pause                | editor or owner | Everyone gets the baseline within ~5 s (live-config cache). Safety action                                                   |
| Stop & keep baseline | owner           | Marks completed; routing stops                                                                                              |
| Promote arm          | owner           | Routes everyone to the arm (`rolling_out`) and proposes the treatment as a page-JSON change through the writeback path (PR) |
| Roll back            | editor or owner | From rolling out/running back to paused (baseline)                                                                          |
| Retire               | owner           | Archived; history kept. Retire a promotion only after its PR is deployed                                                    |

Every action is recorded in the experiment's decision log and the admin audit trail.

## Search Safety

Same-URL rewrites keep the page's own canonical, hreflang and robots tags. Crawlers are routed like any visitor (no crawler-specific content) and are excluded only from evaluation. Tests are time-boxed (`maxDays`). If a future test uses separate URLs, use temporary (302) redirects and `rel=canonical` to the original, then remove them after the test ([Google: website testing](https://developers.google.com/search/docs/crawling-indexing/website-testing)). Previews (`?exp_preview=`) need an admin session and send `noindex`.

## Generating Challengers

The admin produces a **change brief** per arm (surface, sections, hypothesis, constraints, acceptance criteria). No coding-agent service is connected, so the admin says "generation not connected"; hand the brief to a developer or agent.

## Durable Findings

Record conclusions (what was tested, version, sample, result, decision) in [DECISIONS.md](DECISIONS.md) when they change direction, and update [POSITIONING.md](POSITIONING.md) if a message is promoted. Do not copy raw event data into docs.

## Prepared Proposal (not launched)

A first candidate, prepared and validated only on a local store with synthetic and test traffic (2026-10-24). It has **not** run on production traffic, and nothing here is evidence that it wins.

- **URL:** `/whatsapp` (global). **Hypothesis:** the banner heading "Seamless Global messaging and communications." names no job; a heading that names the WhatsApp job ("Send WhatsApp updates, offers and support replies from one API", the [DESIGN.md](DESIGN.md) do/don't rewrite) will raise completed sign-ups from this page.
- **Primary outcome:** `signup_completed`; **guardrail:** `signup_verified`. Needs a real baseline rate before launch (only the backend or GA can provide it, Q-022/Q-023).
- **Create it in the admin** (Experiments → New, then paste the treatment into arm B):

```json
{
    "BannerComp": {
        "mode": "merge",
        "data": { "heading": "Send WhatsApp updates, offers and support replies from one API" }
    }
}
```

- **Launch requires:** the approver (Q-020), the release switch, and the checklist. With low traffic on one URL the result may stay inconclusive; that is an acceptable outcome.
