import Image from 'next/image';
import { useSignup, sendOtp, verifyOtp } from '../SignupUtils';
import { useEffect, useState, useRef } from 'react';
import style from './StepTwo.module.scss';
import { Typeahead } from 'react-bootstrap-typeahead';
import GetCountryDetails from '@/utils/getCurrentCountry';
import countries from '@/data/countries.json';
import { MdCheckCircle } from 'react-icons/md';
import intlTelInput from 'intl-tel-input';
import phoneStyles from './intl-tel-input-custom.module.css';
import getCountyFromIP from '@/utils/getCountyFromIP';

export default function StepTwo({ pageInfo }) {
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
    console.log('⚡️ ~ :26 ~ StepTwo ~ selectedCountry:', selectedCountry);
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        const fetchCountryFromIP = async () => {
            try {
                const countryCodeFromIP = await getCountyFromIP();
                setCountryCode(countryCodeFromIP);
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

        // Get the full international number from intl-tel-input if available
        if (itiRef.current) {
            phoneNumber = itiRef.current.getNumber();
        }

        if (!phoneNumber) {
            console.error('Please enter phone number');
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

        // Only use email request ID for email verification
        const requestId = state.phoneRequestId;
        if (!requestId) {
            console.error('No phone request ID found. Please resend OTP.');
            return;
        }

        verifyOtp(
            otpValue,
            requestId,
            false, // notByEmail - false for email verification
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
        console.log('⚡️ ~ handleOnSelect ~ selected country:', item[0]);
        setSelectedCountry(item[0]);
    };

    // Initialize intl-tel-input
    useEffect(() => {
        if (phoneInputRef.current && !itiRef.current) {
            itiRef.current = intlTelInput(phoneInputRef.current, {
                initialCountry: selectedCountry?.shortname?.toLowerCase() || 'auto',
                preferredCountries: ['in', 'us', 'gb'],
                separateDialCode: true,
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
            });

            // Update phone state when country changes
            phoneInputRef.current.addEventListener('countrychange', () => {
                if (itiRef.current) {
                    const selectedCountryData = itiRef.current.getSelectedCountryData();
                    const fullNumber = itiRef.current.getNumber();
                    console.log('⚡️ ~ intl-tel-input ~ selected country:', selectedCountryData);
                    console.log('⚡️ ~ :130 ~ phoneInputRef.current.addEventListener ~ fullNumber:', fullNumber);
                    setPhone(fullNumber);
                }
            });
        }

        return () => {
            if (itiRef.current) {
                itiRef.current.destroy();
                itiRef.current = null;
            }
        };
    }, [selectedCountry]);

    // Handle phone input change
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);

        if (itiRef.current) {
            const fullNumber = itiRef.current.getNumber();
            setPhone(fullNumber);
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
                        defaultSelected={
                            pageInfo?.country !== 'global'
                                ? [countries?.find((item) => item.shortname === selectedCountry?.shortname)]
                                : []
                        }
                        inputProps={{
                            autoComplete: 'off',
                        }}
                    />
                </div>
                {otpSent && otpLength ? (
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
                                <button onClick={handleSendOtp} className='btn btn-accent font-normal '>
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
