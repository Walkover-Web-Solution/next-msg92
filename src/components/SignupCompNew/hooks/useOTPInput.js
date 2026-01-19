import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook for managing OTP input logic
 * @param {number} otpLength - Length of OTP (default 6)
 * @param {boolean} autoFocus - Whether to auto-focus first input
 * @returns {Object} OTP state and handlers
 */
export function useOTPInput(otpLength = 6, autoFocus = false) {
    const [otp, setOtp] = useState(() => new Array(otpLength).fill(''));
    const otpInputRefs = useRef([]);

    useEffect(() => {
        if (otpLength && otpLength !== otp.length) {
            setOtp(new Array(otpLength).fill(''));
        }
    }, [otpLength]);

    useEffect(() => {
        if (autoFocus && otpInputRefs.current[0]) {
            setTimeout(() => {
                otpInputRefs.current[0]?.focus();
            }, 100);
        }
    }, [autoFocus]);

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

    const resetOtp = () => {
        setOtp(new Array(otpLength).fill(''));
        otpInputRefs.current[0]?.focus();
    };

    const getOtpValue = () => otp.join('');

    const isOtpComplete = () => {
        return otp.length === otpLength && otp.every((digit) => digit !== '');
    };

    return {
        otp,
        otpInputRefs,
        handleOtpChange,
        handleOtpKeyDown,
        resetOtp,
        getOtpValue,
        isOtpComplete,
        setOtp,
    };
}
