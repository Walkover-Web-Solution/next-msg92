import { useSignup } from '../SignupUtils';

export default function StepThree({ onBack }) {
    const { state, dispatch } = useSignup();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const details = {
            fullName: form.get('fullName'),
            dob: form.get('dob'),
            password: form.get('password'),
        };

        dispatch({ type: 'SET_PERSONAL', payload: details });

        // Final API call
        const res = await fetch('/api/final-signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailToken: state.emailToken,
                mobileToken: state.mobileToken,
                personal: details,
            }),
        });

        const data = await res.json();
        if (data.success) {
            alert('Signup Complete!');
            dispatch({ type: 'RESET' });
            window.location.href = '/welcome';
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step 3: Personal Details</h2>
            <input name='fullName' required placeholder='Full Name' />
            <input name='dob' type='date' required />
            <input name='password' type='password' required placeholder='Password' />
            <div>
                <button type='button' onClick={onBack}>
                    Back
                </button>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
}
