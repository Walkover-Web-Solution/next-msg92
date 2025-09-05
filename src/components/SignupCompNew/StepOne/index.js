import Image from 'next/image';
import { useSignup, sendOtp, verifyOtp } from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import style from './StepOne.module.scss';

export default function StepOne({ onNext }) {
    const { state, dispatch } = useSignup();
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const otpLength = state.widgetData?.otpLength || 6;
    const [otp, setOtp] = useState(() => new Array(otpLength).fill(''));
    const otpInputRefs = useRef([]);

    // Use global loading state from context
    const isLoading = state.isLoading;

    const handleSendOtp = () => {
        if (!email) {
            console.error('Please enter email');
            return;
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        sendOtp(email, false, dispatch, (message) => {
            console.log('⚡️ ~ :24 ~ sendOtp ~ message:', message);
            setOtpSent(true);
        });
    };
    console.log('⚡️ ~ :10 ~ StepOne ~ otpSent:', otpSent);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otpLength - 1) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                otpInputRefs.current[index - 1]?.focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        } else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const pastedOtp = text.replace(/\D/g, '').slice(0, otpLength);
                const newOtp = [...otp];
                for (let i = 0; i < pastedOtp.length && i < otpLength; i++) {
                    newOtp[i] = pastedOtp[i];
                }
                setOtp(newOtp);
                const nextIndex = Math.min(pastedOtp.length, otpLength - 1);
                otpInputRefs.current[nextIndex]?.focus();
            });
        }
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        if (otpValue.length !== otpLength) {
            console.error('Please enter complete OTP');
            return;
        }

        // Only use email request ID for email verification
        const requestId = state.emailRequestId;
        if (!requestId) {
            console.error('No email request ID found. Please resend OTP.');
            return;
        }

        verifyOtp(
            otpValue,
            requestId,
            false, // notByEmail - false for email verification
            dispatch,
            (data) => {
                console.log('Email OTP verified successfully:', data);
                dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 });
            },
            (error) => {
                console.error('Email OTP verification failed:', error);
                // Clear the OTP inputs on error
                setOtp(new Array(otpLength).fill(''));
                if (otpInputRefs.current[0]) {
                    otpInputRefs.current[0].focus();
                }
            }
        );
    };

    useEffect(() => {
        console.log('StepOne - State changed:', {
            widgetData: state.widgetData,
            allowedRetry: state.allowedRetry,
            hasWidgetData: !!state.widgetData,
        });

        if (state.widgetData) {
            console.log('Widget data updated:', state.widgetData);
            console.log('Allowed retry modes:', state.allowedRetry);
        }
    }, [state.widgetData, state.allowedRetry]);

    const socialIcons = [
        {
            id: 'google',
            name: 'Google',
            icon: '/assets/icons/social/google.svg',
        },
        {
            id: 'facebook',
            name: 'Facebook',
            icon: '/assets/icons/social/facebook-fill.svg',
        },
    ];

    const handleSocialSignup = (id) => {
        console.log(id);
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
            {otpSent ? (
                <div className='cont gap-3'>
                    <p className='text-gray-500'>
                        OTP sent to <strong>{email}</strong>
                    </p>
                    <div className='flex  gap-4'>
                        <div className='flex items-center gap-2'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (otpInputRefs.current[index] = el)}
                                    maxLength={1}
                                    className={`${style.otp_input} input input-bordered text-base text-center p-3 h-[50px] w-[50px] outline-none focus-within:outline-none`}
                                    type='text'
                                    inputMode='numeric'
                                    pattern='[0-9]'
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    placeholder='*'
                                    autoComplete='one-time-code'
                                />
                            ))}
                        </div>
                        {isLoading ? (
                            <div className='flex items-center gap-2 text-accent '>
                                <div className='loading loading-spinner loading-sm '></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button
                                onClick={handleVerifyOtp}
                                className='btn btn-accent font-normal'
                                disabled={otp.join('').length !== otpLength}
                            >
                                Verify OTP
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className='cont gap-3'>
                    <p className='text-gray-500'>Create account using Email ID</p>
                    <div className='flex items-center gap-4'>
                        <input
                            maxLength={244}
                            className='input input-bordered text-base p-3 h-fit w-full min-w-[320px] max-w-[420px] outline-none focus-within:outline-none'
                            name='email'
                            type='email'
                            required
                            placeholder='support@msg91.com'
                            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {isLoading ? (
                            <div className='flex items-center gap-2 text-accent '>
                                <div className='loading loading-spinner loading-sm '></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button onClick={handleSendOtp} className='btn btn-accent font-normal '>
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
                            className='btn btn-outline  social-icon'
                            onClick={() => handleSocialSignup(icon.id)}
                        >
                            <Image src={icon.icon} width={24} height={24} alt={icon.name} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
