import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { loginWithGitHubAccount } from '@/utils/utilis';
import Image from 'next/image';
import { getCookie } from '@/utils/utilis';

function getLoginUrlWithQuery() {
    if (typeof window === 'undefined') {
        return process.env.LOGIN_URL || 'https://control.msg91.com/signin/';
    }
    const baseUrl = process.env.LOGIN_URL || 'https://control.msg91.com/signin/';
    const msg91Query = getCookie('msg91_query');
    if (!msg91Query) return baseUrl;
    const queryString = msg91Query.startsWith('?') ? msg91Query.substring(1) : msg91Query;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${queryString}`;
}

class StepOne extends React.Component {
    signupWithGitHub = () => {
        loginWithGitHubAccount(false);
    };
    getLoginUrlWithParams = () => {
        const baseUrl = process.env.LOGIN_URL || 'https://control.msg91.com/signin/';
        if (typeof window === 'undefined') return baseUrl;
        const params = window.location.search;
        return baseUrl + (params || '');
    };
    render() {
        const loginUrl = this.getLoginUrlWithParams();
        return (
            <>
                <div className='flex flex-col gap-8 2xl:w-2/3 xl:w-2/3  max-w-[600px]'>
                    <div className='flex flex-col gap-4'>
                        <h2>Are you a developer?</h2>
                        <button
                            className='btn bg-white border border-black hover:bg-gray-100 hover:border-black btn-md '
                            onClick={() => this.signupWithGitHub()}
                        >
                            <Image src='/img/icon-github.svg' alt='GitHub' width={26} height={24} loading='lazy' />
                        </button>
                    </div>

                    <div className='w-full flex items-center gap-2'>
                        <span>or</span>
                        <span className='h-[1px] w-full bg-gray-200'></span>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <button className='btn btn-accent btn-md ' onClick={() => this.props.setStep(2)}>
                            Sign up with Email
                            <MdChevronRight />
                        </button>
                        <p>
                            If you already have an account,{' '}
                            <a className='text-link active-link' href={loginUrl || 'https://control.msg91.com/signin/'}>
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </>
        );
    }
}
export default StepOne;
