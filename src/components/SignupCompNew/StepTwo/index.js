import Image from 'next/image';
import { useSignup, sendOtp, verifyOtp, setDetails, validateSignUp, resetPhoneOtp } from '../SignupUtils';
import { getAvailableOtpMethods } from '../SignupUtils/otpUtils';
import { useEffect, useState, useRef, useMemo } from 'react';
import { MdEdit } from 'react-icons/md';
import { Typeahead } from 'react-bootstrap-typeahead';
import OTPInput from '../components/OTPInput';
import ResendOTP from '../components/ResendOTP';
import PhoneInput from '../components/PhoneInput';
import FormInput from '../components/FormInput';
import { useCountrySelector } from '../hooks/useCountrySelector';

export default function StepTwo() {
    const { state, dispatch } = useSignup();
    const otpInputRef = useRef(null);

    const isLoading = state.isLoading;
    const otpSent = state.otpSent;
    const otpVerified = state.mobileOtpVerified;
    const mobileIdentifier = state.mobileIdentifier;
    const userDetails = state.userDetails;

    const [name, setName] = useState(
        userDetails?.firstName ? `${userDetails.firstName} ${userDetails.lastName || ''}`.trim() : ''
    );
    const [companyName, setCompanyName] = useState(state.companyDetails?.companyName || '');
    const [phone, setPhone] = useState(mobileIdentifier || '');
    const [phoneCountry, setPhoneCountry] = useState(null);
    const [continueAllowed, setContinueAllowed] = useState(false);

    const otpLength = state.widgetData?.otpLength || 6;

    const primaryChannels = useMemo(
        () => getAvailableOtpMethods(state?.allowedRetry?.mobile?.primary, phoneCountry),
        [state?.allowedRetry?.mobile?.primary, phoneCountry]
    );

    const secondaryChannels = useMemo(
        () => getAvailableOtpMethods(state?.allowedRetry?.mobile?.secondary, phoneCountry),
        [state?.allowedRetry?.mobile?.secondary, phoneCountry]
    );

    const {
        countries,
        selectedCountry: localSelectedCountry,
        setSelectedCountry: setLocalSelectedCountry,
    } = useCountrySelector();

    // Use root state selectedCountry if available, otherwise use local
    const selectedCountry = state.selectedCountry || localSelectedCountry;

    // Sync local selectedCountry with root state
    useEffect(() => {
        if (state.selectedCountry && state.selectedCountry.id !== localSelectedCountry?.id) {
            setLocalSelectedCountry(state.selectedCountry);
        }
    }, [state.selectedCountry]);

    useEffect(() => {
        if (otpVerified && name && companyName && phone) {
            setContinueAllowed(true);
        }
    }, [otpVerified, name, companyName, phone]);

    const handleSendOtp = () => {
        const phoneNumber = phone?.trim();

        if (!phoneNumber) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter a phone number' });
            return;
        }

        // Phone is already in E.164 format from react-phone-number-input (e.g., +919876543210)
        sendOtp(phoneNumber, true, dispatch);
    };

    const handleResendWithChannel = (channel) => {
        const phoneNumber = phone?.trim();

        if (!phoneNumber) {
            dispatch({ type: 'SET_ERROR', payload: 'Please enter a phone number' });
            return;
        }

        // Phone is already in E.164 format from react-phone-number-input (e.g., +919876543210)
        sendOtp(phoneNumber, true, dispatch, channel);
    };

    const handleVerifyOtp = (otpValue) => {
        const requestId = state.mobileRequestId;
        if (!requestId) {
            dispatch({ type: 'SET_ERROR', payload: 'No phone request ID found. Please resend OTP.' });
            return;
        }

        const onSuccess = (data) => {};

        const onError = (error) => {};

        verifyOtp(otpValue, requestId, true, dispatch, state, onSuccess, onError);
    };

    const handleOnSelect = (item) => {
        if (item.length === 0) {
            // User cleared the selection
            dispatch({
                type: 'SET_SELECTED_COUNTRY',
                payload: null,
            });
            setLocalSelectedCountry(null);
            return;
        }

        const country = item[0];
        if (country) {
            // Update root state
            dispatch({
                type: 'SET_SELECTED_COUNTRY',
                payload: country,
            });
            // Also update local state for immediate UI update
            setLocalSelectedCountry(country);
        }
    };

    const handleDetailsBlur = (type) => {
        if (type === 'name') {
            setDetails('userDetails', dispatch, name);
        } else if (type === 'companyName') {
            setDetails('companyName', dispatch, companyName);
        } else if (type === 'phone') {
            setDetails('phone', dispatch, phone);
        }
    };

    const handleContinue = () => {
        if (continueAllowed) {
            validateSignUp(dispatch, state);
        }
    };

    const handleEditPhone = () => {
        resetPhoneOtp(dispatch);
    };

    const handleResendOtp = () => {
        handleSendOtp();
    };

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <h1 className='text-2xl text-primary'>Personal Details</h1>
            </div>
            <div className='cont gap-3'>
                <FormInput
                    label='Full Name'
                    name='Name'
                    type='text'
                    required
                    placeholder='John Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleDetailsBlur('name')}
                />

                <FormInput
                    label='Company Name'
                    name='companyName'
                    type='text'
                    required
                    placeholder='Walkover'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => handleDetailsBlur('companyName')}
                />

                <div className='cont gap-1'>
                    <p className='text-gray-500'>Country</p>
                    <Typeahead
                        className='country-list w-full min-w-[320px] max-w-[420px]'
                        id='country'
                        placeholder='Country'
                        labelKey='name'
                        onChange={handleOnSelect}
                        options={countries}
                        selected={selectedCountry && selectedCountry.name ? [selectedCountry] : []}
                        emptyLabel='No countries found'
                        selectHintOnEnter
                        inputProps={{
                            autoComplete: 'off',
                        }}
                    />
                </div>

                {otpSent && otpLength ? (
                    <div className='cont gap-3'>
                        <p className='text-gray-500'></p>
                        <div className='flex items-end gap-2'>
                            <p className='text-gray-500'>
                                OTP sent to <strong>{phone}</strong>
                            </p>
                            <MdEdit
                                className='text-gray-500 hover:text-accent cursor-pointer mb-1'
                                onClick={handleEditPhone}
                                aria-label='Edit phone'
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
                            onResend={handleSendOtp}
                            onResendWithChannel={handleResendWithChannel}
                            onReset={() => otpInputRef.current?.resetOtp()}
                            secondaryChannels={secondaryChannels}
                            initialTime={30}
                            autoStart={true}
                        />
                    </div>
                ) : (
                    <div className='cont gap-2'>
                        <p className='text-gray-500'>Phone Number</p>
                        <div className='flex items-center gap-4'>
                            <PhoneInput
                                value={phone}
                                onChange={setPhone}
                                onCountryChange={setPhoneCountry}
                                onBlur={() => handleDetailsBlur('phone')}
                                defaultCountry={selectedCountry}
                                verified={otpVerified}
                                placeholder='9876543210'
                            />
                            {!otpVerified &&
                                (isLoading ? (
                                    <div className='flex items-center gap-2 text-accent'>
                                        <div className='loading loading-spinner loading-sm'></div>
                                        Sending OTP...
                                    </div>
                                ) : (
                                    <button onClick={handleSendOtp} className='btn btn-accent font-normal'>
                                        Verify
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='flex gap-4'>
                <button
                    className='btn btn-primary btn-outline btn-md'
                    onClick={() => {
                        dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
                    }}
                >
                    Back
                </button>
                <button onClick={handleContinue} className='btn btn-accent btn-md' disabled={!continueAllowed}>
                    Continue
                </button>
            </div>
        </div>
    );
}
