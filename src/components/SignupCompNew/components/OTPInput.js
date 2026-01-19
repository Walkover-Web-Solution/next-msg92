import { useOTPInput } from '../hooks/useOTPInput';
import style from './OTPInput.module.scss';

/**
 * Reusable OTP Input Component
 * @param {number} length - OTP length
 * @param {Function} onComplete - Callback when OTP is complete
 * @param {boolean} autoFocus - Auto focus first input
 * @param {boolean} disabled - Disable inputs
 */
export default function OTPInput({ length = 6, onComplete, autoFocus = false, disabled = false }) {
    const { otp, otpInputRefs, handleOtpChange, handleOtpKeyDown, isOtpComplete, getOtpValue } = useOTPInput(
        length,
        autoFocus
    );

    const handleChange = (index, value) => {
        handleOtpChange(index, value);

        if (onComplete && isOtpComplete()) {
            setTimeout(() => {
                onComplete(getOtpValue());
            }, 100);
        }
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
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    placeholder='*'
                    autoComplete='one-time-code'
                    disabled={disabled}
                    aria-label={`OTP digit ${index + 1}`}
                />
            ))}
        </div>
    );
}
