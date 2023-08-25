import React from "react";
import { MdDone } from "react-icons/md";
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

    let queryParams = this.getQueryParamsDeatils(this.props?.browserPathCase);

    this.state = {
      activeStep: queryParams?.["code"] ? 2 : 2,
      signupByGitHub: queryParams?.["github"] ? true : false,
      githubCode: queryParams?.["code"],
      githubState: queryParams?.["state"],
      widgetData: null,
      allowedRetry: null
    };
  }

  componentDidMount = () => {
    this.otpWidgetSetup();
  }

  setStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  // finalSubmit = () => {
  //   console.log("signup with company setup");
  // }

  // signUpCompleted() {
  //   location.href = process.env.API_BASE_URL + '/hello-new/'
  // }

  // signUpFailed(error) {
  //   console.log(error);
  // }

  signupByGitHubAccount() {
    let state = Math.floor(100000000 + Math.random() * 900000000);
    location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&allow_signup=true&scope=user&redirect_uri=${process.env.REDIRECT_URL}/login?github=true&state=${state}`;
  }

  otpWidgetSetup = () => {
    const head = document.getElementsByTagName("head")[0];
    const currentTimestamp = new Date().getTime();
    const otpWidgetScript = document.createElement("script");
    otpWidgetScript.type = "text/javascript";
    otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;
    otpWidgetScript.onload = () => {
      const configuration = {
        widgetId: process.env.OTP_WIDGET_TOKEN,
        tokenAuth: process.env.WIDGET_AUTH_TOKEN,
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
      const widgetDataInterval = setInterval(() => {
        let widgetData = window.getWidgetData();
        if (widgetData) {
          this.setState({
            widgetData: window.getWidgetData(),
            allowedRetry: {
              email: widgetData?.processes?.filter(e => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Email),
              whatsApp: widgetData?.processes?.filter(e => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Whatsapp),
              voice: widgetData?.processes?.filter(e => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Voice),
              sms: widgetData?.processes?.filter(e => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Sms),
            }
          })
          clearInterval(widgetDataInterval)
        }
      }, 1000);
    };
    head.appendChild(otpWidgetScript);
  }

  identifierChange = (notByEmail) => {
    if (notByEmail) {
      this.setState({ smsIdentifier: null });
      return;
    }
    if (!notByEmail) {
      this.setState({ emailIdentifier: null });
      return;
    }
  }

  sendOtp = (identifier, notByEmail) => {
    if (!new RegExp(EMAIL_REGEX).test(identifier) && !notByEmail) {
      this.setState({ emailIdentifierError: 'Enter valid email.' });
      return;
    }
    if (!new RegExp(MOBILE_REGEX).test(identifier) && notByEmail) {
      this.setState({ smsIdentifierError: 'Enter valid mobile.' });
      return;
    }
    window.sendOtp(
      identifier,
      (data) => {
        if (notByEmail) {
          this.setState({ smsRequestId: data?.message, smsIdentifier: identifier, smsSuccessMessage: 'OTP sent successfully.' });
        } else {
          this.setState({ emailRequestId: data?.message, emailIdentifier: identifier, emailSuccessMessage: 'OTP sent successfully.' });
        }
      },
      (error) => {
        this.setState({
          smsIdentifierError: notByEmail ? error?.message : this.state?.smsIdentifierError,
          emailIdentifierError: !notByEmail ? error?.message : this.state?.emailIdentifierError
        });
      }
    );
  };

  retryOtp(retryBy, requestId, notByEmail) {
    window.retryOtp(
      retryBy,
      (data) => {
        if (notByEmail) {
          this.setState({ smsSuccessMessage: 'OTP resent successfully.' });
        } else {
          this.setState({ emailSuccessMessage: 'OTP resent successfully.' });
        }
      },
      (error) => {
        this.setState({
          smsIdentifierError: notByEmail ? error?.message : this.state?.smsIdentifierError,
          emailIdentifierError: !notByEmail ? error?.message : this.state?.emailIdentifierError
        });
      },
      requestId
    );
  }

  verifyOtp = (otp, requestId, notByEmail) => {
    window.verifyOtp(
      otp,
      (data) => {
        if (!notByEmail) {
          this.setState({
            emailAccessToken: data.message,
            smsSuccessMessage: 'Email verified.'
          });
        } else {
          this.setState({
            smsAccessToken: data.message,
            smsSuccessMessage: 'Mobile verified.'
          });
        }
      },
      (error) => {
        this.setState({
          smsIdentifierError: notByEmail ? error?.message : this.state?.smsIdentifierError,
          emailIdentifierError: !notByEmail ? error?.message : this.state?.emailIdentifierError
        });
      },
      requestId
    );
  }

  getQueryParamsDeatils(url) {
    let params = (url || '').split('?')?.[1];
    if (params) {
      let paramsKeyValue = params.split('&');
      let userData = {};
      for (let keyValue of paramsKeyValue) {
        let data = keyValue.split('=');
        userData[data[0]] = data[1];
      }
      return userData;
    }
    return null;
  }

  validateUserForCompany = () => {
    
  }

  render() {
    console.log(this.state)
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
                  sendOtp={this.sendOtp}
                  setStep={this.setStep}
                  verifyOtp={this.verifyOtp}
                  widgetData={this.state.widgetData}
                  allowedRetry={this.state.allowedRetry}
                  retryOtp={this.retryOtp}
                  validateUserForCompany={this.validateUserForCompany}
                  identifierChange={this.identifierChange}
                  OTPRetryModes={OTPRetryModes}
                  smsRequestId={this.state?.smsRequestId}
                  emailRequestId={this.state?.emailRequestId}
                  invalidMobile={this.state?.smsIdentifierError}
                  invalidEmail={this.state?.emailIdentifierError}
                  smsIdentifier={this.state?.smsIdentifier}
                  emailIdentifier={this.state?.emailIdentifier}
                  smsSuccessMessage={this.state?.smsSuccessMessage}
                  emailSuccessMessage={this.state?.emailSuccessMessage}
                  smsAccessToken={this.state?.smsAccessToken}
                  emailAccessToken={this.state?.emailAccessToken}
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
