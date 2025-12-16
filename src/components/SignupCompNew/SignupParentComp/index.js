import SignUp from '@/components/signupComp/SignUp';
import SignupPage from '../SingupComp';
import getURLParams from '@/utils/getURLParams';

export default function SignupParentComp({ pageInfo, data, browserPathCase }) {
    const urlParams = getURLParams(browserPathCase);
    if (urlParams?.absignup === 'a') {
        return <SignupPage pageInfo={pageInfo} data={data} />;
    } else {
        return <SignUp pageInfo={pageInfo} data={data} browserPathCase={browserPathCase} />;
    }
}
