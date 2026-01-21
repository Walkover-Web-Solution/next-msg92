import { useEffect } from 'react';
import { useSignup } from './index';
import { MdClose, MdError, MdCheckCircle, MdInfo, MdWarning } from 'react-icons/md';

/**
 * Toast notification component with modern styling
 * @param {string} type - Toast type (danger, success, info, warning)
 * @param {number} duration - Auto-dismiss duration in ms (default 5000)
 */
export default function Toast({ type = 'danger', duration = 5000 }) {
    const { state, dispatch } = useSignup();

    useEffect(() => {
        if (!state.error) return;

        const timer = setTimeout(() => {
            dispatch({ type: 'CLEAR_ERROR' });
        }, duration);

        return () => clearTimeout(timer);
    }, [state.error, duration, dispatch]);

    const handleClose = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    if (!state.error) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <MdCheckCircle className='text-2xl' />;
            case 'info':
                return <MdInfo className='text-2xl' />;
            case 'warning':
                return <MdWarning className='text-2xl' />;
            default:
                return <MdError className='text-2xl' />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-500 text-green-800';
            case 'info':
                return 'bg-blue-50 border-blue-500 text-blue-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-500 text-yellow-800';
            default:
                return 'bg-red-50 border-red-500 text-red-800';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-500';
            case 'info':
                return 'text-blue-500';
            case 'warning':
                return 'text-yellow-500';
            default:
                return 'text-red-500';
        }
    };

    return (
        <div className='fixed top-4 right-4 z-50 animate-slide-in-right'>
            <div
                className={`${getStyles()} border-l-4 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md flex items-start gap-3 animate-fade-in`}
                role='alert'
            >
                <div className={getIconColor()}>{getIcon()}</div>
                <div className='flex-1'>
                    <p className='font-medium text-sm leading-relaxed'>{state.error}</p>
                </div>
                <button
                    onClick={handleClose}
                    className='text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0'
                    aria-label='Close notification'
                >
                    <MdClose className='text-xl' />
                </button>
            </div>
            <style jsx>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-in;
                }
            `}</style>
        </div>
    );
}
