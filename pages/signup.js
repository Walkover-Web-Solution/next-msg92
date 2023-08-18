import React from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdDone,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";

import StepOne from "@/components/signup/stepOne";
import StepTwo from "@/components/signup/stepTwo";

const MOBILE_REGEX = /^[+]?[0-9]+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ENV_SETUP = {
  firebaseConfig: {
    apiKey: "AIzaSyCxRjom_yz_suroteRqwqBk91HPqgh4Z3c",
    authDomain: "admin-panel-test-b5a7e.firebaseapp.com",
    projectId: "admin-panel-test-b5a7e",
    storageBucket: "admin-panel-test-b5a7e.appspot.com",
    messagingSenderId: "970692014254",
    appId: "1:970692014254:web:a50174f6d1d939533f7d3f",
  },
  zohoClientId: "1000.ZD8TKFCPWAYEIX1IM4FJ8F9LRMNYEB",
  githubClientId: "b7432f8d5a708e33b3b0",
  msalClientId: "164d09e1-531c-427d-9358-9d1347c74170",
  msalTenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
  redirectURL: "http://localhost:9999",
  OTPWidgetToken: "3368656e497a343530373832",
  widgetAuthToken: "278060TvhhI9M8s64ce1109P1",
  widgetscript:
    "https://test.msg91.com/hello-new/assets/otp-provider/otp-provider.js",
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      // activeStep: query.get("code") ? 2 : 1,
      // signupByGitHub: query.get("github") ? true : false,
      env: ENV_SETUP,
      // githubCode: query.get("code"),
      emailOTPData: {
        email: null,
      },
      smsOTPData: {
        mobile: null,
      },
    };
    this.setStep = this.setStep.bind(this);
    this.setState= this.setState.bind(this)
  }
  
  componentDidMount() {
    this.otpWidgetSetup();
  }
  
  setStep(step) {
    this.setState({
      activeStep: step,
    });
  }

  finalSubmit() {
    console.log("signup with company setup");
  }

  signupByGitHubAccount() {
    // https://ramya-bala221190.medium.com/simple-example-to-implement-oauth2-using-angular-and-node-in-4-steps-b1f6b7bbf2b5
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps
    // POST https://github.com/login/oauth/access_token?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&code=${CODE}
    // GET https://api.github.com/user with access token in Bearer Authorization
    location.href = `https://github.com/login/oauth/authorize?client_id=${this.state.env.githubClientId}&allow_signup=true&scope=user&redirect_uri=${this.state.env.redirectURL}/signup?github=true`;
    console.log("hello eyeh")

  }

  otpWidgetSetup() {
    const head = document.getElementsByTagName("head")[0];
    const currentTimestamp = new Date().getTime();
    const otpWidgetScript = document.createElement("script");
    otpWidgetScript.type = "text/javascript";
    otpWidgetScript.src = `${this.state.env.widgetscript}?v=${currentTimestamp}`;
    otpWidgetScript.onload = () => {
      console.log("widget loaded");
      const configuration = {
        widgetId: this.state.env.OTPWidgetToken,
        tokenAuth: this.state.env.widgetAuthToken,
        success: (data) => {
          // Widget config success response
          // console.log(data);
        },
        failure: (error) => {
          // Widget config failure response
          // console.log(error);
        },
        exposeMethods: true,
      };
      window.initSendOTP(configuration);
    };
    head.appendChild(otpWidgetScript);
  }

  setMobileNumber(mobile) {
    this.setState= this.setState.bind(this);
    let error = !new RegExp(MOBILE_REGEX).test(mobile);
    this.setState({
      smsOTPData: {
        ...this.state?.smsOTPData,
        status: error && mobile?.length ? false : true,
        message: error && mobile?.length ? 'Enter valid number.' : null
      },
    });
  }

  setEmailAddress(email) {
    let error = !new RegExp(EMAIL_REGEX).test(email);
      this.setState({
        emailOTPData: {
          ...this.state?.emailOTPData,
          status: error && email?.length ? false : true,
          message: error && email?.length ? 'Enter valid email.' : null
        },
      });
  }

  sendOtp(notByEmail) {
    let identifier = document.getElementById("emailIdentifier").value;
    if (notByEmail) {
      identifier = document.getElementById("contactIdentifier").value;
      if (!new RegExp(MOBILE_REGEX).test(identifier)) {
        alert("mobile error");
        return;
      }
    } else {
      if (!new RegExp(EMAIL_REGEX).test(identifier)) {
        alert("emeil error");
        return;
      }
    }

    window.sendOtp(
      identifier,
      (data) => {
        console.log("OTP verified: ", data);
        if (this.notByEmail) {
          this.setState({
            smsOTPData: {
              ...this.state?.smsOTPData,
              mobile: identifier,
              requestId: data?.message,
            },
          });
        } else {
          this.setState({
            emailOTPData: {
              ...this.state?.emailOTPData,
              requestId: data?.message,
              email: identifier,
            },
          });
        }
      },
      (error) => {
        console.log(error);
        if (this.notByEmail) {
          this.setState({
            smsOTPData: {
              ...this.state?.smsOTPData,
              error: error?.message,
            },
          });
        } else {
          this.setState({
            emailOTPData: {
              ...this.state?.emailOTPData,
              error: error?.message,
            },
          });
        }
      }
    );
  }

  retryOtp(retryBy, notByEmail) {
    let requestId = this.state.emailOTPData?.requestId;
    if (notByEmail) {
      requestId = this.state.smsOTPData?.requestId;
    }
    console.log(requestId);
    window.retryOtp(
      retryBy,
      (data) => console.log("OTP verified: ", data),
      (error) => console.log(error),
      requestId
    );
  }

  verifyOtp(otp, notByEmail) {
    let requestId = this.state.emailOTPData?.requestId;
    if (notByEmail) {
      requestId = this.state.smsOTPData?.requestId;
    }
    window.verifyOtp(
      otp,
      (data) => console.log("OTP verified: ", data),
      (error) => console.log(error),
      requestId
    );
  }

  render() {
    return (
      <>
        <section className="entry signup d-flex">
          <div className="entry__left_section col-xl-4 col-lg-5 col-md-5">
            <img
              src="/images/msgOriginalsvg.png"
              className="entry__left_section__brand_logo"
            />
            <div className="entry__left_section__details pe-5">
              <div className="container">
                <h1 className="c-fs-3 mb-4">
                  Signup to avail a complete suite of MSG91 products
                </h1>
                <p>What can you build with MSG91?</p>
                <ul className="ps-0 my-4">
                  <li className="d-flex align-items-center">
                    <MdDone />
                    Programmable SMS
                  </li>
                  <li className="d-flex align-items-center">
                    <MdDone />
                    Customer Contact Center
                  </li>
                  <li className="d-flex align-items-center">
                    <MdDone />
                    Virtual Number
                  </li>
                  <li className="d-flex align-items-center">
                    <MdDone />
                    Automated user segmentation
                  </li>
                  <li className="d-flex align-items-center">
                    <MdDone />
                    OTP invisible verification
                  </li>
                </ul>
                <p>
                  Trusted by<span> 30000+ </span>startups and enterprises
                </p>
              </div>
            </div>
          </div>
          <div className="entry__right_section col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
            <div className="container entry__right_section__container">
              {/* STEP #1 */}
              <div
                className={`entry__right_section__container--step ${
                  this.state.activeStep === 1
                    ? "entry__right_section__container--active"
                    : ""
                }`}
              >
                <StepOne signupByGitHubAccount={this.signupByGitHubAccount} setStep={this.setStep}/>
              </div>

              {/* STEP #2 */}
              <div
                className={`entry__right_section__container--step ${
                  this.state.activeStep === 2
                    ? "entry__right_section__container--active"
                    : ""
                }`}
              >
               <StepTwo setEmailAddress={this.setEmailAddress} setMobileNumber={this.setMobileNumber} sendOtp={this.sendOtp} EMAIL_REGEX={EMAIL_REGEX}/>
              </div>

              {/* STEP #3 */}
              <div
                className={`entry__right_section__container--step ${
                  this.state.activeStep === 3
                    ? "entry__right_section__container--active"
                    : ""
                }`}
              >
                <div className="d-none entry__right_section__container--logo-visible-in-small">
                  <img
                    src="/images/msgOriginalsvg.png"
                    width="auto"
                    height="40px"
                    alt="Msg91-logo"
                    className=""
                  />
                </div>
                <h1>Create an account</h1>
                <div className="entry__right_section__container__step_one entry__right_section__container__step_two mt-5">
                  <div className="step_status_bar d-flex justify-content-between align-items-center ps-0">
                    <div className="col-success">
                      <MdCheckCircle className="step_status_bar--invisible-on-md" />{" "}
                      Verify email & mobile number
                    </div>
                    <span className="step_status_bar__line step_status_bar--invisible-on-md"></span>
                    <div className="step_status_bar--invisible-on-md">
                      <MdCheckCircleOutline className="icon_enter_details me-1" />
                      <MdCheckCircle className="visible_on_success me-1" />
                      Enter details
                    </div>
                  </div>

                  <p className="redirect-text mt-5">Redirecting...</p>

                  <div className="row px-0 step_two_wrapper mt-4">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                      <div className="row g-4">
                        <div className="col-12">
                          <div className="step_two_wrapper__toggle_button">
                            <button className="step_two_wrapper__toggle_button__left">
                              Company/Developer
                            </button>
                            <button className="step_two_wrapper__toggle_button__right">
                              Personal use
                            </button>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                          />
                        </div>

                        <div className="col-12 step_two_wrapper--personal-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="How are you going to use this?"
                          />
                        </div>

                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name"
                          />
                        </div>
                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <select
                            autoComplete="on"
                            className="form-select"
                            aria-label="Default Industry Type"
                          >
                            <option defaultValue>Industry Type</option>
                            <option value="">option 1</option>
                            <option value="">option 2</option>
                            <option value="">option 3</option>
                          </select>
                        </div>

                        <div className="col-12 step_two_wrapper--company-form">
                          <select
                            autoComplete="on"
                            className="form-select"
                            aria-label="Default Industry Type"
                          >
                            <option defaultValue>Service Needed</option>
                            <option value="">option 1</option>
                            <option value="">option 2</option>
                            <option value="">option 3</option>
                          </select>
                        </div>

                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <select
                            autoComplete="on"
                            className="form-select"
                            aria-label="Default Industry Type"
                          >
                            <option defaultValue>Country</option>
                            <option value="">option 1</option>
                            <option value="">option 2</option>
                            <option value="">option 3</option>
                          </select>
                        </div>
                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <select
                            autoComplete="on"
                            className="form-select"
                            aria-label="Default Industry Type"
                          >
                            <option defaultValue>State/Province</option>
                            <option value="">option 1</option>
                            <option value="">option 2</option>
                            <option value="">option 3</option>
                          </select>
                        </div>

                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Pincode"
                          />
                        </div>
                        <div className="col-lg-6  step_two_wrapper--company-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                          />
                        </div>

                        <div className="col-12 step_two_wrapper--company-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                          />
                        </div>
                        <div className="col-12 step_two_wrapper--company-form">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="GST number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-check my-4 pb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="true"
                            id="termsCheckBox"
                          />
                          {/* <label
                            className="form-check-label c-fs-6 c-fw-500 ps-0"
                            htmlFor="termsCheckBox"
                          >
                            I agree to the{" "}
                            <span className="col-primary">Terms of Service </span>{" "}
                            and
                            <p className="col-primary"><a>Privacy Policy</a></p>
                          </label> */}
                          <p
                            className="form-check-label c-fs-6 c-fw-500 ps-0"
                            htmlFor="termsCheckBox"
                          >
                            I agree to the
                            {/* <a href="#" className="col-primary p-2">
                              Terms and Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="col-primary p-2">
                              Privacy Policy
                            </a> */}
                          </p>
                        </div>
                        <div>
                          <button
                            className="me-3 back_btn"
                            onClick={() => this.setStep(2)}
                          >
                            <MdKeyboardArrowLeft />
                            Back
                          </button>
                          <button
                            className="next_btn col-white"
                            onClick={() => this.finalSubmit()}
                          >
                            Next <MdKeyboardArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default SignUp;
