import { useEffect } from 'react';
import { useSignup } from './index';
export default function Toast({ type }) {
    const { state } = useSignup();

    useEffect(() => {
        if (!state.error) return;
        const timer = setTimeout(() => {
            if (type === 'danger') {
                const { dispatch } = useSignup();
                dispatch && dispatch({ type: 'CLEAR_ERROR' });
            }
        }, 15000);
        return () => clearTimeout(timer);
    }, [state.error, type]);

    return (
        <div className={`toast toast-top toast-end ${state.error ? 'toast-shown' : 'toast-hidded'}`}>
            <div className={`alert alert-${type}`}>
                <span>{state.error}</span>
            </div>
        </div>
    );
}
