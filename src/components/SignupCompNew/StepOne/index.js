import Image from 'next/image';
import { useSignup, sendOtp, handleGithubSignup, validateEmailSignup, resetEmailOtp } from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import OTPInput from '../components/OTPInput';
import ResendOTP from '../components/ResendOTP';
import FormInput from '../components/FormInput';
import { fetchCountries, autoPopulateFromIP } from '../SignupUtils/apiUtils';

export default function StepOne() {
    const { state, dispatch } = useSignup();
    const [email, setEmail] = useState('');
    const emailInputRef = useRef(null);
    const otpInputRef = useRef(null);
    const geoInitRef = useRef(false);

    const otpLength = state.widgetData?.otpLength || 6;
    const isLoading = state.isLoading;
    const otpSent = state.otpSent;
    const countries = state.countries;

    // Get available retry channels (email usually has only one)
    const secondaryChannels = state?.allowedRetry?.email?.secondary || [];
    useEffect(() => {
        const initializeCountriesAndAutoPopulate = async () => {
            if (state.geoAutoPopulated) return;
            if (geoInitRef.current) return;

            // Scenario 1: Countries not fetched yet
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

            // Scenario 2: Countries exist but geo data not populated yet
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
        if (!otpSent && emailInputRef.current) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 100);
        }
    }, [otpSent]);

    const handleSendOtp = () => {
        if (!email) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter email' });
            return;
        }
        sendOtp(email, false, dispatch);
    };

    const handleVerifyOtp = (otpValue) => {
        validateEmailSignup(otpValue, dispatch, state);
    };

    const handleEditEmail = () => {
        resetEmailOtp(dispatch);
    };

    const handleResendOtp = () => {
        sendOtp(email, false, dispatch);
    };

    const socialIcons = [
        {
            id: 'github',
            name: 'Github',
            icon: '/assets/icons/social/github.svg',
        },
    ];

    const handleSocialSignup = (id) => {
        if (id === 'github') {
            handleGithubSignup();
        }
    };

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <h1 className='text-2xl text-primary'>Create an Account</h1>
                <p className='text-sm text-gray-500'>
                    Already have an account? <a href='/login'>Login</a>
                </p>
            </div>

            {otpSent && otpLength ? (
                <div className='cont gap-2'>
                    <div className='flex items-end gap-2'>
                        <p className='text-gray-500'>
                            OTP sent to <strong>{email}</strong>
                        </p>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer mb-1'
                            onClick={handleEditEmail}
                            aria-label='Edit email'
                        />
                    </div>
                    <div className='flex gap-4'>
                        <OTPInput
                            ref={otpInputRef}
                            length={otpLength}
                            onComplete={handleVerifyOtp}
                            onVerify={handleVerifyOtp}
                            showVerifyButton={true}
                            autoFocus={true}
                            disabled={isLoading}
                        />
                        {isLoading && (
                            <div className='flex items-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Verifying OTP...
                            </div>
                        )}
                    </div>
                    <ResendOTP
                        onResend={handleResendOtp}
                        onReset={() => otpInputRef.current?.resetOtp()}
                        secondaryChannels={secondaryChannels}
                        initialTime={30}
                        autoStart={true}
                    />
                </div>
            ) : (
                <div className='cont gap-2'>
                    <p className='text-gray-500'>Create account using Email ID</p>
                    <div className='flex items-center gap-4'>
                        <input
                            ref={emailInputRef}
                            maxLength={244}
                            className='input input-bordered text-base p-3 h-fit w-full min-w-[320px] max-w-[420px] outline-none focus-within:outline'
                            name='email'
                            type='email'
                            required
                            placeholder='support@msg91.com'
                            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label='Email address'
                        />
                        {isLoading ? (
                            <div className='flex items-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button onClick={handleSendOtp} className='btn btn-accent font-normal'>
                                Create Account
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className='cont gap-3'>
                <p className='text-sm text-gray-500'>Or continue with</p>
                <div className='flex items-center gap-2'>
                    {socialIcons.map((icon) => (
                        <button
                            key={icon.id}
                            className='btn btn-outline social-icon'
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
