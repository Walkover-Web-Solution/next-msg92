import { useTimer } from '../hooks/useTimer';
import { useEffect } from 'react';

/**
 * Unified Resend OTP Component with Timer
 * Handles both single method (shows "Resend OTP") and multiple methods (shows all channels)
 * @param {Function} onResend - Callback when resend is clicked (primary channel)
 * @param {Function} onResendWithChannel - Callback when alternative channel is clicked
 * @param {Function} onReset - Optional callback to reset OTP fields
 * @param {Array} secondaryChannels - Array of available retry channels
 * @param {number} initialTime - Initial countdown time (default 30s)
 * @param {boolean} autoStart - Auto start timer
 */
export default function ResendOTP({
    onResend,
    onResendWithChannel,
    onReset,
    secondaryChannels = [],
    initialTime = 30,
    autoStart = false,
}) {
    const { timer, isExpired, startTimer } = useTimer(initialTime, autoStart);
    const hasMultipleMethods = secondaryChannels.length > 1;

    useEffect(() => {
        if (autoStart) {
            startTimer(initialTime);
        }
    }, [autoStart]);

    const handleResend = (channel = null) => {
        if (onReset) {
            onReset(); // Reset OTP fields
        }

        if (channel && onResendWithChannel) {
            onResendWithChannel(channel); // Send OTP via specific channel
        } else {
            onResend(); // Send OTP via primary channel
        }

        startTimer(initialTime); // Restart timer
    };

    // Show timer countdown while waiting
    if (!isExpired) {
        return (
            <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-400'>Resend OTP in {timer}s</span>
            </div>
        );
    }

    // If only 1 method available, show simple "Resend OTP" button
    if (!hasMultipleMethods) {
        return (
            <div className='flex items-center gap-2'>
                <span className='text-sm text-link active-link cursor-pointer' onClick={() => handleResend()}>
                    Resend OTP
                </span>
            </div>
        );
    }

    // If multiple methods available, show all channel options
    return (
        <div className='flex items-center text-sm text-gray-500'>
            <div className='flex items-center gap-1 flex-wrap'>
                <span>Resend OTP using</span>
                {secondaryChannels.map((option, index) => (
                    <span key={index}>
                        <span
                            className='ms-1 text-link active-link cursor-pointer uppercase'
                            onClick={() => handleResend(option?.channel)}
                        >
                            {option?.channel}
                        </span>
                        {index < secondaryChannels.length - 1 && <span className='mx-1'>or</span>}
                    </span>
                ))}
            </div>
        </div>
    );
}
