import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SingupComp';
import { useRouter } from 'next/router';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const router = useRouter();
    const { absignup } = router.query;
    const isAbSignup = absignup === 'a';

    return (
        <>
            <SignUp pageInfo={pageInfo} data={data} browserPathCase={browserPathCase} isAbSignup={isAbSignup} />
            <SignupPage pageInfo={pageInfo} data={data} isAbSignup={isAbSignup} />
        </>
    );
}
