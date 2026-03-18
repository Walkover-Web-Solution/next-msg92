import { useEffect } from 'react';
import checkSession, {
    otpWidgetSetup,
    SignupProvider,
    useSignup,
    setInitialStates,
    handleUtmParams,
} from '../SignupUtils';
import getURLParams from '@/utils/getURLParams';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import Toast from '../SignupUtils/Toast';
import Sidebar from '../Sidebar';

// Create a separate component that uses the context
function SignupSteps({ pageInfo, data, isAbSignup }) {
    const { state, dispatch } = useSignup();

    useEffect(() => {
        // Initialize URL parameters and UTM data first
        if (typeof window !== 'undefined') {
            const urlParams = getURLParams(window.location.search);
            setInitialStates(dispatch, state, urlParams);
            handleUtmParams(dispatch, urlParams);
        }

        // Setup OTP widget
        otpWidgetSetup(dispatch);

        checkSession();
    }, [dispatch]);

    return (
        <div className={`h-screen w-full lg:flex-row flex-col ${isAbSignup ? 'flex' : 'hidden'}`}>
            <Sidebar />
            <div className='w-full h-full overflow-y-auto overflow-x-hidden p-4 sm:p-12'>
                <Toast type='danger' />
                {state.activeStep === 1 && <StepOne pageInfo={pageInfo} />}
                {state.activeStep === 2 && <StepTwo pageInfo={pageInfo} />}
                {state.activeStep === 3 && <StepThree pageInfo={pageInfo} data={data} />}
            </div>
        </div>
    );
}

export default function SignupPage({ pageInfo, data, isAbSignup }) {
    return (
        <SignupProvider>
            <SignupSteps pageInfo={pageInfo} data={data} isAbSignup={isAbSignup} />
        </SignupProvider>
    );
}
