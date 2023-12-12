/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: false,
    env: {
        // URLS
        API_BASE_URL: process.env.API_BASE_URL,
        REDIRECT_URL: process.env.REDIRECT_URL,

        // CLIENT IDS 
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        MSAL_CLIENT_ID: process.env.MSAL_CLIENT_ID,

        //WIDGET CONFIG
        OTP_WIDGET_TOKEN: process.env.OTP_WIDGET_TOKEN,
        WIDGET_AUTH_TOKEN: process.env.WIDGET_AUTH_TOKEN,
        WIDGET_SCRIPT: process.env.WIDGET_SCRIPT,
    },

    // Can be safely removed in newer versions of Next.js
    webpack(config) {
        config.resolve.fallback = {
            // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped.
            ...config.resolve.fallback,

            fs: false, // the solution
        };

        return config;
    },
};

module.exports = nextConfig;
