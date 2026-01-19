import { useEffect } from 'react';
import { useSignup, sendOtp } from '../SignupUtils';
import { useTimer } from '../hooks/useTimer';

export default function RetryComp({ identifier, type }) {
    const { state, dispatch } = useSignup();
    const retryAllowed = state?.allowedRetry?.[type]?.secondary;
    const country = state?.companyDetails?.country;
    const otpSent = state.otpSent;
    const otpVerified = type === 'mobile' ? state.mobileOtpVerified : false;

    const { timer, isExpired, startTimer } = useTimer(5, false);

    useEffect(() => {
        if (otpSent && !otpVerified) {
            startTimer(5);
        }
    }, [otpSent, otpVerified]);

    const handleRetry = (channel) => {
        console.log(`Retrying OTP via ${channel} for ${identifier}`);
        sendOtp(identifier, type === 'mobile', dispatch);
        startTimer(5);
    };

    return (
        <div className='flex items-center text-sm text-gray-500'>
            {isExpired && retryAllowed && retryAllowed.length > 0 && (
                <div className='flex items-center gap-1 flex-wrap'>
                    <span>Resend OTP using</span>
                    {retryAllowed.map((option, index) => (
                        <span key={index}>
                            <span
                                className='ms-1 text-link active-link cursor-pointer uppercase'
                                onClick={() => handleRetry(option?.channel)}
                            >
                                {option?.channel}
                            </span>
                            {index < retryAllowed.length - 1 && <span className='mx-1'>or</span>}
                        </span>
                    ))}
                </div>
            )}
            {!isExpired && <span className='text-gray-400'>Retry available in {timer}s</span>}
        </div>
    );
}
