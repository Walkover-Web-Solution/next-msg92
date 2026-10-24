---
covers:
    [
        'src/styles/**',
        'tailwind.config.js',
        'postcss.config.mjs',
        'src/components/Shared/**',
        'src/components/UIComponent/**',
        'src/components/SEOComp/**',
        'src/components/HeadComp/**',
        'src/pages/_document.js',
    ]
verified_at: 701fd33a
verified_on: 2026-10-22
---

# Design System & UI Standards

The UI is Tailwind CSS 3 utilities plus DaisyUI 4 component classes (`btn`, `collapse`, `modal`, `tabs`) themed by one custom DaisyUI theme, `msg91`, defined in `tailwind.config.js`. A thin SCSS layer in `src/styles/` adds brand CSS variables, per-product colour classes, DaisyUI button overrides and a few layout helpers. Component-specific styles live in co-located CSS-module files (`src/components/BannerComp/BannerComp.module.scss` is typical). There is no component library beyond DaisyUI and no Storybook. Most "design decisions" live in page JSON under `src/data/`, not in components: the JSON picks headings, CTA labels, images and sometimes CSS class names.

PostCSS runs only `tailwindcss` (`postcss.config.mjs`). There is no autoprefixer plugin. `.browserslistrc` exists but nothing in the PostCSS chain reads it (inferred).

## Visual & Interaction Principles

These are observed in the code, not written down anywhere by the team.

1. **Monochrome UI, colour by product.** Buttons and text are near-black (`primary` `#212528`) on white or `neutral` `#FAFAFA` sections. Colour comes from the product being sold: each product page tints its tagline and accents with that product's colour trio (base / lite / dark, see [Product colours](#product-colours)).
2. **Alternating section bands.** Long landing pages alternate white and `bg-neutral` full-width sections. Each section wraps its content in `.container` and uses `py-20` (or `.cont_p`) vertical rhythm. Section titles are `h2.text-3xl.font-bold`; the banner owns the only `h1`.
3. **Two CTAs, same shape everywhere.** The primary CTA is a solid `btn btn-primary btn-md` ("Get Started", goes to signup in a new tab). The secondary is the same button with `btn-outline` ("Schedule a Meeting", "Contact sales", "Pricing"). Inline "learn more" links use `LinkButton` with the animated arrow.
4. **Motion is small and CSS-only.** Hover underlines (`.text-link`), the arrow that slides on hover (`.link-btn`), a CSS marquee, and Lottie or `.webm` loops for illustrations. There are no page transitions or animation libraries beyond `lottie-react`.
5. **Light mode only.** See [Dark mode](#dark-mode).

## Design Tokens & Styling Primitives

- **Token Source Files:** `tailwind.config.js` (DaisyUI theme and Tailwind `extend.colors`) and `src/styles/_var.scss` (CSS custom properties on `:root`).
- **Colors (DaisyUI `msg91` theme → Tailwind classes such as `bg-primary`, `text-accent`, `btn-primary`):**

    | Theme key               | Value                 | Typical use                                                                                                                                                            |
    | ----------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `primary`               | `#212528`             | Primary buttons, body-dark text                                                                                                                                        |
    | `secondary`             | `#E2F0FF`             | Light-blue fills: open FAQ title, active tab, typeahead highlight                                                                                                      |
    | `accent`                | `#1E75BA`             | Links, `btn-accent`, highlighted taglines (`tagline_class`)                                                                                                            |
    | `neutral`               | `#FAFAFA`             | Alternate section background (`bg-neutral`)                                                                                                                            |
    | `base-100` / `base-200` | `#FFFFFF` / `#808080` | Surface / muted grey                                                                                                                                                   |
    | `hello`, `darkNavy`     | `#f2ca55`, `#0e1638`  | Extra keys in the theme object. DaisyUI only maps its own known keys, so `bg-hello` is not a utility. Use `btn-hello` or the SCSS `hello_bg` class instead (inferred). | <!-- verify:ignore --> |
    | `--rounded-btn`         | `0.2rem`              | Nearly square buttons                                                                                                                                                  |

- **Tailwind `extend.colors`:** `darkNavy`, `report.*`, `shopifyBanner.*` and `fileHosting.*` are per-feature palettes, not general tokens. For example, `bg-report-primary` and `text-shopifyBanner-heading` are used only on their own pages.
- **CSS variables (`src/styles/_var.scss`):** `--primary-color`, `--secandary-color` (spelled that way in the code), `--accent-color`, `--neutral-color`, `--gray-color` and `--link-color` mirror the DaisyUI theme for use in SCSS. Then there is one `--<product>-color`, `--<product>-lite-color` and `--<product>-dark-color` trio per product. If you change a theme colour, change it in both places.
- **Feedback colours:** none defined. There are no success, error or warning tokens. Forms use toasts (`react-toastify`, mounted in `src/pages/_app.js`) and ad-hoc Tailwind reds and greens.
- **Typography:** No web font is loaded. `body` uses the system stack (`ui-sans-serif, system-ui, sans-serif`, set in `src/styles/globals.scss`). The scale is set per component:

    | Role              | Classes                                                                                        | Where                                            |
    | ----------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
    | Banner H1         | `.heading` = `text-3xl md:text-5xl font-bold` (or `.whatsapp__heading` = `text-4xl font-bold`) | `src/styles/_sizes.scss`, chosen by `BannerComp` |
    | Banner subheading | `.subheading` = `text-xl md:text-2xl`                                                          | `src/styles/_sizes.scss`                         |
    | Section H2        | `text-3xl font-bold`                                                                           | `FaqsComp`, `FeatureComp`, `PreFooterComp`       |
    | Card H3           | `text-2xl font-semibold` / `text-xl font-medium`                                               | `FeatureComp`, `FaqsComp`                        |
    | Tagline           | `text-xl uppercase tracking-widest` + product dark colour                                      | `BannerComp`                                     |
    | Body              | `text-base` / `text-lg`, muted `text-gray-600`                                                 | everywhere                                       |

- **Spacing & elevation:** Section padding is `py-20` or `.cont_p` (`py-6 md:py-12 lg:py-20`). Grid gaps are `gap-6` and `md:gap-12`. `.cont_w` caps content at 1000px. Cards are `bg-white border rounded`, mostly flat, with `hover:shadow-lg` on clickable cards.

### Product colours

`src/styles/_colors.scss` runs the `product-color($name)` mixin once per product. It generates `<name>_bg`, `<name>_text`, `<name>_lite_bg`, `<name>_lite_text`, `<name>_dark_bg` and `<name>_dark_text`, all `!important`. Components build these class names from the JSON `slug`. For example, `BannerComp` renders `${data.slug}_dark_text` on the tagline and on highlight check marks, and `migrateFromTextlocal` uses `${slug}_lite_bg`.

> [!WARNING]
> The class names come from data, so a typo fails silently: the text just renders uncoloured. These mismatches exist at HEAD:
>
> - The mixin is called with `'opt'`, but the CSS variables and the JSON slug are `otp`. `otp_dark_text` is never generated, and the `opt_*` classes point to an undefined `--opt-color`. <!-- verify:ignore -->
> - BannerComp slugs `one-api` and `push-notification` have no mixin call and no CSS variables, so their taglines are uncoloured. <!-- verify:ignore -->
> - The named helpers `.text-campaign` (`--campaign-color-dark`), `.text-segmentors` (`--segmentors-color`) and `.text-opt` (`--opt-color`) point to variables that don't exist. <!-- verify:ignore -->
>
> When you add a product, add its variable trio to `_var.scss` **and** an `@include product-color('<slug>')` line in `_colors.scss`, using exactly the slug from the JSON.

> [!WARNING]
> Tailwind's `content` globs scan `src/pages`, `src/components`, `src/styles` and a nonexistent src/app, but **not `src/data/**`**. Tailwind class names written into page JSON (for example `"color": "text-purple-600"` or `"bg": "bg-gray-100"`) are generated only if the same class also appears literally somewhere in a scanned file. Prefer the SCSS product classes or add the class to a component. JSON HTML also contains Bootstrap-era classes (`c-fs-4`, `col-12`) that do nothing.

### Dark mode

There is none. `src/pages/_document.js:MyDocument` hard-codes `data-theme='light'` on `<html>`, but the only DaisyUI theme defined is `msg91`. DaisyUI applies its first configured theme to `:root`, so `msg91` is what renders (confirmed in compiled CSS under `.next/`). No `dark:` utilities are used.

### Stylesheet layout

`src/pages/_app.js` imports `src/styles/globals.scss` once, along with the react-toastify CSS. `globals.scss` first does `@use 'import'`, which pulls in all partials, and then emits `@tailwind base/components/utilities`.

| Partial                   | Purpose                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/_import.scss` | Barrel. `@use`s every partial below, plus `src/components/IntegrationComp/_integrations.scss`.                                                                                                                                                                                                                                                                             |
| `src/styles/_var.scss`    | `:root` brand and product CSS variables                                                                                                                                                                                                                                                                                                                                    |
| `src/styles/_colors.scss` | `.text-<product>` helpers and the `product-color` mixin output                                                                                                                                                                                                                                                                                                             |
| `src/styles/_custom.scss` | Global overrides: `.container` padding, `.cont*` layout helpers, DaisyUI `.btn` variants (`btn-md`, `btn-icon`, `btn-otp`, `btn-white`, `btn-hello`, accent/primary hover), `.text-link` / `.link-btn` hover animations, `.tabs` restyle, pricing slider, mobile nav (`.nav-show` / `.nav-hide`), marquee, chat-widget sizing, file-hosting helpers (`.text-fh`, `.bg-fh`) |
| `src/styles/_sizes.scss`  | `.heading`, `.subheading`, `.whatsapp__heading`, `.whatsapp__subheading`                                                                                                                                                                                                                                                                                                   |
| `src/styles/_pages.scss`  | Page-specific rules: signup OTP inputs (`.otp-input`, `.signup`), the `.ai-fuled` text shadow, and `.blog-body-cont` (typography for guide/MDX bodies)                                                                                                                                                                                                                     |
| `src/styles/_blog.scss`   | `.blog-card*` and `.blog-header` for the guide listing                                                                                                                                                                                                                                                                                                                     |
| `src/styles/_reset.scss`  | Empty                                                                                                                                                                                                                                                                                                                                                                      |
| `src/styles/globals.scss` | Body font, `overflow-x: hidden` on `body` and `#__next`, react-bootstrap-typeahead (`.country-typehead`, `.rbt-menu`), number-input spinners off, `.modal-box` max 1200px, integration header gradient vars                                                                                                                                                                |

> [!WARNING]
> The partials are emitted **before** the `@tailwind` layers, so a Tailwind utility with the same specificity overrides them. That is why `_custom.scss` and `_colors.scss` lean on `!important`. `.container` is Tailwind's container (max-width per breakpoint) with `mx-auto px-4 md:px-10 !w-full` layered on top. Don't redefine it per page.

## Reusable Component Catalog

Reuse these instead of writing a new button, FAQ or modal.

| Component                     | File Path                                                     | Purpose & When to Use                                                                                                                                                                                                                                                                                                | Key Props / Variants                                                                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DaisyUI buttons (CSS)         | `src/styles/_custom.scss`                                     | Every CTA. Use `btn btn-primary btn-md` for the main CTA and add `btn-outline` for the secondary.                                                                                                                                                                                                                    | `btn-primary`, `btn-accent`, `btn-white`, `btn-hello`, `btn-outline`, `btn-md`, `btn-sm`, `btn-icon`                                                                                                     |
| `LinkButton`                  | `src/components/UIComponent/Buttons/LinkButton.js:LinkButton` | Inline text link with an animated arrow (feature cards, menus). Imported by about 15 components.                                                                                                                                                                                                                     | `href`, `content`, `target`, `customClasses` (usually `'active-link text-link'`)                                                                                                                         |
| `LinkText` / `BtnWithHideIco` | `src/components/UIComponent/Buttons/LinkButton.js:LinkText`   | Same arrow as a `<span>`, for use inside an existing `<a>`. `BtnWithHideIco` shows the arrow only on `.LinkButtonCard:hover`.                                                                                                                                                                                        | `children`, `customClasses`                                                                                                                                                                              |
| `MoreButton`                  | `src/components/UIComponent/Buttons/LinkButton.js:MoreButton` | "Read more" toggle with a chevron                                                                                                                                                                                                                                                                                    | `content`, `open`, `customClasses`                                                                                                                                                                       |
| `LottiePlayer`                | `src/components/LottiePlayer/LottiePlayer.js`                 | Fetches a Lottie JSON URL on the client and loops it. `aria-hidden`. Used by `BannerComp`, `FeatureComp` (when `img` is a .json URL), the IntegrationComp sections and others.                                                                                                                                       | `lottie` (URL under `/assets/**/lotties/`), `className`                                                                                                                                                  |
| `FaqsComp`                    | `src/components/FaqsComp/FaqsComp.js`                         | The FAQ accordion: DaisyUI `collapse-plus` with radio inputs, first item open, answers rendered as HTML. Registered as a section under the key `FaqsComp` (the Hello-BR variant is the key `Faqs`), and also embedded in the pricing pages and `CostComparisionComp`.                                                | `data.heading`, `data.subheading`, `data.faqs[{question, answer}]`, `notCont` (skip `.container`)                                                                                                        |
| `BannerComp`                  | `src/components/BannerComp/BannerComp.js`                     | Product hero: tagline, `h1`, CTAs, trusted-by strip, and an image, video, Lottie or code snippet. Used by 178 page JSONs.                                                                                                                                                                                            | `data.{slug, product{icon,name}, tagline, heading, subheading, getstarted_btn[_link], schedule_meet, banner_img, banner_video, not_absolute, lottie, code, highlights, trust_highlights, trustedByComp}` |
| `PreFooterComp`               | `src/components/PreFooterComp/PreFooterComp.js`               | Closing CTA band on `bg-neutral`. Used by 248 page JSONs.                                                                                                                                                                                                                                                            | `data.content`, `data.img`, `data.buttons.{contactSales{text,link}, salesModal{text,link}, pricing{text,primary}, getStarted{text,primary}}`                                                             |
| `FeatureComp`                 | `src/components/FeatureComp/FeatureComp.js`                   | Two-column feature card grid. Every third card spans the full width. Supports "Read more" expansion.                                                                                                                                                                                                                 | `data.{heading, subheading, read_more, bg, features[{name, icon, content(HTML), img/video, button, more_content}]}`                                                                                      |
| `CalendlyModal`               | `src/components/CalendlyModal/index.js`                       | Wraps any child. A click opens a DaisyUI `<dialog class="modal" open>` with the hard-coded MSG91 Calendly link. Used by `WhyChooseMSG91` and `WhatsAppDriveSaled`.                                                                                                                                                   | `children`                                                                                                                                                                                               |
| `MobileNumberInput`           | `src/components/mobile-number-input/MobileNumberInput.js`     | Country-picker phone field. `src/components/mobile-number-input/index.js` also re-exports the phone helpers from `phone-utils.js` and `countries-data.js`. Only signup uses it (`src/components/signupComp/StepTwo/StepTwo.js`). `src/components/EventRegistrationComp/MobileOtpField.js` has its own separate copy. | `value`, `onChange`, `onCountryChange`, `defaultCountry='US'`, `label`, `error`, `disabled`, `required`                                                                                                  |
| Shared link-generator kit     | `src/components/Shared/`                                      | `HeroSection`, `TabNavigation`, `WidgetPreview`, `WidgetCodeSnippet`, `StepsSection`, `SecondaryCTA`, `FAQSection`, `PreFooter`. Used only by `WhatsappLinkComp` and `AppleMessagesLinkComp`. This kit uses its own slate/emerald palette, not the `msg91` theme.                                                    | `themeColor` (`'emerald'` default, `'green'`), plus section props such as `heading`, `faqs`, `steps`, `buttonText`                                                                                       |
| `SEOComp`                     | `src/components/SEOComp/SEOComp.js`                           | SEO copy block near the footer, with "Read more" revealing HTML. Used by 17 page JSONs.                                                                                                                                                                                                                              | `data.{heading, description, data(HTML)}`                                                                                                                                                                |
| `HeadComp`                    | `src/components/HeadComp/HeadComp.js`                         | `<head>` tags and third-party scripts. See [SEO](#seo--metadata-expectations).                                                                                                                                                                                                                                       | `data.{title, description}`, `pageInfo`                                                                                                                                                                  |

Modals: there is no shared modal component. `BannerComp`, `PreFooterComp` and `CalendlyModal` each inline the same `<dialog id='whatsapp_modal' className='modal' open>` + `InlineWidget` markup. If you need a scheduling modal, use `CalendlyModal`. Toasts: call `toast()` from `react-toastify`. The container is already mounted in `src/pages/_app.js`.

### Section component contract

Most pages render through `src/pages/[[...slug]].js`. Each top-level key in the page JSON is looked up in the `Components` map of `src/components/PageRenderer/sectionRegistry.js` and rendered in JSON order as:

```jsx
<Component key={`section-${key}`} data={pageData} pageInfo={pageInfo} browserPathCase={router.asPath} />
```

- `data` is that key's JSON value. `pageInfo` is the parsed route (`country`, `page`, `baseURL`, `pathURL`; the shape is owned by [ARCHITECTURE.md](ARCHITECTURE.md)). `browserPathCase` is `router.asPath`, and few sections read it.
- `NotificationBarComp`, `MenuBarComp` and `FooterComp` are rendered around the sections with `componentData` (from `src/utils/getCommonCompData.js`), **not** `data`.
- Some registry keys are aliases for one component (`IndustryFeatureComp` → `FeatureComp`, `FeatureBulletGroup` → `FeatureWithBulletGroup`, `Features` → the IntegrationComp features section, `FileHosting*Comp` → `FeatureHighlightComp`). For `br`/`br-pt` `hello`, `Banner` and `Features` are swapped to the HelloBr components.
- An unknown key logs `Component "<key>" is undefined` and renders nothing. The page still builds.
- A new section must: (1) default-export a component that takes `{ data, pageInfo }`, (2) be imported and added to `Components`, and (3) guard every field with `?.`, because the same component serves 11 country folders whose JSON varies.

### Icons

- Use `react-icons`, almost entirely the Material Design set (`react-icons/md`); `react-icons/fa` is imported in 2 files.
- When the JSON supplies an icon by name (for example `"icon": "MdSms"`), resolve it with `src/utils/getMdIcons.js:GetMdIcons`. It is used by `FeatureComp`, `ChatBotComp`, `MagicLinkComp`, `CategoriesComp` and `ContactUs/QrWithImageCard`.

> [!WARNING]
> `GetMdIcons` calls `require('react-icons/md')[icon]`, which pulls the whole MD icon set into any bundle that uses it. It returns `undefined` for a misspelled name. `FeatureComp` renders `<Icon/>` whenever `feature.icon` is truthy, so a bad icon name in JSON crashes that page render. Check the name against the `react-icons/md` exports before adding it to JSON. `FeatureComp` also ignores the JSON `iconColor` field and hard-codes `text-[#F7DC6F]`.

### Images & media

- Use `next/image` with explicit `width`/`height` and a `sizes` string. Above-the-fold banner images also set `priority` and `fetchPriority='high'`. Everything else uses `loading='lazy'`.
- Assets are local. JSON points at `/assets/<country|global>/<product>/...` or `/img/...` in `public/`. `next.config.mjs` `images.remotePatterns` allows only `placehold.co`, so a remote image URL in JSON fails in `next/image` unless you add its host.
- Videos are `.webm` `<video autoPlay muted loop playsInline>`. Lottie files are .json files under `public/assets/**/lotties/`. The `next.config.mjs` cache header targets `/lotties/(.*)`, but that path doesn't exist, so it matches nothing.

## Responsive Behavior & Breakpoints

- **Breakpoints:** Tailwind defaults (no `screens` override): `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Styles are mobile-first.
    - **< md:** single column. `.container` gutter is `px-4`. Banner and pre-footer stack vertically, and CTA rows go `flex-col`.
    - **md–lg:** `.container` gutter becomes `px-10`. Desktop nav appears at `md` (`MenuBarComp`: `hidden md:flex` desktop bar, `flex md:hidden` mobile bar).
    - **≥ lg:** two-column banner (`lg:flex-row`, text `lg:w-1/2`, the image can go `lg:absolute` and bleed off the right edge). Feature grid cards switch from stacked to side-by-side. The pre-footer image appears only at `lg`.
- **Mobile nav:** a full-height drawer slid in and out with the global `.nav-show` (`left-0`) and `.nav-hide` (`left-[-2600px]`) classes. Opening it sets `document.body.style.overflow = 'hidden'`.
- **Overflow:** `body` and `#__next` have `overflow-x: hidden`. This hides horizontal-overflow bugs instead of fixing them, so test new wide elements at 375px.
- The viewport meta (`width=device-width, initial-scale=1, maximum-scale=5`) is set in `HeadComp`. Pages that don't render `HeadComp` (guide, 404) set their own.

## Accessibility (A11y) Standards

Observed practice. No a11y linting or testing is configured.

- **Landmarks:** sections use `<section>` or `<div>`. There is no `<nav>` or `<footer>`, and the only `<main>` is in the guide layout (`src/components/Guide/layout.js`). Menu and footer are plain `div`s.
- **Headings:** the banner (`BannerComp` and its variants) owns the page `h1`. Sections use `h2`, cards use `h3`. Keep one `h1` per page. If a page JSON has no banner, make sure some section renders an `h1`.
- **Images:** `next/image` `alt` comes from JSON (`product.name`, `tagline`, `feature.name`). Decorative pre-footer art uses `alt=''`. `LottiePlayer` is `aria-hidden`.
- **Disclosure widgets:** `FaqsComp` uses DaisyUI radio-collapse with `aria-label={question}` and a nested `<button>`. The Shared `FAQSection` uses a real `<button>` toggle but sets no `aria-expanded`.
- **Modals:** the dialogs are `<dialog open>` rendered by React state, not `showModal()`. They have no focus trap, `Escape` doesn't close them, and the close button is a bare `✕` with no `aria-label`. Fix this if you touch a modal.
- **Focus:** there is no global focus-ring convention. A few inputs set `focus:` utilities, and DaisyUI defaults cover `.btn`.
- **Language:** `src/pages/_document.js:getLanguageFromPath` sets `<html lang>` from the first URL segment using `htmlLang` in `src/data/availableCountries.json` (for example `/br-pt/...` → `pt-BR`). Otherwise it is `en`.

> [!WARNING]
> `LottiePlayer` and the `BannerComp` Lottie wrapper set `cursor-none`, so the mouse cursor disappears over the animations.

## Website Messaging & Copy Guidelines

All copy lives in page JSON (`src/data/<country>/<page>.json`), with one file per country folder per page. A copy change usually has to be repeated across `global`, `in`, `us`, `gb`, `ae`, `sg`, `es`, `ph`, `br`, `br-pt` and `fil-ph`. Ownership of that sync is described in [ARCHITECTURE.md](ARCHITECTURE.md).

- **Voice:** direct, benefit-led B2B copy for developers and businesses (see [VISION.md](VISION.md)). Taglines are short uppercase product names. Headings make a promise ("Start building your ideal customer engagement experience" is the `PreFooterComp` default).
- **CTA labels (observed):** "Get Started" is the dominant primary label, with variants "Get Started For Free", "Get Started for Free" and "Get Started FREE forever". Pre-footer labels use sentence case: "Get started", "Contact sales", "Pricing". The secondary banner CTA is "Schedule a Meeting". The capitalisation is inconsistent across files. Match the casing already used in the file you're editing.
- **Localisation:** `br-pt` is Portuguese ("Comece gratuitamente", "Fale com as vendas") and `fil-ph` is Filipino ("Magsimula", "Presyo"). Some components still hard-code English fallbacks and branch only on `br-pt` (for example `FeatureComp`'s "Use Cases" / "Key Features" labels and `FaqsComp`'s "Frequently Asked Questions" default). Filipino pages therefore show English there.
- **Rich text:** FAQ answers, feature `content`, `SEOComp.data` and terms pages are HTML strings rendered with `dangerouslySetInnerHTML`. Use plain tags (`<p>`, `<ul>`, `<a>`, `<strong>`). Class names inside them must also exist in a scanned file (see the Tailwind warning above).
- **Errors and empty states:** handled per form (toasts in signup and contact). There is no shared microcopy convention.

### Brand Voice & Terminology

Status: **observed + proposed.** This was recovered from copy on 2026-10-24 (term counts are occurrences in `src/data/`). No brand guide has been approved. Messaging strategy (audiences, promise, claim register) is in [POSITIONING.md](POSITIONING.md). This section covers only how to write.

**Voice (observed, keep):** plain, direct B2B language addressed to "you". Lead with the outcome for the reader's situation, then how it works. Keep sentences short. Write for developers _and_ business buyers on the same page: give the outcome in the heading and the API detail in the body or code sample.

**Terminology:**

| Use                                                      | Not                                        | Evidence                                                                                                       |
| -------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| MSG91                                                    | Msg91, MSG 91                              | 2,352 uses, all in this form                                                                                   |
| WhatsApp                                                 | Whatsapp                                   | 2,962 vs 94 (e.g. the `free-whatsapp-link-generator` title "Create a Whatsapp link")                           |
| URL Shortener / Short URL                                | URL Shortner, ShortUrl                     | "Shortner" (19 uses, e.g. home `MoreServicesComp`) is a misspelling. "ShortUrl" (11) is used as the page title |
| KnowledgeBase (product name)                             | Knowledgebase, Knowledge Base              | 64 vs 11 variants                                                                                              |
| ONE API (product name)                                   | One API, OneAPI                            | 154 vs 12                                                                                                      |
| Hello, Campaign, Segmento, OTP Widget, RCS, Voice, Email | Generic lower-case "hello" for the product | Product names in `common.json` `menu.products_list`                                                            |
| email                                                    | e-mail                                     | "e-mail" appears 140 times, mostly in policy pages. Leave legal text as written                                |
| Sign up (verb), sign-up (noun)                           | Signup in body copy                        | Button label "Sign Up" comes from `common.json` `signup_btn`                                                   |
| Contact sales                                            | Contact Sales                              | 209 vs 0                                                                                                       |

**CTA wording rules:**

1. **The label must match the destination.** "Get Started" means self-serve sign-up. A link to a meeting must say "Book a demo", "Schedule a Meeting" or "Talk to Sales". Today the RCS "Get Started" buttons open a Calendly sales meeting ([POSITIONING.md](POSITIONING.md#calls-to-action--destinations)).
2. **Say "free" only when the free terms are defined and linked.** Write "Get Started for Free" only where a free plan or credits exist. "FREE forever" needs a linked plan definition.
3. **Keep one primary CTA per section.** The secondary CTA uses `btn-outline`. Use the casing already in that file ("Get Started" in banners, "Get started" in pre-footers).

**Claims rules:** a number, superlative, customer logo or certification must have an entry in the [claim register](POSITIONING.md#claim-to-evidence-register). Reuse the registered wording; don't introduce a new figure for the same fact. Keep competitor statements dated and sourced ([COMPETITORS.md](COMPETITORS.md)). Logo `name` (used as alt text) must match the image file.

**Do / Don't (from real copy):**

| Don't (current copy)                                                                                         | Do (example rewrite, unapproved)                                  | Why                                                |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------- |
| "Seamless Global messaging and communications." (`whatsapp.json` banner)                                     | "Send WhatsApp updates, offers and support replies from one API." | Name the reader's job, not an adjective            |
| "Boost customer engagement and build trust" (`voice.json`)                                                   | "Make and receive calls in your app with a voice API."            | Says what the product does                         |
| "Get Started" → Calendly (`rcs.json`)                                                                        | "Book an RCS demo" → Calendly                                     | Label matches destination                          |
| "Trusted by 30,000+ in businesses" (one country copy)                                                        | "Trusted by 30,000+ global businesses" (the registered wording)   | One wording per claim                              |
| `{"name": "Ixigo", "url": "/assets/trusted_by/indian-oil.svg"}` (was in every `home.json`; fixed 2026-10-24) | Name and image refer to the same company                          | Alt text must describe the image                   |
| "URL Shortner"                                                                                               | "URL Shortener"                                                   | Spelling                                           |
| "Switch to MSG91 Easily Before October 31, 2025" (still live on 2026-10-24)                                  | Refresh the copy or retire the page with a relevant redirect      | Date-bound copy must have an owner and an end date |

**Localization:** translated folders (`br-pt`, `fil-ph`) need translated CTAs and microcopy. Never copy an English claim into a translated page with a different number. Translate the registered claim exactly.

## SEO & Metadata Expectations

`src/components/HeadComp/HeadComp.js:HeadComp` is a registered **section**. A catch-all page gets `<title>`, the meta description and the canonical/hreflang tags only if its JSON has a `HeadComp` key. By convention it is the first key, and 312 of 371 JSON files have one. Case-study pages (`CaseStudyPageComp`, `CaseStudyPageCompOld`) and pricing (`src/components/PricingComp/index.js`) render `HeadComp` themselves. The guide pages (`src/pages/guide/[slug].js`), `src/pages/404.js` and `src/pages/verify.js` write their own `next/head`.

| Tag                                                         | Source                                                                                                                   | Notes                                                                                                                                                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`, `meta description`, `og:title`, `og:description` | `HeadComp.title`, `HeadComp.description`                                                                                 | og tags reuse title and description. The JSON fields `ogTitle`, `ogDescription` and `keywords` (present in some files) are **ignored**.                                                                                |
| `og:image`, favicon                                         | `/assets/brand/favicon.svg`                                                                                              | Same for every page. It is a relative URL.                                                                                                                                                                             |
| `og:url`                                                    | hard-coded `https://msg91.com/`                                                                                          | Not per page                                                                                                                                                                                                           |
| `canonical`                                                 | `HreflangTagComp`: `BASE_URL` + `/` + `pageInfo.pathURL`                                                                 | Self-referencing, including the country prefix                                                                                                                                                                         |
| `hreflang` `x-default` and `en`                             | `BASE_URL` + `/` + `pageInfo.baseURL`                                                                                    | Points to the un-prefixed (global) page                                                                                                                                                                                |
| `hreflang` per country                                      | One `<link>` per `availableCountries.json` entry: `/<shortname lowercased>/<baseURL>` with `hreflang` from the same file | Skipped for pages in `specialPages.global` (unless they are pricing pages), for `specialPages.justNested`, and for `case-studies`. Hidden countries (`hide: true`) are still emitted.                                  |
| `robots`/`googlebot`/`bingbot` `noindex,nofollow`           | Emitted when `process.env.BASE_URL !== 'https://msg91.com'`                                                              | Confirmed in `HeadComp`. `BASE_URL` is inlined at **build** time via `next.config.mjs` `env`, so this depends on the build environment.                                                                                |
| JSON-LD `WebSite` + `Organization`                          | Only when `pageInfo.country === 'in'`                                                                                    | Injected with `next/script`                                                                                                                                                                                            |
| Title format                                                | Free text per JSON                                                                                                       | Mostly `<Topic> \| MSG91` or `<Topic> - MSG91`. No template is enforced. Write a unique title of about 60 characters and a description of 140–160 characters. Several existing descriptions run to 200–350 characters. |

> [!WARNING]
> `BASE_URL` must be exactly `https://msg91.com` (no trailing slash, no `www`) in the production build. Any other value puts noindex on every catch-all, pricing and case-study page. It also changes every canonical and hreflang URL, because those are built by plain string concatenation. The guide pages are different: they hard-code `https://msg91.com/guide/<slug>` as canonical and have **no** noindex guard, so a testing build of the guide is indexable.

> [!WARNING]
> `HeadComp` also loads the Hello chat widget (except on `demochatbot`, `contact-us` and `pricing*` pages), GTM and Microsoft Clarity. Removing `HeadComp` from a page JSON removes its analytics and chat widget as well as its SEO tags. The analytics IDs are documented in [CONTRACTS.md](CONTRACTS.md).

**Crawl files in `public/` (hand-maintained; no generator script exists in the repo):**

- `public/robots.txt` allows everything except `/cgi-bin/` and one feed URL. It lists `sitemap.xml`, `sitemap_video.xml` and `sitemap_images.xml`.
- `public/sitemap.xml` holds about 690 `<url>` entries, each with `xhtml:link` hreflang alternates. When you add or rename a page, add it here by hand with the same alternate set that `HreflangTagComp` emits.
- `public/_redirects` (about 1,360 lines) and `public/_headers` use the Netlify / Cloudflare Pages format (`/from /to [status]`). Next.js itself does not read them. Whether the production host does is an open question (see [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md)). The security headers Next.js does apply are set in `next.config.mjs` `headers()`.

**SEOComp:** a visible "Read more" block of keyword copy. Its hidden content uses a fixed `id='dangerousContent'`, so only one `SEOComp` per page works. Its click handler reads the global `event`.
