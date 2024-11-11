/** @type {import('next').NextConfig} */

var customEnvConfig = require("dotenv")?.config()?.parsed || {};

var getEnvValue = (key) => process.env?.[key] || customEnvConfig?.[key];

const nextConfig = {
    reactStrictMode: false,
    env: {
        // URLS
        API_BASE_URL: getEnvValue("API_BASE_URL"),
        REDIRECT_URL: getEnvValue("REDIRECT_URL"),
        PRICING_URL: getEnvValue("PRICING_URL"),
        SUBSCRIPTION_PRICING_URL: getEnvValue("SUBSCRIPTION_PRICING_URL"),
        HELLO_TEST_URL: getEnvValue("HELLO_TEST_URL"),
        CHATBOT_TEMPLATE_TEST_URL: getEnvValue("CHATBOT_TEMPLATE_TEST_URL"),

        // CLIENT IDS
        GOOGLE_CLIENT_ID: getEnvValue("GOOGLE_CLIENT_ID"),
        ZOHO_CLIENT_ID: getEnvValue("ZOHO_CLIENT_ID"),
        GITHUB_CLIENT_ID: getEnvValue("GITHUB_CLIENT_ID"),
        MSAL_CLIENT_ID: getEnvValue("MSAL_CLIENT_ID"),

        //WIDGET CONFIG
        OTP_WIDGET_TOKEN: getEnvValue("OTP_WIDGET_TOKEN"),
        WIDGET_AUTH_TOKEN: getEnvValue("WIDGET_AUTH_TOKEN"),
        WIDGET_SCRIPT: getEnvValue("WIDGET_SCRIPT"),

        //INTEGRATIONS CONFIG
        AIRTABLE_API_KEY: getEnvValue("AIRTABLE_API_KEY"),
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
