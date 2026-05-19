import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setSharedCookie } from '@/utils/utilis';
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
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const sharedParams = new URLSearchParams(window.location.search);
        sharedParams.forEach((value, key) => {
            setSharedCookie(key, value, 1);
        });
    }, [router.asPath]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = getURLParams(window.location.search);
            const isGithubReturn =
                urlParams?.code && (urlParams?.githubsignup === true || urlParams?.githubsignup === 'true');
            if (isGithubReturn || (!state.emailVerified && !state.mobileOtpVerified)) {
                setInitialStates(dispatch, state, urlParams);
            }
            handleUtmParams(dispatch, urlParams);
        }

        otpWidgetSetup(dispatch);

        checkSession();
    }, [dispatch]);

    return (
        <div
            className={`flex w-full min-h-screen flex-col-reverse lg:h-screen lg:flex-row ${isAbSignup ? '' : 'hidden'}`}
        >
            <Sidebar />
            <div className='w-full p-4 sm:p-12 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overflow-x-hidden'>
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
