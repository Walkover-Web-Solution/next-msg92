import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import Otpinput from './comps/otpInput';

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="step-two d-grid gap-4">
                    <div className="step-two__progress d-flex align-items-center gap-3 ">
                        <div className="d-flex align-items-center gap-1 c-fs-5">
                            <MdCheckCircle
                                className={
                                    this.props?.smsAccessToken && this.props?.emailAccessToken ? 'ico-green' : 'ico-grey'
                                }
                            />{' '}
                            Verify email & mobile number
                        </div>
                        <span className="progress-line__none progress-line   d-none d-lg-block"></span>
                        <div className="d-lg-flex align-items-center gap-1 c-fs-5 d-none ico-grey">
                            <MdCheckCircleOutline /> Enter details
                        </div>
                    </div>
                    <div className="step-two__email w-100  d-grid gap-2">
                        <label htmlFor="email" className="step-two__email__lable">
                            Verify email
                        </label>
                        <div className="ver-email d-flex gap-3 align-items-top ">
                            <div className="ver-email__main w-100 py-2">
                                <div className="ver-email-main d-flex gap-3 ver-input ">
                                    <div className="ver-email-main__input col ver-input__input ">
                                        {this.props?.signupByGitHub ? (
                                            <p>Email Verified</p>
                                        ) : (
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailIdentifier"
                                                placeholder="Email Address"
                                                onChange={(e) => this.props.identifierChange(false)}
                                            />
                                        )}
                                        <span className="ver-email-main__input__check">
                                            {this.props?.emailAccessToken && <MdCheckCircle className="ico-green" />}
                                        </span>
                                    </div>
                                    {this.props?.signupByGitHub ? (
                                        <button className="">Change Email</button>
                                    ) : (
                                        <button
                                            className={`ver-email-main__btn btn    ${
                                                this.props?.emailIdentifier ? 'btn-light disabled' : 'btn-login-prime-o'
                                            }`}
                                            onClick={() =>
                                                this.props.sendOtp(
                                                    document.getElementById('emailIdentifier').value,
                                                    false
                                                )
                                            }
                                        >
                                            Get OTP
                                        </button>
                                    )}
                                </div>
                                {this.props?.emailIdentifier && this.props?.emailSuccessMessage ? (
                                    <p className="ver-email-message mt-2 ico-green">
                                        {this.props?.emailSuccessMessage}
                                    </p>
                                ) : null}
                            </div>
                            {this.props?.emailIdentifier ? (
                                <>
                            <span className='hor-line'></span>
                                <div className="ver-email__otp w-100 py-2">
                                    <div className="d-flex flex-column">
                                        <Otpinput
                                            tag="email"
                                            verifyOtp={this.props.verifyOtp}
                                            otpLength={this.props.widgetData?.otpLength}
                                            requestId={this.props.emailRequestId}
                                            notByEmail={false}
                                        />
                                        {this.props.allowedRetry?.email ? (
                                            <p className="col-dark my-3 c-fs-6">
                                                Resend on{' '}
                                                <a
                                                    href={undefined}
                                                    onClick={() =>
                                                        this.props.retryOtp(
                                                            this.props.OTPRetryModes.Email,
                                                            this.props.emailRequestId,
                                                            false
                                                        )
                                                    }
                                                    className="col-primary c-fw-600 p-3 cursor-pointer"
                                                >
                                                    Email
                                                </a>
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                </>
                             ) : null}
                        </div>
                    </div>
                    <div className="step-two__phone  w-100  d-grid gap-2">
                        <label htmlFor="contact" className="step-two__phone__lable">
                            Verify Mobile number
                        </label>
                        <div className="ver-phone d-flex gap-3 align-items-top">
                            <div className="ver-phone__main w-100">
                                <div className="ver-phone-main d-flex gap-3 ver-input">
                                    <div className="ver-phone-main__input col ver-input__input">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contactIdentifier"
                                            placeholder="Mobile number"
                                            onChange={(e) => this.props.identifierChange(true)}
                                        />

                                        <span className="ver-phone-main__input__check">
                                            {this.props?.smsAccessToken && 
                                            <MdCheckCircle className="ico-green" />
                                            }
                                        </span>
                                    </div>
                                    <button
                                        className={`ver-email-main__btn btn    ${
                                            this.props?.smsIdentifier ? 'btn-light disabled' : 'btn-login-prime-o'
                                        }`}
                                        onClick={() =>
                                            this.props.sendOtp(document.getElementById('contactIdentifier').value, true)
                                        }
                                    >
                                        Get OTP
                                    </button>
                                </div>

                                {this.props?.smsIdentifier && this.props?.smsSuccessMessage ? (
                                    <p className="ver-email-message mt-2 ico-green">{this.props?.smsSuccessMessage}</p>
                                ) : null}
                            </div>
                           

                            {this.props?.smsIdentifier ? (
                            <>
                            <span className='hor-line'></span>
                         
                                <div className="ver-email__otp w-100">
                                    <div className="d-flex flex-column">
                                        <Otpinput
                                            tag="sms"
                                            verifyOtp={this.props.verifyOtp}
                                            otpLength={this.props.widgetData?.otpLength}
                                            requestId={this.props.smsRequestId}
                                            notByEmail={true}
                                        />
                                        <p className="col-dark my-3 c-fs-6 p-2">
                                            Resend on{' '}
                                            {this.props.allowedRetry?.sms ? (
                                                <a
                                                    href={undefined}
                                                    onClick={() =>
                                                        this.props.retryOtp(
                                                            this.props.OTPRetryModes.Sms,
                                                            this.props.smsRequestId,
                                                            true
                                                        )
                                                    }
                                                    className="col-primary c-fw-600 p-3 cursor-pointer"
                                                >
                                                    Text
                                                </a>
                                            ) : null}
                                            {this.props.allowedRetry?.whatsApp ? (
                                                <span>
                                                    {this.props.allowedRetry?.sms && <span>or </span>}
                                                    <a
                                                        href={undefined}
                                                        onClick={() =>
                                                            this.props.retryOtp(
                                                                this.props.OTPRetryModes.Whatsapp,
                                                                this.props.smsRequestId,
                                                                true
                                                            )
                                                        }
                                                        className="col-primary c-fw-600 p-3 cursor-pointer"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </span>
                                            ) : null}
                                            {this.props.allowedRetry?.voice ? (
                                                <span>
                                                    {(this.props.allowedRetry?.sms ||
                                                        this.props.allowedRetry?.whatsApp) && <span>or </span>}
                                                    <a
                                                        href={undefined}
                                                        onClick={() =>
                                                            this.props.retryOtp(
                                                                this.props.OTPRetryModes.Voice,
                                                                this.props.smsRequestId,
                                                                true
                                                            )
                                                        }
                                                        className="col-primary c-fw-600 p-3 cursor-pointer"
                                                    >
                                                        Voice
                                                    </a>
                                                </span>
                                            ) : null}
                                        </p>
                                    </div>
                                </div>
                                </>
                             ) : null}
                        </div>
                    </div>
                    <div className="row ">
                        <div>
                            <button className="me-3 btn btn-login-prime-o" onClick={() => this.props.setStep(1)}>
                                {' '}
                                <MdKeyboardArrowLeft />
                                Back
                            </button>
                            {this.props?.smsAccessToken && this.props?.emailAccessToken ? (
                                <button className=" btn btn-login-prime" onClick={() => this.props.validateUserForCompany()}>
                                    {' '}
                                    Next <MdKeyboardArrowRight />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default StepTwo;
