/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://test.msg91.com',
    GOOGLE_CLIENT_ID: "467164479375-7gh8a9joi6isk7qbfj4tj1p3srqo66m5.apps.googleusercontent.com",
    ZOHO_CLIENT_ID: "1000.TULN05SRMPWS74404W4PL31U0GA46H",
    GITHUB_CLIENT_ID: "6ee6d0268be4aab8c594",
    msalClientId: "164d09e1-531c-427d-9358-9d1347c74170",
    msalTenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    REDIRECT_URL: "http://localhost:9999",
    OTP_WIDGET_TOKEN: "3368786b6e36333136333432",
    WIDGET_AUTH_TOKEN: "278060Tm142IWI2aSL64e6ef96P1",
    WIDGET_SCRIPT:
      "https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js",
  },
};

module.exports = nextConfig;
