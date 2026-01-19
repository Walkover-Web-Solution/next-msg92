import Image from 'next/image';
import {
    useSignup,
    sendOtp,
    handleGithubSignup,
    setInitialStates,
    validateEmailSignup,
    resetEmailOtp,
} from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import style from './StepOne.module.scss';
import getURLParams from '@/utils/getURLParams';
import { MdEdit } from 'react-icons/md';

export default function StepOne() {
    const { state, dispatch } = useSignup();

    const [email, setEmail] = useState('');
    const emailInputRef = useRef(null);
    const otpInputRefs = useRef([]);
    const otpLength = state.widgetData?.otpLength || 6; // Default to 6 if not available
    const [otp, setOtp] = useState(() => new Array(otpLength || 6).fill(''));
    const [timer, setTimer] = useState(30);
    const [isResendAllowed, setIsResendAllowed] = useState(false);

    // Use global loading state from context
    const isLoading = state.isLoading;
    const otpSent = state.otpSent;

    useEffect(() => {
        setInitialStates(dispatch, state, getURLParams(window?.location?.search));
    }, [dispatch]);

    useEffect(() => {
        if (otpLength && otpLength !== otp.length) {
            setOtp(new Array(otpLength).fill(''));
        }
    }, [otpLength]);

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < otpLength - 1) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    useEffect(() => {
        console.log('⚡️ ~ :9 ~ StepOne ~ state:', state);
    }, [state]);

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

    const handleSendOtp = () => {
        if (!email) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter email' });
            console.error('Please enter email');
            return;
        }
        sendOtp(email, false, dispatch);
        // Timer will start in useEffect when otpSent becomes true
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        if (otpValue.length !== otpLength) {
            console.error('Please enter complete OTP');
            return;
        }
        validateEmailSignup(otpValue, dispatch, state);
    };

    // Focus on first OTP input when OTP section appears and start timer
    useEffect(() => {
        if (otpSent) {
            // Focus on first OTP input
            if (otpInputRefs.current[0]) {
                otpInputRefs.current[0].focus();
            }

            // Start timer when OTP is sent
            handleResendOtp();
        }
    }, [otpSent]);

    // Focus on email input when component first mounts
    useEffect(() => {
        setTimeout(() => {
            if (emailInputRef.current && !otpSent) {
                emailInputRef.current.focus();
            }
        }, 100);
    }, []);

    // Focus on email input when returning from OTP view
    useEffect(() => {
        if (!otpSent && emailInputRef.current) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 100);
        }
    }, [otpSent]);

    const socialIcons = [
        // {
        //     id: 'google',
        //     name: 'Google',
        //     icon: '/assets/icons/social/google.svg',
        // },
        // {
        //     id: 'facebook',
        //     name: 'Facebook',
        //     icon: '/assets/icons/social/facebook-fill.svg',
        // },
        {
            id: 'github',
            name: 'Github',
            icon: '/assets/icons/social/github.svg',
        },
    ];

    const handleSocialSignup = (id) => {
        switch (id) {
            case 'github':
                handleGithubSignup();
                break;
            default:
                break;
        }
    };

    function handleResendOtp() {
        setTimer(30);
        setIsResendAllowed(false);

        const timerId = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    setIsResendAllowed(true);
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timerId);
    }

    function handleEditEmail() {
        resetEmailOtp(dispatch);
    }

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
                        />
                    </div>
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
                    <div className='flex items-center gap-2'>
                        {isResendAllowed ? (
                            <span
                                className='text-sm text-link active-link cursor-pointer'
                                onClick={() => {
                                    sendOtp(email, false, dispatch);
                                    // Timer will start in useEffect when otpSent becomes true
                                }}
                            >
                                Resend OTP
                            </span>
                        ) : (
                            <span className='text-sm text-gray-400'>Resend OTP in {timer}s</span>
                        )}
                    </div>
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
                            className='btn btn-outline social-icon'
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
