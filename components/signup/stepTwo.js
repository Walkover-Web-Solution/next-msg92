import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import Otpinput from './comps/otpInput';
import MobileInputComponent from '@/components/intl-phone-lib';
import { toast } from 'react-toastify';
import RetryOtp from './comps/retryOtp';
import { getCookie, setCookie } from '@/components/utils';

var smsIdentifier = '';
var mobileInvalid = false;

class StepTwo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailIdentifier: props.emailIdentifierBackup || '',
            smsIdentifier: props.smsIdentifierBackup || '',
            sourceValue: '',
        };
        smsIdentifier = this.state.smsIdentifier;
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.toString();
        const sourceValue = queryParams.get('source');
        this.setState({ sourceValue });
    }
    
    handleSourceChange = (event) => {
        const sourceValue = event.target.value;
        this.setState({ sourceValue });
        const utmData = getCookie('msg91_query');
        if (utmData.includes('&source=')) {
            setCookie('msg91_query', utmData.replace(/&source=([\w_-])*/, '&source=' + sourceValue), 30);
        } else {
            setCookie('msg91_query', utmData + '&source=' + sourceValue, 30);
        }
    };

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
                                    <div className="ver-email-main__input col ver-input__input d-flex align-items-center">
                                        {this.props?.signupByGitHub ? (
                                            <div className="d-flex align-items-center gap-1 c-fs-7 text-green">
                                                Email Verified <MdCheckCircle className="ico-green" />
                                            </div>
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
                                    {this.props?.emailAccessToken || this.props?.signupByGitHub ? (
                                        <button
                                            className="ver-email-main__btn btn  btn-login-prime-o c-fw-m c-fs-7"
                                            onClick={(e) => this.props.identifierChange(false)}
                                        >
                                            Change{this.props?.signupByGitHub ? '' : '/Re-verify'} Email
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
                                            disabled={this.props?.isLoading}
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
                                            {this.props?.hideEmailRetry ? null : (
                                                <RetryOtp
                                                    allowedRetry={this.props.allowedRetry}
                                                    OTPRetryModes={this.props.OTPRetryModes}
                                                    retryOtp={this.props.retryOtp}
                                                    emailRequestId={this.props.emailRequestId}
                                                ></RetryOtp>
                                            )}
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
                                <div className="ver-phone-main d-flex gap-3 ver-input flex-wrap">
                                    <div
                                        className={
                                            'ver-phone-main__input col ver-input__input' +
                                            (this.props?.smsAccessToken ? ' pointer-none' : '')
                                        }
                                    >
                                        <MobileInputComponent
                                            onInput={(event) => {
                                                const value = event?.replace("+", "");
                                                if(value !== smsIdentifier) {
                                                    smsIdentifier = value
                                                    this.props.identifierChange(true);
                                                }
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
                                            Change/Re-verify Mobile Number
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
                                            disabled={this.props?.isLoading}
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
                                            {this.props?.hideMobileRetry ? null : (
                                                <RetryOtp
                                                    allowedRetry={this.props.allowedRetry}
                                                    OTPRetryModes={this.props.OTPRetryModes}
                                                    retryOtp={this.props.retryOtp}
                                                    smsRequestId={this.props.smsRequestId}
                                                ></RetryOtp>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        {this.props?.smsIdentifier && this.props?.smsSuccessMessage && !this.props?.smsAccessToken ? (
                            <p className="ver-email-message ico-green c-fs-7">
                                {this.props?.smsSuccessMessage} +{this.props?.smsIdentifier?.replace('+', '')}
                            </p>
                        ) : null}
                    </div>
                    <div style={{ width: '360px' }}>
                        <select
                            autoComplete="on"
                            className="form-select"
                            aria-label="Select Source"
                            name="source"
                            onChange={this.handleSourceChange}
                            value={this.state.sourceValue}
                        >
                            <option value="">Select Source</option>
                            <option value="search_engine">Search engine (Google, Bing, Yahoo, etc)</option>
                            <option value="recommended_by_friend">Recommended by friend or colleague</option>
                            <option value="social_media">Social Media</option>
                            <option value="blog">Blog or Publication</option>
                            <option value="advertisement">Advertisement</option>
                            <option value="event">Event</option>
                            <option value="tiedelhincr">TiEDelhiNCR</option>
                        </select>
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
                                    (this.props?.emailAccessToken || this.props?.githubCode) &&
                                    this.props.validateUserForCompany()
                                }
                                disabled={
                                    !this.props?.smsAccessToken ||
                                    (!this.props?.emailAccessToken && !this.props?.githubCode) ||
                                    this.props?.isLoading
                                }
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
