import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import Otpinput from './comps/otpInput';
import MobileInputComponent from '@/components/intl-phone-lib';
import { toast } from 'react-toastify';

var smsIdentifier = '';
var mobileInvalid = false;

class StepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailIdentifier: props.emailIdentifier || '',
            smsIdentifier: props.smsIdentifier || '',
        };
        smsIdentifier = this.state.smsIdentifier;
    }

    render() {
        return (
            <>
                <div className="step-two d-grid gap-4">
                    <div className="step-two__progress d-flex align-items-center gap-2 gap-lg-4">
                        <div className="d-flex align-items-center gap-1 c-fs-7 form_step">
                            <MdCheckCircle
                                className={
                                    this.props?.smsAccessToken && this.props?.emailAccessToken
                                        ? 'ico-green'
                                        : 'ico-grey'
                                }
                            />{' '}
                            Verify email & mobile number
                        </div>
                        <span className="progress-line__none progress-line d-lg-block"></span>
                        <div className="d-lg-flex align-items-center gap-1 c-fs-7 ico-grey form_step">
                            <MdCheckCircleOutline /> Enter details
                        </div>
                    </div>
                    <div className="step-two__email w-100  d-grid gap-2">
                        <label htmlFor="email" className="step-two__email__lable c-fw-m c-fs-7">
                            Verify email
                        </label>
                        <div className="ver-email d-flex gap-4 align-items-top flex-wrap">
                            <div className="ver-email__main">
                                <div className="ver-email-main d-flex gap-3 ver-input">
                                    <div className="ver-email-main__input col ver-input__input ">
                                        {this.props?.signupByGitHub ? (
                                            <p>Email Verified</p>
                                        ) : (
                                            <input
                                                type="email"
                                                className="form-control c-fs-7"
                                                id="emailIdentifier"
                                                placeholder="Email Address*"
                                                defaultValue={this.state.emailIdentifier}
                                                onInput={(e) => this.props.identifierChange(false)}
                                                disabled={this.props?.emailAccessToken}
                                            />
                                        )}
                                        <span className="ver-email-main__input__check">
                                            {this.props?.emailAccessToken && <MdCheckCircle className="ico-green" />}
                                        </span>
                                    </div>
                                    {this.props?.signupByGitHub ? (
                                        <button className="c-fw-m c-fs-7">Change Email</button>
                                    ) : this.props?.emailAccessToken ? (
                                        <button
                                            className="ver-email-main__btn btn  btn-login-prime-o c-fw-m c-fs-7"
                                            onClick={(e) => this.props.identifierChange(false)}
                                        >
                                            Change Email
                                        </button>
                                    ) : (
                                        <button
                                            className={`ver-email-main__btn btn c-fw-m c-fs-7 ${
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
                                {/* {this.props?.emailIdentifier && this.props?.emailSuccessMessage ? (
                                    <p className="ver-email-message mt-2 ico-green c-fs-7">
                                        {this.props?.emailSuccessMessage} 
                                    </p>
                                ) : null} */}
                            </div>
                            {this.props?.emailIdentifier && !this.props?.emailAccessToken ? (
                                <>
                                    <span className="hor-line"></span>
                                    <div className="ver-email__otp">
                                        <div className="d-flex flex-column">
                                            <Otpinput
                                                tag="email"
                                                verifyOtp={this.props.verifyOtp}
                                                otpLength={this.props.widgetData?.otpLength}
                                                requestId={this.props.emailRequestId}
                                                notByEmail={false}
                                            />
                                            {this.props.allowedRetry?.email ? (
                                                <p className="col-dark my-3 c-fs-9 ">
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
                                                        className="col-primary c-fw-m p-3 cursor-pointer text-hover-underline"
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
                        {this.props?.emailIdentifier &&
                        this.props?.emailSuccessMessage &&
                        !this.props?.emailAccessToken ? (
                            <p className="ver-email-message mt-2 ico-green c-fs-7">
                                {this.props?.emailSuccessMessage} {this.props?.emailIdentifier}.
                            </p>
                        ) : null}
                    </div>
                    <div className="step-two__phone  w-100  d-grid gap-2">
                        <label htmlFor="contact" className="step-two__phone__lable c-fw-m c-fs-7">
                            Verify Mobile number
                        </label>
                        <div className="ver-phone d-flex gap-4 align-items-top flex-wrap">
                            <div className="ver-phone__main">
                                <div className="ver-phone-main d-flex gap-3 ver-input">
                                    <div className="ver-phone-main__input col ver-input__input">
                                        <MobileInputComponent
                                            onInput={(event) => {
                                                smsIdentifier = event?.replace('+', '');
                                                this.props.identifierChange(true);
                                            }}
                                            required={true}
                                            disabled={this.props?.smsAccessToken}
                                            defaultValue={smsIdentifier ? '+' + smsIdentifier : ''}
                                            setInvalid={(event) => (mobileInvalid = event)}
                                            placeholder="Mobile Number*"
                                        ></MobileInputComponent>

                                        <span className="ver-phone-main__input__check">
                                            {this.props?.smsAccessToken && <MdCheckCircle className="ico-green" />}
                                        </span>
                                    </div>
                                    {this.props?.smsAccessToken ? (
                                        <button
                                            className="ver-mobile-main__btn btn  btn-login-prime-o c-fw-m c-fs-7"
                                            onClick={(e) => this.props.identifierChange(true)}
                                        >
                                            Change Mobile
                                        </button>
                                    ) : (
                                        <button
                                            className={`ver-mobile-main__btn btn c-fw-m c-fs-7 ${
                                                this.props?.smsIdentifier ? 'btn-light disabled' : 'btn-login-prime-o'
                                            }`}
                                            onClick={() =>
                                                mobileInvalid
                                                    ? toast.error('Invalid mobile number.')
                                                    : this.props.sendOtp(smsIdentifier, true)
                                            }
                                        >
                                            Get OTP
                                        </button>
                                    )}
                                </div>
                            </div>

                            {this.props?.smsIdentifier && !this.props?.smsAccessToken ? (
                                <>
                                    <span className="hor-line"></span>

                                    <div className="ver-email__otp">
                                        <div className="d-flex flex-column">
                                            <Otpinput
                                                tag="sms"
                                                verifyOtp={this.props.verifyOtp}
                                                otpLength={this.props.widgetData?.otpLength}
                                                requestId={this.props.smsRequestId}
                                                notByEmail={true}
                                            />
                                            <p className="col-dark my-3 c-fs-9 p-2">
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
                                                        className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline"
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
                                                            className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline"
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
                                                            className="col-primary c-fw-600 p-3 cursor-pointer text-hover-underline c-fw-m"
                                                        >
                                                            Call
                                                        </a>
                                                    </span>
                                                ) : null}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        {this.props?.smsIdentifier && this.props?.smsSuccessMessage && !this.props?.smsAccessToken ? (
                            <p className="ver-email-message ico-green c-fs-7">
                                {this.props?.smsSuccessMessage} {this.props?.smsIdentifier}
                            </p>
                        ) : null}
                    </div>
                    <div className="row">
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-login-secondary c-fs-7" onClick={() => this.props.setStep(1)}>
                                {' '}
                                <MdKeyboardArrowLeft />
                                Back
                            </button>
                            <button
                                className="btn btn-login-prime c-fs-7"
                                onClick={() =>
                                    this.props?.smsAccessToken &&
                                    this.props?.emailAccessToken &&
                                    this.props.validateUserForCompany()
                                }
                                disabled={!this.props?.smsAccessToken || !this.props?.emailAccessToken}
                            >
                                {' '}
                                Next <MdKeyboardArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default StepTwo;
