/** @type {import('next').NextConfig} */

var customEnvConfig = require('dotenv')?.config()?.parsed || {};

const nextConfig = {
    reactStrictMode: false,
    env: customEnvConfig,

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