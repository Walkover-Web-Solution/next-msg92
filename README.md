# MSG91 Web (Next.js)

A Next.js 14 website for MSG91 with localized data, MDX-powered blog, Tailwind CSS + DaisyUI styling, and widget/analytics integrations.

## Tech Stack

- Next.js 14 (React 18)
- Tailwind CSS + DaisyUI
- SCSS partials
- MDX via `next-mdx-remote`
- Utilities: `axios`, `date-fns`, `react-icons`, `react-toastify`, etc.
- Husky + lint-staged + Prettier for pre-commit formatting

## Requirements

- Node.js ≥ 18
- npm ≥ 10

## Getting Started

1. Copy environment variables:
    - Duplicate `.env.example` → `.env` and fill values (see Environment Variables below).

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the dev server (port 3030):

    ```bash
    npm run dev
    ```

    Open http://localhost:3030

4. Production build and run:
    ```bash
    npm run build
    npm start
    ```
    Serves the production build on port 3030.

## Scripts

- `npm run dev` — Start dev server on 3030
- `npm run build` — Production build
- `npm start` — Serve production build on 3030
- `npm run lint` — Next.js lint
- `npm run prepare` — Setup Husky

## Environment Variables

Configured in `next.config.mjs` and injected into the app:

- **URLs**
    - `BASE_URL`
    - `API_BASE_URL`
    - `REDIRECT_URL`
    - `PRICING_URL`
    - `SUBSCRIPTION_PRICING_URL`
    - `VOICE_API_URL`
    - `LOGIN_URL`
    - `CHATBOT_BASE_URL`
    - `HELLO_API_URL`
    - `CHATBOT_TEMPLATE_TEST_URL`
    - `WHATSAPP_PRICING_URL`

- **Client IDs**
    - `GOOGLE_CLIENT_ID`
    - `ZOHO_CLIENT_ID`
    - `GITHUB_CLIENT_ID`
    - `MSAL_CLIENT_ID`

- **Widget Config**
    - `OTP_WIDGET_TOKEN`
    - `WIDGET_AUTH_TOKEN`
    - `WIDGET_SCRIPT`

- **Chat Widget**
    - `CHAT_WIDGET_TOKEN`
    - `ECOMMERCE_WIDGET_TOKEN`
    - `CHAT_WIDGET_URL`

**Notes:**

- `next.config.mjs` loads `.env` using `dotenv`. Values are read from `process.env` or the `.env` file.
- Some pages like `src/pages/404.js` inject Google Tag Manager and Microsoft Clarity.
- SEO robots meta toggles based on `BASE_URL` (non-production adds `noindex,nofollow`).

## Project Structure

- `src/pages/` — Routes (e.g., `src/pages/404.js`)
- `src/components/` — Reusable UI components
- `src/data/` — Localized JSON content
    - Country folders: `src/data/in/`, `src/data/gb/`, `src/data/ph/`, `src/data/global/`, etc.
    - Example: `src/data/global/home.json`
- `_posts/blog/` — MDX blog posts
- `public/` — Static assets (images, icons, scripts)
- `src/styles/` — SCSS partials and custom styles
- `jsconfig.json` — Path alias `@/*` → `src/*`

## Styling

- Tailwind configured in `tailwind.config.js`
- DaisyUI theme `msg91` with brand colors
- PostCSS config in `postcss.config.mjs`
- SCSS partials in `src/styles/`

## MDX Blog

- MDX files under `_posts/blog/*.mdx`
- Parsed via `next-mdx-remote`
- Code highlighting supported via `prismjs` / `react-syntax-highlighter` (as used in components/pages)

## Images and Static Files

- Static assets in `public/`
- External image domains configured in `next.config.mjs` (`images.domains`, e.g., `placehold.co`)

## Code Quality

- Prettier config at `.prettierrc.json`
- Husky + lint-staged formats staged files on commit:
    - `*.{js,jsx,ts,tsx,md,mdx,html,css}` → `prettier --write`

## Deployment

- Build: `npm run build`
- Serve: `npm start`
- Set required environment variables in your hosting platform (Vercel/Netlify/Render/PM2/etc.)
- For SEO: set `BASE_URL=https://msg91.com` in production to enable indexing.

## Analytics & Widgets

- Google Tag Manager and Microsoft Clarity are injected on pages like `src/pages/404.js`
- Chat and OTP widgets configured with the environment variables listed above
- Verify correct script URLs and tokens for production

## Troubleshooting

- **Port 3030 already in use:** Stop the conflicting process or change script port.
- **Env vars not applied:** Ensure `.env` exists and server restarted; set envs in hosting platform for prod.
- **External images blocked:** Add the domain to `images.domains` in `next.config.mjs`.

## License

Proprietary. All rights reserved.

## Contributing

- Branch from `main`
- Ensure formatting passes (pre-commit hooks)
- Open a PR with description and testing notes
