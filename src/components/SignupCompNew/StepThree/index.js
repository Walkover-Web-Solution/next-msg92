import getServices from '@/utils/getServices';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdClose, MdEdit, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import {
    handleUtmParams,
    setDetails,
    useSignup,
    fetchStatesByCountry,
    fetchCitiesByState,
    fetchCountries,
} from '../SignupUtils';
import getCountyFromIP from '@/utils/getCountyFromIP';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function StepThree({ pageInfo, data }) {
    const { state, dispatch } = useSignup();
    const [services, setServices] = useState({});
    const [slectedServices, setSlectedServices] = useState([]);
    const [source, setSource] = useState(state?.source);

    // Address form state
    const [address, setAddress] = useState(state?.companyDetails?.address || '');
    const [postalCode, setPostalCode] = useState(state?.companyDetails?.zipcode || '');
    const [country, setCountry] = useState(state?.companyDetails?.country || 'India');
    const [selectedState, setSelectedState] = useState(state?.companyDetails?.state || '');
    const [city, setCity] = useState(state?.companyDetails?.city || '');

    // Typeahead states
    const [dataFromIP, setDataFromIP] = useState(null);
    const [countries, setCountries] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedStateId, setSelectedStateId] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [isAddressOpen, setIsAddressOpen] = useState(false);

    useEffect(() => {
        const initializeData = async () => {
            // Get services data
            const servicesData = getServices();
            servicesData.then((response) => {
                setServices(response.data.data);
            });

            // Handle UTM params
            handleUtmParams(dispatch);

            // Step 1: Fetch countries from API
            setIsLoadingCountries(true);
            try {
                const countriesResponse = await fetchCountries();
                const countriesData = countriesResponse.data || [];
                setCountries(countriesData);

                // Step 2: Get country from IP
                const ipData = await getCountyFromIP();
                const detectedCountryCode = ipData.countryCode?.toLowerCase();
                setDataFromIP(ipData);

                // Step 3: Match and select country
                if (detectedCountryCode && countriesData.length > 0) {
                    const matchedCountry = countriesData.find(
                        (c) => c.shortName?.toLowerCase() === detectedCountryCode
                    );

                    if (matchedCountry) {
                        setSelectedCountry(matchedCountry);
                        setCountry(matchedCountry.name);
                        setSelectedCountryId(matchedCountry.id);

                        // Step 4: Fetch states by country
                        await handleFetchStates(matchedCountry.id);
                    }
                } else if (country && countriesData.length > 0) {
                    // Fallback: Initialize selected country if country is already set
                    const foundCountry = countriesData.find((c) => c.name === country);
                    if (foundCountry) {
                        setSelectedCountry(foundCountry);
                        setSelectedCountryId(foundCountry.id);
                    }
                }
            } catch (error) {
                console.error('Error initializing countries:', error);
                // Fallback to default country
                if (country && countries.length > 0) {
                    const foundCountry = countries.find((c) => c.name === country);
                    if (foundCountry) {
                        setSelectedCountry(foundCountry);
                        setSelectedCountryId(foundCountry.id);
                    }
                }
            } finally {
                setIsLoadingCountries(false);
            }
        };

        initializeData();
    }, []);

    useEffect(() => {
        if (dataFromIP) {
            const state = stateOptions.find((state) => state.name === dataFromIP?.stateProv);
            setSelectedState(state?.name);
            setSelectedStateId(state?.id);
            handleFetchCities(state?.id);
        }
    }, [dataFromIP, stateOptions]);

    useEffect(() => {
        setDetails('services', dispatch, slectedServices);
    }, [slectedServices]);

    useEffect(() => {
        setDetails('source', dispatch, source);
    }, [source]);

    useEffect(() => {
        setDetails('addressDetails', dispatch, {
            address,
            zipcode: postalCode,
            country,
            state: selectedState,
            city,
            countryId: selectedCountryId,
            stateId: selectedStateId,
        });
    }, [address, postalCode, country, selectedState, city, selectedCountryId, selectedStateId]);

    // Fetch states based on country using SignupUtils API
    const handleFetchStates = async (countryId) => {
        if (!countryId) return;

        setIsLoadingStates(true);
        try {
            const states = await fetchStatesByCountry(countryId);
            setSelectedState(state?.name);
            setSelectedStateId(state?.id);
            setStateOptions(states);
        } catch (error) {
            console.error('Error fetching states:', error);
            setStateOptions([]);
        } finally {
            setIsLoadingStates(false);
        }
    };

    // Fetch cities based on state using SignupUtils API
    const handleFetchCities = async (stateId) => {
        if (!stateId) return;

        setIsLoadingCities(true);
        try {
            const cities = await fetchCitiesByState(stateId);
            setCityOptions(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setCityOptions([]);
        } finally {
            setIsLoadingCities(false);
        }
    };

    function handleServiceClick(key) {
        if (slectedServices.includes(key)) {
            setSlectedServices(slectedServices.filter((item) => item !== key));
        } else {
            setSlectedServices([...slectedServices, key]);
        }
    }

    function handleSourceChange(value) {
        setSource(value);
    }

    // Handle country selection
    const handleCountryChange = (selected) => {
        if (selected && selected.length > 0) {
            const countryOption = selected[0];
            setSelectedCountry(countryOption);
            setCountry(countryOption.name);
            setSelectedCountryId(countryOption.id);

            // Reset dependent fields
            setSelectedState('');
            setSelectedStateId(null);
            setCity('');
            setStateOptions([]);
            setCityOptions([]);

            // Fetch states
            handleFetchStates(countryOption.id);
        } else {
            // Clear all fields
            setSelectedCountry({});
            setCountry('');
            setSelectedCountryId(null);
            setSelectedState('');
            setSelectedStateId(null);
            setCity('');
            setStateOptions([]);
            setCityOptions([]);
        }
    };

    // Handle state selection
    const handleStateChange = (selected) => {
        if (selected && selected.length > 0) {
            const stateOption = selected[0];
            setSelectedState(stateOption.name);
            setSelectedStateId(stateOption.id);

            // Reset city
            setCity('');
            setCityOptions([]);

            // Fetch cities
            handleFetchCities(stateOption.id);
        } else {
            setSelectedState('');
            setSelectedStateId(null);
            setCity('');
            setCityOptions([]);
        }
    };

    // Handle city selection
    const handleCityChange = (selected) => {
        if (selected && selected.length > 0) {
            setCity(selected[0].name);
        } else {
            setCity('');
        }
    };

    // Handle Final Registration
    const handleFinalRegistration = () => {
        console.log('Final Registration', state);
    };

    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <span className='text-green-600'>Account Created Successfully!</span>
                <h1 className='text-2xl text-primary'>Welcome to MSG91</h1>
            </div>
            <div className='cont gap-6 max-w-[820px]'>
                <p>Tell us a bit more about yourself to personalize your journey.</p>
                <div className='cont gap-3'>
                    <div className='cont gap-1'>
                        <h2 className='text-lg font-medium text-gray-600'>Which service are you interested in?</h2>
                        <div className='flex flex-wrap gap-2'>
                            {Object.entries(services).length > 0 &&
                                Object.entries(services).map(([key, value]) => (
                                    <div
                                        onClick={() => handleServiceClick(key)}
                                        key={key}
                                        className={`border w-fit ps-2 pe-1 py-1 rounded text-sm flex items-center gap-1 cursor-pointer ${
                                            slectedServices.includes(key)
                                                ? 'bg-green-50 hover:bg-green-100'
                                                : 'hover:bg-green-50'
                                        }`}
                                    >
                                        <span className='text-gray-600'>{value}</span>
                                        {slectedServices.includes(key) && (
                                            <button>
                                                <MdClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='cont gap-1'>
                        <h2 className='text-lg font-medium text-gray-600'>Where did you hear about us?</h2>
                        <select
                            className='select select-bordered w-full min-w-[320px] max-w-[420px]'
                            onChange={(e) => handleSourceChange(e.target.value)}
                        >
                            <option value=''>Select</option>
                            {Object.entries(data?.source).map(([key, value]) => (
                                <option value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='cont gap-2 max-w-[820px]'>
                <div className='cont gap-3'>
                    <div className='cont gap-1'>
                        <button
                            className='flex items-center gap-2 cursor-pointer w-fit'
                            onClick={() => setIsAddressOpen(!isAddressOpen)}
                        >
                            <h2 className='text-lg font-medium text-gray-600'>Address (Optional)</h2>
                            <MdOutlineKeyboardArrowDown
                                className={`text-gray-500 text-2xl transition-all duration-100 ${isAddressOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <div className={`flex-col gap-3 ${isAddressOpen ? 'flex' : 'hidden'}`}>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm text-gray-600'>House / Building / Apartment</label>
                                <input
                                    className='input input-bordered w-full'
                                    type='text'
                                    placeholder='405 - 406, Capt. C. S. Naidu Arcade, Old Palasia'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='flex gap-3'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='text-sm text-gray-600'>Postal Code</label>
                                    <input
                                        className='input input-bordered w-full'
                                        type='text'
                                        placeholder='452009'
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='text-sm text-gray-600'>Country</label>
                                    <Typeahead
                                        className='country-list w-full'
                                        id='country'
                                        placeholder={
                                            isLoadingCountries ? 'Loading countries...' : 'Search and select country...'
                                        }
                                        labelKey='name'
                                        onChange={handleCountryChange}
                                        options={countries}
                                        selected={selectedCountry && selectedCountry.name ? [selectedCountry] : []}
                                        disabled={isLoadingCountries}
                                        inputProps={{
                                            autoComplete: 'off',
                                            className: 'input input-bordered w-full',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='text-sm text-gray-600'>State</label>
                                    <Typeahead
                                        className={`country-list w-full ${
                                            !selectedCountryId || isLoadingStates ? 'cursor-not-allowed' : ''
                                        }`}
                                        id='state'
                                        placeholder={
                                            isLoadingStates ? 'Loading states...' : 'Search and select state...'
                                        }
                                        labelKey='name'
                                        onChange={handleStateChange}
                                        options={stateOptions}
                                        selected={stateOptions.filter((option) => option.name === selectedState)}
                                        inputProps={{
                                            autoComplete: 'off',
                                            className: 'input input-bordered w-full',
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full'>
                                    <label className='text-sm text-gray-600'>City</label>
                                    <Typeahead
                                        className={`country-list w-full ${
                                            !selectedCountryId || isLoadingStates ? 'cursor-not-allowed' : ''
                                        }`}
                                        id='city'
                                        placeholder={
                                            isLoadingCities ? 'Loading cities...' : 'Search and select city...'
                                        }
                                        labelKey='name'
                                        onChange={handleCityChange}
                                        options={cityOptions}
                                        selected={cityOptions.filter((option) => option.name === city)}
                                        inputProps={{
                                            autoComplete: 'off',
                                            className: 'input input-bordered w-full',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='gap-2 flex'>
                <button
                    className='btn btn-primary btn-outline btn-md'
                    onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: 2 })}
                >
                    Back
                </button>
                <button className='btn btn-accent btn-md' onClick={handleFinalRegistration}>
                    Next
                </button>
            </div>
        </div>
    );
}
