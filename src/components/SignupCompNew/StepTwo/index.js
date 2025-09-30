import Image from 'next/image';
import { useSignup, sendOtp, verifyOtp } from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import style from './StepTwo.module.scss';
import { Typeahead } from 'react-bootstrap-typeahead';
import countries from '@/data/countries.json';
import { MdCheckCircle } from 'react-icons/md';
import getCountyFromIP from '@/utils/getCountyFromIP';

export default function StepTwo() {
    const { state, dispatch } = useSignup();
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const phoneInputRef = useRef(null);
    const otpInputRefs = useRef([]);
    const otpLength = state.widgetData?.otpLength || 6; // Default to 6 if not available
    const [otp, setOtp] = useState(() => new Array(otpLength || 6).fill(''));
    const isLoading = state.isLoading;
    const otpSent = state.otpSent;
    const otpVerified = state.mobileOtpVerified;
    const [selectedCountry, setSelectedCountry] = useState({});
    const [continueAllowed, setContinueAllowed] = useState(false);

    useEffect(() => {
        if (otpVerified && name && companyName && phone) {
            setContinueAllowed(true);
        }
    }, [otpVerified, name, companyName, phone]);

    // Update OTP array when otpLength changes
    useEffect(() => {
        if (otpLength && otpLength !== otp.length) {
            setOtp(new Array(otpLength).fill(''));
        }
    }, [otpLength]);

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
        const rawInput = phone.trim();

        if (!rawInput) {
            console.error('Please enter a phone number');
            return;
        }

        // Format with selected country code
        let phoneNumber = rawInput;
        if (selectedCountry?.code && !rawInput.startsWith('+')) {
            phoneNumber = `${selectedCountry.code}${rawInput}`;
        }

        console.log('Sending OTP to:', phoneNumber);
        dispatch({ type: 'SET_LOADING', payload: true });
        sendOtp(phoneNumber, true, dispatch);
    };

    const handleVerifyOtp = () => {
        const otpValue = otp.join('');
        console.log('⚡️ ~ :105 ~ handleVerifyOtp ~ otpValue:', otpValue);

        // Check if OTP is complete (no empty values and correct length)
        if (otpValue.length !== otpLength || otp.includes('')) {
            console.error('Please enter complete OTP');
            return;
        }

        const requestId = state.mobileRequestId; // Fixed: use mobileRequestId instead of smsRequestId
        console.log('⚡️ ~ :108 ~ handleVerifyOtp ~ requestId:', requestId);
        if (!requestId) {
            console.error('No phone request ID found. Please resend OTP.');
            return;
        }

        // Add success and error callbacks
        const onSuccess = (data) => {
            console.log('OTP verification successful:', data);
            // You can add additional success handling here
        };

        const onError = (error) => {
            console.error('OTP verification failed:', error);
            // You can add toast notification or other error handling here
        };

        verifyOtp(otpValue, requestId, true, dispatch, onSuccess, onError);
    };

    const handleOnSelect = (item) => {
        setSelectedCountry(item[0]);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');
        setPhone(numericValue);
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
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
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
                                    Verifying OTP...
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleVerifyOtp();
                                    }}
                                    className='btn btn-accent font-normal'
                                    disabled={otp.join('').length !== otpLength || otp.includes('')}
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
                            <div className='w-full min-w-[320px] max-w-[420px] relative flex'>
                                <div className='flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3'>
                                    <span className='text-sm font-medium'>+{selectedCountry?.code || '91'}</span>
                                </div>
                                <input
                                    ref={phoneInputRef}
                                    className={`input input-bordered text-base p-3 h-fit w-full outline-none focus-within:outline-none rounded-l-none border-l-0 ${
                                        otpVerified ? 'pointer-events-none' : ''
                                    }`}
                                    name='phone'
                                    type='tel'
                                    required
                                    placeholder='9876543210'
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                                {otpVerified && (
                                    <MdCheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-xl z-10' />
                                )}
                            </div>
                            {isLoading ? (
                                <div className='flex items-center gap-2 text-accent '>
                                    <div className='loading loading-spinner loading-sm '></div>
                                    Sending OTP...
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
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
                <button
                    className='btn btn-primary btn-outline btn-md'
                    disabled={otpSent && (otp.join('').length !== otpLength || otp.includes(''))}
                >
                    Back
                </button>
                <button className='btn btn-accent btn-md' disabled={!continueAllowed}>
                    Continue
                </button>
            </div>
        </div>
    );
}
