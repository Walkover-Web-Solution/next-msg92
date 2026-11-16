import getServices from '@/utils/getServices';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { setDetails, useSignup, finalRegistration } from '../SignupUtils';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { useGstLookup } from '../hooks/useGstLookup';
import { fetchCitiesByState, fetchCountries, fetchStatesByCountry, autoPopulateFromIP } from '../SignupUtils/apiUtils';
import { updateSourceInUrlAndCookie } from '../SignupUtils/cookieUtils';
import { GST_STATE_CODE_MAP } from '../SignupUtils/gstUtils';
import { setSharedCookie } from '@/utils/utilis';
import WelcomeDetailsForm from './WelcomeDetailsForm';

export default function StepTwo({ data }) {
    const { state, dispatch } = useSignup();
    const sourceData = data?.source_options;
    const optionKeys = sourceData?.map((opt) => opt?.value);
    const storedSource = state?.source;

    const getInitialSource = () => {
        if (!storedSource) return '';
        return optionKeys?.includes(storedSource) ? storedSource : 'other';
    };

    const getInitialOtherSource = () => {
        if (!storedSource) return '';
        return optionKeys?.includes(storedSource) ? '' : storedSource;
    };

    const [services, setServices] = useState({});
    const initialServices = Array.isArray(state?.companyDetails?.service)
        ? [...new Set(state.companyDetails.service)]
        : [];
    const [selectedServices, setSelectedServices] = useState(initialServices);
    const [source, setSource] = useState(() => getInitialSource());
    const [otherSource, setOtherSource] = useState(() => getInitialOtherSource());
    const [fullName, setFullName] = useState(
        state.userDetails?.firstName ? `${state.userDetails.firstName} ${state.userDetails.lastName || ''}`.trim() : ''
    );
    const [companyName, setCompanyName] = useState(state?.companyDetails?.companyName || '');
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

    const prefillGstCountryData = useCallback(
        async (gstStateNameOrCode, gstCityName) => {
            const normalizedGstState = String(gstStateNameOrCode || '').trim();
            const normalizedGstCity = String(gstCityName || '').trim();

            const indiaCountry = countries.find((country) => country?.shortName?.toLowerCase() === 'in');

            if (!indiaCountry?.id) return;

            if (!selectedCountry?.id || selectedCountry.id !== indiaCountry.id) {
                await handleCountryChange([indiaCountry]);
            }

            const states = await fetchStatesByCountry(indiaCountry.id);
            const resolvedStateName = GST_STATE_CODE_MAP[normalizedGstState];
            if (!resolvedStateName) return;
            const matchedState = states.find(
                (stateOption) => stateOption?.name?.trim().toLowerCase() === resolvedStateName.trim().toLowerCase()
            );

            if (!matchedState) return;

            await handleStateChange([matchedState]);

            if (!normalizedGstCity) return;

            const cities = await fetchCitiesByState(matchedState.id);
            const normalizedCity = normalizedGstCity.split('(')[0].trim().toLowerCase();
            const matchedCity = cities.find((cityOption) => cityOption?.name?.trim().toLowerCase() === normalizedCity);

            if (!matchedCity) return;

            handleCityChange([matchedCity]);
        },
        [countries, handleCityChange, handleCountryChange, handleStateChange, selectedCountry?.id]
    );

    const {
        gstNumber,
        validationError: gstValidationError,
        isLoading: isGstLoading,
        handleGstNumberChange,
    } = useGstLookup({
        dispatch,
        initialGstNo: state?.companyDetails?.gstNo,
        onAutofill: ({ address: gstAddress, postalCode: gstPostalCode, companyName: gstCompanyName }) => {
            setAddress(gstAddress);
            setPostalCode(gstPostalCode);
            if (gstCompanyName) {
                setCompanyName(gstCompanyName);
            }
        },
        prefillGstCountryData,
    });

    useEffect(() => {
        const initializeData = async () => {
            const servicesData = await getServices();
            setServices(servicesData.data.data);
        };
        initializeData();
    }, []);

    useEffect(() => {
        if (storedSource && optionKeys?.length > 0 && !source) {
            if (optionKeys?.includes(storedSource)) {
                setSource(storedSource);
            } else {
                setSource('other');
                setOtherSource(storedSource);
            }
        }
    }, [storedSource, optionKeys?.length]);

    useEffect(() => {
        const fetchDataIfNeeded = async () => {
            if (state.geoAutoPopulated) return;
            if (!state.countries) {
                const countriesData = await fetchCountries(dispatch);
                if (countriesData?.length > 0) {
                    await autoPopulateFromIP(dispatch, countriesData, state.ipData);
                    dispatch({ type: 'SET_GEO_AUTO_POPULATED', payload: true });
                }
            } else if (!state.ipData && !state.selectedCountry) {
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
        setDetails('companyName', dispatch, companyName);
    }, [dispatch, companyName]);

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
        if (fullName?.trim()) {
            setDetails('userDetails', dispatch, fullName.trim());
        }
        setSharedCookie('signup_date', new Date().toISOString().split('T')[0], 30);
        const serviceLabels = selectedServices.map((key) => services[key]).filter(Boolean);
        if (serviceLabels.length) {
            setSharedCookie('interested_services', JSON.stringify(serviceLabels), 30);
        }
        finalRegistration(dispatch, {
            ...state,
            userDetails: {
                firstName: fullName.trim().split(' ')[0] || state?.userDetails?.firstName || '',
                lastName: fullName.trim().split(' ').slice(1).join(' ') || state?.userDetails?.lastName || '',
            },
            companyDetails: {
                ...state?.companyDetails,
                companyName,
            },
        });
    };

    const isFormValid = () => {
        const hasService = selectedServices.length > 0;
        const finalSource = source === 'other' ? otherSource.trim() : source;
        const hasSource = finalSource !== '';
        const hasName = fullName.trim() !== '';
        const hasCompanyName = companyName.trim() !== '';
        const hasCountry = !!selectedCountry?.id;
        return hasService && hasSource && hasName && hasCompanyName && hasCountry;
    };

    const handleFullNameBlur = () => {
        if (fullName?.trim()) {
            setDetails('userDetails', dispatch, fullName.trim());
        }
    };

    const canProceed = isFormValid();
    return (
        <div className='cont cont_gap'>
            <Image width={160} height={80} className='w-fit h-12' src={'/assets/brand/msg91.svg'} alt='MSG91 Logo' />
            <div className='cont gap-2'>
                <span className='text-green-600'>Account Created Successfully!</span>
                <h1 className='text-2xl text-primary'>Welcome to MSG91</h1>
            </div>
            <WelcomeDetailsForm
                fullName={fullName}
                setFullName={setFullName}
                companyName={companyName}
                setCompanyName={setCompanyName}
                handleFullNameBlur={handleFullNameBlur}
                countries={countries}
                selectedCountry={selectedCountry}
                handleCountryChange={handleCountryChange}
                services={services}
                selectedServices={selectedServices}
                handleServiceClick={handleServiceClick}
                sourceData={sourceData}
                source={source}
                otherSource={otherSource}
                setOtherSource={setOtherSource}
                handleSourceChange={handleSourceChange}
                isAddressOpen={isAddressOpen}
                setIsAddressOpen={setIsAddressOpen}
                gstNumber={gstNumber}
                handleGstNumberChange={handleGstNumberChange}
                isGstLoading={isGstLoading}
                gstValidationError={gstValidationError}
                address={address}
                setAddress={setAddress}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                selectedCountryId={selectedCountryId}
                selectedStateId={selectedStateId}
                selectedCityId={selectedCityId}
                stateOptions={stateOptions}
                cityOptions={cityOptions}
                isLoadingCountries={isLoadingCountries}
                isLoadingStates={isLoadingStates}
                isLoadingCities={isLoadingCities}
                handleStateChange={handleStateChange}
                handleCityChange={handleCityChange}
            />
            <div className='gap-2 flex'>
                <button
                    className='btn btn-primary btn-outline btn-md'
                    onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 })}
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
