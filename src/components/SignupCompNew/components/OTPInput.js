import { useOTPInput } from '../hooks/useOTPInput';
import { forwardRef, useImperativeHandle } from 'react';
import style from './OTPInput.module.scss';

/**
 * Reusable OTP Input Component
 * @param {number} length - OTP length
 * @param {Function} onComplete - Callback when OTP is complete (auto-triggered)
 * @param {Function} onVerify - Optional manual verify callback
 * @param {boolean} showVerifyButton - Show manual verify button
 * @param {boolean} autoFocus - Auto focus first input
 * @param {boolean} disabled - Disable inputs
 */
const OTPInput = forwardRef(
    ({ length = 6, onComplete, onVerify, showVerifyButton = false, autoFocus = false, disabled = false }, ref) => {
        const { otp, otpInputRefs, handleOtpChange, handleOtpKeyDown, isOtpComplete, getOtpValue, resetOtp } =
            useOTPInput(length, autoFocus);

        // Expose resetOtp to parent component
        useImperativeHandle(ref, () => ({
            resetOtp: () => {
                resetOtp();
            },
        }));

        const handleChange = (index, value) => {
            handleOtpChange(index, value);

            if (onComplete && isOtpComplete()) {
                setTimeout(() => {
                    onComplete(getOtpValue());
                }, 100);
            }
        };

        const handleVerifyClick = () => {
            if (onVerify && isOtpComplete()) {
                onVerify(getOtpValue());
            }
        };

        const handleKeyDown = (index, e) => {
            handleOtpKeyDown(index, e, () => {
                if (onVerify && isOtpComplete()) {
                    onVerify(getOtpValue());
                }
            });
        };

        return (
            <div className='flex items-center gap-2' role='group' aria-label='OTP Input'>
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
                        onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        placeholder='*'
                        autoComplete='one-time-code'
                        disabled={disabled}
                        aria-label={`OTP digit ${index + 1}`}
                    />
                ))}
                {showVerifyButton && (
                    <button
                        onClick={handleVerifyClick}
                        className='btn btn-accent font-normal'
                        disabled={!isOtpComplete() || disabled}
                    >
                        Verify OTP
                    </button>
                )}
            </div>
        );
    }
);

OTPInput.displayName = 'OTPInput';

export default OTPInput;
