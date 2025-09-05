import { useEffect } from 'react';
import checkSession, { otpWidgetSetup, SignupProvider, useSignup } from '../SignupUtils';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';

// Create a separate component that uses the context
function SignupSteps() {
    const { state, dispatch } = useSignup();

    // To set the step to a specific value
    const setStep = (stepNumber) => {
        dispatch({
            type: 'SET_ACTIVE_STEP',
            payload: stepNumber,
        });
    };

    useEffect(() => {
        otpWidgetSetup(
            dispatch,
            (data) => {},
            (error) => {
                console.error('Widget initialization failed:', error);
            }
        );
        checkSession();
    }, [dispatch]);

    useEffect(() => {
        console.log('SignupSteps - State updated:', {
            widgetData: state.widgetData,
            allowedRetry: state.allowedRetry,
            activeStep: state.activeStep,
        });
    }, [state]);

    return (
        <div className='flex h-screen w-full'>
            <div className='h-full w-1/3 min-w-[320px] max-w-full bg-secondary'></div>
            <div className='w-full p-12'>
                {state.activeStep === 1 && <StepOne onNext={() => setStep(2)} />}
                {state.activeStep === 2 && <StepTwo onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {state.activeStep === 3 && <StepThree onBack={() => setStep(2)} />}
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <SignupProvider>
            <SignupSteps />
        </SignupProvider>
    );
}
