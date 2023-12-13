import React from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        howToUse: "",
        companyName: "",
        industryType: "",
        serviceNeeded: "",
        country: "",
        stateProvince: "",
        pincode: "",
        city: "",
        address: "",
        gstNumber: "",
        agreeToTerms: false,
      },
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  finalSubmit = () => {
    const formDataJson = JSON.stringify(this.state.formData);
    console.log(formDataJson);
  };

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
        <form className="row px-0 step_two_wrapper mt-4">
          <div className="col-xxl-6 col-xl-8 col-lg-10">
            <div className="row g-4">
              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.formData.firstName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.formData.lastName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-12 step_two_wrapper--personal-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="How are you going to use this?"
                  name="howToUse"
                  value={this.state.formData.howToUse}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-lg-6  step_two_wrapper--company-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  name="companyName"
                  value={this.state.formData.companyName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-lg-6  step_two_wrapper--company-form">
                <select
                  autoComplete="on"
                  className="form-select"
                  aria-label="Default Industry Type"
                  name="industryType"
                  value={this.state.formData.industryType}
                  onChange={this.handleInputChange}
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
                  name="serviceNeeded"
                  value={this.state.formData.serviceNeeded}
                  onChange={this.handleInputChange}
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
                  name="country"
                  value={this.state.formData.country}
                  onChange={this.handleInputChange}
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
                  name="stateProvince"
                  value={this.state.formData.stateProvince}
                  onChange={this.handleInputChange}
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
                  name="pincode"
                  value={this.state.formData.pincode}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-lg-6  step_two_wrapper--company-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={this.state.formData.city}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-12 step_two_wrapper--company-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={this.state.formData.address}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-12 step_two_wrapper--company-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="GST number"
                  name="gstNumber"
                  value={this.state.formData.gstNumber}
                  onChange={this.handleInputChange}
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
                  name="agreeToTerms"
                  checked={this.state.formData.agreeToTerms}
                  onChange={this.handleInputChange}
                />
                <p
                  className="form-check-label c-fs-6 c-fw-500 ps-0"
                  htmlFor="termsCheckBox"
                >
                  I agree to the terms and conditions
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
                  type="button"
                  onClick={this.finalSubmit}
                >
                  Next <MdKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
        </form>
          </div>
      </>
    );
  }
}

export default StepThree;
