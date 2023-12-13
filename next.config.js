/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        // URLS
        API_BASE_URL: 'https://control.msg91.com',
        REDIRECT_URL: 'https://msg91.com',
        SUCCESS_REDIRECTION_URL: 'https://control.msg91.com/api/nexusRedirection.php?session=:session',

        // CLIENT IDS 
        GOOGLE_CLIENT_ID: '944172403132-77c4il77pvt6p4hm293gimbhh3av5l7d.apps.googleusercontent.com',
        ZOHO_CLIENT_ID: '1000.3Z50ZGWPHHPV04474N57J7EZHVJCBH',
        GITHUB_CLIENT_ID: '9a9249259e5a41d58af0',
        MSAL_CLIENT_ID: '2a40ac9c-22ee-45a9-ab5b-e9af860a4cde',

        // WIDGET CONFIG
        OTP_WIDGET_TOKEN: '336c676d7537343338383336',
        WIDGET_AUTH_TOKEN: '125TtMrV40q6Sq6576e46fP1',
        WIDGET_SCRIPT: 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js',
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
