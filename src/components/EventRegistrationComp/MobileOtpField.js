import { useCallback, useEffect, useRef, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '12',
};

const INTL_TEL_INPUT_JS = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/intlTelInput.min.js';
const INTL_TEL_INPUT_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css';
const INTL_TEL_INPUT_UTILS = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/utils.js';
const INTL_TEL_INPUT_STYLE_ID = 'event-iti-overrides';

const EVENT_ITI_OVERRIDES = `
.event-iti-wrap .iti { width: 100%; display: block; }
.event-iti-wrap .iti__flag-container { z-index: 2; }
.event-iti-wrap .iti__selected-flag { padding: 0 10px 0 12px; border-radius: 0.5rem 0 0 0.5rem; }
.event-iti-wrap .iti__selected-dial-code { font-size: 0.875rem; font-weight: 500; color: #475569; }
.event-iti-wrap input[type='tel'] {
    height: 3rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #cbd5e1;
    background: #fff;
    font-size: 0.875rem;
    color: #1e293b;
}
.event-iti-wrap input[type='tel']:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgb(59 130 246 / 0.2);
}
.event-iti-wrap input[type='tel']:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
.iti--container {
    z-index: 60;
}
.iti--container .iti__country-list {
    max-height: 15rem;
    border-radius: 0.5rem;
    border-color: #e2e8f0;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
`;

let intlTelInputLoader;

function loadIntlTelInput() {
    if (typeof window === 'undefined') return Promise.reject(new Error('window unavailable'));
    if (window.intlTelInput) return Promise.resolve(window.intlTelInput);
    if (intlTelInputLoader) return intlTelInputLoader;

    intlTelInputLoader = new Promise((resolve, reject) => {
        if (!document.getElementById(INTL_TEL_INPUT_STYLE_ID)) {
            const overrides = document.createElement('style');
            overrides.id = INTL_TEL_INPUT_STYLE_ID;
            overrides.textContent = EVENT_ITI_OVERRIDES;
            document.head.appendChild(overrides);
        }

        if (!document.querySelector(`link[href="${INTL_TEL_INPUT_CSS}"]`)) {
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = INTL_TEL_INPUT_CSS;
            document.head.appendChild(stylesheet);
        }

        const existingScript = document.querySelector(`script[src*="intlTelInput"]`);
        if (existingScript) {
            if (window.intlTelInput) {
                resolve(window.intlTelInput);
                return;
            }
            existingScript.addEventListener('load', () => resolve(window.intlTelInput));
            existingScript.addEventListener('error', () => reject(new Error('Failed to load intl-tel-input')));
            return;
        }

        const script = document.createElement('script');
        script.src = INTL_TEL_INPUT_JS;
        script.async = true;
        script.onload = () => resolve(window.intlTelInput);
        script.onerror = () => reject(new Error('Failed to load intl-tel-input'));
        document.head.appendChild(script);
    });

    return intlTelInputLoader;
}

function getPhonePayload(iti, input) {
    const nationalNumber = (input?.value || '').replace(/\D/g, '');
    const dialCode = iti?.getSelectedCountryData?.()?.dialCode || '';
    const fullNumber = nationalNumber && dialCode ? `+${dialCode}${nationalNumber}` : '';
    const lengthValid = nationalNumber.length >= 10 && nationalNumber.length <= 15;
    const libValid = window.intlTelInputUtils ? Boolean(iti?.isValidNumber?.()) : false;
    const isValid = libValid || lengthValid;

    return { fullNumber, isValid };
}

function MobileNumberInput({ id, name, onChange, defaultCountry = 'IN', placeholder = '98765 43210', disabled }) {
    const inputRef = useRef(null);
    const itiRef = useRef(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const emitChange = useCallback(() => {
        const iti = itiRef.current;
        const input = inputRef.current;
        if (!iti || !input) return;
        onChangeRef.current?.(getPhonePayload(iti, input));
    }, []);

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return undefined;

        let cancelled = false;

        loadIntlTelInput()
            .then((intlTelInput) => {
                if (cancelled || !inputRef.current || itiRef.current) return;

                const iti = intlTelInput(inputRef.current, {
                    initialCountry: (defaultCountry || 'in').toLowerCase(),
                    separateDialCode: true,
                    autoHideDialCode: false,
                    nationalMode: true,
                    formatOnDisplay: false,
                    autoPlaceholder: 'off',
                    placeholderNumberType: 'MOBILE',
                    utilsScript: INTL_TEL_INPUT_UTILS,
                    dropdownContainer: document.body,
                });

                itiRef.current = iti;
                input.addEventListener('input', emitChange);
                input.addEventListener('countrychange', emitChange);
                iti.promise?.then(() => {
                    if (!cancelled) emitChange();
                });
            })
            .catch((err) => {
                console.error('[intl-tel-input] load error:', err);
            });

        return () => {
            cancelled = true;
            input.removeEventListener('input', emitChange);
            input.removeEventListener('countrychange', emitChange);
            itiRef.current?.destroy();
            itiRef.current = null;
        };
    }, [defaultCountry, emitChange]);

    return (
        <div className='event-iti-wrap w-full'>
            <input
                ref={inputRef}
                id={id}
                name={name}
                type='tel'
                inputMode='numeric'
                disabled={disabled}
                placeholder={placeholder || '98765 43210'}
                className='h-12 w-full'
                autoComplete='tel'
            />
        </div>
    );
}

const RESEND_SECONDS = 30;
const DEFAULT_OTP_LENGTH = 4;
const WIDGET_METHOD_POLL_MS = 100;
const WIDGET_METHOD_TIMEOUT_MS = 15000;
const AUTO_SEND_DELAY_MS = 700;

function EventOtpInput({ length, onVerify, disabled }) {
    const [digits, setDigits] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        setDigits(Array(length).fill(''));
    }, [length]);

    const handleChange = (index, value) => {
        if (disabled) return;
        const cleanValue = value.replace(/\D/g, '').slice(-1);
        const newDigits = [...digits];
        newDigits[index] = cleanValue;
        setDigits(newDigits);

        if (cleanValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        const fullOtp = newDigits.join('');
        if (fullOtp.length === length && newDigits.every(Boolean)) {
            onVerify(fullOtp);
        }
    };

    const handleKeyDown = (index, e) => {
        if (disabled) return;
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        if (disabled) return;
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (!pasted) return;

        const newDigits = Array(length).fill('');
        for (let i = 0; i < pasted.length; i++) {
            newDigits[i] = pasted[i];
        }
        setDigits(newDigits);

        const focusIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[focusIndex]?.focus();

        if (pasted.length === length) {
            onVerify(pasted);
        }
    };

    return (
        <div className='flex items-center gap-2'>
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    placeholder='*'
                    className='h-10 w-10 border border-gray-300 bg-white text-center text-sm font-semibold rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    disabled={disabled}
                />
            ))}
        </div>
    );
}

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

        if (!scriptUrls.length || !widgetId || !tokenAuth) {
            toast.error(data?.errors?.widget);
            return;
        }

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
        if (!mobileNumber?.isValid || requestId || disabled) return;
        if (!isWidgetReady) return;
        if (sentNumberRef.current === mobileNumber?.fullNumber) return;

        const identifier = (mobileNumber?.fullNumber || '').replace(/\D/g, '');
        if (identifier.length < 7) return;

        const timer = setTimeout(() => {
            if (typeof window.sendOtp !== 'function') {
                toast.error(data?.errors?.widget);
                return;
            }
            sentNumberRef.current = mobileNumber?.fullNumber;
            setIsSending(true);
            window.sendOtp(
                identifier,
                (result) => {
                    setRequestId(result?.message);
                    setOtpLength(window.getWidgetData?.()?.otpLength || DEFAULT_OTP_LENGTH);
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
        data?.errors?.widget,
    ]);

    useEffect(() => {
        if (!resendSeconds) return;
        const interval = setInterval(() => setResendSeconds((seconds) => Math.max(seconds - 1, 0)), 1000);
        return () => clearInterval(interval);
    }, [resendSeconds]);

    const handleMobileNumberChange = (mobileNumberData) => {
        setMobileNumber(mobileNumberData);
        onChange?.({ target: { name: field?.name, value: mobileNumberData?.fullNumber } });
    };

    const handleResendOtp = () => {
        if (!requestId) return;
        setResendSeconds(RESEND_SECONDS);
        window.retryOtp(
            OTPRetryModes.Sms,
            () => {},
            (error) => toast.error(error?.message),
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
                toast.error(error?.message);
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
                onChange={handleMobileNumberChange}
                defaultCountry={data?.default_country}
                placeholder={field?.placeholder}
                disabled={disabled || isSending || Boolean(requestId)}
            />

            {isVerified ? (
                <span className='flex items-center gap-1.5 text-xs font-semibold text-emerald-600'>
                    <MdCheckCircle size={14} className='shrink-0' aria-hidden />
                    {data?.verified_label}
                </span>
            ) : isSending ? (
                <span className='text-xs text-slate-500'>{data?.sending_label}</span>
            ) : requestId ? (
                <div className='flex flex-col gap-2 pt-1'>
                    <span className='text-xs text-slate-500'>{data?.sent_label}</span>
                    <EventOtpInput
                        length={otpLength}
                        onVerify={(otpValue) => handleVerifyOtp(otpValue, requestId)}
                        disabled={disabled || isVerifying}
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
