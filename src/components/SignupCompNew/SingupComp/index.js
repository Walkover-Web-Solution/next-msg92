import { useState } from 'react';
import { SignupProvider } from '../SignupUtils';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';

export default function SignupPage() {
    const [step, setStep] = useState(0);

    return (
        <SignupProvider>
            <div style={{ maxWidth: 400, margin: '40px auto' }}>
                {step === 0 && <StepOne onNext={() => setStep(1)} />}
                {step === 1 && <StepTwo onNext={() => setStep(2)} onBack={() => setStep(0)} />}
                {step === 2 && <StepThree onBack={() => setStep(1)} />}
            </div>
        </SignupProvider>
    );
}
