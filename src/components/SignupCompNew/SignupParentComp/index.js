import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SignupComp';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCookie } from '@/utils/utilis';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const router = useRouter();
    const [isAbSignup, setIsAbSignup] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            const fromQuery = router.query.absignup === 'a';
            const fromCookie = getCookie('absignup') === 'a';
            setIsAbSignup(fromQuery || fromCookie);
        }
    }, [router.isReady, router.query]);

    if (isAbSignup === null) return null;

    return (
        <>
            <SignUp pageInfo={pageInfo} data={data} browserPathCase={browserPathCase} isAbSignup={isAbSignup} />
            <SignupPage pageInfo={pageInfo} data={data} isAbSignup={isAbSignup} />
        </>
    );
}
