import React from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";

class StepThree extends React.Component {
  render() {
    return (
      <>
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
                  <p
                    className="form-check-label c-fs-6 c-fw-500 ps-0"
                    htmlFor="termsCheckBox"
                  >
                    I agree to the
                  </p>
                </div>
                <div>
                  <button
                    className="me-3 back_btn"
                    onClick={() => this.props.setStep(2)}
                  >
                    <MdKeyboardArrowLeft />
                    Back
                  </button>
                  <button
                    className="next_btn col-white"
                    onClick={() => this.props.finalSubmit()}
                  >
                    Next <MdKeyboardArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default StepThree;
