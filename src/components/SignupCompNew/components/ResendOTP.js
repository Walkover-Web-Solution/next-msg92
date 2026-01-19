import { useTimer } from '../hooks/useTimer';
import { useEffect } from 'react';

/**
 * Resend OTP Component with Timer
 * @param {Function} onResend - Callback when resend is clicked
 * @param {number} initialTime - Initial countdown time (default 30s)
 * @param {boolean} autoStart - Auto start timer
 */
export default function ResendOTP({ onResend, initialTime = 30, autoStart = false }) {
    const { timer, isExpired, startTimer } = useTimer(initialTime, autoStart);

    useEffect(() => {
        if (autoStart) {
            startTimer(initialTime);
        }
    }, [autoStart]);

    const handleResend = () => {
        onResend();
        startTimer(initialTime);
    };

    return (
        <div className='flex items-center gap-2'>
            {isExpired ? (
                <span className='text-sm text-link active-link cursor-pointer' onClick={handleResend}>
                    Resend OTP
                </span>
            ) : (
                <span className='text-sm text-gray-400'>Resend OTP in {timer}s</span>
            )}
        </div>
    );
}
