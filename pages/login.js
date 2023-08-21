import React from "react";
import { GoogleLogin } from "react-google-login";

class logIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginInProgress: false
        };
    }

    componentDidMount() {
        this.otpWidgetSetup();
    }

    // Widget Login
    otpWidgetSetup = () => {
        const head = document.getElementsByTagName("head")[0];
        const currentTimestamp = new Date().getTime();
        const otpWidgetScript = document.createElement("script");
        otpWidgetScript.type = "text/javascript";
        console.log(process.env.widgetscript, process.env.OTPWidgetToken);
        otpWidgetScript.src = `${process.env.widgetscript}?v=${currentTimestamp}`;
        otpWidgetScript.onload = () => {
            console.log("loaded");
        };
        head.appendChild(otpWidgetScript);
    };

    initOTPWidget() {
        const configuration = {
            widgetId: process.env.OTPWidgetToken,
            tokenAuth: process.env.widgetAuthToken,
            success: (data) => {
                // Widget config success response
                try {
                    const url = process.env.API_BASE_URL + "/api/v5/nexus/emailLogin";
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code: data.message })
                    };
                    fetch(url, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            this.loginCompleted()
                        });
                } catch (error) {
                    loginFailed(error);
                }
            },
            failure: (error) => {
                // Widget config failure response
                loginFailed(error);
            },
        };
        window.initSendOTP(configuration);
    }

    // Zoho Login
    loginWithZoho() {
        location.href = `https://accounts.zoho.com/oauth/v2/auth?client_id=${process.env.zohoClientId
            }&response_type=token&scope=AaaServer.profile.Read&redirect_uri=${process.env.redirectURL}/login?loginWithZoho=true`;
    }

    // Github Login
    loginWithGitHubAccount() {
        location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.githubClientId}&allow_signup=true&scope=user&redirect_uri=${process.env.redirectURL}/login?github=true`;
    }

    // Google Login
    responseGoogleSuccess = (response) => {
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        console.log(response);
        this.setState({ userInfo, isLoggedIn: true });
    };

    responseGoogleError = (response) => {
        console.log(response);
    };

    loginCompleted() {
        location.href = process.env.API_BASE_URL + '/hello-new/'
    }

    loginFailed(error) {
        console.log(error);
    }

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
                                <span className="d-inline-block mt-3 p-2 mb-3">Login with</span>

                                <div
                                    className="d-flex align-items-center flex-wrap login-icon-cont"
                                    style={{ gap: "16px" }}
                                >
                                    <GoogleLogin
                                        className="entry__right_section__container__entry_with--btn-with-text"
                                        style={{
                                            border: "1px solid var(--primary-light-theme, #1E75BA)",
                                        }}
                                        clientId="6ee6d0268be4aab8c594"
                                        buttonText="Google"
                                        onSuccess={this.responseGoogleSuccess}
                                        onFailure={this.responseGoogleError}
                                        isSignedIn={true}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                    {/* <button
                                        className="entry__right_section__container__entry_with--btn-with-text"
                                        style={{
                                            border: "1px solid var(--primary-light-theme, #1E75BA)",
                                        }}
                                    >
                                        <img src="/img/tie/google-logo.svg" alt="Google Icon" />
                                        <span>Google</span>
                                    </button> */}
                                    <button
                                        style={{
                                            border: "1px solid var(--primary-light-theme, #1E75BA)",
                                            background: "var(--light-white-bg, #FFF)",
                                        }}
                                    >
                                        <img src="/img/microsoft-svg.svg" />
                                    </button>
                                    <button style={{ border: "1px solid #D94C44" }} onClick={() => this.loginWithZoho()}>
                                        <img src="/img/icon-zogo.svg" />
                                    </button>
                                    <button
                                        style={{
                                            border: "1px solid #000",
                                            background: "var(--light-white-bg, #FFF)",
                                        }}
                                        onClick={() => this.loginWithGitHubAccount()}
                                    >
                                        <img src="/img/icon-github.svg" />
                                    </button>

                                    {/* <button
                                        style={{
                                            border: "1px solid #E24329",
                                            background: "var(--light-white-bg, #FFF)",
                                        }}
                                    >
                                        <img src="/img/icon-gitlab.svg" />
                                    </button> */}

                                    {/* <button
                                        style={{
                                            border: "1px solid #2684FF",
                                            background: "var(--light-white-bg, #FFF)",
                                        }}
                                    >
                                        <img src="/img/icon-group.svg" />
                                    </button> */}
                                </div>
                            </div>

                            <span className="d-block line_on_right c-fs-6 mb-4">or</span>

                            <button className="c-col-white entry__right_section__container__entry_button mb-4" onClick={() => this.initOTPWidget()}>
                                Login with OTP
                            </button>

                            <p className="c-fs-6 mb-4">
                                Trouble logging in ?{" "}
                                <a href="#" className="text_blue">
                                    Click here
                                </a>

                                {/* https://control.msg91.com/signin/ */}
                            </p>
                            <a href="/signup" className="c-fs-6 text_blue">
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
