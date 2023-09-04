import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Component } from "react";
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
        countryName: "",
        stateProvince: "",
        stateName: "",
        pincode: "",
        city: "",
        cityId: "",
        otherCity: "",
        address: "",
        gstNumber: "",
        agreeToTerms: false,
      },
      formErrorData: {
        firstNameError: "",
        lastNameError: "",
        gstNumberError: "",
        pincodeError: "",
        // Add more error fields for other inputs
      },
      countryNames: [],
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

  getCountries = async () => {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/api/v5/web/getCountries`,
      {
        headers: {
          Cookie:
            "HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D",
        },
      }
    );
    return response;
  };

  componentDidMount() {
    this.getCountries()
      .then((response) => {
        this.setState({ countryNames: response.data.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchDataBasedOnCountry = async (selectedCountry) => {
    let countryName = this.state.countryNames.find(e => +e.id === +this.state.formData.country)?.name;
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/api/v5/web/getStatesByCountryId/${selectedCountry}`,
        {
          headers: {
            Cookie:
              "HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D",
          },
        }
      );
      this.setState({
        countryData: response.data, formData: {
          ...this.state.formData,
          countryName
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchDataBasedOnState = async (selectedstateProvince) => {
    try {
      const response = await axios.get(
        `${process.env.API_BASE_URL}/api/v5/web/getCitiesByStateId/${selectedstateProvince}`,
        {
          headers: {
            Cookie:
              "HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D",
          },
        }
      );
      this.setState({ stateData: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formData.country !== this.state.formData.country) {
      // Country has changed, fetch data based on the country
      this.fetchDataBasedOnCountry(this.state.formData.country);
    }

    if (prevState.formData.stateProvince !== this.state.formData.stateProvince) {
      // State/Province has changed, fetch data based on the state
      this.fetchDataBasedOnState(this.state.formData.stateProvince);
    }
  }

  //validation 
  validateFirstName = () => {
    const { firstName } = this.state.formData;
    // Regular expression to match names that contain only letters (no numbers or spaces)
    const nameRegex = /^[A-Za-z]+$/;
    if (firstName.trim() === '') {
      return 'First Name is required';
    } else if (!nameRegex.test(firstName)) {
      return 'First Name should only contain letters';
    }
    return '';
  };

  validateLastName = () => {
    const { lastName } = this.state.formData;
    // Regular expression to match names that contain only letters (no numbers or spaces)
    const nameRegex = /^[A-Za-z]+$/;
    if (lastName.trim() === '') {
      return 'Last Name is required';
    } else if (!nameRegex.test(lastName)) {
      return 'Last Name should only contain letters';
    }
    return '';
  };

  validateGSTNumber = () => {
    const { gstNumber } = this.state.formData;
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
    if (!gstRegex.test(gstNumber)) {
      return 'Invalid GST Number';
    }
    return '';
  };

  validatePincode = () => {
    const { pincode } = this.state.formData;
    const pincodeRegex = /^[0-9 A-Z a-z -]{4,11}$/;

    if (!pincodeRegex.test(pincode)) {
      return 'Pincode must be a 6-digit number';
    }
    return '';
  };

  finalSubmit = () => {
    const firstNameError = this.validateFirstName();
    const lastNameError = this.validateLastName();
    const gstNumberError = this.validateGSTNumber();
    const pincodeError = this.validatePincode();

    if (firstNameError || lastNameError || gstNumberError /* add more */) {
      this.setState((prevState) => ({
        formErrorData: {
          ...prevState.formErrorData,
          firstNameError,
          lastNameError,
          gstNumberError,
          pincodeError,
          // Add more error fields for other inputs
        },
      }));
    } else {
      this.props.finalSubmit(this.state.formData);
    }
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
                {/* <div className="col-12">
                  <div className="step_two_wrapper__toggle_button">
                    <button className="step_two_wrapper__toggle_button__left">
                      Company/Developer
                    </button>
                    <button className="step_two_wrapper__toggle_button__right">
                      Personal use
                    </button>
                  </div>
                </div> */}

                <div className="col-lg-6 form-input-with-error">
                  <input
                    type="text"
                    className={this.state.formErrorData.firstNameError ? 'form-control input-error-display' : 'form-control'}
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.formData.firstName}
                    onChange={this.handleInputChange}
                  />
                  <div className="text-danger input-error-message c-fs-6">{this.state.formErrorData.firstNameError}</div>
                </div>
                <div className="col-lg-6 form-input-with-error">
                  <input
                    type="text"
                    className={this.state.formErrorData.lastNameError ? 'form-control input-error-display' : 'form-control'}
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.formData.lastName}
                    onChange={this.handleInputChange}
                  />
                  <div className="text-danger input-error-message c-fs-6">{this.state.formErrorData.lastNameError}</div>
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
                    <option value="">Industry Type</option>
                    <option value="option1">option 1</option>
                    <option value="option2">option 2</option>
                    <option value="option3">option 3</option>
                  </select>
                </div>
                <div className="col-12 step_two_wrapper--company-form">
                  <select
                    autoComplete="on"
                    className="form-select"
                    aria-label="Default Service Needed"
                    name="serviceNeeded"
                    value={this.state.formData.serviceNeeded}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Service Needed</option>
                    <option value="option1">option 1</option>
                    <option value="option2">option 2</option>
                    <option value="option3">option 3</option>
                  </select>
                </div>
                <div className="col-6 step_two_wrapper--company-form">
                  <select
                    autoComplete="on"
                    className="form-select"
                    aria-label="Default Country"
                    name="country"
                    value={this.state.formData.country}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Country</option>
                    {this.state.countryNames.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                    <option key="other" value="other">
                      Other
                    </option>
                  </select>
                </div>
                <div className="col-6 step_two_wrapper--company-form">
                  <select
                    autoComplete="on"
                    className="form-select"
                    aria-label="Default State/Province"
                    name="stateProvince"
                    value={this.state.formData.stateProvince}
                    onChange={this.handleInputChange}
                  >
                    <option value="">State/Province</option>
                    {this.state.countryData
                      ? this.state.countryData?.data.map((stateProvince) => (
                        <option key={stateProvince.id} value={stateProvince.id}>
                          {stateProvince.name}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-lg-6  step_two_wrapper--company-form form-input-with-error">
                  <input
                    type="text"
                    className={this.state.formErrorData.pincodeError ? 'form-control input-error-display' : 'form-control'}
                    placeholder="Pincode"
                    name="pincode"
                    value={this.state.formData.pincode}
                    onChange={this.handleInputChange}
                  />
                  <div className="text-danger input-error-message c-fs-6">{this.state.formErrorData.pincodeError}</div>

                </div>
                <div className="col-lg-6  step_two_wrapper--company-form">
                  <select
                    autoComplete="on"
                    className="form-select"
                    aria-label="Default State/Province"
                    name="city"
                    value={this.state.formData.city}
                    onChange={this.handleInputChange}
                  >
                    <option value="">City</option>
                    {this.state.countryData
                      ? this.state.stateData?.data.map((city) => (
                        <option key={city.id} value={city.countryCode}>
                          {city.name}
                        </option>
                      ))
                      : null}
                    <option value="other">Other</option>
                  </select>
                </div>
                {this.state.formData.city == "other" &&
                  <div className="col-12 step_two_wrapper--company-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your city"
                      name="otherCity"
                      value={this.state.formData.otherCity}
                      onChange={this.handleInputChange}
                    />
                  </div>
                }
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
                <div className="col-12 step_two_wrapper--company-form form-input-with-error">
                  <input
                    type="text"
                    className={this.state.formErrorData.gstNumberError ? 'form-control input-error-display' : 'form-control'}
                    placeholder="GST number"
                    name="gstNumber"
                    value={this.state.formData.gstNumber}
                    onChange={this.handleInputChange}
                  />
                  <div className="text-danger input-error-message c-fs-6">{this.state.formErrorData.gstNumberError}</div>

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
                  {/* <button
                    className="me-3 back_btn"
                    onClick={() => this.props.setStep(2)}
                  >
                    <MdKeyboardArrowLeft />
                    Back
                  </button> */}
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
