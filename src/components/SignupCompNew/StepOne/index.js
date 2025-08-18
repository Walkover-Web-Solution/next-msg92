import { useSignup } from '../SignupUtils';

export default function StepOne({ onNext }) {
    const { dispatch } = useSignup();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');

        // Fake API request (replace with real API)
        const res = await fetch('/api/send-email-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (data.emailToken) {
            dispatch({ type: 'SET_EMAIL_TOKEN', payload: data.emailToken });
            onNext();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 1: Email Validation</h2>
            <input name='email' type='email' required placeholder='Enter your email' />
            <button type='submit'>Next</button>
        </form>
    );
}
