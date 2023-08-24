/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_BASE_URL: 'https://test.msg91.com',
    firebaseConfig: {
      apiKey: "AIzaSyCxRjom_yz_suroteRqwqBk91HPqgh4Z3c",
      authDomain: "admin-panel-test-b5a7e.firebaseapp.com",
      projectId: "admin-panel-test-b5a7e",
      storageBucket: "admin-panel-test-b5a7e.appspot.com",
      messagingSenderId: "970692014254",
      appId: "1:970692014254:web:a50174f6d1d939533f7d3f",
    },
    zohoClientId: "1000.ZD8TKFCPWAYEIX1IM4FJ8F9LRMNYEB",
    githubClientId: "b7432f8d5a708e33b3b0",
    msalClientId: "164d09e1-531c-427d-9358-9d1347c74170",
    msalTenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    redirectURL: "http://localhost:9999",
    OTPWidgetToken: "3368786b6e36333136333432",
    widgetAuthToken: "278060Tm142IWI2aSL64e6ef96P1",
    widgetscript:
      "https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js",
  },
};

module.exports = nextConfig;
