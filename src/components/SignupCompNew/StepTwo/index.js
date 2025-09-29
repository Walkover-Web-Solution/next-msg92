import Image from 'next/image';
import { useSignup, sendOtp, verifyOtp } from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import style from './StepTwo.module.scss';
import { Typeahead } from 'react-bootstrap-typeahead';
import countries from '@/data/countries.json';
import { MdCheckCircle } from 'react-icons/md';
import intlTelInput from 'intl-tel-input';
import phoneStyles from './intl-tel-input-custom.module.css';
import getCountyFromIP from '@/utils/getCountyFromIP';

export default function StepTwo() {
    const { state, dispatch } = useSignup();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const phoneInputRef = useRef(null);
    const itiRef = useRef(null);
    const otpInputRefs = useRef([]);
    const otpLength = state.widgetData?.otpLength || null;
    const [otp, setOtp] = useState(() => new Array(otpLength).fill(''));
    const isLoading = state.isLoading;
    const otpSent = state.otpSent;
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        const fetchCountryFromIP = async () => {
            try {
                const countryCodeFromIP = await getCountyFromIP();
                const country = countries.find(
                    (country) => country?.shortname?.toLowerCase() === countryCodeFromIP?.toLowerCase()
                );
                setSelectedCountry(country);
            } catch (error) {
                console.error('Error fetching country from IP:', error);
            }
        };

        fetchCountryFromIP();
    }, []);

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

    const handleSendOtp = () => {
        let phoneNumber = phone;

        if (itiRef.current) {
            try {
                const intlNumber = itiRef.current.getNumber();

                // Get selected country data and dial code
                const selectedCountryData = itiRef.current.getSelectedCountryData();

                const rawInput = phoneInputRef.current?.value;

                // If getNumber() returns a valid international number, use it
                if (intlNumber && intlNumber.trim() !== '' && intlNumber !== rawInput) {
                    phoneNumber = intlNumber;
                } else if (rawInput && rawInput.trim() !== '') {
                    // Fallback: manually format with country code
                    const dialCode = selectedCountryData?.dialCode;
                    if (dialCode && !rawInput.startsWith('+')) {
                        phoneNumber = `+${dialCode}${rawInput}`;
                    } else {
                        phoneNumber = rawInput;
                    }
                }
            } catch (error) {
                // Fallback to raw input
                const rawInput = phoneInputRef.current?.value;
                if (rawInput && rawInput.trim() !== '') {
                    phoneNumber = rawInput;
                }
            }
        } else {
            const rawInput = phoneInputRef.current?.value;
            if (rawInput && rawInput.trim() !== '') {
                phoneNumber = rawInput;
            }
        }

        if (!phoneNumber || phoneNumber.trim() === '') {
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });
        sendOtp(phoneNumber, true, dispatch);
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        if (otpValue.length !== otpLength) {
            console.error('Please enter complete OTP');
            return;
        }

        const requestId = state.phoneRequestId;
        if (!requestId) {
            console.error('No phone request ID found. Please resend OTP.');
            return;
        }

        verifyOtp(
            otpValue,
            requestId,
            true, // notByEmail - true for phone verification
            dispatch,
            (data) => {
                dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 });
            },
            (error) => {
                console.error('Phone OTP verification failed:', error);
                // Clear the OTP inputs on error
                setOtp(new Array(otpLength).fill(''));
                if (otpInputRefs.current[0]) {
                    otpInputRefs.current[0].focus();
                }
            }
        );
    };

    const handleOnSelect = (item) => {
        setSelectedCountry(item[0]);
    };

    // Initialize intl-tel-input with better React lifecycle management
    useEffect(() => {
        let mounted = true;
        let timeoutId;

        const initializeIntlTelInput = () => {
            if (!mounted) return;

            // Cleanup previous instance first
            if (itiRef.current) {
                try {
                    itiRef.current.destroy();
                } catch (error) {
                    console.warn('Error destroying intl-tel-input:', error);
                }
                itiRef.current = null;
            }

            // Only initialize if phone input is visible (not in OTP mode)
            if (phoneInputRef.current && !otpSent && mounted) {
                try {
                    itiRef.current = intlTelInput(phoneInputRef.current, {
                        initialCountry: selectedCountry?.shortname?.toLowerCase() || 'auto',
                        preferredCountries: ['in', 'us', 'gb'],
                        separateDialCode: true,
                        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
                        autoPlaceholder: 'polite',
                        formatOnDisplay: true,
                    });

                    // Store reference to the event handler for proper cleanup
                    const handleCountryChange = () => {
                        if (itiRef.current && mounted) {
                            try {
                                const selectedCountryData = itiRef.current.getSelectedCountryData();
                                const fullNumber = itiRef.current.getNumber();

                                // Only update if we have a valid number
                                if (fullNumber && fullNumber !== phone) {
                                    setPhone(fullNumber);
                                }
                            } catch (error) {
                                console.warn('Error in country change handler:', error);
                            }
                        }
                    };

                    // Store the handler reference for cleanup
                    phoneInputRef.current._countryChangeHandler = handleCountryChange;
                    phoneInputRef.current.addEventListener('countrychange', handleCountryChange);
                } catch (error) {
                    console.error('Error initializing intl-tel-input:', error);
                }
            }
        };

        // Delay initialization to avoid React DOM conflicts
        timeoutId = setTimeout(initializeIntlTelInput, 150);

        return () => {
            mounted = false;
            clearTimeout(timeoutId);

            // Clean up event listeners first
            if (phoneInputRef.current && phoneInputRef.current._countryChangeHandler) {
                try {
                    phoneInputRef.current.removeEventListener(
                        'countrychange',
                        phoneInputRef.current._countryChangeHandler
                    );
                    delete phoneInputRef.current._countryChangeHandler;
                } catch (error) {
                    console.warn('Error removing event listener:', error);
                }
            }

            // Then destroy intl-tel-input instance
            if (itiRef.current) {
                try {
                    itiRef.current.destroy();
                } catch (error) {
                    console.warn('Error destroying intl-tel-input in cleanup:', error);
                }
                itiRef.current = null;
            }
        };
    }, [selectedCountry, otpSent]);

    // Handle phone input change
    const handlePhoneChange = (e) => {
        const value = e.target.value;

        // Update the phone state with the raw input value
        setPhone(value);

        // Log for debugging
        if (itiRef.current) {
            const fullNumber = itiRef.current.getNumber();
            console.log('⚡️ ~ handlePhoneChange ~ intl formatted number:', fullNumber);
        }
    };

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <h1 className='text-2xl text-primary'>Personal Details</h1>
            </div>
            <div className='cont gap-3'>
                <div className='cont gap-1'>
                    <p className='text-gray-500'>Full Name</p>
                    <input
                        maxLength={244}
                        className='input input-bordered text-base p-3 h-fit w-full min-w-[320px] max-w-[420px] outline-none focus-within:outline-none'
                        name='Name'
                        type='text'
                        required
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='cont gap-1'>
                    <p className='text-gray-500'>Company Name</p>
                    <input
                        maxLength={244}
                        className='input input-bordered text-base p-3 h-fit w-full min-w-[320px] max-w-[420px] outline-none focus-within:outline-none'
                        name='companyName'
                        type='text'
                        required
                        placeholder='Walkover'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='cont gap-1'>
                    <p className='text-gray-500'>Country</p>
                    <Typeahead
                        className='country-list w-full min-w-[320px] max-w-[420px]'
                        id='country'
                        placeholder='Country'
                        labelKey='name'
                        onChange={(selected) => {
                            handleOnSelect(selected);
                        }}
                        options={countries}
                        selected={selectedCountry && selectedCountry.name ? [selectedCountry] : []}
                        defaultSelected={selectedCountry && selectedCountry.name ? [selectedCountry] : []}
                        inputProps={{
                            autoComplete: 'off',
                        }}
                    />
                </div>
                {otpSent && otpLength ? (
                    <div className='cont gap-3'>
                        <p className='text-gray-500'>
                            OTP sent to <strong>{phone}</strong>
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
                    <div className='cont gap-2'>
                        <p className='text-gray-500'>Phone Number</p>
                        <div className='flex items-center gap-4'>
                            <div
                                className={`w-full min-w-[320px] max-w-[420px] relative ${phoneStyles.phoneInputContainer}`}
                            >
                                <input
                                    ref={phoneInputRef}
                                    className='input input-bordered text-base p-3 h-fit w-full outline-none focus-within:outline-none'
                                    name='phone'
                                    type='tel'
                                    required
                                    placeholder='9876543210'
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                                <MdCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-xl z-10' />
                            </div>
                            {isLoading ? (
                                <div className='flex items-center gap-2 text-accent '>
                                    <div className='loading loading-spinner loading-sm '></div>
                                    Sending OTP...
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        console.log('🔥 Button clicked!');
                                        handleSendOtp();
                                    }}
                                    className='btn btn-accent font-normal '
                                >
                                    Verify
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className='flex gap-4'>
                <button className='btn btn-primary btn-outline btn-md' disabled={otp.join('').length !== otpLength}>
                    Back
                </button>
                <button
                    onClick={handleVerifyOtp}
                    className='btn btn-accent btn-md'
                    disabled={otp.join('').length !== otpLength}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
