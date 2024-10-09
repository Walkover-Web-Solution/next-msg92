import React from 'react';
import { MdChevronRight, MdKeyboardArrowRight } from 'react-icons/md';
import { loginWithGitHubAccount } from '@/utils/utilis';
import Link from 'next/link';

class StepOne extends React.Component {
    signupWithGitHub = () => {
        loginWithGitHubAccount(false);
    };
    render() {
        return (
            <>
                <div className='flex flex-col gap-4'>
                    <h2>Are you a developer?</h2>
                    <button className='btn btn-md h-10 btn-outline' onClick={() => this.signupWithGitHub()}>
                        <img src='/img/icon-github.svg' alt='Github' />
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
                        <Link className='text-link active-link' href='/signin'>
                            Login
                        </Link>
                    </p>
                </div>
            </>
        );
    }
}
export default StepOne;
