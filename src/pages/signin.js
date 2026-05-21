import GoogleLoginButton from '@/components/signupComp/utils/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdHelpOutline } from 'react-icons/md';
import { getQueryParamsDeatils, setCookie, getCookie, loginWithGitHubAccount } from '@/utils/utilis';
import {
    getErrorMessage,
    handleMobileWidgetFailure,
    otpWidgetSetup,
    waitForInitSendOTP,
} from '@/utils/otpSigninWidget';
import { toast } from 'react-toastify';
import Image from 'next/image';
const SUCCESS_REDIRECTION_URL = process.env.API_BASE_URL + '/api/nexusRedirection.php?session=:session';
const MOBILE_EMAIL_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/mobileEmailLogin';
const GOOGLE_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/googleLogin';
const GITHUB_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/githubLogin';
const ZOHO_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/zohoLogin';
const OUTLOOK_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/outlookLogin';
const ZOHO_SIGNIN_REDIRECT_URL = `${process.env.REDIRECT_URL}/signin?loginWithZoho=true`;
const OUTLOOK_SIGNIN_REDIRECT_URL = `${process.env.REDIRECT_URL}/outlook-token`;

export default function SignIn() {
    const router = useRouter();
    const hitLoginAPI = useCallback((url, payload, showError = true) => {
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
                if (!result?.hasError && sessionId) {
                    location.href = SUCCESS_REDIRECTION_URL?.replace(':session', sessionId);
                } else if (showError) {
                    toast.error(getErrorMessage(result?.errors));
                }
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        const queryParams = getQueryParamsDeatils(router.asPath);

        if (queryParams?.githublogin === 'true') {
            hitLoginAPI(GITHUB_LOGIN_URL, {
                code: queryParams?.code,
                state: queryParams?.state,
            });
        } else if (queryParams?.loginWithZoho?.includes('true')) {
            const accountsServer = queryParams['accounts-server']
                ? decodeURIComponent(queryParams['accounts-server'])
                : '';
            const zohoPayload = {
                code: queryParams?.code,
                location: queryParams?.location,
                redirectUrl: ZOHO_SIGNIN_REDIRECT_URL,
            };
            if (accountsServer) {
                zohoPayload.accountsServer = accountsServer;
            }
            hitLoginAPI(ZOHO_LOGIN_URL, zohoPayload);
        } else if (queryParams?.loginWithOutlook?.includes('true')) {
            hitLoginAPI(OUTLOOK_LOGIN_URL, {
                code: queryParams?.code,
                redirectUrl: OUTLOOK_SIGNIN_REDIRECT_URL,
            });
        } else {
            otpWidgetSetup();
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
    }, [router.isReady, hitLoginAPI]);

    const initLoginWithOTP = useCallback(() => {
        const widgetId = process.env.OTP_WIDGET_TOKEN_LOGIN;
        const configuration = {
            widgetId,
            tokenAuth: process.env.WIDGET_AUTH_TOKEN,
            success: (data) => {
                try {
                    hitLoginAPI(MOBILE_EMAIL_LOGIN_URL, { code: data.message });
                } catch (error) {
                    console.log(error);
                }
            },
            failure: handleMobileWidgetFailure,
        };
        waitForInitSendOTP()
            .then(() => window.initSendOTP(configuration))
            .catch((err) => {
                console.error(err);
                toast.error('Verification widget failed to load. Please refresh and try again.');
            });
    }, [hitLoginAPI]);

    const loginWithZoho = () => {
        location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=aaaserver.profile.READ&redirect_uri=${encodeURIComponent(ZOHO_SIGNIN_REDIRECT_URL)}`;
    };

    const loginWithGitHub = () => {
        loginWithGitHubAccount(true);
    };

    const handleGoogleError = useCallback((error) => {
        console.error('Google sign-in failed:', error);
        toast.error('Google sign-in failed. Please try again.');
    }, []);

    const googleLogin = useCallback(
        (response, redirectUri) => {
            if (!response?.code) {
                console.error('Google sign-in: no auth code in response', response);
                toast.error('Google sign-in did not return a code. Please try again.');
                return;
            }
            const redirectUrl =
                redirectUri ?? (typeof window !== 'undefined' ? window.location.origin : process.env.REDIRECT_URL);
            hitLoginAPI(GOOGLE_LOGIN_URL, { code: response.code, redirectUrl });
        },
        [hitLoginAPI]
    );

    const loginWithOutlook = () => {
        location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=${process.env.MSAL_CLIENT_ID}&redirect_uri=${encodeURIComponent(OUTLOOK_SIGNIN_REDIRECT_URL)}&scope=User.Read`;
    };

    return (
        <>
            <section className='signin flex flex-col-reverse md:flex-row md:items-start'>
                <div className='flex w-full flex-col gap-8 bg-secondary px-2 py-10 sm:px-10 sm:py-16 md:min-h-screen md:w-1/2 md:py-20 lg:w-1/3 xl:w-1/4'>
                    <div className='flex flex-col gap-6'>
                        <Image
                            src={'/assets/brand/msg91.svg'}
                            width={420}
                            height={420}
                            className='hidden h-auto w-32 shrink-0 md:block'
                            alt='msg91-logo'
                            loading='lazy'
                        />
                        <h1 className='hidden text-2xl font-medium md:block'>
                            Signin to avail a complete suite of MSG91 products
                        </h1>
                        <ul className='list-disc space-y-3 pl-1 text-sm marker:text-accent'>
                            <li>Engage users across SMS, WhatsApp, Email, Voice & RCS</li>
                            <li>Automate journeys with Campaign & Segmento</li>
                            <li>AI-powered support with Hello Ticketing</li>
                            <li>Personalize communication using real-time segmentation</li>
                            <li>Increase retention, engagement & revenue from one platform</li>
                            <li>APIs built for scale, reliability & speed</li>
                        </ul>
                        <p className='m-0 text-lg'>Trusted by 30000+ startups and enterprises</p>
                    </div>
                </div>

                <div className='flex w-full flex-col px-4 py-14 sm:px-10 sm:py-16 md:py-24 lg:px-22'>
                    <div className='mx-auto flex w-full max-w-[480px] flex-col gap-10 md:mx-0'>
                        <header className='flex flex-col gap-2'>
                            <h1 className='m-0 text-3xl font-bold leading-none tracking-tight text-primary'>Login</h1>
                            <p className='text-base text-slate-500'>Continue to your MSG91 workspace.</p>
                        </header>

                        <section className='flex flex-col gap-4' aria-labelledby='signin-developer-sso-heading'>
                            <div className='flex w-full items-center gap-3'>
                                <h2
                                    id='signin-developer-sso-heading'
                                    className='shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
                                >
                                    Developer SSO
                                </h2>
                                <span className='h-px flex-1 bg-slate-200' aria-hidden />
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                <div className='flex h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-white transition hover:bg-slate-50'>
                                    <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
                                        <GoogleLoginButton
                                            googleLoginResponse={googleLogin}
                                            onGoogleError={handleGoogleError}
                                        />
                                    </GoogleOAuthProvider>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => loginWithOutlook()}
                                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white transition hover:bg-slate-50'
                                    aria-label='Sign in with Microsoft'
                                >
                                    <img src='/img/microsoft-svg.svg' className='h-6 w-6' alt='' />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => loginWithZoho()}
                                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white transition hover:bg-slate-50'
                                    aria-label='Sign in with Zoho'
                                >
                                    <img src='/img/icon-zogo.svg' className='h-5 w-5' alt='' />
                                </button>
                                <button
                                    type='button'
                                    onClick={() => loginWithGitHub()}
                                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white transition hover:bg-slate-50'
                                    aria-label='Sign in with GitHub'
                                >
                                    <img src='/img/icon-github.svg' className='h-6 w-6' alt='' />
                                </button>
                            </div>
                        </section>

                        <section className='flex flex-col gap-4' aria-labelledby='signin-direct-credentials-heading'>
                            <div className='flex w-full items-center gap-3'>
                                <h2
                                    id='signin-direct-credentials-heading'
                                    className='shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'
                                >
                                    Direct credentials
                                </h2>
                                <span className='h-px flex-1 bg-slate-200' aria-hidden />
                            </div>
                            <button
                                type='button'
                                className='w-1/2 rounded-lg border border-primary bg-primary px-4 py-3 text-center text-base font-medium text-white transition hover:opacity-90'
                                onClick={() => initLoginWithOTP()}
                            >
                                Login with OTP
                            </button>
                        </section>

                        <footer className='flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between'>
                            <p className='text-sm text-slate-600'>
                                Need an account?{' '}
                                <a href='/signup' className='font-medium text-link active-link'>
                                    Sign up
                                </a>
                            </p>
                            <a
                                href='/contact-us'
                                className='inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 transition hover:text-slate-600'
                            >
                                <MdHelpOutline className='text-lg' aria-hidden />
                                Support
                            </a>
                        </footer>
                    </div>
                </div>
            </section>
        </>
    );
}
