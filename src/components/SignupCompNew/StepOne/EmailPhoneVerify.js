import { MdCheckCircle, MdEdit } from 'react-icons/md';
import OTPInput from '../components/OTPInput';
import ResendOTP from '../components/ResendOTP';
import PhoneInput from '../components/PhoneInput';

export default function EmailPhoneVerify({
    email,
    setEmail,
    phone,
    setPhone,
    setPhoneCountry,
    emailInputRef,
    emailOtpInputRef,
    phoneOtpInputRef,
    otpLength,
    emailVerified,
    mobileOtpVerified,
    emailOtpPending,
    phoneOtpPending,
    emailLoading,
    phoneLoading,
    loadingType,
    pendingOtpFor,
    emailIdentifier,
    mobileIdentifier,
    verifiedEmailLabel,
    selectedCountry,
    emailSecondaryChannels,
    mobileSecondaryChannels,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
    handleEditEmail,
    handleEditVerifiedEmail,
    handleResendEmailOtp,
    handleSendPhoneOtp,
    handleVerifyPhoneOtp,
    handleEditPhone,
    handleEditVerifiedPhone,
    handleResendPhoneOtp,
    handleResendPhoneWithChannel,
    handlePhoneBlur,
}) {
    return (
        <>
            {emailVerified ? (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Email Address</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <div className='relative flex-1 min-w-0 max-w-[420px]'>
                            <div className='input input-bordered text-base p-3 h-fit w-full bg-gray-50'>
                                <span className='text-sm sm:text-base truncate block'>{verifiedEmailLabel}</span>
                            </div>
                            <MdCheckCircle
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-xl'
                                aria-label='Email verified'
                            />
                        </div>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer text-xl self-center'
                            onClick={handleEditVerifiedEmail}
                            aria-label='Edit email'
                        />
                    </div>
                </div>
            ) : emailOtpPending && otpLength ? (
                <div className='cont gap-3'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <p className='text-gray-500 text-sm sm:text-base'>
                            OTP sent to <strong className='break-all'>{emailIdentifier}</strong>
                        </p>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer shrink-0'
                            onClick={handleEditEmail}
                            aria-label='Edit email'
                        />
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <OTPInput
                            ref={emailOtpInputRef}
                            length={otpLength}
                            onComplete={handleVerifyEmailOtp}
                            onVerify={handleVerifyEmailOtp}
                            showVerifyButton={true}
                            autoFocus={true}
                            disabled={loadingType === 'verify' && pendingOtpFor === 'email'}
                        />
                        {emailLoading && (
                            <div className='flex items-center gap-2 text-accent text-sm'>
                                <div className='loading loading-spinner loading-sm'></div>
                                {loadingType === 'send' ? 'Sending OTP...' : 'Verifying OTP...'}
                            </div>
                        )}
                    </div>
                    <ResendOTP
                        onResend={handleResendEmailOtp}
                        onReset={() => emailOtpInputRef.current?.resetOtp()}
                        secondaryChannels={emailSecondaryChannels}
                        initialTime={30}
                        autoStart={true}
                    />
                </div>
            ) : (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Email ID</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <input
                            ref={emailInputRef}
                            maxLength={244}
                            className='input input-bordered text-base p-3 h-fit w-full max-w-[420px]'
                            name='email'
                            type='email'
                            required
                            placeholder='support@msg91.com'
                            pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendEmailOtp()}
                            aria-label='Email address'
                        />
                        {emailLoading ? (
                            <div className='flex items-center justify-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button
                                onClick={handleSendEmailOtp}
                                className='btn btn-accent font-normal w-full sm:w-auto'
                                disabled={!email?.trim()}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                </div>
            )}

            {phoneOtpPending && otpLength ? (
                <div className='cont gap-3'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <p className='text-gray-500 text-sm sm:text-base'>
                            OTP sent to <strong>{mobileIdentifier}</strong>
                        </p>
                        <MdEdit
                            className='text-gray-500 hover:text-accent cursor-pointer shrink-0'
                            onClick={handleEditPhone}
                            aria-label='Edit phone'
                        />
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <OTPInput
                            ref={phoneOtpInputRef}
                            length={otpLength}
                            onComplete={handleVerifyPhoneOtp}
                            onVerify={handleVerifyPhoneOtp}
                            showVerifyButton={true}
                            autoFocus={true}
                            disabled={loadingType === 'verify' && pendingOtpFor === 'mobile'}
                        />
                        {phoneLoading && (
                            <div className='flex items-center gap-2 text-accent text-sm'>
                                <div className='loading loading-spinner loading-sm'></div>
                                {loadingType === 'send' ? 'Sending OTP...' : 'Verifying OTP...'}
                            </div>
                        )}
                    </div>
                    <ResendOTP
                        onResend={handleResendPhoneOtp}
                        onResendWithChannel={handleResendPhoneWithChannel}
                        onReset={() => phoneOtpInputRef.current?.resetOtp()}
                        secondaryChannels={mobileSecondaryChannels}
                        initialTime={30}
                        autoStart={true}
                    />
                </div>
            ) : (
                <div className='cont gap-2'>
                    <p className='text-gray-500 text-sm sm:text-base'>Phone Number</p>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            onCountryChange={setPhoneCountry}
                            onBlur={handlePhoneBlur}
                            defaultCountry={selectedCountry}
                            verified={mobileOtpVerified}
                            placeholder='9876543210'
                        />
                        {mobileOtpVerified ? (
                            <MdEdit
                                className='text-gray-500 hover:text-accent cursor-pointer text-xl self-center'
                                onClick={handleEditVerifiedPhone}
                                aria-label='Edit phone number'
                            />
                        ) : phoneLoading ? (
                            <div className='flex items-center justify-center gap-2 text-accent'>
                                <div className='loading loading-spinner loading-sm'></div>
                                Sending OTP...
                            </div>
                        ) : (
                            <button
                                onClick={handleSendPhoneOtp}
                                className='btn btn-accent font-normal w-full sm:w-auto'
                                disabled={!phone?.trim()}
                            >
                                Verify
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
