import React from 'react';
import axios from 'axios';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdCheckCircle, MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import Select from 'react-select';

class StepThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: props?.formData || {
                firstName: '',
                lastName: '',
                companyName: '',
                industryType: '',
                serviceNeeded: [],
                country: '',
                countryName: '',
                stateProvince: '',
                stateName: '',
                pincode: '',
                city: '',
                cityId: '',
                otherCity: '',
                address: '',
                gstNumber: '',
                vatNumber: '',
                agreeToTerms: false,
                acceptInviteForCompanies: [],
                rejectInviteForCompanies: [],
            },
            formErrorData: {
                firstNameError: '',
                lastNameError: '',
                gstNumberError: '',
                pincodeError: '',
                companyNameError: '',
                industryTypeError: '',
                serviceNeededError: '',
                countryError: '',
                stateError: '',
                cityError: '',
                otherCityError: '',
                addressError: '',
                varNumberError:'',
                // Add more error fields for other inputs
            },
            invitationRender: true,
            defaultServiceNeeded: null,
            serviceRender: true,
            createCompany: !props.invitations,
            countryNames: [],
        };
    }

    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    getCountries = async () => {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/v5/web/getCountries`, {
            headers: {
                Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
            },
        });
        return response;
    };
    fetchServices = async () => {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/v5/web/getAllServices`, {
            headers: {
                Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
            },
        });
        return response;
    };
    fetchIndustry = async () => {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/v5/web/getIndustry`, {
            headers: {
                Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
            },
        });
        return response;
    };

    componentDidMount() {
        this.fetchServices()
            .then((response) => {
                let services = response.data.data;
                this.setState({ services });
                const formDataServices = this.state.formData.serviceNeeded;
                if (!formDataServices.length && this.props?.preselectedService) {
                    Object.entries(services).find(([key, value]) => {
                        if (value.toLowerCase().includes(this.props?.preselectedService.toLowerCase())) {
                            this.setState({
                                defaultServiceNeeded: [{ value: +key, label: value }],
                                formData: {
                                    ...this.state.formData,
                                    serviceNeeded: [{ value: +key, label: value }],
                                },
                                serviceRender: false,
                            });
                            setTimeout(() => {
                                this.setState({ serviceRender: true });
                            }, 1);
                            return true;
                        }
                    });
                } else if (formDataServices.length) {
                    const defaultServiceNeeded = [];
                    Object.entries(services).forEach(([key, value]) => {
                        if (formDataServices.includes(+key)) {
                            defaultServiceNeeded.push({ value: +key, label: value });
                        }
                    });
                    this.setState({
                        defaultServiceNeeded,
                        formData: {
                            ...this.state.formData,
                            serviceNeeded: defaultServiceNeeded,
                        },
                        serviceRender: false,
                    });
                    setTimeout(() => {
                        this.setState({ serviceRender: true });
                    }, 1);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        this.fetchIndustry()
            .then((response) => {
                this.setState({ industries: response.data.data });
            })
            .catch((error) => {
                console.error(error);
            });

        this.getCountries()
            .then((response) => {
                this.setState({ countryNames: response.data.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    fetchDataBasedOnCountry = async (selectedCountry) => {
        const countryName = this.state.countryNames.find((e) => +e.id === +this.state.formData.country)?.name;
        try {
            const response = await axios.get(
                `${process.env.API_BASE_URL}/api/v5/web/getStatesByCountryId/${selectedCountry}`,
                {
                    headers: {
                        Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                    },
                }
            );
            this.setState({
                countryData: response.data,
                formData: {
                    ...this.state.formData,
                    countryName,
                    gstNumber: '',
                    vatNumber: '', 
                    stateProvince: '',
                    stateName: '',
                    city: '',
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    fetchDataBasedOnState = async (selectedstateProvince) => {
        const stateName = this.state?.countryData?.data?.find((e) => +e.id === +selectedstateProvince)?.name;
        try {
            const response = await axios.get(
                `${process.env.API_BASE_URL}/api/v5/web/getCitiesByStateId/${selectedstateProvince}`,
                {
                    headers: {
                        Cookie: 'HELLO_APP_HASH=aHBVU0doU1NwRktBUDVkVndNSndUUVY3N1lmcWxzZVV2b01LcEkvR2ViST0%3D; PHPSESSID=8611kbh15da1ecpqeb712qlusj; PROXY_APP_HASH=YnB6Vm92ejVEYkgxSFR1bUxkNWFVMm9uYXUra1JzYk5QNEFyRVRKQXJiMD0%3D',
                    },
                }
            );
            this.setState({
                stateData: response.data,
                formData: {
                    ...this.state.formData,
                    stateName,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    setCityIdByCityName = (selectedCityName) => {
        const cityId = this.state?.stateData?.data?.find((e) => e.name === selectedCityName)?.id;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                cityId,
            },
        }));
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
        const { gstNumber, countryName } = this.state.formData;
        const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
        if (countryName?.toLowerCase()?.includes('india') && gstNumber && !gstRegex.test(gstNumber)) {
            return 'Invalid GST Number';
        }
        return '';
    };

    validatePincode = () => {
        const { pincode } = this.state.formData;
        const pincodeRegex = /^[0-9 A-Z a-z -]{4,11}$/;
        if (!pincode) {
            return 'Pincode is required';
        }
        if (!pincodeRegex.test(pincode)) {
            return 'Pincode must be a valid';
        }
        return '';
    };

    validateRequired = (fieldName, label) => {
        const fieldValue = this.state.formData?.[fieldName];
        if (fieldValue?.trim()?.length === 0) {
            return label + ' is required';
        }
        return '';
    };

    validateMinMax = (fieldName, label, min, max) => {
        const fieldValue = this.state.formData?.[fieldName];
        if (min !== null && min !== undefined && +min && fieldValue?.length < min) {
            return `${label} must be more than ${min} characters`;
        }
        if (max !== null && max !== undefined && +max && fieldValue?.length > max) {
            return `${label} should be less than ${max} characters`;
        }
        return '';
    };

    finalSubmit = () => {
        const errors = {
            firstNameError: this.validateFirstName() || this.validateMinMax('firstName', 'First Name', null, 50),
            lastNameError: this.validateLastName() || this.validateMinMax('lastName', 'Last Name', null, 50),
            gstNumberError: this.validateGSTNumber(),
            pincodeError: this.validatePincode(),
            companyNameError: this.validateRequired('companyName', 'Company Name'),
            industryTypeError: this.validateRequired('industryType', 'Industry Type'),
            serviceNeededError:
                this.state.formData.serviceNeeded?.length === 0 ? 'Need to select atleast one service' : '',
            countryError: this.validateRequired('country', 'Country'),
            stateError: this.validateRequired('stateName', 'State'),
            cityError: this.validateRequired('city', 'City'),
            otherCityError: this.state.formData.city === 'other' ? this.validateRequired('otherCity', 'City') : '',
            addressError:
                this.validateRequired('address', 'Address') || this.validateMinMax('address', 'Address', 5, 100),
        };
        if (this.state.createCompany) {
            this.setState((prevState) => ({
                formErrorData: {
                    ...prevState.formErrorData,
                    ...errors,
                },
            }));
        }
        if (!(this.state.createCompany && Object.values(errors).find((error) => Boolean(error)))) {
            if (
                this.props.invitations &&
                !this.state.createCompany &&
                !this.state.formData.acceptInviteForCompanies.length
            ) {
                toast.error('Accept atleast one invitation or create a new company');
            } else {
                this.props.finalSubmit(this.state.formData, this.state.createCompany);
            }
        }
    };

    handleInvitationSelection = () => {
        this.setState({ invitationRender: false });
        setTimeout(() => {
            this.setState({ invitationRender: true });
        }, 1);
    };

    render() {
        return (
            <>
                <div className="trep-three d-flex flex-column gap-4">
                    <div className="step-three__progress d-flex align-items-center gap-4">
                        <div className="ico-green align-items-center gap-2 c-fs-7 d-lg-flex hide-on-mobile">
                            <MdCheckCircle className="ico-green svg-icon" /> Verify email & mobile number
                        </div>
                        <span className="progress-line line-green d-lg-block hide-on-mobile"></span>
                        <div className="d-flex  align-items-center gap-2 c-fs-7 ">
                            <MdCheckCircle className="ico-grey svg-icon" />
                            Enter details
                        </div>
                    </div>
                    {/* <p className="step-three__reddirect">Redirecting...</p> */}
                    <div className="d-flex gap-4 flex-column  flex-lg-row detail-form__group step-three__main mt-3">
                        <div className="w-100 form-input-with-error">
                            <input
                                type="text"
                                className={
                                    this.state.formErrorData.firstNameError
                                        ? 'form-control input-error-display'
                                        : 'form-control'
                                }
                                placeholder="First Name*"
                                name="firstName"
                                value={this.state.formData.firstName}
                                onChange={this.handleInputChange}
                            />
                            <div className="text-danger input-error-message c-fs-7">
                                {this.state.formErrorData.firstNameError}
                            </div>
                        </div>
                        <div className="w-100 form-input-with-error">
                            <input
                                type="text"
                                className={
                                    this.state.formErrorData.lastNameError
                                        ? 'form-control input-error-display'
                                        : 'form-control'
                                }
                                placeholder="Last Name*"
                                name="lastName"
                                value={this.state.formData.lastName}
                                onChange={this.handleInputChange}
                            />
                            <div className="text-danger input-error-message c-fs-7">
                                {this.state.formErrorData.lastNameError}
                            </div>
                        </div>
                    </div>
                    {this.props.invitations && (
                        <div className="d-grid gap-4 my-2">
                            {this.state.invitationRender &&
                                Object.values(this.props.invitations).map((value) => {
                                    return (
                                        <div className="d-flex flex-wrap gap-4 align-items-center">
                                            <p className="invitation-banner">
                                                You are invited to join{' '}
                                                <span className="c-fw-sb">{value.companyName}</span>
                                            </p>
                                            {(value?.accept === null || value?.accept === undefined) && (
                                                <div className="d-flex gap-4 align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-accept rounded"
                                                        onClick={() => {
                                                            value.accept = true;
                                                            this.state.formData.acceptInviteForCompanies.push(
                                                                value.companyId
                                                            );
                                                            this.handleInvitationSelection();
                                                        }}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-reject rounded"
                                                        onClick={() => {
                                                            value.accept = false;
                                                            this.state.formData.rejectInviteForCompanies.push(
                                                                value.companyId
                                                            );
                                                            this.handleInvitationSelection();
                                                        }}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {value?.accept === true && <MdCheckCircle className="ico-green svg-icon" />}
                                            {value?.accept === false && <MdCancel className="ico-red svg-icon" />}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {this.props?.invitations && !this.state.createCompany && (
                        <div>
                            <button
                                className="btn btn-login-prime-o create-company-btn"
                                onClick={() => this.setState({ createCompany: true })}
                            >
                                {' '}
                                Create New Company
                            </button>
                        </div>
                    )}
                    {this.props?.invitations && this.state.createCompany && (
                        <div className="d-flex align-items-center justify-content-between step-three__main">
                            <span className="c-fs-5 fw-medium"> Create Company </span>
                            <button
                                className="btn c-fs-6 c-fw-r btn-default"
                                onClick={() => this.setState({ createCompany: false })}
                            >
                                {' '}
                                Cancel
                            </button>
                        </div>
                    )}
                    {this.state.createCompany && (
                        <form className="step-three__main">
                            <div className="detail-form d-flex flex-column gap-4">
                                <div className="col-12 form-input-with-error">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Company Name*"
                                        name="companyName"
                                        value={this.state.formData.companyName}
                                        onChange={this.handleInputChange}
                                    />
                                    <div className="text-danger input-error-message c-fs-7">
                                        {this.state.formErrorData.companyNameError}
                                    </div>
                                </div>
                                <div className="col-12 form-input-with-error">
                                    <select
                                        autoComplete="on"
                                        className="form-select"
                                        aria-label="Default Industry Type"
                                        name="industryType"
                                        value={this.state.formData.industryType}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">Select Industry Type*</option>
                                        {this.state.industries && Object.keys(this.state.industries).length > 0 && (
                                            <>
                                                {this.state.industries.map((obj) => (
                                                    <option key={obj.id} value={obj.name}>
                                                        {obj.name}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    <div className="text-danger input-error-message c-fs-7">
                                        {this.state.formErrorData.industryTypeError}
                                    </div>
                                </div>
                                <div className="col-12 form-input-with-error">
                                    {this.state.serviceRender && (
                                        <Select
                                            isMulti
                                            isClearable
                                            instanceId={'serviceNeeded'}
                                            defaultValue={this.state.defaultServiceNeeded}
                                            onChange={(value) => {
                                                this.setState((prevState) => ({
                                                    formData: {
                                                        ...prevState.formData,
                                                        serviceNeeded: value.map((obj) => obj.value),
                                                    },
                                                }));
                                            }}
                                            placeholder="Select Service Needed*"
                                            options={
                                                this.state.services
                                                    ? Object.entries(this.state.services).map(([key, value]) => ({
                                                          value: +key,
                                                          label: value,
                                                      }))
                                                    : []
                                            }
                                            className="chip-list-select"
                                            classNamePrefix="signup_react_select"
                                        />
                                    )}
                                    <div className="text-danger input-error-message c-fs-7">
                                        {this.state.formErrorData.serviceNeededError}
                                    </div>
                                </div>
                                <div className="d-flex gap-4 flex-column flex-lg-row detail-form__group">
                                    <div className="w-100 form-input-with-error">
                                        <select
                                            autoComplete="on"
                                            className="form-select"
                                            aria-label="Default Country"
                                            name="country"
                                            value={this.state.formData.country}
                                            onChange={this.handleInputChange}
                                        >
                                            <option value="">Select Country*</option>
                                            {this.state.countryNames.map((country) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                            <option key="other" value="other">
                                                Other
                                            </option>
                                        </select>
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.countryError}
                                        </div>
                                    </div>
                                    <div className="w-100 form-input-with-error">
                                        <select
                                            autoComplete="on"
                                            className="form-select"
                                            aria-label="Default State/Province"
                                            name="stateProvince"
                                            value={this.state.formData.stateProvince}
                                            onChange={this.handleInputChange}
                                        >
                                            <option value="">Select State/Province*</option>
                                            {this.state.countryData
                                                ? this.state.countryData?.data.map((stateProvince) => (
                                                      <option key={stateProvince.id} value={stateProvince.id}>
                                                          {stateProvince.name}
                                                      </option>
                                                  ))
                                                : null}
                                        </select>
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.stateError}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex gap-4 flex-column flex-lg-row detail-form__group">
                                    <div className="w-100 form-input-with-error">
                                        <input
                                            type="text"
                                            className={
                                                this.state.formErrorData.pincodeError
                                                    ? 'form-control input-error-display'
                                                    : 'form-control'
                                            }
                                            placeholder="Pincode*"
                                            name="pincode"
                                            value={this.state.formData.pincode}
                                            onChange={this.handleInputChange}
                                        />
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.pincodeError}
                                        </div>
                                    </div>
                                    <div className="w-100 form-input-with-error">
                                        <select
                                            autoComplete="on"
                                            className="form-select"
                                            aria-label="Default City"
                                            name="city"
                                            value={this.state.formData.city}
                                            onChange={(event) => {
                                                this.handleInputChange(event);
                                                this.setCityIdByCityName(event?.target?.value);
                                            }}
                                        >
                                            <option value="">Select City*</option>
                                            {this.state.countryData
                                                ? this.state.stateData?.data.map((city) => (
                                                      <option key={city.id} value={city.name}>
                                                          {city.name}
                                                      </option>
                                                  ))
                                                : null}
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.cityError}
                                        </div>
                                    </div>
                                </div>
                                {this.state.formData.city == 'other' && (
                                    <div className="col-12  form-input-with-error">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your city*"
                                            name="otherCity"
                                            value={this.state.formData.otherCity}
                                            onChange={this.handleInputChange}
                                        />
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.otherCityError}
                                        </div>
                                    </div>
                                )}
                                <div className="col-12 form-input-with-error">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address*"
                                        name="address"
                                        value={this.state.formData.address}
                                        onChange={this.handleInputChange}
                                    />
                                    <div className="text-danger input-error-message c-fs-7">
                                        {this.state.formErrorData.addressError}
                                    </div>
                                </div>
                                {this.state.formData.countryName?.toLowerCase()?.includes('india') && (
                                    <div className="col-12 form-input-with-error">
                                        <input
                                            type="text"
                                            className={
                                                this.state.formErrorData.gstNumberError
                                                    ? 'form-control input-error-display'
                                                    : 'form-control'
                                            }
                                            placeholder="GST number"
                                            name="gstNumber"
                                            value={this.state.formData.gstNumber}
                                            onChange={this.handleInputChange}
                                        />
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.gstNumberError}
                                        </div>
                                    </div>
                                )}
                                {this.state.formData.countryName?.toLowerCase()?.includes('united kingdom') && (
                                    <div className="col-12 form-input-with-error">
                                        <input
                                            type="text"
                                            className={
                                                this.state.formErrorData.varNumberError
                                                    ? 'form-control input-error-display'
                                                    : 'form-control'
                                            }
                                            placeholder="VAT number"
                                            name="vatNumber"
                                            value={this.state.formData.vatNumber}
                                            onChange={this.handleInputChange}
                                        />
                                        <div className="text-danger input-error-message c-fs-7">
                                            {this.state.formErrorData.varNumberError}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                    <div className="row">
                        <div className="col-12">
                            <div className="form-check my-2 d-flex align-items-center gap-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="true"
                                    id="termsCheckBox"
                                    name="agreeToTerms"
                                    checked={this.state.formData.agreeToTerms}
                                    onChange={this.handleInputChange}
                                />
                                <p className="form-check-label c-fs-7 c-fw-500 ps-0" htmlFor="termsCheckBox">
                                    I agree to the{' '}
                                    <a
                                        href="https://msg91.com/terms-of-use"
                                        target="_blank"
                                        className="cp text-hover-underline"
                                    >
                                        terms of use
                                    </a>
                                </p>
                            </div>
                            <div className="d-flex gap-3 mt-4">
                                <button
                                    className="btn btn-login-secondary c-fs-7"
                                    onClick={() => this.props.setStep(2)}
                                >
                                    {' '}
                                    <MdKeyboardArrowLeft />
                                    Back
                                </button>
                                <button
                                    className="btn btn-login-prime c-fs-7"
                                    type="button"
                                    onClick={this.finalSubmit}
                                    disabled={!this.state.formData.agreeToTerms || this.props?.isLoading}
                                >
                                    Next <MdKeyboardArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default StepThree;
