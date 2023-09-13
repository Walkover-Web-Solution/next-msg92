import GoogleLoginButton from "@/components/signup/googleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { MdCall, MdEmail } from "react-icons/md";
import { getQueryParamsDeatils, setCookie, getCookie } from "@/components/utils";
import { toast } from 'react-toastify';

class logIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInProgress: false,
      showContactonLogin: false,
    };
  }

  componentDidMount() {
    let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
    if (queryParams) {
      if (queryParams?.githublogin === "true") {
        const url = process.env.API_BASE_URL + "/api/v5/nexus/githubLogin";
        this.hitLoginAPI(url, { code: queryParams?.code, state: queryParams?.state, redirectUrl: process.env.REDIRECT_URL });
      }
      if (queryParams?.loginWithZoho?.includes("true")) {
        const request = {...queryParams};
        delete request.loginWithZoho
        const url = process.env.API_BASE_URL + "/api/v5/nexus/zohoLogin";
        this.hitLoginAPI(url, {...request, redirectUrl: process.env.REDIRECT_URL+'/login?loginWithZoho=true' });
      }
      if (queryParams?.loginWithOutlook?.includes('true')) {
          const url = process.env.API_BASE_URL + '/api/v5/nexus/outlookLogin';
          this.hitLoginAPI(url, { code: queryParams?.code, redirectUrl: process.env.REDIRECT_URL+'/outlook-token' });
      }
    } else {
      this.otpWidgetSetup();
    }
    try {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/checkSession';
        this.hitLoginAPI(url, { session: getCookie('sessionId') }, false);
    } catch (error) {
        console.log('No Session Found');
    }
  }

  // Widget Login
  otpWidgetSetup = () => {
    const head = document.getElementsByTagName("head")[0];
    const currentTimestamp = new Date().getTime();
    const otpWidgetScript = document.createElement("script");
    otpWidgetScript.type = "text/javascript";
    otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;
    otpWidgetScript.onload = () => { };
    head.appendChild(otpWidgetScript);
  };

  initOTPWidget() {
    const configuration = {
      widgetId: process.env.OTP_WIDGET_TOKEN,
      tokenAuth: process.env.WIDGET_AUTH_TOKEN,
      success: (data) => {
        // Widget config success response
        try {
          const url = process.env.API_BASE_URL + "/api/v5/nexus/emailLogin";
          this.hitLoginAPI(url, { code: data.message });
        } catch (error) {
          this.loginFailed(error);
        }
      },
    };
    window.initSendOTP(configuration);
  }

  // Zoho Login
  loginWithZoho() {
    location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=aaaserver.profile.READ&redirect_uri=${process.env.REDIRECT_URL}/login?loginWithZoho=true`;
  }

  // Google Login
  googleLogin = (response) => {
    console.log(response);
    if (response) {
      const url = process.env.API_BASE_URL + "/api/v5/nexus/googleLogin";
      this.hitLoginAPI(url, { code: response.code, redirectUrl: process.env.REDIRECT_URL });
    }
  };

   // Outlook Login
   loginWithOutlook() {
    location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=${process.env.MSAL_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}/outlook-token&scope=User.Read`;
  }

  hitLoginAPI(url, payload, showError = true) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        const sessionId = result?.data?.sessionDetails?.PHPSESSID;
        if (sessionId) {
            setCookie('sessionId', sessionId, 30);
        }
        if (!result?.hasError) {
          location.href = process.env.SUCCESS_REDIRECTION_URL?.replace(':session', sessionId)
        } else if (showError){
          toast.error(result?.errors?.[0]);
        }
      });
  }

  loginFailed(error) {
    console.log(error);
  }

  setShowContactonLogin = () => {
    this.setState((prevState) => ({
      showContactonLogin: !prevState.showContactonLogin,
    }));
  };

  render() {
    return (
      <>
        <section className="entry d-flex  ">
          <div className="entry__left_section col-xl-3 col-lg-5 col-md-5">
            <img
              src="/images/msgOriginalsvg.png"
              className="entry__left_section__brand_logo"
            />
            <div className="container">
              <img
                src="/img/tie/login-page-left-section-banner.svg"
                className="entry__left_section__banner pe-4 img-fluid"
              />
            </div>
          </div>
          <div className="entry__right_section col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
            <div className="container entry__right_section__container">
              <div className="d-none mb-5 entry__right_section__container--logo-visible-in-small">
                <img
                  src="/images/msgOriginalsvg.png"
                  width="auto"
                  height="40px"
                  alt="MSG91"
                  className=""
                />
              </div>
              <h1>Welcome back!</h1>
              <div className="entry__right_section__container__entry_with mb-4">
                <span className="d-inline-block mt-3">Login with</span>
                <div
                  className="d-flex align-items-center flex-wrap login-icon-cont mt-3"
                  style={{ gap: "16px" }}
                >
                  <GoogleOAuthProvider
                    clientId={`${process.env.GOOGLE_CLIENT_ID}`}
                  >
                    <GoogleLoginButton googleLoginResponse={this.googleLogin} />
                  </GoogleOAuthProvider>
                  <button
                     style={{
                      border: "1px solid var(--primary-light-theme, #1E75BA)",
                      background: "var(--light-white-bg, #FFF)",
                  }}
                    onClick={() => this.loginWithOutlook()}
                  >
                    <img src="/img/microsoft-svg.svg" />
                  </button>
                  <button
                    style={{ border: "1px solid #D94C44" }}
                    onClick={() => this.loginWithZoho()}
                  >
                    <img src="/img/icon-zogo.svg" />
                  </button>

                  {/* onClick={() => this.loginWithGitHubAccount()} */}
                  <a href="/github-auth?login=true">
                    <button
                      style={{
                        border: "1px solid #000",
                        background: "var(--light-white-bg, #FFF)",
                      }}
                    >
                      <img src="/img/icon-github.svg" />
                    </button>
                  </a>
                </div>
              </div>

              <span className="d-block line_on_right c-fs-6 mb-4">or</span>

              <button
                className="c-col-white entry__right_section__container__entry_button mb-4"
                onClick={() => this.initOTPWidget(true)}
              >
                Login with OTP
              </button>
              <p className="c-fs-6 mb-3">
                Trouble logging in ?{" "}

                <span
                  onClick={
                    this.setShowContactonLogin
                  }
                  className="text_blue cursor-pointer"
                >
                  Click here
                </span>
              </p>
              {/* https://control.msg91.com/signin/ */}
              <div
                className={
                  this.state.showContactonLogin
                    ? "d-flex flex-column gap-2 py-1 mb-3"
                    : "d-none"
                }
              >
                <div className="d-flex gap-2 align-items-center">
                  <MdCall />
                  <p className="c-fs-5">
                    <a className="text_blue c-fs-5" href="/contact-us">
                      Talk to an Expert
                    </a>
                  </p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <MdEmail />
                  <p className="c-fs-5">
                    <a
                      className="text_blue c-fs-5"
                      href="mailto:support@msg91.com"
                    >
                      support@msg91.com
                    </a>
                  </p>
                </div>
              </div>

              <a href="/signup" className="c-fs-6 text_blue pt-4">
                Create new account
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default logIn;
