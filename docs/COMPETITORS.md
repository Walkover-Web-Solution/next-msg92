---
status: researched (not approved strategy)
owner: Marketing lead (unassigned — see OPEN_QUESTIONS)
verified_on: 2026-10-24
review_cadence_days: 30
---

# Competitors

## Purpose and how to use this file

This is the canonical record of who MSG91 competes with, for the approved audience: **developers and businesses evaluating or buying CPaaS, converting to sign-up**. Use it before writing comparison pages, pricing copy or "vs" claims.

Every entry separates three things:

- **Observation:** what an official public source said on the date checked. Paraphrased; source URL given.
- **Interpretation:** what we think the observation means. Can be wrong.
- **Recommendation:** a suggested action. Not approved strategy until the marketing owner signs off.

Missing public evidence is **not** proof a competitor lacks a capability. Unknowns are marked as unknown.

- Live watchlist with check cadences: private admin at `/admin/research`, seeded from [`docs/research/watchlist.seed.json`](research/watchlist.seed.json).
- Detailed run reports (searches, every URL fetched, failures): [`docs/research/`](research/). First run: [`2026-10-24-competitor-scan.md`](research/2026-10-24-competitor-scan.md).
- Prices and packaging below are volatile. Each carries the date it was seen (all 2026-10-24 unless noted). Re-check before quoting.

**Who can approve watchlist changes:** unknown. Assumed to be the marketing owner, who is not yet named. Open question U-1 below (should also be added to `docs/OPEN_QUESTIONS.md` by its owner).

## Landscape summary

Checked 2026-10-24. Relevance is to the approved audience.

| Name                                          | Category        | Status                       | Overlap (audience / use case)                                              | Relevance           |
| --------------------------------------------- | --------------- | ---------------------------- | -------------------------------------------------------------------------- | ------------------- |
| Twilio                                        | direct          | confirmed                    | Developer CPaaS: SMS, WhatsApp, Verify, Voice, Email (SendGrid)            | high                |
| Gupshup                                       | direct          | confirmed                    | WhatsApp/RCS/SMS messaging + conversational AI, India-rooted               | high                |
| Infobip                                       | direct          | confirmed                    | Omnichannel CPaaS + 2FA + chatbots, enterprise                             | high                |
| Sinch                                         | direct          | confirmed                    | CPaaS: SMS/RCS/WhatsApp, Verification, Voice, Email (Mailgun/Mailjet)      | high                |
| Tata Communications Kaleyra                   | direct          | confirmed                    | CPaaS (SMS, WhatsApp, RCS, Voice, Email, OTP), India enterprise            | high                |
| Route Mobile (Proximus)                       | direct          | confirmed                    | A2P SMS, Route OTP, RCS/WhatsApp, Email, Voice; India ties                 | high                |
| Exotel                                        | direct          | confirmed                    | India voice/contact center + DLT SMS/OTP + WhatsApp                        | medium-high         |
| Wati                                          | direct          | confirmed                    | WhatsApp API inbox/automation for SMEs                                     | high (WhatsApp)     |
| Interakt                                      | direct          | confirmed                    | WhatsApp/Instagram commerce messaging, India SMEs                          | high (WhatsApp)     |
| AiSensy                                       | direct          | confirmed                    | WhatsApp API marketing/automation, India SMEs                              | high (WhatsApp)     |
| Bird (formerly MessageBird)                   | direct          | confirmed                    | Omnichannel messaging APIs, inbox, Verify                                  | medium              |
| Vonage                                        | direct          | confirmed (partial evidence) | Messages API (SMS, RCS, WhatsApp, etc.)                                    | medium              |
| Plivo                                         | direct          | confirmed                    | Developer SMS/Voice APIs; India domestic SMS not offered on its India page | medium-low (India)  |
| Freshchat (Freshworks)                        | indirect        | confirmed                    | Support messaging incl. WhatsApp; overlaps Hello                           | medium              |
| Intercom                                      | indirect        | confirmed                    | Support platform + AI agent; overlaps Hello                                | medium              |
| Zendesk                                       | indirect        | confirmed                    | Helpdesk suite; overlaps Hello                                             | low-medium          |
| tawk.to                                       | indirect        | confirmed                    | Free live chat/ticketing; overlaps Hello                                   | medium (SMB)        |
| DelightChat                                   | indirect        | confirmed                    | Shopify-focused WhatsApp/social inbox                                      | low                 |
| Meta WhatsApp Cloud API (direct)              | substitute      | confirmed                    | Developers integrating WhatsApp with no BSP                                | high                |
| Firebase Authentication (phone)               | substitute      | confirmed                    | App developers needing SMS OTP login                                       | medium-high         |
| AWS End User Messaging                        | substitute      | confirmed                    | AWS-native SMS/WhatsApp/Voice/Push                                         | medium              |
| SendGrid / Mailgun (email APIs)               | substitute      | confirmed                    | Transactional email API buyers                                             | medium (Email only) |
| Textlocal                                     | direct (legacy) | candidate                    | Bulk SMS SMEs; reported closed (see entry)                                 | low                 |
| Manual / WhatsApp Business app + spreadsheets | workaround      | candidate                    | Small teams before API adoption                                            | medium              |
| Do nothing / email-only                       | workaround      | candidate                    | Businesses not yet messaging customers                                     | low                 |
| Telecom operator direct / in-house gateway    | workaround      | candidate                    | Large senders negotiating routes directly                                  | low-medium          |

## Direct competitors

### Twilio — https://www.twilio.com

- **Category / overlap:** direct. Same buyer (developers), same products: SMS, WhatsApp, OTP (Verify), Voice, Email (SendGrid).
- **Positioning (observed):** API-first global CPaaS; usage pricing with committed-use discounts via sales.
- **Capabilities observed:** Verify supports SMS, WhatsApp, voice, email, push, TOTP, Silent Network Auth, passkeys (pilot). WhatsApp one-tap and zero-tap authentication templates announced as supported 2025-09-23 (changelog); Verify's own WhatsApp OTP uses copy-code templates (docs). Studio (flow builder): 1,000 free executions/month, then $0.0025/execution; no flow cap stated on the serverless pricing page.
- **Pricing observed 2026-10-24:** India SMS $0.0832/segment (international numbers and alphanumeric sender IDs) — https://www.twilio.com/en-us/sms/pricing/in. WhatsApp: Twilio fee $0.005/message in or out, plus Meta fees passed through — https://www.twilio.com/en-us/whatsapp/pricing. Verify: $0.05 per successful verification plus channel fees — https://www.twilio.com/en-us/verify/pricing. Support: free Developer plan has no guaranteed response time (~3 business days); paid from greater of $250 or 4% of spend — https://www.twilio.com/en-us/support-plans.
- **Differentiation evidence:** Can say Twilio adds its own per-message WhatsApp fee on top of Meta's (sourced). Can say free support has no SLA. Cannot say Twilio "limits you to 5 chatbots" (no source found; see claim risks). Cannot say MSG91 is cheaper for India SMS without a like-for-like route comparison (Twilio sells domestic discounts through sales).
- **Uncertainty:** India domestic-route price not public. Carrier fee section not captured.
- **Why it matters:** the default shortlist name for developers; MSG91 already has a vs page.

### Gupshup — https://www.gupshup.ai (gupshup.io redirects here)

- **Overlap:** direct for WhatsApp, RCS, SMS, conversational AI; India-origin.
- **Positioning (observed):** conversational AI platform for marketing, sales, commerce and support; AI agents (voice, avatar), "Conversation Cloud". Claims 50,000+ customers.
- **Capabilities observed:** channels listed: WhatsApp, Instagram, SMS, RCS, voice. Email and OTP products not mentioned on the homepage (unknown, not absent).
- **Pricing observed:** self-serve WhatsApp: Gupshup fee $0.001/message; Meta fees passed through, marketing markup "NA" — https://www.gupshup.ai/pricing. Meta fee cells displayed 0.0000 (probable display issue).
- **Differentiation evidence:** Gupshup's public WhatsApp fee is lower than Twilio's ($0.001 vs $0.005). MSG91 has no Gupshup vs page; any "zero margin" comparison must account for MSG91's plan fee (see claim risks).
- **Why it matters:** closest India-origin WhatsApp/RCS rival; heavy AI positioning.

### Infobip — https://www.infobip.com

- **Overlap:** direct, enterprise omnichannel CPaaS.
- **Positioning (observed):** one platform for AI-driven customer experiences across channels; cites 40+ data centers.
- **Capabilities observed:** SMS, MMS, Voice, RCS, Email, WhatsApp, Instagram, Messenger, Telegram, Viber, Apple Messages, Live Chat; developer APIs; chatbots; 2FA with failover.
- **Pricing observed:** pricing page shows models (pay-as-you-go, monthly subscription, contact sales) but no numbers; SMS pricing page showed no India rate in fetched content — https://www.infobip.com/pricing, https://www.infobip.com/sms/pricing.
- **Uncertainty:** India rates; contact center/CDP not visible on homepage.
- **Why it matters:** frequent enterprise shortlist competitor; strong channel breadth.

### Sinch — https://sinch.com

- **Overlap:** direct across SMS/RCS, WhatsApp, Verification, Voice, Email.
- **Positioning (observed):** communications infrastructure for businesses and AI agents; claims 600+ direct operator connections. Owns Mailgun, Mailjet, Chatlayer, ClickSend, SimpleTexting.
- **Pricing observed:** SMS pricing page showed US/Canada rates only (e.g. $0.0078 10DLC) — https://sinch.com/pricing/sms/. India not shown.
- **Why it matters:** overlaps both CPaaS and Email (Mailgun) buying decisions.

### Tata Communications Kaleyra — https://www.tatacommunications.com/kaleyra (kaleyra.com redirects here)

- **Overlap:** direct, India enterprise CPaaS.
- **Observed:** branded "Tata Communications Kaleyra" within an "Interaction Fabric" suite. Lists SMS, WhatsApp, MMS, RCS, Programmable Voice, Video, Email, Chatbots; OTP as a use case.
- **Pricing:** none public observed.
- **Why it matters:** Tata brand weight in Indian enterprise and BFSI deals.

### Route Mobile — https://www.routemobile.com

- **Overlap:** direct: A2P SMS, Route OTP, RCS, WhatsApp, Email (SendClean), Voice/CCaaS.
- **Observed:** says it was named a Leader in the 2026 Gartner Magic Quadrant for CPaaS (not independently checked). Logo reads "Proximus Route Mobile"; ownership not stated on page. Also offers Truecaller verified business identity.
- **Why it matters:** India-rooted, operator-grade A2P SMS rival with analyst recognition MSG91 does not claim.

### Exotel — https://exotel.com

- **Overlap:** direct for India voice, SMS/OTP, WhatsApp; also contact center (overlaps Hello).
- **Observed:** AI-led CX platform (AI agents, contact center, voice/messaging APIs). SMS page describes DLT-ready bulk and transactional SMS including OTP; 7-day trial with ₹500 credit — https://exotel.com/products/sms/. Delivery figures on the page are inconsistent (98%+ vs "up to 97%").
- **Why it matters:** strong India voice brand; competes for the same Indian SMB/enterprise accounts.

### Wati — https://www.wati.io

- **Overlap:** direct for WhatsApp API + inbox + chatbots (MSG91 WhatsApp + Hello).
- **Pricing observed (INR/month, billed quarterly):** Growth ₹2,699 (3 users), Pro ₹5,799 (5 users, +₹1,299/user), Business ₹16,799. Integrations: 2 / 5 / unlimited. Automation triggers capped per plan — https://www.wati.io/pricing/. Page does not state whether Meta fees are marked up.
- **Differentiation evidence:** can say Wati caps users and automation triggers per plan (sourced). Cannot say Wati marks up Meta fees from this source.
- **Why it matters:** the most-compared WhatsApp tool for SMEs.

### Interakt — https://www.interakt.shop

- **Overlap:** direct for WhatsApp/Instagram commerce messaging.
- **Pricing observed:** Growth ₹2,799/mo, Advanced ₹3,799/mo, unlimited agents. India per-message: marketing ₹0.970/0.958/0.949 by plan; utility ₹0.160/0.150/0.140; authentication ~₹0.128. Only Enterprise is labelled "No Markup Charges" — https://www.interakt.shop/pricing/.
- **Interpretation:** against Meta's India marketing rate of ~₹0.8631 (secondary sources only; official rate card not fetched), Interakt's listed marketing rates are ~10–12% higher.
- **Why it matters:** strong in Indian D2C; MSG91 has a vs page.

### AiSensy — https://aisensy.com

- **Overlap:** direct for WhatsApp marketing/automation.
- **Pricing observed:** India per-message: marketing ₹1.09, utility/auth/service ₹0.145. Chatbot builder add-on ₹2,500/mo (5 chatbots); WhatsApp AI Agent Builder ₹1,350/mo. Plan prices not in fetched content — https://aisensy.com/pricing.
- **Interpretation:** marketing rate is ~26% above the secondary-sourced Meta rate.
- **Why it matters:** price-led SME competitor; MSG91 has a vs page.

### Bird (formerly MessageBird) — https://bird.com

- **Overlap:** direct: SMS, WhatsApp, Email, Verify, inbox.
- **Pricing observed:** pay-as-you-go by destination; WhatsApp example $0.005 Bird fee per US marketing message plus Meta fees; Inbox described as free shared-inbox software (channel charges apply); automations billed per workflow invocation; no seat or chatbot fees shown — https://bird.com/pricing.
- **Why it matters:** MSG91's vs page still uses the old name and older seat/chatbot pricing (see claim risks).

### Vonage — https://www.vonage.com/communications-apis/

- **Overlap:** direct developer CPaaS.
- **Observed:** Messages API covers SMS, MMS, RCS, WhatsApp, Messenger, Viber, email — https://developer.vonage.com/en/messages/overview. Marketing and pricing pages returned HTTP 403 to our fetcher, so pricing and positioning are **not verified**.
- **Why it matters:** global developer brand; lower India visibility (interpretation).

### Plivo — https://www.plivo.com

- **Overlap:** direct for developer SMS/Voice; weaker for India domestic.
- **Observed:** India SMS page says domestic routes are not supported; ILDO route $0.08/SMS; inbound not supported — https://www.plivo.com/sms/pricing/in/.
- **Interpretation:** Plivo is a weak option for Indian domestic OTP/transactional SMS today; relevant for MSG91's US/global pages.

### Textlocal — https://www.textlocal.in (connection refused)

- **Observed:** textlocal.in and textlocal.in/sunset refused connections. A Webex Interact notice says Textlocal Messenger closed on 31 July 2026 and sales stopped 31 May 2026, with migration to Webex Interact; it does not name regions — https://webexinteract.com/textlocal/.
- **Interpretation:** no longer a live competitor. Former customers are a migration audience, and Webex Interact is now the incumbent's own migration path.

## Indirect competitors (overlap with Hello, MSG91's support product)

| Name        | Observed pricing / channels (2026-10-24)                                                                                                                                                                                                               | Source                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Freshchat   | Free up to 10 agents; Growth $19, Pro $49, Enterprise $79 per agent/mo (annual). Web/mobile chat and email on all plans; Facebook, Instagram, SMS, WhatsApp, LINE, Google Business Messages from Growth. Bot sessions: 500 included once, then $49/100 | https://www.freshworks.com/live-chat-software/pricing/ |
| Intercom    | Essential $29 or $19/seat/mo (annual saving implied), Advanced $85, Expert $132. Fin AI $0.99/outcome. SMS, WhatsApp, phone pay-as-you-go                                                                                                              | https://www.intercom.com/pricing                       |
| Zendesk     | Suite Team $55, Professional $115 per agent/mo annual ($69/$149 monthly). WhatsApp included with extra fees; SMS add-on                                                                                                                                | https://www.zendesk.com/pricing/                       |
| tawk.to     | Live chat, ticketing, knowledge base free. Branding removal $29/mo; AI Assist from $29/mo; hired agents $1/hour. Omnichannel Inbox listed in nav, no detail                                                                                            | https://www.tawk.to/pricing/                           |
| DelightChat | Startup $29, Scale $99, Growth $299/mo; 14-day trial, no free plan shown. WhatsApp at Meta rates with no markup. WhatsApp, Instagram, Facebook, email, live chat                                                                                       | https://www.delightchat.io/pricing                     |

**Why they matter:** buyers of a support inbox may never compare CPaaS vendors. MSG91 wins here only if Hello is presented as a support product, not a messaging add-on (interpretation).

## Substitutes

- **Meta WhatsApp Cloud API (direct):** Meta charges per delivered template message by category and country. From 2026-10-01 Meta again charges service messages (1,000 free per number per month) and utility messages inside the 24-hour window. India accounts must move to INR billing by 2026-12-31 — https://developers.facebook.com/docs/whatsapp/pricing/. Cloud API docs describe webhooks, retries and opt-in as the developer's job, and WhatsApp Manager for templates; no customer inbox described — https://developers.facebook.com/docs/whatsapp/cloud-api/overview. _Why it matters:_ the "zero margin on Meta" message only beats going direct if MSG91's tooling (inbox, bots, campaigns, OTP widget) is the reason to buy.
- **Firebase Authentication (phone):** phone auth billed per SMS on the Blaze plan; no free tier for phone auth shown; India rate on a linked page, not fetched — https://firebase.google.com/pricing. _Why it matters:_ the default OTP choice for app developers.
- **AWS End User Messaging:** India local SMS price requires compliance with India rules, otherwise ILDO routes; WhatsApp $0.005 out / $0.001 in plus Meta (India auth/utility $0.002); India voice $0.038/min; push first 1M free — https://aws.amazon.com/end-user-messaging/pricing/.
- **SendGrid (Twilio) / Mailgun (Sinch):** email API substitutes for MSG91 Email. SendGrid's landing page showed a no-card free trial but no plan prices — https://www.twilio.com/en-us/sendgrid (sendgrid.com/en-us/pricing redirects there). Mailgun not fetched this run.

## Workarounds

- **WhatsApp Business app + spreadsheets / manual sending:** no source; inferred from market. Watch for upgrade triggers (team size, broadcast limits).
- **Do nothing / email only:** no source.
- **Telecom operator direct or in-house SMS gateway:** no source. Relevant to very large Indian senders. MSG91's own Textlocal page stresses DLT help, which is the friction this path carries (interpretation).

## Positioning gaps and opportunities

> **Interpretation / Recommendation. Hypotheses only, not approved strategy.**

1. **One account across OTP, SMS, WhatsApp, Email and support.** Of the WhatsApp-first tools checked (Wati, Interakt, AiSensy, DelightChat), none showed SMS, voice or email OTP on the pages fetched. Hypothesis: "one integration for OTP fallback across SMS, WhatsApp, voice and email" is MSG91's clearest sourced wedge for developers. Must be phrased as MSG91's capability, not as competitors' absence.
2. **India domestic SMS transparency.** MSG91 publishes India SMS volume rates (₹0.25 at 5,000 down to ₹0.16; "up to ₹0.13" on quote). Twilio and Plivo India pages show only international routes (~$0.08); Infobip and Sinch showed no India rate. Hypothesis: published India prices are a conversion asset. Do not claim "cheaper than Twilio" without matching routes.
3. **Developer support.** Twilio's free plan has no response-time guarantee. If MSG91 can substantiate its 24/7 human support claim internally, this is a strong developer message.
4. **Meta-fee honesty.** Gupshup ($0.001/msg) and DelightChat (no markup) also advertise pass-through or near pass-through Meta fees, so "zero margin" is not unique. Hypothesis: lead with total cost (plan fee + Meta fees + bot/agent caps) rather than margin alone.
5. **Textlocal migration page is out of date.** The deadline it cites has passed. Recommend converting it to an evergreen "switching from Textlocal" page.
6. **Missing vs pages for the India CPaaS rivals.** No pages exist for Gupshup, Exotel, Route Mobile, Kaleyra or Infobip, which overlap more with MSG91's CPaaS core than Tawk.to or DelightChat do. Recommend prioritising by search demand (not measured here).

## Claim risks found on MSG91 comparison pages

Files: `src/data/global/compare/*.json` and `src/data/global/whatsapp/compare/*.json` (feature rows are the same in both). Checked against official pages on 2026-10-24.

| #    | Page / field                                                                                                  | MSG91 says                                                             | Official source says (2026-10-24)                                                                                                                                                                     | Risk                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| C-1  | freshchat: `omnichannel_communication`, `omnichannel_chatbot_support`                                         | "WhatsApp only" / "Only WhatsApp"                                      | Web/mobile chat, email, FB, IG, SMS, WhatsApp, LINE, GBM. The same repo's WhatsApp page calls Freshchat omnichannel                                                                                   | **High** — false; row looks copied from the Wati page          |
| C-2  | freshchat: `multi_agent_support`, `unlimited_bot_creation`                                                    | Free agents up to 3; free trial 3 bots                                 | Free plan up to 10 agents; 500 bot sessions included                                                                                                                                                  | **High** — copied from Wati                                    |
| C-3  | delightchat: `pricing`                                                                                        | Free plan; paid from $49/mo                                            | No free plan shown; 14-day trial; plans from $29/mo                                                                                                                                                   | High                                                           |
| C-4  | delightchat: `customer_support_quality`                                                                       | "Free 24/7 support — email, WhatsApp & calls"                          | Response times of 24/8/4 working hours by plan. The text is MSG91's own claim placed in the competitor column                                                                                         | High (data error)                                              |
| C-5  | twilio: `unlimited_bot_creation`                                                                              | Limited to 5 chatbots                                                  | No flow cap on Studio pricing; 1,000 free executions then $0.0025 each                                                                                                                                | High (unsourced)                                               |
| C-6  | twilio: `one_click_verification`                                                                              | "No"                                                                   | Twilio changelog (2025-09-23): one-tap and zero-tap WhatsApp auth templates supported (Verify itself uses copy-code)                                                                                  | Medium                                                         |
| C-7  | twilio: MSG91 description                                                                                     | Support "often lacks personalized assistance"                          | Paid plans include a named technical account manager                                                                                                                                                  | Medium (opinion stated as fact)                                |
| C-8  | messagebird: name, `multi_agent_support`, `unlimited_bot_creation`                                            | "MessageBird"; $30/seat after 2 free; $10/active chatbot               | Brand is Bird; pricing page shows free Inbox and per-invocation automation billing; no seat or chatbot fee shown                                                                                      | Medium (stale)                                                 |
| C-9  | aisensy: `ai_chatbot_integration`                                                                             | No direct ChatGPT integration                                          | AiSensy sells a WhatsApp AI Agent Builder (₹1,350/mo)                                                                                                                                                 | Medium (stale)                                                 |
| C-10 | wati: `multi_agent_support`, `integration_and_plugins`                                                        | "Free agents till 3"; "Basic Plan allows 2"                            | 3 users included in paid Growth plan; plan is now "Growth"                                                                                                                                            | Low-medium (wording)                                           |
| C-11 | tawk: `tawk_chatbot_builder`, `tawk_omni_channel_presence`, `tawk_video_voice_calls`, `tawk_branding_removal` | No chatbot; no omnichannel; video/voice add-on $29–49; branding $29–39 | AI Assist chatbot from $29; "Omnichannel Inbox" listed; video/voice not on pricing page; branding $29                                                                                                 | Medium                                                         |
| C-12 | all WhatsApp competitor `pricing` rows                                                                        | "Costlier, added margin on Meta pricing"                               | True as a fee for Twilio ($0.005), Bird ($0.005); listed rates above Meta for Interakt and AiSensy (vs secondary Meta rate); **not stated** for Wati, Freshchat, Intercom; DelightChat says no markup | Medium — needs per-competitor proof                            |
| C-13 | `src/data/compare/whatsapp.json` `whatsapp_pricing`                                                           | MSG91 "Zero margin on Meta pricing"                                    | msg91.com/in/pricing/whatsapp shows Titan plan ₹500/mo after 2 free months, "billed per rate card"; no zero-margin statement seen                                                                     | Medium — keep only with rate card proof and plan fee disclosed |
| C-14 | `src/data/global/textlocal-alternative.json`                                                                  | Shutdown "by October 31, 2025"                                         | Deadline passed; Webex Interact notice gives 31 July 2026 closure                                                                                                                                     | Medium (stale)                                                 |

Recommendation: fix C-1 to C-5 first (factual errors), then add a "last verified" date and source link to each competitor row.

## Research candidates not yet validated

Tanla / Karix, Netcore Cloud, MyOperator, Fast2SMS, 2Factor, Webex Interact (Textlocal's migration path), WebEngage / MoEngage / CleverTap (overlap with Campaign and Segmento; MSG91 lists WebEngage as an integration), Mailgun, Amazon SES, Brevo, Google Firebase Cloud Messaging / OneSignal (push), Kapture / Freshdesk (Hello). None fetched this run.

## Unknowns

- **U-1:** who owns this file and approves watchlist changes (marketing lead not named).
- **U-2:** Meta's official India rate card was not fetched; the ₹0.8631 marketing / ~₹0.115 utility figures come from secondary blogs.
- **U-3:** Vonage pricing and positioning (HTTP 403). Twilio Studio support article (403).
- **U-4:** Textlocal official sunset page (connection refused); region coverage of the July 2026 closure.
- **U-5:** India domestic SMS prices for Twilio, Infobip, Sinch, Gupshup, Kaleyra, Route Mobile (not public or not shown).
- **U-6:** MSG91's own WhatsApp rate card (link not followed) and whether `msg91.com/whatsapp/pricing` serving SMS pricing content is intended.
- **U-7:** Plan prices for AiSensy and plan-level markup for Wati were not in fetched content.
- **U-8:** Search demand for each competitor name (no keyword data used).
