/** @type {import('next').NextConfig} */
module.exports = {
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
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://test.msg91.com',
    GOOGLE_CLIENT_ID: "944172403132-77c4il77pvt6p4hm293gimbhh3av5l7d.apps.googleusercontent.com",
    ZOHO_CLIENT_ID: "1000.XHM7U16ACCWKUUZBTESH8DVM8AKSWT",
    GITHUB_CLIENT_ID: "b7432f8d5a708e33b3b0",
    MSAL_CLIENT_ID: '164d09e1-531c-427d-9358-9d1347c74170',
    MSAL_TENANT_ID: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    // REDIRECT_URL: "http://localhost:9999",
    REDIRECT_URL: "https://web.msg91.com",
    OTP_WIDGET_TOKEN: "336843706257323937383634",
    WIDGET_AUTH_TOKEN: "278060T5b78OzKKr964edc975P1",
    WIDGET_SCRIPT:
      "https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js",
    SUCCESS_REDIRECTION_URL: 'https://test.msg91.com/hello-new/',
  },
};

module.exports = nextConfig;
