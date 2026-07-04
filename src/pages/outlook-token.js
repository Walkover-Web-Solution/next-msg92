import { getQueryParamsDeatils, getQueryStringFromObject } from '@/utils/utilis';
import React from 'react';

class githubToken extends React.Component {
    componentDidMount() {
        const queryParams = getQueryParamsDeatils(window.location.href);
        if (queryParams) {
            const queryValue = getQueryStringFromObject(queryParams);
            window.location.href = `${process.env.REDIRECT_URL}/signin?loginWithOutlook=true&${queryValue}`;
        }
    }

    render() {
        return (
            <section className='min-h-dvh w-full flex items-center justify-center'>
                <div className='h-full flex items-center justifyt-center flex-col gap-2'>
                    <img
                        className='msg91-logo'
                        src='/img/logo.svg'
                        alt='MSG91'
                        width='150'
                        height='48'
                        loading='lazy'
                    />
                    <p>Redirecting to MSG91...</p>
                </div>
            </section>
        );
    }
}
export default githubToken;
