import { useState, useEffect } from 'react';
import { fetchStatesByCountry, fetchCitiesByState, useSignup } from '../SignupUtils';

/**
 * Custom hook for managing country, state, and city selection
 * Uses countries from global state (already fetched in StepOne)
 * @returns {Object} Country selector state and handlers
 */
export function useCountrySelector() {
    const { state, dispatch } = useSignup();
    const countries = state.countries || [];

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedStateId, setSelectedStateId] = useState(null);

    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);

    // Sync state and city from global companyDetails when auto-populated
    useEffect(() => {
        const companyDetails = state.companyDetails;

        // Sync state if it exists in companyDetails but not in local state
        if (companyDetails?.state && !selectedState) {
            setSelectedState(companyDetails.state);
            setSelectedStateId(companyDetails.stateId);
        }

        // Sync city if it exists in companyDetails but not in local state
        if (companyDetails?.city && !selectedCity) {
            setSelectedCity(companyDetails.city);
        }
    }, [state.companyDetails, selectedState, selectedCity]);

    const handleCountryChange = async (selected) => {
        if (selected && selected.length > 0) {
            const countryOption = selected[0];
            setSelectedCountry(countryOption);
            setSelectedCountryId(countryOption.id);

            setSelectedState('');
            setSelectedStateId(null);
            setSelectedCity('');
            setStateOptions([]);
            setCityOptions([]);

            if (countryOption.id) {
                await loadStates(countryOption.id);
            }
        } else {
            resetSelection();
        }
    };

    const handleStateChange = async (selected) => {
        if (selected && selected.length > 0) {
            const stateOption = selected[0];
            setSelectedState(stateOption.name);
            setSelectedStateId(stateOption.id);

            setSelectedCity('');
            setCityOptions([]);

            // Update companyDetails in global state
            dispatch({
                type: 'SET_COMPANY_DETAILS',
                payload: {
                    state: stateOption.name,
                    stateId: stateOption.id,
                    city: null,
                    cityId: null,
                },
            });

            if (stateOption.id) {
                await loadCities(stateOption.id);
            }
        } else {
            setSelectedState('');
            setSelectedStateId(null);
            setSelectedCity('');
            setCityOptions([]);
        }
    };

    const handleCityChange = (selected) => {
        if (selected && selected.length > 0) {
            const cityOption = selected[0];
            setSelectedCity(cityOption.name);

            // Update companyDetails in global state
            dispatch({
                type: 'SET_COMPANY_DETAILS',
                payload: {
                    city: cityOption.name,
                    cityId: cityOption.id,
                },
            });
        } else {
            setSelectedCity('');
        }
    };

    const loadStates = async (countryId) => {
        if (!countryId) return;

        setIsLoadingStates(true);
        try {
            const states = await fetchStatesByCountry(countryId);
            setStateOptions(states);
        } catch (error) {
            setStateOptions([]);
        } finally {
            setIsLoadingStates(false);
        }
    };

    const loadCities = async (stateId) => {
        if (!stateId) return;

        setIsLoadingCities(true);
        try {
            const cities = await fetchCitiesByState(stateId);
            setCityOptions(cities);
        } catch (error) {
            setCityOptions([]);
        } finally {
            setIsLoadingCities(false);
        }
    };

    const resetSelection = () => {
        setSelectedCountry({});
        setSelectedCountryId(null);
        setSelectedState('');
        setSelectedStateId(null);
        setSelectedCity('');
        setStateOptions([]);
        setCityOptions([]);
    };

    return {
        countries,
        stateOptions,
        cityOptions,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedCountryId,
        selectedStateId,
        isLoadingCountries,
        isLoadingStates,
        isLoadingCities,
        handleCountryChange,
        handleStateChange,
        handleCityChange,
        resetSelection,
        setSelectedCountry,
        setSelectedState,
        setSelectedCity,
    };
}
