import { useEffect } from 'react';
import { useSignup } from './index';
export default function Toast({ type }) {
    const { state, dispatch } = useSignup();

    useEffect(() => {
        if (!state.error) return;
        const timer = setTimeout(() => {
            dispatch && dispatch({ type: 'CLEAR_ERROR' });
        }, 5000);
        return () => clearTimeout(timer);
    }, [state.error]);

    return (
        <div className={`toast toast-top toast-end ${state.error ? 'toast-shown' : 'toast-hidded'}`}>
            <div className={`alert alert-${type}`}>
                <span>{state.error}</span>
            </div>
        </div>
    );
}
