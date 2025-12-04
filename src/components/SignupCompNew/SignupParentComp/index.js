import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SingupComp';
import getURLParams from '@/utils/getURLParams';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const isAbSignup = getURLParams(browserPathCase)?.absignup === 'a';

    return (
        <>
            <SignUp pageInfo={pageInfo} data={data} browserPathCase={browserPathCase} isAbSignup={isAbSignup} />
            <SignupPage pageInfo={pageInfo} data={data} isAbSignup={isAbSignup} />
        </>
    );
}
