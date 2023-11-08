import React from 'react';
import { getQueryParamsDeatils, getQueryStringFromObject } from '@/components/utils';

class githubToken extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let queryParams = getQueryParamsDeatils(this.props?.browserPathCase);
        if (queryParams) {
            if (queryParams?.githublogin === 'true') {
                let queryValue = getQueryStringFromObject(queryParams);
                location.href = `${process.env.REDIRECT_URL}/signin?${queryValue}`;
            }
            if (queryParams?.githubsignup === 'true') {
                let queryValue = getQueryStringFromObject(queryParams);
                location.href = `${process.env.REDIRECT_URL}/signup?${queryValue}`;
            }
        }
    }

    render() {
        return (
            <section className='h-100'>
                <div className='h-100 d-flex align-items-center justify-content-center flex-column gap-2'>
                    <img className="msg91-logo" src="/img/logo.svg" alt="MSG91" width="150"/>
                    <p>Redirecting to MSG91...</p>
                </div>
            </section>
        );
    }
}
export default githubToken;
