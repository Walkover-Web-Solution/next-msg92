import { useState, useEffect } from 'react';
import { fetchCountries, fetchStatesByCountry, fetchCitiesByState } from '../SignupUtils';
import getCountyFromIP from '@/utils/getCountyFromIP';

/**
 * Custom hook for managing country, state, and city selection
 * @param {boolean} autoDetectCountry - Whether to auto-detect country from IP
 * @returns {Object} Country selector state and handlers
 */
export function useCountrySelector(autoDetectCountry = true) {
    const [countries, setCountries] = useState([]);
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

    useEffect(() => {
        const initializeCountries = async () => {
            setIsLoadingCountries(true);
            try {
                const response = await fetchCountries();
                const countriesData = response.data || [];
                setCountries(countriesData);

                if (autoDetectCountry && countriesData.length > 0) {
                    const ipData = await getCountyFromIP();
                    const detectedCountryCode = ipData?.countryCode?.toLowerCase();

                    if (detectedCountryCode) {
                        const matchedCountry = countriesData.find(
                            (c) => c.shortName?.toLowerCase() === detectedCountryCode
                        );

                        if (matchedCountry) {
                            await handleCountryChange([matchedCountry]);
                        }
                    }
                }
            } catch (error) {
                console.error('Error initializing countries:', error);
            } finally {
                setIsLoadingCountries(false);
            }
        };

        initializeCountries();
    }, [autoDetectCountry]);

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
            setSelectedCity(selected[0].name);
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
            console.error('Error fetching states:', error);
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
            console.error('Error fetching cities:', error);
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
