import React from 'react';
import axios from 'axios';
import {
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
    MdCheckCircle,
    MdCancel,
    MdCheckCircleOutline,
} from 'react-icons/md';
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
                <div className='flex flex-col gap-8 2xl:w-2/3 xl:w-2/3  max-w-[600px]'>
                    <div className='flex sm:flex-row flex-col sm:items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <MdCheckCircle fontSize={18} className={'text-green-600'} />
                            <span>Verify email & mobile number</span>
                        </div>
                        <span className='sm:w-[60px] w-[1px] sm:ml-0 ml-2 sm:h-[1px] h-6 bg-slate-400'></span>
                        <div className='flex items-center gap-2 text-slate-500'>
                            <MdCheckCircle fontSize={18} />
                            <span>Enter details</span>
                        </div>
                    </div>

                    <div className='flex md:flex-row  sm:flex-row flex-col gap-4 w-full'>
                        <div className='w-full'>
                            <input
                                type='text'
                                className={`${
                                    this.state.formErrorData.firstNameError ? 'input-error-display' : ''
                                } input input-bordered h-10 w-full `}
                                placeholder='First Name*'
                                name='firstName'
                                value={this.state.formData.firstName}
                                onChange={this.handleInputChange}
                            />
                            <p className='text-sm text-red-600'>{this.state.formErrorData.firstNameError}</p>
                        </div>
                        <div className='w-full'>
                            <input
                                type='text'
                                className={`${
                                    this.state.formErrorData.lastNameError ? 'input-error-display' : ''
                                } input input-bordered h-10 w-full `}
                                placeholder='Last Name*'
                                name='lastName'
                                value={this.state.formData.lastName}
                                onChange={this.handleInputChange}
                            />
                            <p className='text-sm text-red-600'>{this.state.formErrorData.lastNameError}</p>
                        </div>
                    </div>

                    {this.props.invitations && (
                        <div className='flex gap-3 flex-col'>
                            {this.state.invitationRender &&
                                Object.values(this.props.invitations).map((value) => {
                                    return (
                                        <div className='flex gap-2'>
                                            <p>
                                                You are invited to join <span>{value.companyName}</span>
                                            </p>
                                            {(value?.accept === null || value?.accept === undefined) && (
                                                <div className='flex gap-2'>
                                                    <button
                                                        className='btn btn-xs text-green-700 bg-green-200'
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
                                                        className='btn btn-xs text-red-700 bg-red-200'
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
                                            {value?.accept === true && <MdCheckCircle />}
                                            {value?.accept === false && <MdCancel />}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    <div className='flex flex-col gap-4'>
                        {this.props?.invitations && !this.state.createCompany && (
                            <>
                                <button
                                    className='btn w-fit btn-secondary'
                                    onClick={() => this.setState({ createCompany: true })}
                                >
                                    Create New Company
                                </button>
                            </>
                        )}
                        {this.props?.invitations && this.state.createCompany && (
                            <div className='flex items-center justify-between w-full'>
                                <h2 className='text-xl '> Create Company </h2>
                                <button
                                    className='btn btn-ghost btn-sm'
                                    onClick={() => this.setState({ createCompany: false })}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        {this.state.createCompany && (
                            <form className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <input
                                        className='input input-bordered h-10 w-full'
                                        type='text'
                                        placeholder='Company Name*'
                                        name='companyName'
                                        value={this.state.formData.companyName}
                                        onChange={this.handleInputChange}
                                    />
                                    <p className='text-sm text-red-600'>{this.state.formErrorData.companyNameError}</p>
                                </div>
                                <div className='flex md:flex-row  sm:flex-row flex-col gap-4 w-full'>
                                    <div className='flex flex-col w-full'>
                                        <div className='rounded border px-1 w-full'>
                                            <select
                                                className='h-10 w-full focus:outline-none'
                                                autoComplete='on'
                                                aria-label='Default Industry Type'
                                                name='industryType'
                                                value={this.state.formData.industryType}
                                                onChange={this.handleInputChange}
                                            >
                                                <option value=''>Select Industry Type*</option>
                                                {this.state.industries &&
                                                    Object.keys(this.state.industries).length > 0 && (
                                                        <>
                                                            {this.state.industries.map((obj) => (
                                                                <option key={obj.id} value={obj.name}>
                                                                    {obj.name}
                                                                </option>
                                                            ))}
                                                        </>
                                                    )}
                                            </select>
                                        </div>
                                        <p className='text-sm text-red-600'>
                                            {this.state.formErrorData.industryTypeError}
                                        </p>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        {this.state.serviceRender && (
                                            <Select
                                                classNames='h-10'
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
                                                placeholder='Select Service Needed*'
                                                options={
                                                    this.state.services
                                                        ? Object.entries(this.state.services).map(([key, value]) => ({
                                                              value: +key,
                                                              label: value,
                                                          }))
                                                        : []
                                                }
                                                className='chip-list-select'
                                                classNamePrefix='signup_react_select'
                                            />
                                        )}
                                        <p className='text-sm text-red-600'>
                                            {this.state.formErrorData.serviceNeededError}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex md:flex-row  sm:flex-row flex-col gap-4 w-full'>
                                    <div className='rounded border px-1 w-full'>
                                        <select
                                            className='h-10 w-full focus:outline-none'
                                            autoComplete='on'
                                            aria-label='Default Country'
                                            name='country'
                                            value={this.state.formData.country}
                                            onChange={this.handleInputChange}
                                        >
                                            <option value=''>Select Country*</option>
                                            {this.state.countryNames.map((country) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                            <option key='other' value='other'>
                                                Other
                                            </option>
                                        </select>
                                        <p className='text-sm text-red-600'>{this.state.formErrorData.countryError}</p>
                                    </div>
                                    <div className='rounded border px-1 w-full'>
                                        <select
                                            className='h-10 w-full focus:outline-none'
                                            autoComplete='on'
                                            aria-label='Default State/Province'
                                            name='stateProvince'
                                            value={this.state.formData.stateProvince}
                                            onChange={this.handleInputChange}
                                        >
                                            <option value=''>Select State/Province*</option>
                                            {this.state.countryData
                                                ? this.state.countryData?.data.map((stateProvince) => (
                                                      <option key={stateProvince.id} value={stateProvince.id}>
                                                          {stateProvince.name}
                                                      </option>
                                                  ))
                                                : null}
                                        </select>
                                        <p className='text-sm text-red-600'>{this.state.formErrorData.stateError}</p>
                                    </div>
                                </div>
                                <div className='flex md:flex-row  sm:flex-row flex-col gap-4 w-full'>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <input
                                            type='text'
                                            className={`input input-bordered h-10 w-full ${
                                                this.state.formErrorData.pincodeError ? 'input-error-display' : ''
                                            }`}
                                            placeholder='Pincode*'
                                            name='pincode'
                                            value={this.state.formData.pincode}
                                            onChange={this.handleInputChange}
                                        />
                                        <p className='text-sm text-red-600'>{this.state.formErrorData.pincodeError}</p>
                                    </div>
                                    <div className='rounded border px-1 w-full'>
                                        <select
                                            className='h-10 w-full focus:outline-none'
                                            autoComplete='on'
                                            aria-label='Default City'
                                            name='city'
                                            value={this.state.formData.city}
                                            onChange={(event) => {
                                                this.handleInputChange(event);
                                                this.setCityIdByCityName(event?.target?.value);
                                            }}
                                        >
                                            <option value=''>Select City*</option>
                                            {this.state.countryData
                                                ? this.state.stateData?.data.map((city) => (
                                                      <option key={city.id} value={city.name}>
                                                          {city.name}
                                                      </option>
                                                  ))
                                                : null}
                                            <option value='other'>Other</option>
                                        </select>
                                        <p className='text-sm text-red-600'>{this.state.formErrorData.cityError}</p>
                                    </div>
                                </div>
                                {this.state.formData.city == 'other' && (
                                    <div className='flex flex-col gap-1 w-full'>
                                        <input
                                            className='input input-bordered h-10 w-full'
                                            type='text'
                                            placeholder='Enter your city*'
                                            name='otherCity'
                                            value={this.state.formData.otherCity}
                                            onChange={this.handleInputChange}
                                        />
                                        <p className='text-sm text-red-600'>
                                            {this.state.formErrorData.otherCityError}
                                        </p>
                                    </div>
                                )}
                                <div className='flex flex-col gap-1 w-full'>
                                    <input
                                        className='input input-bordered h-10 w-full'
                                        type='text'
                                        placeholder='Address*'
                                        name='address'
                                        value={this.state.formData.address}
                                        onChange={this.handleInputChange}
                                    />
                                    <p className='text-sm text-red-600'>{this.state.formErrorData.addressError}</p>
                                </div>
                                {this.state.formData.countryName?.toLowerCase()?.includes('united kingdom') && (
                                    <div className='flex flex-col gap-1 w-full'>
                                        <input
                                            className='input input-bordered h-10 w-full'
                                            type='text'
                                            placeholder='VAT number'
                                            name='vatNumber'
                                            value={this.state.formData.vatNumber}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                )}
                                {this.state.formData.countryName?.toLowerCase()?.includes('india') && (
                                    <div className='flex flex-col gap-1 w-full'>
                                        <input
                                            className='input input-bordered h-10 w-full'
                                            type='text'
                                            placeholder='GST number'
                                            name='gstNumber'
                                            value={this.state.formData.gstNumber}
                                            onChange={this.handleInputChange}
                                        />
                                        <div>{this.state.formErrorData.gstNumberError}</div>
                                    </div>
                                )}
                            </form>
                        )}
                        <div className='flex gap-2 items-center'>
                            <input
                                type='checkbox'
                                value='true'
                                id='termsCheckBox'
                                name='agreeToTerms'
                                checked={this.state.formData.agreeToTerms}
                                onChange={this.handleInputChange}
                            />
                            <p htmlFor='termsCheckBox'>
                                I agree to the{' '}
                                <a
                                    href='https://msg91.com/terms-of-use'
                                    target='_blank'
                                    className='text-link active-link'
                                >
                                    Terms of Use
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className='flex  gap-4'>
                        <button className='btn btn-accent btn-outline btn-md' onClick={() => this.props.setStep(2)}>
                            {' '}
                            <MdKeyboardArrowLeft />
                            Back
                        </button>
                        <button
                            className=' btn btn-md btn-accent disabled:bg-gray-300 disabled:text-primary'
                            type='button'
                            onClick={this.finalSubmit}
                            disabled={!this.state.formData.agreeToTerms || this.props?.isLoading}
                        >
                            Next <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default StepThree;
