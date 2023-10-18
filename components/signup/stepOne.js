import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

class StepOne extends React.Component {
    render() {
        return (
            <>
                <div className="step-one d-grid">
                    <div className="stepone__dev d-grid gap-3">
                        <p className="stepone__dev__que c-fs-7 ">Are you a developer?</p>
                        <div className="stepone__dev__icons">
                            <a href="/github-auth?signup=true">
                                <button
                                    className="product-btn btn rounded border border-dark social-btn d-flex justify-content-center align-items-center"
                                    onClick={() => this.props.signupByGitHubAccount()}
                                >
                                    <img src="/img/icon-github.svg" alt="Github" />
                                </button>
                            </a>
                        </div>
                    </div>
                    <span className="step-one__break c-fs-7 d-flex align-items-center gap-3">
                        or<span className="step-one__break__line"></span>
                    </span>
                    <div className="step-one__nondev">
                        <button
                            className="step-one__nondev__withemail btn btn-login-prime c-fs-7"
                            onClick={() => this.props.setStep(2)}
                        >
                            Sign up with Email
                            <MdKeyboardArrowRight />
                        </button>
                    </div>
                    <p className="step-one__login c-text c-fs-7">
                        If you already have an account, <a href="/signin" className='text-hover-underline'>Login</a>
                    </p>
                </div>
            </>
        );
    }
}
export default StepOne;
