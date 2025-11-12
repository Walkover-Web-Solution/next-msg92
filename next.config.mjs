import dotenv from 'dotenv';
/** @type {import('next').NextConfig} */

const customEnvConfig = dotenv.config().parsed || {};
const getEnvValue = (key) => process.env?.[key] || customEnvConfig?.[key];

// --- Security Headers ---
const securityHeaders = [
    // 1️⃣ Force HTTPS on all subdomains and preload for browsers
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
    },

    // 2️⃣ Block the site from being embedded in iframes (anti clickjacking)
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },

    // 3️⃣ Prevent MIME type sniffing
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },

    // 4️⃣ Isolation and data protection between origins
    {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin',
    },
    {
        key: 'Cross-Origin-Resource-Policy',
        value: 'same-origin',
    },
];

const nextConfig = {
    trailingSlash: false,
    reactStrictMode: false,

    // ✅ Enables source maps in production for debugging (Lighthouse + DevTools)
    productionBrowserSourceMaps: true,

    // ✅ Optimize image handling and external image domains
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
    },

    // ✅ Apply security headers globally
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
            {
                source: '/lotties/(.*)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
        ];
    },

    // ✅ Environment Variables (from dotenv or process.env)
    env: {
        // URLs
        BASE_URL: getEnvValue('BASE_URL'),
        API_BASE_URL: getEnvValue('API_BASE_URL'),
        REDIRECT_URL: getEnvValue('REDIRECT_URL'),
        PRICING_URL: getEnvValue('PRICING_URL'),
        SUBSCRIPTION_PRICING_URL: getEnvValue('SUBSCRIPTION_PRICING_URL'),
        VOICE_API_URL: getEnvValue('VOICE_API_URL'),
        LOGIN_URL: getEnvValue('LOGIN_URL'),
        CHATBOT_BASE_URL: getEnvValue('CHATBOT_BASE_URL'),
        HELLO_API_URL: getEnvValue('HELLO_API_URL'),
        CHATBOT_TEMPLATE_TEST_URL: getEnvValue('CHATBOT_TEMPLATE_TEST_URL'),
        WHATSAPP_PRICING_URL: getEnvValue('WHATSAPP_PRICING_URL'),

        // Client IDs
        GOOGLE_CLIENT_ID: getEnvValue('GOOGLE_CLIENT_ID'),
        ZOHO_CLIENT_ID: getEnvValue('ZOHO_CLIENT_ID'),
        GITHUB_CLIENT_ID: getEnvValue('GITHUB_CLIENT_ID'),
        MSAL_CLIENT_ID: getEnvValue('MSAL_CLIENT_ID'),

        // Widget Config
        OTP_WIDGET_TOKEN: getEnvValue('OTP_WIDGET_TOKEN'),
        WIDGET_AUTH_TOKEN: getEnvValue('WIDGET_AUTH_TOKEN'),
        WIDGET_SCRIPT: getEnvValue('WIDGET_SCRIPT'),

        // Chat Widget Config
        CHAT_WIDGET_TOKEN: getEnvValue('CHAT_WIDGET_TOKEN'),
        ECOMMERCE_WIDGET_TOKEN: getEnvValue('ECOMMERCE_WIDGET_TOKEN'),
        CHAT_WIDGET_URL: getEnvValue('CHAT_WIDGET_URL'),
    },
};

export default nextConfig;
