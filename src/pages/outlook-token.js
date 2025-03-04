import { getQueryParamsDeatils, getQueryStringFromObject } from '@/utils/utilis';
import React from 'react';

class githubToken extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams) {
            let queryValue = getQueryStringFromObject(queryParams);
            location.href = `${process.env.REDIRECT_URL}/signin?loginWithOutlook=true&${queryValue}`;
        }
    }

    render() {
        return (
            <section className='min-h-dvh w-full flex items-center justify-center'>
                <div className='h-full flex items-center justifyt-center flex-col gap-2'>
                    <img className='msg91-logo' src='/img/logo.svg' alt='MSG91' width='150' />
                    <p>Redirecting to MSG91...</p>
                </div>
            </section>
        );
    }
}
export default githubToken;
