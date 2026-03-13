import getServices from '@/utils/getServices';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdClose, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { setDetails, useSignup, finalRegistration } from '../SignupUtils';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { fetchCountries, autoPopulateFromIP } from '../SignupUtils/apiUtils';
import { updateSourceInUrlAndCookie } from '../SignupUtils/cookieUtils';

const sourceData = [
    { value: 'search_engine', label: 'Search engine (Google, Bing, Yahoo, etc)' },
    { value: 'recommended_by_friend', label: 'Recommended by friend or colleague' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'blog', label: 'Blog or Publication' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'event', label: 'Event' },
    { value: 'tiedelhincr', label: 'TiEDelhiNCR' },
    { value: 'other', label: 'Other' },
];

export default function StepThree({ data }) {
    const { state, dispatch } = useSignup();
    const optionKeys = sourceData.map((opt) => opt.value);
    const storedSource = state?.source || '';

    const getInitialSource = () => {
        if (!storedSource) return '';
        return optionKeys.includes(storedSource) ? storedSource : 'other';
    };

    const getInitialOtherSource = () => {
        if (!storedSource) return '';
        return optionKeys.includes(storedSource) ? '' : storedSource;
    };

    const [services, setServices] = useState({});
    const initialServices = Array.isArray(state?.companyDetails?.service)
        ? [...new Set(state.companyDetails.service)]
        : [];
    const [selectedServices, setSelectedServices] = useState(initialServices);
    const [source, setSource] = useState(() => getInitialSource());
    const [otherSource, setOtherSource] = useState(() => getInitialOtherSource());
    const [address, setAddress] = useState(state?.companyDetails?.address || '');
    const [postalCode, setPostalCode] = useState(state?.companyDetails?.zipcode || '');
    const [isAddressOpen, setIsAddressOpen] = useState(false);

    const {
        countries,
        stateOptions,
        cityOptions,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedCountryId,
        selectedStateId,
        selectedCityId,
        isLoadingCountries,
        isLoadingStates,
        isLoadingCities,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        setSelectedCountry,
    } = useCountrySelector();

    useEffect(() => {
        const initializeData = async () => {
            const servicesData = await getServices();
            setServices(servicesData.data.data);
        };
        initializeData();
    }, []);

    useEffect(() => {
        if (storedSource && optionKeys.length > 0 && !source) {
            if (optionKeys.includes(storedSource)) {
                setSource(storedSource);
            } else {
                setSource('other');
                setOtherSource(storedSource);
            }
        }
    }, [storedSource, optionKeys.length]);

    useEffect(() => {
        const fetchDataIfNeeded = async () => {
            if (state.geoAutoPopulated) return;
            // Fallback: If user navigates directly to StepThree, fetch countries and auto-populate
            if (!state.countries) {
                const countriesData = await fetchCountries(dispatch);
                // After countries are fetched, auto-populate from IP
                if (countriesData?.length > 0) {
                    // Pass existing ipData if available to avoid redundant API call
                    await autoPopulateFromIP(dispatch, countriesData, state.ipData);
                    dispatch({ type: 'SET_GEO_AUTO_POPULATED', payload: true });
                }
            } else if (!state.ipData && !state.selectedCountry) {
                // If countries exist but no IP data and no country selected, run auto-populate
                await autoPopulateFromIP(dispatch, state.countries, state.ipData);
                dispatch({ type: 'SET_GEO_AUTO_POPULATED', payload: true });
            }
        };

        fetchDataIfNeeded();
    }, [dispatch, state.countries, state.geoAutoPopulated, state.ipData, state.selectedCountry]);

    useEffect(() => {
        if (state.selectedCountry && state.selectedCountry.id !== selectedCountry?.id) {
            setSelectedCountry(state.selectedCountry);
        }
    }, [state.selectedCountry]);

    useEffect(() => {
        setDetails('services', dispatch, selectedServices);
    }, [dispatch, selectedServices]);

    useEffect(() => {
        const finalSource = source === 'other' ? otherSource : source;
        if (finalSource) {
            setDetails('source', dispatch, finalSource);
            updateSourceInUrlAndCookie(finalSource);
        }
    }, [dispatch, otherSource, source]);

    useEffect(() => {
        setDetails('addressDetails', dispatch, {
            address,
            zipcode: postalCode,
            country: selectedCountry?.name,
            state: selectedState,
            city: selectedCity,
            countryId: selectedCountryId,
            stateId: selectedStateId,
            cityId: selectedCityId,
        });
    }, [
        address,
        postalCode,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedCountryId,
        selectedStateId,
        selectedCityId,
    ]);

    function handleServiceClick(key) {
        if (selectedServices.includes(key)) {
            setSelectedServices(selectedServices.filter((item) => item !== key));
        } else {
            setSelectedServices([...selectedServices, key]);
        }
    }

    function handleSourceChange(value) {
        setSource(value);
        if (value !== 'other') {
            setOtherSource('');
        }
    }

    const handleFinalRegistration = () => {
        finalRegistration(dispatch, state);
    };

    // Validation: Check if service and source are selected
    const isFormValid = () => {
        const hasService = selectedServices.length > 0;
        const finalSource = source === 'other' ? otherSource.trim() : source;
        const hasSource = finalSource !== '';
        return hasService && hasSource;
    };

    const canProceed = isFormValid();
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
                        <h2 className='text-lg font-medium text-gray-700'>Which service are you interested in?</h2>
                        <div className='flex flex-wrap gap-2'>
                            {Object.entries(services).length > 0 &&
                                Object.entries(services).map(([key, value]) => (
                                    <div
                                        onClick={() => handleServiceClick(key)}
                                        key={key}
                                        className={`border w-fit px-2 py-1 rounded text-sm flex items-center gap-1 cursor-pointer ${
                                            selectedServices.includes(key)
                                                ? 'bg-green-100 hover:bg-green-100'
                                                : 'hover:bg-green-50'
                                        }`}
                                    >
                                        <span className='text-gray-700'>{value}</span>
                                        {selectedServices.includes(key) && (
                                            <button aria-label={`Remove ${value}`}>
                                                <MdClose />
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='cont gap-1'>
                        <h2 className='text-lg font-medium text-gray-700'>Where did you hear about us?</h2>
                        <select
                            className='select select-bordered w-full max-w-[420px]'
                            onChange={(e) => handleSourceChange(e.target.value)}
                            value={source || ''}
                            aria-label='Source'
                        >
                            <option value=''>Select</option>
                            {sourceData.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {source === 'other' && (
                            <input
                                className='input input-bordered w-full max-w-[420px]'
                                type='text'
                                placeholder='Please specify'
                                value={otherSource}
                                onChange={(e) => setOtherSource(e.target.value)}
                                aria-label='Other source'
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='cont gap-2 max-w-[820px]'>
                <div className='cont gap-3'>
                    <div className='cont gap-1'>
                        <button
                            className='flex items-center gap-2 cursor-pointer w-fit'
                            onClick={() => setIsAddressOpen(!isAddressOpen)}
                            aria-expanded={isAddressOpen}
                            aria-label='Toggle address section'
                        >
                            <h2 className='text-lg font-medium text-gray-700'>Address (Optional)</h2>
                            <MdOutlineKeyboardArrowDown
                                className={`text-gray-500 text-2xl transition-all duration-100 ${
                                    isAddressOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div className={`flex-col gap-3 overflow-hidden ${isAddressOpen ? 'flex' : 'hidden'}`}>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm text-gray-700'>House / Building / Apartment</label>
                                <input
                                    className='input input-bordered w-full'
                                    type='text'
                                    placeholder='405 - 406, Capt. C. S. Naidu Arcade, Old Palasia'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    aria-label='Address'
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row gap-3 min-w-0'>
                                <div className='flex flex-col gap-1 w-full min-w-0'>
                                    <label className='text-sm text-gray-700'>Postal Code</label>
                                    <input
                                        className='input input-bordered w-full'
                                        type='text'
                                        placeholder='452009'
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        aria-label='Postal code'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-full min-w-0'>
                                    <label className='text-sm text-gray-700'>Country</label>
                                    <select
                                        className='select select-bordered w-full min-w-0 '
                                        value={String(selectedCountryId ?? '')}
                                        onChange={(e) => {
                                            const country = countries.find((c) => String(c.id) === e.target.value);
                                            handleCountryChange(country ? [country] : []);
                                        }}
                                        disabled={isLoadingCountries}
                                        aria-label='Country'
                                    >
                                        <option value='' disabled>
                                            {isLoadingCountries ? 'Loading countries...' : 'Select Country'}
                                        </option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={String(country.id)}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row gap-3 min-w-0'>
                                <div className='flex flex-col gap-1 w-full min-w-0'>
                                    <label className='text-sm text-gray-700'>State</label>
                                    <select
                                        className='select select-bordered w-full min-w-0'
                                        value={String(selectedStateId ?? '')}
                                        onChange={(e) => {
                                            const stateOpt = stateOptions.find(
                                                (state) => String(state.id) === e.target.value
                                            );
                                            handleStateChange(stateOpt ? [stateOpt] : []);
                                        }}
                                        disabled={!selectedCountryId || isLoadingStates}
                                        aria-label='State'
                                    >
                                        <option value='' disabled>
                                            {isLoadingStates ? 'Loading states...' : 'Select State'}
                                        </option>
                                        {stateOptions.map((state) => (
                                            <option key={state.id} value={String(state.id)}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1 w-full min-w-0'>
                                    <label className='text-sm text-gray-700'>City</label>
                                    <select
                                        className='select select-bordered w-full min-w-0'
                                        value={String(selectedCityId ?? '')}
                                        onChange={(e) => {
                                            const cityOpt = cityOptions.find(
                                                (city) => String(city.id) === e.target.value
                                            );
                                            handleCityChange(cityOpt ? [cityOpt] : []);
                                        }}
                                        disabled={!selectedStateId || isLoadingCities}
                                        aria-label='City'
                                    >
                                        <option value='' disabled>
                                            {isLoadingCities ? 'Loading cities...' : 'Select City'}
                                        </option>
                                        {cityOptions.map((city) => (
                                            <option key={city.id} value={String(city.id)}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
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
                    disabled={state.isLoading}
                >
                    Back
                </button>
                <button
                    className='btn btn-accent btn-md'
                    onClick={handleFinalRegistration}
                    disabled={!canProceed || state.isLoading}
                >
                    {state.isLoading ? (
                        <>
                            <span className='loading loading-spinner loading-sm'></span>
                            Processing...
                        </>
                    ) : (
                        'Next'
                    )}
                </button>
            </div>
        </div>
    );
}
