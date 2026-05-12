import GoogleLoginButton from '@/components/signupComp/utils/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MdCall, MdEmail, MdCheck } from 'react-icons/md';
import { getQueryParamsDeatils, setCookie, getCookie, loginWithGitHubAccount } from '@/utils/utilis';
import {
    MULTIPLE_ACCOUNTS_MESSAGE,
    handleMobileWidgetFailure,
    isMultipleAccountsError,
    otpWidgetSetup,
    waitForInitSendOTP,
} from '@/utils/otpSigninWidget';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SUCCESS_REDIRECTION_URL = process.env.API_BASE_URL + '/api/nexusRedirection.php?session=:session';
const MOBILE_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/mobileLogin';
const EMAIL_LOGIN_URL = process.env.API_BASE_URL + '/api/v5/nexus/emailLogin';

export default function SignIn() {
    const router = useRouter();
    const [showContactonLogin, setShowContactonLogin] = useState(false);

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
                if (!result?.hasError) {
                    location.href = SUCCESS_REDIRECTION_URL?.replace(':session', sessionId);
                } else if (showError) {
                    const errMsg = result?.errors?.[0] ?? result?.errors;
                    if (isMultipleAccountsError({ message: errMsg, errors: result?.errors })) {
                        toast.error(MULTIPLE_ACCOUNTS_MESSAGE);
                    } else {
                        toast.error(errMsg);
                    }
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const hitOtpCodeLogin = useCallback((code) => {
        const handleLoginResponse = (response, result) => {
            if (!result) return false;
            const sessionId = result?.data?.sessionDetails?.PHPSESSID;
            if (sessionId) {
                setCookie('sessionId', sessionId, 30);
            }
            if (!response.ok || result?.hasError) {
                return false;
            }
            location.href = SUCCESS_REDIRECTION_URL?.replace(':session', sessionId);
            return true;
        };
        const fetchLogin = (url) =>
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            }).then(async (response) => {
                try {
                    return { response, result: await response.json() };
                } catch {
                    return { response, result: null };
                }
            });

        fetchLogin(MOBILE_LOGIN_URL)
            .then(({ response, result }) => {
                if (handleLoginResponse(response, result)) return;
                return fetchLogin(EMAIL_LOGIN_URL);
            })
            .then((second) => {
                if (!second) return;
                const { response: r2, result: res2 } = second;
                if (handleLoginResponse(r2, res2)) return;
                const final = res2;
                const errMsg = final?.errors?.[0] ?? final?.errors;
                if (isMultipleAccountsError({ message: errMsg, errors: final?.errors })) {
                    toast.error(MULTIPLE_ACCOUNTS_MESSAGE);
                } else {
                    toast.error(errMsg ?? 'Login failed');
                }
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        const queryParams = getQueryParamsDeatils(router.asPath);

        if (queryParams?.githublogin === 'true') {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/githubLogin';
            hitLoginAPI(url, {
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
            hitLoginAPI(url, {
                ...request,
                redirectUrl: process.env.REDIRECT_URL + '/signin?loginWithZoho=true',
            });
        } else if (queryParams?.loginWithOutlook?.includes('true')) {
            const url = process.env.API_BASE_URL + '/api/v5/nexus/outlookLogin';
            hitLoginAPI(url, {
                code: queryParams?.code,
                redirectUrl: process.env.REDIRECT_URL + '/outlook-token',
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
    }, [router.isReady, router.asPath, hitLoginAPI]);

    const initLoginWithOTP = useCallback(() => {
        const widgetId = process.env.OTP_WIDGET_TOKEN_LOGIN;
        const configuration = {
            widgetId,
            tokenAuth: process.env.WIDGET_AUTH_TOKEN,

            success: (data) => {
                try {
                    hitOtpCodeLogin(data.message);
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
    }, [hitOtpCodeLogin]);

    const loginWithZoho = () => {
        location.href = `https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.ZOHO_CLIENT_ID}&scope=aaaserver.profile.READ&redirect_uri=${process.env.REDIRECT_URL}/signin?loginWithZoho=true`;
    };

    const loginWithGitHub = () => {
        loginWithGitHubAccount(true);
    };

    const googleLogin = (response) => {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/googleLogin';
        hitLoginAPI(url, { code: response.code, redirectUrl: process.env.REDIRECT_URL });
    };

    const loginWithOutlook = () => {
        location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=${process.env.MSAL_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}/outlook-token&scope=User.Read`;
    };

    const toggleShowContactOnLogin = () => {
        setShowContactonLogin((prev) => !prev);
    };

    return (
        <>
            <section className='signin flex flex-col-reverse md:flex-row'>
                <div className='flex flex-col bg-secondary sm:px-10 px-4 sm:py-20 py-10 gap-8 xl:w-1/4 lg:w-1/3 md:w-1/2 w-full md:min-h-screen'>
                    <div className='md:flex hidden flex-col gap-5'>
                        <Image
                            src={'/assets/brand/msg91.svg'}
                            width={420}
                            height={420}
                            className='w-32'
                            alt='msg91-logo'
                            loading='lazy'
                        />
                        <h1 className='text-2xl font-medium'>Signup to avail a complete suite of MSG91 products</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h2 className='text-xl'>What can you build with MSG91?</h2>
                        <ul className='flex flex-col gap-3'>
                            <li className='flex items-center gap-2'>
                                <MdCheck fontSize={20} className='text-accent' /> Programmable SMS
                            </li>
                            <li className='flex items-center gap-2'>
                                <MdCheck fontSize={20} className='text-accent' /> Customer Contact Center
                            </li>
                            <li className='flex items-center gap-2'>
                                <MdCheck fontSize={20} className='text-accent' /> Virtual Number
                            </li>
                            <li className='flex items-center gap-2'>
                                <MdCheck fontSize={20} className='text-accent' /> Automated user segmentation
                            </li>
                            <li className='flex items-center gap-2'>
                                <MdCheck fontSize={20} className='text-accent' /> OTP Initiate verification
                            </li>
                        </ul>
                    </div>
                    <p className='text-lg'>Trusted by 30000+ startups and enterprises</p>
                </div>

                <div className='lg:px-20 sm:px-10 px-4 sm:py-20 py-10 flex flex-col gap-12 w-full'>
                    <h1 className='text-2xl font-semibold'>Welcome back!</h1>

                    <div className='flex flex-col gap-6 max-w-[600px]'>
                        <div className='flex flex-col gap-3'>
                            <span className='text-base text-gray-700'>Are you a developer?</span>
                            <div className='flex gap-3 flex-wrap'>
                                <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
                                    <GoogleLoginButton googleLoginResponse={googleLogin} />
                                </GoogleOAuthProvider>
                                <button type='button' onClick={() => loginWithOutlook()} className=''>
                                    <img src='/img/microsoft-svg.svg' className='w-6' alt='Microsoft' />
                                </button>
                                <button type='button' onClick={() => loginWithZoho()} className=''>
                                    <img src='/img/icon-zogo.svg' className='w-4' alt='Zoho' />
                                </button>
                                <button type='button' onClick={() => loginWithGitHub()} className=''>
                                    <img src='/img/icon-github.svg' className='w-6' alt='GitHub' />
                                </button>
                            </div>
                        </div>

                        <span className='step-one__break text-base flex items-center gap-3'>
                            or<span className='step-one__break__line'></span>
                        </span>

                        <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
                            <button type='button' className='btn btn-md btn-primary' onClick={() => initLoginWithOTP()}>
                                Login with OTP
                            </button>
                        </div>

                        <p className='text-base'>
                            If you already have an account,{' '}
                            <a href='/signin' className='text-link active-link'>
                                Login
                            </a>
                        </p>

                        <p className='text-base'>
                            Trouble logging in?{' '}
                            <span
                                onClick={toggleShowContactOnLogin}
                                className='text-link active-link cursor-pointer'
                                role='button'
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') toggleShowContactOnLogin();
                                }}
                            >
                                Click here
                            </span>
                        </p>

                        {showContactonLogin && (
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <MdCall />
                                    <a className='text-link active-link' href='/contact-us'>
                                        Talk to an Expert
                                    </a>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <MdEmail />
                                    <a className='text-link active-link cursor-pointer' href='mailto:support@msg91.com'>
                                        support@msg91.com
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
