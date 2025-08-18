import { useSignup } from '../SignupUtils';

export default function Steptwo({ onNext, onBack }) {
    const { dispatch } = useSignup();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const mobile = form.get('mobile');

        const res = await fetch('/api/send-mobile-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile }),
        });
        const data = await res.json();

        if (data.mobileToken) {
            dispatch({ type: 'SET_MOBILE_TOKEN', payload: data.mobileToken });
            onNext();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 2: Mobile Validation</h2>
            <input name='mobile' type='tel' required placeholder='Enter your mobile' />
            <div>
                <button type='button' onClick={onBack}>
                    Back
                </button>
                <button type='submit'>Next</button>
            </div>
        </form>
    );
}
