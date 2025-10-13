import { useEffect } from 'react';
import checkSession, { otpWidgetSetup, SignupProvider, useSignup } from '../SignupUtils';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import Toast from '../SignupUtils/Toast';

// Create a separate component that uses the context
function SignupSteps({ pageInfo, data }) {
    const { state, dispatch } = useSignup();

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

    return (
        <div className='flex h-screen w-full'>
            <div className='h-full w-1/3 min-w-[320px] max-w-full bg-secondary'></div>
            <div className='w-full p-12'>
                <Toast type='danger' />
                {state.activeStep === 1 && <StepOne pageInfo={pageInfo} />}
                {state.activeStep === 2 && <StepTwo pageInfo={pageInfo} />}
                {state.activeStep === 3 && <StepThree pageInfo={pageInfo} data={data} />}
            </div>
        </div>
    );
}

export default function SignupPage({ pageInfo, data }) {
    return (
        <SignupProvider>
            <SignupSteps pageInfo={pageInfo} data={data} />
        </SignupProvider>
    );
}
