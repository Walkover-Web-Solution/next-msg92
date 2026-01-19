import { useEffect } from 'react';
import { useSignup } from './index';
import { MdClose } from 'react-icons/md';

/**
 * Toast notification component
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

    return (
        <div className='toast toast-top toast-end z-50'>
            <div className={`alert alert-${type} shadow-lg flex items-center justify-between gap-2`} role='alert'>
                <span>{state.error}</span>
                <button
                    onClick={handleClose}
                    className='btn btn-sm btn-ghost btn-circle'
                    aria-label='Close notification'
                >
                    <MdClose className='text-lg' />
                </button>
            </div>
        </div>
    );
}
