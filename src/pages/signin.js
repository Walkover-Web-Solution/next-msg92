import GoogleLoginButton from '@/components/signupComp/utils/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { MdCall, MdEmail } from 'react-icons/md';
import { getQueryParamsDeatils, setCookie, getCookie, loginWithGitHubAccount } from '@/utils/utilis';
import { toast } from 'react-toastify';

const SUCCESS_REDIRECTION_URL = process.env.API_BASE_URL + '/api/nexusRedirection.php?session=:session';

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
            const request = {
                ...queryParams,
                accountsServer: decodeURIComponent(queryParams['accounts-server'] || ''),
            };
            delete request.loginWithZoho;
            delete request['accounts-server'];

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
                        location.href = SUCCESS_REDIRECTION_URL?.replace(':session', payload.session);
                    }
                });
        } catch (error) {
            console.log('No Session Found');
        }
    }

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
                try {
                    const url = process.env.API_BASE_URL + '/api/v5/nexus/emailLogin';
                    this.hitLoginAPI(url, { code: data.message });
                } catch (error) {
                    console.log(error);
                }
            },
        };
        window.initSendOTP(configuration);
    }

    loginWithZoho() {
        location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=aaaserver.profile.READ&redirect_uri=${process.env.REDIRECT_URL}/signin?loginWithZoho=true`;
    }

    loginWithGitHub = () => {
        loginWithGitHubAccount(true);
    };

    googleLogin = (response) => {
        if (response) {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/googleLogin';
            this.hitLoginAPI(url, { code: response.code, redirectUrl: process.env.REDIRECT_URL });
        }
    };

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
                    location.href = SUCCESS_REDIRECTION_URL?.replace(':session', sessionId);
                } else if (showError) {
                    toast.error(result?.errors?.[0] ?? result?.errors);
                }
            })
            .catch((err) => console.error(err));
    }

    setShowContactonLogin = () => {
        this.setState((prevState) => ({
            showContactonLogin: !prevState.showContactonLogin,
        }));
    };

    render() {
        return (
            <>
                <section className='min-h-screen flex flex-col md:flex-row-reverse text-gray-700 text-base'>
                    <div className='flex-grow md:flex-grow p-6 md:p-20 md:pt-20'>
                        <div className='max-w-[460px] flex gap-4 flex-col'>
                            <div className='block md:hidden'>
                                <img src='/images/msgOriginalsvg.png' alt='MSG91' className='w-[99.2px]' />
                            </div>
                            <h1 className='text-2xl font-bold heading'>Welcome back!</h1>
                            <div className='grid gap-3'>
                                <span className='text-base text-gray-700'>Login with</span>
                                <div className='flex gap-3 flex-wrap'>
                                    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
                                        <GoogleLoginButton
                                            googleLoginResponse={this.googleLogin}
                                            className='google-login'
                                        />
                                    </GoogleOAuthProvider>
                                    <button
                                        onClick={() => this.loginWithOutlook()}
                                        className='social-btn border border-primary rounded flex justify-center items-center w-10 h-10'
                                    >
                                        <img src='/img/microsoft-svg.svg' className='w-6' />
                                    </button>
                                    <button
                                        onClick={() => this.loginWithZoho()}
                                        className='social-btn zogo-btn border border-alert rounded flex justify-center items-center w-10 h-10'
                                    >
                                        <img src='/img/icon-zogo.svg' className='w-4' />
                                    </button>

                                    <a href={undefined} onClick={() => this.loginWithGitHub()}>
                                        <button className='social-btn git-btn border border-black rounded flex justify-center items-center w-10 h-10'>
                                            <img src='/img/icon-github.svg' className='w-6' />
                                        </button>
                                    </a>
                                </div>
                            </div>

                            <span className='step-one__break text-base flex items-center gap-3'>
                                or<span className='step-one__break__line'></span>
                            </span>

                            <button
                                className='btn btn-dark-o text-base w-fit md:w-fit max-md:w-full'
                                onClick={() => this.initOTPWidget(true)}
                            >
                                Login with OTP
                            </button>
                            <p className=''>
                                Trouble logging in ?{' '}
                                <span
                                    onClick={this.setShowContactonLogin}
                                    className='text-primary cursor-pointer hover:underline'
                                >
                                    Click here
                                </span>
                            </p>
                            <div className={`grid gap-2 ${this.state.showContactonLogin ? 'block' : 'hidden'}`}>
                                <div className='flex items-center gap-2'>
                                    <MdCall />
                                    <a className='text-primary cursor-pointer hover:underline' href='/contact-us'>
                                        Talk to an Expert
                                    </a>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <MdEmail />
                                    <a
                                        className='text-primary cursor-pointer hover:underline'
                                        href='mailto:support@msg91.com'
                                    >
                                        support@msg91.com
                                    </a>
                                </div>
                            </div>

                            <a href='/signup' className='text-primary cursor-pointer hover:underline'>
                                Create new account
                            </a>
                        </div>
                    </div>
                    <div className='hidden md:block relative p-6 md:px-10 md:pt-20 bg-primary-light w-full md:w-[420px] overflow-hidden'>
                        <img src='/images/msgOriginalsvg.png' className='w-[124px]' />
                        <img
                            src='/img/tie/login-page-left-section-banner.svg'
                            className='absolute left-[-1px] top-[156px] w-full'
                        />
                    </div>
                </section>
            </>
        );
    }
}
export default logIn;
