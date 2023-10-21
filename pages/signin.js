import GoogleLoginButton from '@/components/signup/googleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { MdCall, MdEmail } from 'react-icons/md';
import { getQueryParamsDeatils, setCookie, getCookie } from '@/components/utils';
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

        if (queryParams?.githublogin === 'true') {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/githubLogin';
            this.hitLoginAPI(url, {
                code: queryParams?.code,
                state: queryParams?.state,
                redirectUrl: process.env.REDIRECT_URL,
            });
        } else if (queryParams?.loginWithZoho?.includes('true')) {
            const request = { ...queryParams };
            delete request.loginWithZoho;
            const url = process.env.API_BASE_URL + '/api/v5/nexus/zohoLogin';
            this.hitLoginAPI(url, {
                ...request,
                redirectUrl: process.env.REDIRECT_URL + '/signin?loginWithZoho=true',
            });
        } else if (queryParams?.loginWithOutlook?.includes('true')) {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/outlookLogin';
            this.hitLoginAPI(url, {
                code: queryParams?.code,
                redirectUrl: process.env.REDIRECT_URL + '/outlook-token',
            });
        } else {
            this.otpWidgetSetup();
        }
        try {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/checkSession';
            const payload = { session: getCookie('sessionId') };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            };
            fetch(url, requestOptions)
                .then((response) => response?.json())
                .then((result) => {
                    if (result?.status === 'success') {
                        location.href = process.env.SUCCESS_REDIRECTION_URL?.replace(':session', payload.session);
                    }
                });
        } catch (error) {
            console.log('No Session Found');
        }
    }

    // Widget Login
    otpWidgetSetup = () => {
        const head = document.getElementsByTagName('head')[0];
        const currentTimestamp = new Date().getTime();
        const otpWidgetScript = document.createElement('script');
        otpWidgetScript.type = 'text/javascript';
        otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;
        otpWidgetScript.onload = () => {};
        head.appendChild(otpWidgetScript);
    };

    initOTPWidget() {
        const configuration = {
            widgetId: process.env.OTP_WIDGET_TOKEN,
            tokenAuth: process.env.WIDGET_AUTH_TOKEN,
            hideMethod: 'mobile',
            success: (data) => {
                // Widget config success response
                try {
                    const url = process.env.API_BASE_URL + '/api/v5/nexus/emailLogin';
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
        location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=aaaserver.profile.READ&redirect_uri=${process.env.REDIRECT_URL}/signin?loginWithZoho=true`;
    }

    // Google Login
    googleLogin = (response) => {
        console.log(response);
        if (response) {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/googleLogin';
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
            body: JSON.stringify(payload),
        };
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const sessionId = result?.data?.sessionDetails?.PHPSESSID;
                if (sessionId) {
                    setCookie('sessionId', sessionId, 30);
                }
                if (!result?.hasError) {
                    location.href = process.env.SUCCESS_REDIRECTION_URL?.replace(':session', sessionId);
                } else if (showError) {
                    toast.error(result?.errors?.[0] ?? result?.errors);
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
                <section className="signin d-flex flex-column flex-md-row-reverse c-text c-fs-7">
                    <div className="signin__right  ">
                        <div className="sigin__wrapper  d-flex gap-4 flex-column ">
                            <div className="signin__right__logo d-block d-md-none">
                                <img src="/images/msgOriginalsvg.png" alt="MSG91" className="w-100" />
                            </div>
                            <h1 className="signin__right__title c-fs-2 heading">Welcome back!</h1>
                            <div className="signin__right__dev devlogin d-grid gap-3">
                                <span className="devlogin__title c-fs-7 c-text">Login with</span>
                                <div className="devlogin__btn d-flex gap-3 flex-wrap">
                                    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
                                        <GoogleLoginButton
                                            googleLoginResponse={this.googleLogin}
                                            className="devlogin__btn__google"
                                        />
                                    </GoogleOAuthProvider>
                                    <button
                                        onClick={() => this.loginWithOutlook()}
                                        className="devlogin__btn__btn btn rounded social-btn d-flex justify-content-center align-items-center"
                                    >
                                        <img src="/img/microsoft-svg.svg" />
                                    </button>
                                    <button
                                        onClick={() => this.loginWithZoho()}
                                        className="devlogin__btn__btn btn rounded zogo-btn social-btn d-flex justify-content-center align-items-center"
                                    >
                                        <img src="/img/icon-zogo.svg" />
                                    </button>

                                    {/* onClick={() => this.loginWithGitHubAccount()} */}
                                    <a href="/github-auth?login=true">
                                        <button className="devlogin__btn__btn btn rounded git-btn social-btn d-flex justify-content-center align-items-center">
                                            <img src="/img/icon-github.svg" />
                                        </button>
                                    </a>
                                </div>
                            </div>

                            <span className="step-one__break c-fs-7 d-flex align-items-center gap-3">
                                or<span className="step-one__break__line"></span>
                            </span>

                            <button
                                className="signin__right__login btn btn-login-prime c-fs-7"
                                onClick={() => this.initOTPWidget(true)}
                            >
                                Login with OTP
                            </button>
                            <p className="">
                                Trouble logging in ?{' '}
                                <span onClick={this.setShowContactonLogin} className="text-link text-hover-underline">
                                    Click here
                                </span>
                            </p>
                            {/* https://control.msg91.com/signin/ */}
                            <div className={`d-grid gap-2 ${this.state.showContactonLogin ? 'd-block' : 'd-none'}`}>
                                <div className="d-flex align-items-center gap-2">
                                    <MdCall />
                                    <a className="text-link text-hover-underline" href="/contact-us">
                                        Talk to an Expert
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <MdEmail />
                                    <a className="text-link text-hover-underline" href="mailto:support@msg91.com">
                                        support@msg91.com
                                    </a>
                                </div>
                            </div>

                            <a href="/signup" className="text-link text-hover-underline">
                                Create new account
                            </a>
                        </div>
                    </div>
                    <div className="signin__left d-none d-md-block">
                        <img src="/images/msgOriginalsvg.png" className="signin__left__logo" />
                        <img src="/img/tie/login-page-left-section-banner.svg" className="signin__left__img w-100" />
                    </div>
                </section>
            </>
        );
    }
}
export default logIn;
