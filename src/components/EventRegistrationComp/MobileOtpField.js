import { useEffect, useRef, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { waitForInitSendOTP } from '@/utils/otpSigninWidget';
import availableCountries from '@/data/availableCountries.json';

const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '12',
};

function getFlagEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '🌐';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const COUNTRIES = (availableCountries || [])
    .filter(
        (country, index, self) =>
            country?.shortname &&
            country?.shortname?.length === 2 &&
            index === self.findIndex((c) => c.shortname === country.shortname)
    )
    .map((country) => ({
        code: country.shortname,
        dial: `+${country.code}`,
        flag: getFlagEmoji(country.shortname),
        name: country.name,
    }));

function MobileNumberInput({
    id,
    name,
    value,
    onChange,
    defaultCountry = 'IN',
    placeholder = '98765 43210',
    disabled,
}) {
    const initialCountry =
        COUNTRIES.find((c) => c.code.toLowerCase() === (defaultCountry || 'in').toLowerCase()) || COUNTRIES[0];

    const [selectedCountry, setSelectedCountry] = useState(initialCountry);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const updateParent = (country, num) => {
        const cleanNumber = num.replace(/\D/g, '');
        const fullNumber = cleanNumber ? `${country.dial}${cleanNumber}` : '';
        const isValid = cleanNumber.length >= 7 && cleanNumber.length <= 15;
        onChange?.({
            fullNumber,
            isValid,
        });
    };

    const handleNumberChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setPhoneNumber(val);
        updateParent(selectedCountry, val);
    };

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
        updateParent(country, phoneNumber);
    };

    return (
        <div className='relative flex w-full items-center rounded-lg border border-slate-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'>
            <div className='relative shrink-0' ref={dropdownRef}>
                <button
                    type='button'
                    disabled={disabled}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className='flex h-12 items-center gap-1.5 border-r border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none disabled:opacity-60'
                >
                    <span className='text-lg leading-none'>{selectedCountry?.flag}</span>
                    <span className='text-slate-600'>{selectedCountry?.dial}</span>
                    <svg className='h-4 w-4 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className='absolute left-0 top-full z-50 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg'>
                        {COUNTRIES.map((c) => (
                            <button
                                key={c.code}
                                type='button'
                                onClick={() => handleSelectCountry(c)}
                                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-slate-100 ${
                                    selectedCountry?.code === c.code
                                        ? 'bg-blue-50 font-semibold text-blue-600'
                                        : 'text-slate-700'
                                }`}
                            >
                                <span className='text-lg leading-none'>{c.flag}</span>
                                <span className='w-12 font-medium'>{c.dial}</span>
                                <span className='truncate text-slate-600'>{c.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <input
                id={id}
                name={name}
                type='tel'
                disabled={disabled}
                placeholder={placeholder || '98765 43210'}
                value={phoneNumber}
                onChange={handleNumberChange}
                className='h-12 w-full bg-transparent px-3 text-sm text-slate-800 focus:outline-none disabled:opacity-60'
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
                    toast.error(error?.message);
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
                value={value}
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
            ) : requestId || isSending || mobileNumber?.isValid ? (
                <div className='flex flex-col gap-2 pt-1'>
                    <EventOtpInput
                        length={otpLength}
                        onVerify={(otpValue) => handleVerifyOtp(otpValue, requestId)}
                        disabled={disabled || isVerifying}
                    />
                    {!resendSeconds && requestId && (
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
