import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SignupComp';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { clearAbSignupFlag, persistAbSignupFlag } from '@/utils/utilis';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const router = useRouter();
    const [isAbSignup, setIsAbSignup] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        // URL is the source of truth for which signup UI to show.
        const fromQuery = router.query.absignup === 'a';
        setIsAbSignup(fromQuery);

        if (fromQuery) {
            persistAbSignupFlag(7);
        } else {
            clearAbSignupFlag();
        }
    }, [router.isReady, router.query]);

    if (isAbSignup === null) return null;

    if (isAbSignup) {
        return <SignupPage pageInfo={pageInfo} data={data} />;
    }

    return <SignUp pageInfo={pageInfo} data={data} browserPathCase={browserPathCase} />;
}
