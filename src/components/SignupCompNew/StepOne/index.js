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
import { MdCheckCircle, MdEdit } from 'react-icons/md';
import OTPInput from '../components/OTPInput';
import ResendOTP from '../components/ResendOTP';
import PhoneInput from '../components/PhoneInput';
import { fetchCountries, autoPopulateFromIP } from '../SignupUtils/apiUtils';
import { appendMsg91QueryToUrl } from '../SignupUtils/cookieUtils';
import GmailWarningModal from '@/components/signupComp/utils/GmailWarningModal';

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

    const emailSecondaryChannels = state?.allowedRetry?.email?.secondary || [];
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
                    redirectUrl: redirectUri || getGoogleOAuthRedirectUri(),
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
        const channel = emailSecondaryChannels[0]?.channel || 'email';
        retryOtp(channel, requestId, dispatch);
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

    const handleResendPhoneOtp = () => {
        const channel = mobileSecondaryChannels[0]?.channel || null;
        handleResendPhoneWithChannel(channel);
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

            {emailVerified ? (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Email Address</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <div className='relative flex-1 min-w-0 max-w-[420px]'>
                            <div className='input input-bordered text-base p-3 h-fit w-full bg-gray-50 '>
                                <span className='text-sm sm:text-base truncate block'>{verifiedEmailLabel}</span>
                            </div>
                            <MdCheckCircle
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl'
                                aria-label='Email verified'
                            />
                        </div>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer text-xl self-center'
                            onClick={handleEditVerifiedEmail}
                            aria-label='Edit email'
                        />
                    </div>
                </div>
            ) : emailOtpPending && otpLength ? (
                <div className='cont gap-3'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <p className='text-gray-500 text-sm sm:text-base'>
                            OTP sent to <strong className='break-all'>{state.emailIdentifier}</strong>
                        </p>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer shrink-0'
                            onClick={handleEditEmail}
                            aria-label='Edit email'
                        />
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <OTPInput
                            ref={emailOtpInputRef}
                            length={otpLength}
                            onComplete={handleVerifyEmailOtp}
                            onVerify={handleVerifyEmailOtp}
                            showVerifyButton={true}
                            autoFocus={true}
                            disabled={state.loadingType === 'verify' && pendingOtpFor === 'email'}
                        />
                        {emailLoading && (
                            <div className='flex items-center gap-2 text-accent text-sm'>
                                <div className='loading loading-spinner loading-sm'></div>
                                {state.loadingType === 'send' ? 'Sending OTP...' : 'Verifying OTP...'}
                            </div>
                        )}
                    </div>
                    <ResendOTP
                        onResend={handleResendEmailOtp}
                        onReset={() => emailOtpInputRef.current?.resetOtp()}
                        secondaryChannels={emailSecondaryChannels}
                        initialTime={30}
                        autoStart={true}
                    />
                </div>
            ) : (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Email ID</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <input
                            ref={emailInputRef}
                            maxLength={244}
                            className='input input-bordered text-base p-3 h-fit w-full max-w-[420px] outline-none focus-within:outline'
                            name='email'
                            type='email'
                            required
                            placeholder='support@msg91.com'
                            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendEmailOtp()}
                            aria-label='Email address'
                        />
                        {emailLoading ? (
                            <div className='flex items-center justify-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button
                                onClick={handleSendEmailOtp}
                                className='btn btn-accent font-normal w-full sm:w-auto'
                                disabled={!email?.trim()}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                </div>
            )}

            {phoneOtpPending && otpLength ? (
                <div className='cont gap-3'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <p className='text-gray-500 text-sm sm:text-base'>
                            OTP sent to <strong>{state.mobileIdentifier}</strong>
                        </p>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer shrink-0'
                            onClick={handleEditPhone}
                            aria-label='Edit phone'
                        />
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <OTPInput
                            ref={phoneOtpInputRef}
                            length={otpLength}
                            onComplete={handleVerifyPhoneOtp}
                            onVerify={handleVerifyPhoneOtp}
                            showVerifyButton={true}
                            autoFocus={true}
                            disabled={state.loadingType === 'verify' && pendingOtpFor === 'mobile'}
                        />
                        {phoneLoading && (
                            <div className='flex items-center gap-2 text-accent text-sm'>
                                <div className='loading loading-spinner loading-sm'></div>
                                {state.loadingType === 'send' ? 'Sending OTP...' : 'Verifying OTP...'}
                            </div>
                        )}
                    </div>
                    <ResendOTP
                        onResend={handleResendPhoneOtp}
                        onResendWithChannel={handleResendPhoneWithChannel}
                        onReset={() => phoneOtpInputRef.current?.resetOtp()}
                        secondaryChannels={mobileSecondaryChannels}
                        initialTime={30}
                        autoStart={true}
                    />
                </div>
            ) : (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Phone Number</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            onCountryChange={setPhoneCountry}
                            onBlur={() => phone?.trim() && setDetails('phone', dispatch, phone)}
                            defaultCountry={state.selectedCountry}
                            verified={mobileOtpVerified}
                            placeholder='9876543210'
                        />
                        {mobileOtpVerified ? (
                            <MdEdit
                                className='text-gray-500 hover:text-accent cursor-pointer text-xl self-center'
                                onClick={handleEditVerifiedPhone}
                                aria-label='Edit phone number'
                            />
                        ) : phoneLoading ? (
                            <div className='flex items-center justify-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button
                                onClick={handleSendPhoneOtp}
                                className='btn btn-accent font-normal w-full sm:w-auto'
                                disabled={!phone?.trim()}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                </div>
            )}

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

            <p className='text-[12px] w-full text-gray-700'>
                <span className='font-bold'>Note:</span> We recommend signing up using your private domain to get quick
                assistance.
            </p>

            <div className='cont gap-3'>
                <p className='text-sm text-gray-500'>Or continue with</p>
                <div className='flex items-center gap-2'>
                    {socialIcons.map((icon) => (
                        <button
                            key={icon.id}
                            className='btn bg-white border border-black hover:bg-gray-100 hover:border-black'
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
