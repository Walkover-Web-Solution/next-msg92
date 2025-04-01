import dotenv from 'dotenv';
/** @type {import('next').NextConfig} */

const customEnvConfig = dotenv.config().parsed || {};

var getEnvValue = (key) => process.env?.[key] || customEnvConfig?.[key];
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['placehold.co'],
    },
    env: {
        // URLS
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

        // CLIENT IDS
        GOOGLE_CLIENT_ID: getEnvValue('GOOGLE_CLIENT_ID'),
        ZOHO_CLIENT_ID: getEnvValue('ZOHO_CLIENT_ID'),
        GITHUB_CLIENT_ID: getEnvValue('GITHUB_CLIENT_ID'),
        MSAL_CLIENT_ID: getEnvValue('MSAL_CLIENT_ID'),

        //WIDGET CONFIG
        OTP_WIDGET_TOKEN: getEnvValue('OTP_WIDGET_TOKEN'),
        WIDGET_AUTH_TOKEN: getEnvValue('WIDGET_AUTH_TOKEN'),
        WIDGET_SCRIPT: getEnvValue('WIDGET_SCRIPT'),

        //CHATWIDGET CONFIG
        CHAT_WIDGET_TOKEN: getEnvValue('CHAT_WIDGET_TOKEN'),
        CHAT_WIDGET_URL: getEnvValue('CHAT_WIDGET_URL'),
    },
};

Object.assign(nextConfig);

export default nextConfig;
