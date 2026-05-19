import { useMemo } from 'react';
import { appendMsg91QueryToUrl } from '@/components/SignupCompNew/SignupUtils/cookieUtils';

export default function ThankYouComp({ data }) {
    const loginUrl = useMemo(() => {
        const baseUrl = process.env.LOGIN_URL || 'https://control.msg91.com/signin/';
        return appendMsg91QueryToUrl(baseUrl);
    }, []);
    return (
        <>
            <div className='flex flex-col container py-40 cont_gap'>
                <h1 className='text-5xl text-center font-semibold'>{data}</h1>
                <p className='text-xl text-center font-medium'>
                    In case you want to login again,{' '}
                    <a href={loginUrl} className='text-link active-link '>
                        Click here
                    </a>
                </p>
            </div>
        </>
    );
}
