import {
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
    MdDone,
    MdCheckCircle,
    MdCheckCircleOutline,
  } from "react-icons/md";
  const signUp = () => {
    console.log("inside signup page");
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
                <p>Trusted by<span> 30000+ </span>startups and enterprises</p>
              </div>
            </div>
          </div>
          <div className="entry__right_section col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
            <div className="container entry__right_section__container">
              {/* STEP #1 */}
              <div className="entry__right_section__container--step entry__right_section__container--active">
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
                <div className="entry__right_section__container__entry_with d-flex mb-4 me-4">
                  <div className="signup_with__left pe-4">
                    <span className="d-inline-block mb-4">Sign up with</span>
  
                    <div className="d-flex align-items-center">
                      <button className="entry__right_section__container__entry_with--btn-with-text me-3" style={{border: "1px solid var(--primary-light-theme, #1E75BA)"}}>
                        <img
                          src="/img/tie/google-logo.svg"
                          width="24px"
                          height="24px"
                          alt="Google Icon"
                        />
                        <span>Google</span>
                      </button>
                      <button className="me-3" style={{border: "1px solid var(--primary-light-theme, #1E75BA)", background:"var(--light-white-bg, #FFF);"}}>
                        <img
                          src="/img/microsoft-svg.svg"
                          width="24px"
                          height="24px"
                          alt="Microsoft Icon"
                        />
                      </button>
                      <button style={{border: "1px solid #D94C44"}}>
                        <img
                          src="/img/icon-zogo.svg"
                          width="24px"
                          height="24px"
                          alt="Zogo Icon"
                        />
                      </button>
                    </div>
                  </div>
  
                  <div className="signup_with__right ps-4">
                    <span className="d-inline-block mb-4">
                      Are you a developer?
                    </span>
  
                    <div className="d-flex align-items-center">
                      <button className="me-3" style={{border:"1px solid #000"}}>
                        <img
                          src="/img/icon-github.svg"
                          width="24px"
                          height="24px"
                          alt="Github Icon"
                        />
                      </button>
                      <button className="me-3" style={{border: "1px solid #E24329", background:"var(--light-white-bg, #FFF)"}}>
                        <img
                          src="/img/icon-gitlab.svg"
                          width="24px"
                          height="24px"
                          alt="Gitlab Icon"
                        />
                      </button>
                      <button style={{border:"1px solid #2684FF", background:"1px solid #2684FF"}}>
                        <img
                          src="/img/icon-group.svg"
                          width="24px"
                          height="24px"
                          alt="Group icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
  
                <span className="d-block line_on_right c-fs-6 mb-4">or</span>
  
                <button className="entry__right_section__container__entry_button mb-4">
                  Sign up with Email
                  <MdKeyboardArrowRight />
                </button>
  
                <p className="c-fs-6 mb-4">
                  If you already have an account,{" "}
                  <a href="#" className="text_blue">
                    Login
                  </a>
                </p>
              </div>
  


              {/* STEP #2 */}
              <div className="entry__right_section__container--step ">
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
                        <label className="custom-input-label"><small style={{ fontSize: '10px' }}>Email</small></label>
                          <input
                            type="email"
                            className="form-control custom-input-group"
                            id="email"
                            placeholder="Email Address"
                          />
                          <span className="position-relative">
                            <MdCheckCircle className="icon-success otp_verified_icon" />
                          </span>
                          <button className="custom-signup-btn">
                            Get OTP
                          </button>
                          <button className="btn custom-signup-btn d-none">
                            Change Email
                          </button>
                        </div>
                      </div>
                      <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                        <div className="d-flex flex-column">
                          <div className="d-flex">
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <button className="custom-signup-btn">
                              Verify
                            </button>
                          </div>
                          <p className="col-dark mt-3 c-fs-6">
                            Resend on <a href="#" className="col-primary c-fw-600 p-3">Email</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="col-success c-fs-6 c-fw-500 my-4" style={{color: "var(--whats-app-green, #29A653)"}}>
                      The OTP has been successfully sent to {"email"}.
                    </p>
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
                            id="contact"
                            placeholder="Mobile number"
                          />
  
                          <span className="position-relative">
                            <MdCheckCircle className="icon-success otp_verified_icon" />
                          </span>
                          <button className="custom-signup-btn">
                            Get OTP
                          </button>
                        </div>
                      </div>
                      <div className="step_input_wrapper__right col-xl-6 col-lg-12">
                        <div className="d-flex flex-column">
                          <div className="d-flex">
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <input
                              type="text"
                              className="form-control otp_input"
                              placeholder="*"
                              maxLength="1"
                            />
                            <button className="custom-signup-btn">
                              Verify
                            </button>
                          </div>

                        <p className="col-dark mt-3 c-fs-6 p-2">
                          Resend on <a href="#" className="col-primary c-fw-600 p-3">Text</a>
                         or <a href="#" className="col-primary c-fw-600 p-3">WhatsApp</a>
                          or <a href="#" className="col-primary c-fw-600 p-3">Email</a>
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div>
                      <button className="me-3 btn back_btn">
                        {" "}
                        <MdKeyboardArrowLeft />
                        Back
                      </button>
                      <button className=" next_btn col-white">
                        {" "}
                        Next <MdKeyboardArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* STEP #3 */}
              <div className="entry__right_section__container--step">
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
                      <MdCheckCircle className="visible_on_success me-1"/>
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
                      <div class="form-check my-4 pb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="true"
                          id="termsCheckBox"
                        />
                        {/* <label
                          class="form-check-label c-fs-6 c-fw-500 ps-0"
                          htmlFor="termsCheckBox"
                        >
                          I agree to the{" "}
                          <span className="col-primary">Terms of Service </span>{" "}
                          and
                          <p className="col-primary"><a>Privacy Policy</a></p>
                        </label> */}
                        <p className="form-check-label c-fs-6 c-fw-500 ps-0" htmlFor="termsCheckBox">
                        I agree to the<a href="#" className="col-primary p-2">Terms and Service</a> and <a href="#" className="col-primary p-2">Privacy Policy</a>
                        </p>
                      </div>
                      <div>
                        <button className="me-3 back_btn">
                          <MdKeyboardArrowLeft />
                          Back
                        </button>
                        <button className="next_btn col-white">
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
  };
  export default signUp;