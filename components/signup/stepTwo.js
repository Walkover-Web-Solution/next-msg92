import React from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";

import Otpinput from "./comps/otpInput";

const OTPRetryModes = {
  Sms: '11',
  Voice: '4',
  Email: '3',
  Whatsapp: '12',
}

class StepTwo extends React.Component {

  constructor(props) {
    super(props);
  }

  setEmailAddress(email) {
    let error = !new RegExp(this.props.EMAIL_REGEX).test(email);
    this.setState({
      emailOTPData: {
        ...this.state?.emailOTPData,
        status: error && email?.length ? false : true,
        message: error && email?.length ? 'Enter valid email.' : null
      },
    });
  }

  render() {
    return (
      <>
        <div className="d-none entry__right_section__container--logo-visible-in-small">
          <img
            src="/images/msgOriginalsvg.png"
            width="auto"
            height="40px"
            alt="MSG91 Logo"
            className=""
          />
        </div>
        <h1>Create an account</h1>
        <div className="entry__right_section__container__step_one mt-5">
          <div className="step_status_bar d-flex justify-content-between align-items-center ps-0">
            <div>
              <MdCheckCircle className="step_status_bar--invisible-on-md" />{" "}
              Verify email & mobile number
            </div>
            <span className="step_status_bar__line step_status_bar--invisible-on-md"></span>
            <div className="step_status_bar--invisible-on-md">
              <MdCheckCircleOutline /> Enter details
            </div>
          </div>
          <div className="row mx-0 px-0 step_input_wrapper mt-4">
            <label htmlFor="email" className="mb-3 ps-0">
              Verify email
            </label>
            <div className="d-flex flex-wrap p-0">
              <div className="step_input_wrapper__left col-xl-6 col-lg-12">
                <div className="d-flex step_input_wrapper__mobile_veiw">
                  <input
                    type="email"
                    className="form-control "
                    id="emailIdentifier"
                    placeholder="Email Address"
                    onChange={(e) => this.setEmailAddress(e.target.value)}
                  />
                  <span className="position-relative">
                    <MdCheckCircle className="icon-success otp_verified_icon" />
                  </span>
                  <button
                    className="custom-signup-btn"
                    onClick={() => this.props.sendOtp(false)}
                  >
                    Get OTP
                  </button>
                  <button className="btn custom-signup-btn d-none">
                    Change Email
                  </button>
                </div>
              </div>
              <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                <div className="d-flex flex-column">
                  <Otpinput tag="email" verifyOtp={this.props.verifyOtp} otpLength={this.props.widgetData?.otpLength} />
                  {this.props.allowedRetry?.email ? <p className="col-dark mt-3 c-fs-6">
                    Resend on{" "}
                    <a href="javascript:void(0)"
                      onClick={() => this.props.retryOtp(OTPRetryModes.Email, false)} className="col-primary c-fw-600 p-3">
                      Email
                    </a>
                  </p> : null}
                </div>
              </div>
            </div>
          </div>
          {this.state?.emailOTPData?.message ? (
            <p
              className=" c-fs-6 c-fw-500 my-4 elert-otp-message"

            >
              {this.state?.emailOTPData?.message}
            </p>
          ) : null}

          <div className="row mx-0 px-0 step_input_wrapper mt-4 mb-5">
            <label htmlFor="contact" className="mb-3 ps-0">
              Verify Mobile number
            </label>
            <div className="d-flex flex-wrap p-0">
              <div className="step_input_wrapper__left col-xl-6 col-lg-12">
                <div className="d-flex step_input_wrapper__mobile_veiw">
                  <input
                    type="text"
                    className="form-control"
                    id="contactIdentifier"
                    placeholder="Mobile number"
                    onChange={(e) => this.props.setMobileNumber(e.target.value)}
                  />

                  <span className="position-relative">
                    <MdCheckCircle className="icon-success otp_verified_icon" />
                  </span>
                  <button
                    className="custom-signup-btn"
                    onClick={() => this.props.sendOtp(true)}
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                <div className="d-flex flex-column">
                  <Otpinput tag="sms" verifyOtp={this.props.verifyOtp} otpLength={this.props.widgetData?.otpLength} />
                  <p className="col-dark mt-3 c-fs-6 p-2">
                    Resend on{" "}
                    {this.props.allowedRetry?.sms ? <a href="javascript:void(0)" onClick={() => this.props.retryOtp(OTPRetryModes.Sms, true)} className="col-primary c-fw-600 p-3">
                      Text
                    </a> : null}
                    {this.props.allowedRetry?.whatsApp ? <span>
                      <span>or{" "}</span>
                      <a href="javascript:void(0)" onClick={() => this.props.retryOtp(OTPRetryModes.Whatsapp, true)} className="col-primary c-fw-600 p-3">
                        WhatsApp
                      </a>
                    </span> : null}
                    {this.props.allowedRetry?.voice ? <span>
                      <span>or{" "}</span>
                      <a href="javascript:void(0)" onClick={() => this.props.retryOtp(OTPRetryModes.Voice, true)} className="col-primary c-fw-600 p-3">
                        Voice
                      </a></span> : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {this.state?.smsOTPData?.message ? (
            <p
              className="col-success c-fs-6 c-fw-500 my-4"
              style={{ color: "var(--whats-app-green, #29A653)" }}
            >
              {this.state?.smsOTPData?.message}
            </p>
          ) : null}
          <div className="row">
            <div>
              <button
                className="me-3 btn back_btn"
                onClick={() => this.props.setStep(1)}
              >
                {" "}
                <MdKeyboardArrowLeft />
                Back
              </button>
              <button
                className=" next_btn col-white"
                onClick={() => this.props.setStep(3)}
              >
                {" "}
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
