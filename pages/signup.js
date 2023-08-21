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
import StepThree from "@/components/signup/stepThree";

const OTPRetryModes = {
  Sms: '11',
  Voice: '4',
  Email: '3',
  Whatsapp: '12',
}

const MOBILE_REGEX = /^[+]?[0-9]+$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      // activeStep: query.get("code") ? 2 : 1,
      // signupByGitHub: query.get("github") ? true : false,
      // githubCode: query.get("code"),
      emailOTPData: {
        email: null,
      },
      smsOTPData: {
        mobile: null,
      },
    };
    // this.setStep = this.setStep.bind(this);
    // this.setState= this.setState.bind(this)
  }

  componentDidMount = () => {
    this.otpWidgetSetup();
  }

  setStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  finalSubmit = () => {
    console.log("signup with company setup");
  }

  signUpCompleted() {
    location.href = process.env.API_BASE_URL + '/hello-new/'
  }

  signUpFailed(error) {
    console.log(error);
  }

  signupByGitHubAccount() {
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.githubClientId}&allow_signup=true&scope=user&redirect_uri=${process.env.redirectURL}/login?github=true`;
  }

  otpWidgetSetup = () => {
    const head = document.getElementsByTagName("head")[0];
    const currentTimestamp = new Date().getTime();
    const otpWidgetScript = document.createElement("script");
    otpWidgetScript.type = "text/javascript";
    otpWidgetScript.src = `${process.env.widgetscript}?v=${currentTimestamp}`;
    otpWidgetScript.onload = () => {
      console.log("widget loaded");
      const configuration = {
        widgetId: process.env.OTPWidgetToken,
        tokenAuth: process.env.widgetAuthToken,
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

  setMobileNumber = (mobile) => {
    this.setState = this.setState.bind(this);
    let error = !new RegExp(MOBILE_REGEX).test(mobile);
    this.setState({
      smsOTPData: {
        ...this.state?.smsOTPData,
        status: error && mobile?.length ? false : true,
        message: error && mobile?.length ? "Enter valid number." : null,
      },
    });
  };

  setEmailAddress = (email) => {
    let error = !new RegExp(EMAIL_REGEX).test(email);
    this.setState({
      emailOTPData: {
        ...this.state?.emailOTPData,
        status: error && email?.length ? false : true,
        message: error && email?.length ? "Enter valid email." : null,
      },
    });
  };

  sendOtp = (notByEmail) => {
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
  };

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

  verifyOtp = (otp, notByEmail) => {
    let requestId = this.state.emailOTPData?.requestId;
    if (notByEmail) {
      requestId = this.state.smsOTPData?.requestId;
    }

    window.verifyOtp(
      otp,
      (data) => {
        console.log("OTP verified: ", data);

        // Store the 'data' value in the component's state
        this.setState({
          otpVerificationData: data,
        });
      },
      (error) => console.log(error),
      requestId
    );
  }

  render() {
    var verificationData = this.state.otpVerificationData;
    // var verificationStatus = verificationData?.type



    return (
      <>
        <section className="entry signup d-flex">

          <pre>{JSON.stringify(this.state.otpVerificationData, null, 2)}</pre>
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
                <p>{verificationData}</p>
              </div>
            </div>
          </div>
          <div className="entry__right_section col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
            <div className="container entry__right_section__container">
              {/* STEP #1 */}
              <div
                className={`entry__right_section__container--step ${this.state.activeStep === 1
                  ? "entry__right_section__container--active"
                  : ""
                  }`}
              >
                <StepOne
                  signupByGitHubAccount={this.signupByGitHubAccount}
                  setStep={this.setStep}
                />
              </div>

              {/* STEP #2 */}
              <div
                className={`entry__right_section__container--step ${this.state.activeStep === 2
                  ? "entry__right_section__container--active"
                  : ""
                  }`}
              >
                <StepTwo
                  setEmailAddress={this.setEmailAddress}
                  setMobileNumber={this.setMobileNumber}
                  sendOtp={this.sendOtp}
                  EMAIL_REGEX={EMAIL_REGEX}
                  setStep={this.setStep}
                  verifyOtp={this.verifyOtp}
                />
              </div>

              {/* STEP #3 */}
              <div
                className={`entry__right_section__container--step ${this.state.activeStep === 3
                  ? "entry__right_section__container--active"
                  : ""
                  }`}
              >
                <StepThree
                  setStep={this.setStep}
                  finalSubmit={this.finalSubmit}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default SignUp;
