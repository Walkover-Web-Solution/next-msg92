import React from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";
import Otpinput from "./comps/otpInput";


class StepTwo extends React.Component {
  constructor(props) {
    super(props);
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
                  {this.props?.signupByGitHub ? <p>Email Verified</p> :
                    <input
                      type="email"
                      className="form-control "
                      id="emailIdentifier"
                      placeholder="Email Address"
                      onChange={(e) => this.props.identifierChange(false)}
                    />}
                  <span className="position-relative">
                    <MdCheckCircle className="icon-success otp_verified_icon" />
                  </span>
                  {this.props?.signupByGitHub ?
                    <button className="btn custom-signup-btn d-none">
                      Change Email
                    </button> : <button
                      className="custom-signup-btn"
                      onClick={() =>
                        this.props.sendOtp(document.getElementById("emailIdentifier").value, false)}
                    >
                      Get OTP
                    </button>}
                </div>
              </div>
              {this.props?.emailIdentifier ?
                <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                  <div className="d-flex flex-column">
                    <Otpinput
                      tag="email"
                      verifyOtp={this.props.verifyOtp}
                      otpLength={this.props.widgetData?.otpLength}
                      requestId={this.props.emailRequestId}
                      notByEmail={false}
                    />
                    {this.props.allowedRetry?.email ? (
                      <p className="col-dark mt-3 c-fs-6">
                        Resend on{" "}
                        <a
                          href={undefined}
                          onClick={() =>
                            this.props.retryOtp(this.props.OTPRetryModes.Email, this.props.emailRequestId, false)
                          }
                          className="col-primary c-fw-600 p-3 cursor-pointer"
                        >
                          Email
                        </a>
                      </p>
                    ) : null}
                  </div>
                </div> : null}
            </div>
          </div>
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
                    onChange={(e) => this.props.identifierChange(true)}
                  />

                  <span className="position-relative">
                    <MdCheckCircle className="icon-success otp_verified_icon" />
                  </span>
                  <button
                    className="custom-signup-btn"
                    onClick={() => this.props.sendOtp(document.getElementById("contactIdentifier").value, true)}
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              {this.props?.smsIdentifier ? <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                <div className="d-flex flex-column">
                  <Otpinput
                    tag="sms"
                    verifyOtp={this.props.verifyOtp}
                    otpLength={this.props.widgetData?.otpLength}
                    requestId={this.props.smsRequestId}
                    notByEmail={true}
                  />
                  <p className="col-dark mt-3 c-fs-6 p-2">
                    Resend on{" "}
                    {this.props.allowedRetry?.sms ? (
                      <a
                        href={undefined}
                        onClick={() =>
                          this.props.retryOtp(this.props.OTPRetryModes.Sms, this.props.smsRequestId, true)
                        }
                        className="col-primary c-fw-600 p-3 cursor-pointer"
                      >
                        Text
                      </a>
                    ) : null}
                    {this.props.allowedRetry?.whatsApp ? (
                      <span>
                        <span>or </span>
                        <a
                          href={undefined}
                          onClick={() =>
                            this.props.retryOtp(this.props.OTPRetryModes.Whatsapp, this.props.smsRequestId, true)
                          }
                          className="col-primary c-fw-600 p-3 cursor-pointer"
                        >
                          WhatsApp
                        </a>
                      </span>
                    ) : null}
                    {this.props.allowedRetry?.voice ? (
                      <span>
                        <span>or </span>
                        <a
                          href={undefined}
                          onClick={() =>
                            this.props.retryOtp(this.props.OTPRetryModes.Voice, this.props.smsRequestId, true)
                          }
                          className="col-primary c-fw-600 p-3 cursor-pointer"
                        >
                          Voice
                        </a>
                      </span>
                    ) : null}
                  </p>
                </div>
              </div> : null}
            </div>
          </div>
          {this.props?.emailIdentifier && !this.props?.invalidEmail ? (
            <p
              className="col-success c-fs-6 c-fw-500 my-4"
              style={{ color: "var(--whats-app-green, #29A653)" }}
            >
              {this.props?.emailSuccessMessage}
            </p>
          ) : null}
          {this.props?.smsIdentifier && !this.props?.invalidMobile ? (
            <p
              className="col-success c-fs-6 c-fw-500 my-4"
              style={{ color: "var(--whats-app-green, #29A653)" }}
            >
              {this.props?.smsSuccessMessage}
            </p>
          ) : null}
          {this.props?.invalidEmail ? (
            <p
              className="col-success c-fs-6 c-fw-500 my-4"
              style={{ color: "var(--whats-app-green, #29A653)" }}
            >
              {this.props?.invalidEmail}
            </p>
          ) : null}
          {this.props?.invalidMobile ? (
            <p
              className="col-success c-fs-6 c-fw-500 my-4"
              style={{ color: "var(--whats-app-green, #29A653)" }}
            >
              {this.props?.invalidMobile}
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
              {
                this.props?.smsAccessToken && this.props?.emailAccessToken ?
                  <button
                    className=" next_btn col-white"
                    onClick={() => this.props.validateUserForCompany()}
                  >
                    {" "}
                    Next <MdKeyboardArrowRight />
                  </button>
                  : null
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default StepTwo;
