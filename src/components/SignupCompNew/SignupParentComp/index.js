import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SingupComp';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const router = useRouter();
    const [isAbSignup, setIsAbSignup] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setIsAbSignup(router.query.absignup === 'a');
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
