import Image from 'next/image';
import {
    useSignup,
    sendOtp,
    retryOtp,
    verifyOtp,
    handleGithubSignup,
    validateEmailSignup,
    validateSignUp,
    resetEmailOtp,
    resetPhoneOtp,
    setDetails,
} from '../SignupUtils';
import { getAvailableOtpMethods } from '../SignupUtils/otpUtils';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { fetchCountries, autoPopulateFromIP } from '../SignupUtils/apiUtils';
import { appendMsg91QueryToUrl } from '../SignupUtils/cookieUtils';
import GmailWarningModal from '@/components/signupComp/utils/GmailWarningModal';
import EmailPhoneVerify from './EmailPhoneVerify';

function getGoogleOAuthRedirectUri() {
    return typeof window !== 'undefined' ? window.location.origin : process.env.REDIRECT_URL;
}

export default function StepOne() {
    const { state, dispatch } = useSignup();
    const [email, setEmail] = useState(state.emailIdentifier || '');
    const [phone, setPhone] = useState(state.mobileIdentifier || '');
    const [phoneCountry, setPhoneCountry] = useState(null);
    const [showGmailModal, setShowGmailModal] = useState(false);
    const [pendingEmail, setPendingEmail] = useState(null);
    const [pendingOtpFor, setPendingOtpFor] = useState(null);
    const emailInputRef = useRef(null);
    const emailOtpInputRef = useRef(null);
    const phoneOtpInputRef = useRef(null);
    const geoInitRef = useRef(false);

    const otpLength = state.widgetData?.otpLength || 6;
    const isLoading = state.isLoading;
    const emailVerified = state.emailVerified;
    const mobileOtpVerified = state.mobileOtpVerified;
    const signupByGitHub = state.signupByGitHub;
    const signupByGoogle = state.signupByGoogle;
    const countries = state.countries;
    const emailOtpPending = !emailVerified && !!state.emailRequestId;
    const phoneOtpPending = !mobileOtpVerified && !!state.mobileRequestId;

    const emailSecondaryChannels = state?.allowedRetry?.email?.secondary;
    const mobileSecondaryChannels = useMemo(
        () => getAvailableOtpMethods(state?.allowedRetry?.mobile?.secondary, phoneCountry),
        [state?.allowedRetry?.mobile?.secondary, phoneCountry]
    );

    const loginUrl = useMemo(() => appendMsg91QueryToUrl('/login'), []);

    useEffect(() => {
        const initializeCountriesAndAutoPopulate = async () => {
            if (state.geoAutoPopulated) return;
            if (geoInitRef.current) return;

            if (!countries) {
                geoInitRef.current = true;
                try {
                    const countriesData = await fetchCountries(dispatch);
                    if (countriesData?.length > 0) {
                        await autoPopulateFromIP(dispatch, countriesData, state.ipData);
                        dispatch({ type: 'SET_GEO_AUTO_POPULATED', payload: true });
                    }
                } finally {
                    geoInitRef.current = false;
                }
                return;
            }

            if (!state.ipData && !state.selectedCountry) {
                geoInitRef.current = true;
                try {
                    await autoPopulateFromIP(dispatch, countries, state.ipData);
                    dispatch({ type: 'SET_GEO_AUTO_POPULATED', payload: true });
                } finally {
                    geoInitRef.current = false;
                }
            }
        };

        initializeCountriesAndAutoPopulate();
    }, [countries, dispatch, state.geoAutoPopulated, state.ipData, state.selectedCountry]);

    useEffect(() => {
        if (!emailOtpPending && !emailVerified && emailInputRef.current) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 100);
        }
    }, [emailOtpPending, emailVerified]);

    useEffect(() => {
        if (!isLoading) setPendingOtpFor(null);
    }, [isLoading]);

    const handleGoogleResponse = useCallback(
        (response, redirectUri) => {
            if (!response?.code) {
                dispatch({ type: 'SET_ERROR', payload: 'Google sign-in did not return a code. Please try again.' });
                return;
            }
            dispatch({
                type: 'SET_GOOGLE_EMAIL_VERIFIED',
                payload: {
                    code: response.code,
                    redirectUrl: redirectUri,
                },
            });
        },
        [dispatch]
    );

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => handleGoogleResponse(tokenResponse, getGoogleOAuthRedirectUri()),
        onError: () => dispatch({ type: 'SET_ERROR', payload: 'Google sign-in failed. Please try again.' }),
        onNonOAuthError: () => dispatch({ type: 'SET_ERROR', payload: 'Google sign-in failed. Please try again.' }),
        flow: 'auth-code',
        ux_mode: 'popup',
        redirect_uri: getGoogleOAuthRedirectUri(),
        access_type: 'offline',
    });

    const handleSendEmailOtp = () => {
        if (!email?.trim()) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter email' });
            return;
        }
        const trimmed = email.trim();
        if (/^[^@]+@gmail\.com$/i.test(trimmed)) {
            setPendingEmail(trimmed);
            setShowGmailModal(true);
            return;
        }
        setPendingOtpFor('email');
        sendOtp(trimmed, false, dispatch);
    };

    const handleGmailModalUpdate = () => {
        setShowGmailModal(false);
        setPendingEmail(null);
        setTimeout(() => emailInputRef.current?.focus(), 50);
    };

    const handleGmailModalContinue = () => {
        const toSend = pendingEmail ?? email.trim();
        setShowGmailModal(false);
        setPendingEmail(null);
        setPendingOtpFor('email');
        sendOtp(toSend, false, dispatch);
    };

    const handleVerifyEmailOtp = (otpValue) => {
        setPendingOtpFor('email');
        validateEmailSignup(otpValue, dispatch, state);
    };

    const handleEditEmail = () => {
        resetEmailOtp(dispatch);
    };

    const handleEditVerifiedEmail = () => {
        dispatch({ type: 'SET_EMAIL_EDIT_FROM_VERIFIED' });
    };

    const handleResendEmailOtp = () => {
        const requestId = state.emailRequestId;
        if (!requestId) {
            dispatch({ type: 'SET_ERROR', payload: 'No email request ID found. Please send OTP again.' });
            return;
        }
        setPendingOtpFor('email');
        retryOtp(emailSecondaryChannels?.[0]?.channel, requestId, dispatch);
    };

    const handleSendPhoneOtp = () => {
        const phoneNumber = phone?.trim();
        if (!phoneNumber) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter a phone number' });
            return;
        }
        setPendingOtpFor('mobile');
        sendOtp(phoneNumber, true, dispatch);
    };

    const handleResendPhoneWithChannel = (channel) => {
        const requestId = state.mobileRequestId;
        if (!requestId) {
            dispatch({ type: 'SET_ERROR', payload: 'No phone request ID found. Please send OTP again.' });
            return;
        }
        setPendingOtpFor('mobile');
        retryOtp(channel, requestId, dispatch);
    };

    const handleVerifyPhoneOtp = (otpValue) => {
        const requestId = state.mobileRequestId;
        if (!requestId) {
            dispatch({ type: 'SET_ERROR', payload: 'No phone request ID found. Please resend OTP.' });
            return;
        }
        setPendingOtpFor('mobile');
        verifyOtp(
            otpValue,
            requestId,
            true,
            dispatch,
            state,
            () => {},
            () => {}
        );
    };

    const handleEditPhone = () => {
        resetPhoneOtp(dispatch);
    };

    const handleEditVerifiedPhone = () => {
        dispatch({ type: 'SET_PHONE_EDIT_FROM_VERIFIED' });
    };

    const handlePhoneBlur = () => {
        if (phone?.trim()) {
            setDetails('phone', dispatch, phone);
        }
    };

    const handleResendPhoneOtp = () => {
        handleResendPhoneWithChannel(mobileSecondaryChannels?.[0]?.channel);
    };

    const socialIcons = [
        {
            id: 'google',
            name: 'Gmail',
            icon: '/img/google.svg',
        },
        {
            id: 'github',
            name: 'Github',
            icon: '/assets/icons/extras/github.svg',
        },
    ];

    const handleSocialSignup = (id) => {
        if (id === 'github') {
            handleGithubSignup();
        } else if (id === 'google') {
            googleLogin();
        }
    };

    const canContinue = emailVerified && mobileOtpVerified;
    const emailLoading = isLoading && pendingOtpFor === 'email';
    const phoneLoading = isLoading && pendingOtpFor === 'mobile';

    const handleContinue = () => {
        if (!canContinue) return;
        if (state.session) {
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 });
            return;
        }
        validateSignUp(dispatch, state);
    };

    const verifiedEmailLabel = signupByGitHub ? 'Verified via GitHub' : signupByGoogle ? 'Verified via Gmail' : email;

    return (
        <div className='cont cont_gap w-full max-w-[500px]'>
            {showGmailModal && (
                <GmailWarningModal
                    email={pendingEmail}
                    onUpdate={handleGmailModalUpdate}
                    onContinue={handleGmailModalContinue}
                />
            )}
            <Image
                width={160}
                height={80}
                className='w-fit h-10 sm:h-12'
                src={'/assets/brand/msg91.svg'}
                alt='MSG91 Logo'
            />
            <div className='cont gap-1'>
                <h1 className='text-xl sm:text-2xl text-primary'>Create an Account</h1>

                <p className='text-sm text-gray-500'>
                    Already have an account?{' '}
                    <a className='text-link active-link' href={loginUrl}>
                        Login
                    </a>
                </p>
                <p className='text-sm text-gray-500'>
                    Verify your email and mobile to secure and activate your account
                </p>
            </div>

            <EmailPhoneVerify
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                setPhoneCountry={setPhoneCountry}
                emailInputRef={emailInputRef}
                emailOtpInputRef={emailOtpInputRef}
                phoneOtpInputRef={phoneOtpInputRef}
                otpLength={otpLength}
                emailVerified={emailVerified}
                mobileOtpVerified={mobileOtpVerified}
                emailOtpPending={emailOtpPending}
                phoneOtpPending={phoneOtpPending}
                emailLoading={emailLoading}
                phoneLoading={phoneLoading}
                loadingType={state.loadingType}
                pendingOtpFor={pendingOtpFor}
                emailIdentifier={state.emailIdentifier}
                mobileIdentifier={state.mobileIdentifier}
                verifiedEmailLabel={verifiedEmailLabel}
                selectedCountry={state.selectedCountry}
                emailSecondaryChannels={emailSecondaryChannels}
                mobileSecondaryChannels={mobileSecondaryChannels}
                handleSendEmailOtp={handleSendEmailOtp}
                handleVerifyEmailOtp={handleVerifyEmailOtp}
                handleEditEmail={handleEditEmail}
                handleEditVerifiedEmail={handleEditVerifiedEmail}
                handleResendEmailOtp={handleResendEmailOtp}
                handleSendPhoneOtp={handleSendPhoneOtp}
                handleVerifyPhoneOtp={handleVerifyPhoneOtp}
                handleEditPhone={handleEditPhone}
                handleEditVerifiedPhone={handleEditVerifiedPhone}
                handleResendPhoneOtp={handleResendPhoneOtp}
                handleResendPhoneWithChannel={handleResendPhoneWithChannel}
                handlePhoneBlur={handlePhoneBlur}
            />

            <button
                onClick={handleContinue}
                className='btn btn-accent btn-md w-fit'
                disabled={!canContinue || isLoading}
            >
                {isLoading && !pendingOtpFor ? (
                    <>
                        <span className='loading loading-spinner loading-sm'></span>
                        Processing...
                    </>
                ) : (
                    'Continue'
                )}
            </button>

            <p className='text-xs text-gray-700'>
                <span className='font-bold'>Note:</span> We recommend signing up using your private domain to get quick
                assistance.
            </p>

            <div className='cont gap-3'>
                <p className='text-sm text-gray-500'>Or continue with</p>
                <div className='flex items-center gap-2'>
                    {socialIcons.map((icon) => (
                        <button
                            key={icon.id}
                            className='btn bg-white border border-black hover:bg-gray-100'
                            onClick={() => handleSocialSignup(icon.id)}
                            aria-label={`Sign up with ${icon.name}`}
                        >
                            <Image src={icon.icon} width={24} height={24} alt={icon.name} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
