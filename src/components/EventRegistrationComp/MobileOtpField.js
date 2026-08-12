import { useEffect, useRef, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { MobileNumberInput } from '@/components/mobile-number-input';
import Otpinput from '@/components/signupComp/utils/InputOTP';
import { waitForInitSendOTP } from '@/utils/otpSigninWidget';
import { OTPRetryModes } from '@/components/SignupCompNew/SignupUtils/constants';

const RESEND_SECONDS = 30;
const DEFAULT_OTP_LENGTH = 6;
const WIDGET_METHOD_POLL_MS = 100;
const WIDGET_METHOD_TIMEOUT_MS = 15000;
const AUTO_SEND_DELAY_MS = 700;

function waitForSendOtpMethod(timeoutMs = WIDGET_METHOD_TIMEOUT_MS) {
    return new Promise((resolve, reject) => {
        const deadline = Date.now() + timeoutMs;
        const interval = setInterval(() => {
            if (typeof window.sendOtp === 'function') {
                clearInterval(interval);
                resolve();
            } else if (Date.now() > deadline) {
                clearInterval(interval);
                reject(new Error('sendOtp not available'));
            }
        }, WIDGET_METHOD_POLL_MS);
    });
}

function loadOtpScript(urls) {
    return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && typeof window.initSendOTP === 'function') {
            resolve();
            return;
        }
        let index = 0;
        function attempt() {
            if (index >= urls.length) {
                reject(new Error('All OTP script URLs failed to load'));
                return;
            }
            const existingScript = document.getElementById('otpWidgetScript');
            if (existingScript) {
                existingScript.remove();
            }
            const script = document.createElement('script');
            script.id = 'otpWidgetScript';
            script.type = 'text/javascript';
            script.async = true;
            script.src = urls[index];
            script.onload = () => resolve();
            script.onerror = () => {
                index++;
                attempt();
            };
            document.head.appendChild(script);
        }
        attempt();
    });
}

export default function MobileOtpField({ field, value, onChange, data, disabled, onVerifiedChange }) {
    const [otpLength, setOtpLength] = useState(DEFAULT_OTP_LENGTH);
    const [requestId, setRequestId] = useState(null);
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [resendSeconds, setResendSeconds] = useState(0);
    const [mobileNumber, setMobileNumber] = useState(null);
    const isWidgetInitializedRef = useRef(false);
    const sentNumberRef = useRef(null);

    useEffect(() => {
        const scriptUrls = [process.env.SUMMIT_WIDGET_SCRIPT].filter(Boolean);
        const widgetId = process.env.SUMMIT_OTP_WIDGET_TOKEN;
        const tokenAuth = process.env.SUMMIT_WIDGET_AUTH_TOKEN;

        if (!scriptUrls.length || !widgetId || !tokenAuth) return;

        loadOtpScript(scriptUrls)
            .then(() => {
                if (!isWidgetInitializedRef.current && typeof window.initSendOTP === 'function') {
                    isWidgetInitializedRef.current = true;
                    window.initSendOTP({
                        widgetId,
                        tokenAuth,
                        exposeMethods: true,
                        success: (res) => {
                            console.log('[Summit OTP Widget] Success response:', res);
                        },
                        failure: (error) => {
                            console.log('[Summit OTP Widget] Failure reason:', error);
                        },
                    });
                }
                return waitForSendOtpMethod();
            })
            .then(() => setIsWidgetReady(true))
            .catch((err) => {
                console.error('[Summit OTP Widget] Init error:', err);
                toast.error(data?.errors?.widget);
            });
    }, [data?.errors?.widget]);

    /* The OTP goes out on its own once the typed number is valid for the selected country. */
    useEffect(() => {
        if (!isWidgetReady || requestId || disabled) return;
        if (!mobileNumber?.isValid || sentNumberRef.current === mobileNumber?.fullNumber) return;

        const timer = setTimeout(() => {
            sentNumberRef.current = mobileNumber?.fullNumber;
            setIsSending(true);
            window.sendOtp(
                mobileNumber?.fullNumber?.replace('+', ''),
                (result) => {
                    setRequestId(result?.message);
                    setOtpLength(window.getWidgetData?.()?.otpLength);
                    setResendSeconds(RESEND_SECONDS);
                    setIsSending(false);
                },
                (error) => {
                    toast.error(error?.message || data?.errors?.send_failed);
                    sentNumberRef.current = null;
                    setIsSending(false);
                }
            );
        }, AUTO_SEND_DELAY_MS);

        return () => clearTimeout(timer);
    }, [
        isWidgetReady,
        requestId,
        disabled,
        mobileNumber?.isValid,
        mobileNumber?.fullNumber,
        data?.errors?.send_failed,
    ]);

    useEffect(() => {
        if (!resendSeconds) return;
        const interval = setInterval(() => setResendSeconds((seconds) => Math.max(seconds - 1, 0)), 1000);
        return () => clearInterval(interval);
    }, [resendSeconds]);

    const handleMobileNumberChange = (mobileNumberData) => {
        setMobileNumber(mobileNumberData);
        onChange?.({ target: { name: field?.name, value: mobileNumberData?.fullNumber || '' } });
    };

    const handleResendOtp = () => {
        if (!requestId) return;
        setResendSeconds(RESEND_SECONDS);
        window.retryOtp(
            OTPRetryModes.Sms,
            () => {},
            (error) => toast.error(error?.message || data?.errors?.send_failed),
            requestId
        );
    };

    const handleVerifyOtp = (otp, otpRequestId) => {
        setIsVerifying(true);
        window.verifyOtp(
            otp,
            (result) => {
                setIsVerifying(false);
                setIsVerified(true);
                onVerifiedChange?.(true, result?.message);
            },
            (error) => {
                setIsVerifying(false);
                toast.error(error?.message || data?.errors?.verify_failed);
            },
            otpRequestId
        );
    };

    return (
        <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-bold text-slate-700' htmlFor={field?.name}>
                {field?.label}
            </label>

            <MobileNumberInput
                id={field?.name}
                name={field?.name}
                value={value || ''}
                onChange={handleMobileNumberChange}
                defaultCountry={data?.default_country}
                placeholder={field?.placeholder}
                className='w-full'
                inputClassName='h-12 border-gray-300 bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                buttonClassName='h-12 border-gray-300 bg-white px-3'
                disabled={disabled || isSending || Boolean(requestId)}
            />

            {isVerified ? (
                <span className='flex items-center gap-1.5 text-xs font-semibold text-emerald-600'>
                    <MdCheckCircle size={14} className='shrink-0' aria-hidden />
                    {data?.verified_label}
                </span>
            ) : requestId ? (
                <div className='flex flex-col gap-2'>
                    <Otpinput
                        tag='eventMobile'
                        otpLength={otpLength}
                        requestId={requestId}
                        verifyOtp={handleVerifyOtp}
                        notByEmail
                        autoVerify
                    />
                    {!resendSeconds && (
                        <button
                            type='button'
                            disabled={disabled}
                            onClick={handleResendOtp}
                            className='w-fit text-left text-xs font-semibold text-link active-link'
                        >
                            {data?.resend_btn}
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
}
