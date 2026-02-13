import axios from 'axios';
import getCountyFromIP from '@/utils/getCountyFromIP';
import { appendMsg91QueryToUrl } from './cookieUtils';

/**
 * Check if user has an active session
 */
export default function checkSession() {
    try {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/checkSession';
        // Simple cookie getter function
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        const session = getCookie('sessionId');
        const payload = { session: session };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result?.status === 'success') {
                    const baseUrl = process.env.REDIRECT_URL + `/api/nexusRedirection.php?session=${session}`;
                    window.location.href = appendMsg91QueryToUrl(baseUrl);
                }
            })
            .catch((error) => {});
    } catch (error) {}
}

/**
 * Validate signup with email or GitHub
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} state - Current state
 */
export function validateSignUp(dispatch, state) {
    // Add null/undefined checks to prevent TypeError
    if (!state || typeof state !== 'object') {
        return;
    }

    if (!dispatch || typeof dispatch !== 'function') {
        return;
    }

    const url =
        process.env.API_BASE_URL +
        '/api/v5/nexus/' +
        (state?.githubCode ? 'validateGithubSignUp' : 'validateEmailSignUp');

    const payload = {
        session: state?.session,
        emailToken: state?.emailToken,
        githubToken: state?.githubToken,
        githubCode: state?.githubCode,
        githubState: state?.githubState,
        mobileToken: state?.mobileToken,
        source: state?.source,
        utm_term: state?.utm_term,
        utm_medium: state?.utm_medium,
        utm_source: state?.utm_source,
        utm_campaign: state?.utm_campaign,
        utm_content: state?.utm_content,
        utm_matchtype: state?.utm_matchtype,
        ad: state?.ad,
        adposition: state?.adposition,
        reference: state?.reference,
    };

    axios
        .post(url, payload)
        .then((response) => {
            if (response?.data?.status === 'success') {
                dispatch({
                    type: 'SET_SESSION',
                    payload: { session: response?.data?.sessionDetails?.PHPSESSID, step: 3 },
                });
                dispatch({ type: 'SET_INVITES', payload: response?.data?.data?.invitations });
            } else {
                dispatch({ type: 'SET_ERROR', payload: response?.data?.errors || 'Failed to validate signup' });
            }
        })
        .catch((error) => {
            dispatch({
                type: 'SET_ERROR',
                payload: error?.response?.data?.message || error?.message || 'Failed to validate signup',
            });
        });
}

/**
 * Validate email signup with OTP
 * @param {string} otp - OTP code
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} state - Current state
 * @returns {Promise} Promise resolving to API response data
 */
export async function validateEmailSignup(otp, dispatch, state) {
    const signupState = state || {};
    const baseUrl = process.env.API_BASE_URL;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
        const verificationData = await new Promise((resolve, reject) => {
            window.verifyOtp(
                `${otp}`,
                (data) => {
                    if (data?.type === 'success') {
                        resolve(data);
                        return;
                    }
                    const errorMsg = data?.message || data?.error || 'OTP verification failed';
                    reject({ message: errorMsg });
                },
                (error) => {
                    const errorMsg = error?.message || error?.error || error || 'OTP verification failed';
                    reject({ message: errorMsg });
                },
                signupState?.emailRequestId
            );
        });

        const emailToken = verificationData?.message;

        dispatch({
            type: 'SET_EMAIL_VERIFICATION_SUCCESS',
            payload: {
                accessToken: emailToken,
                message: 'Email verified successfully.',
            },
        });

        const payload = {
            verifyMobileNextStep: 1,
            session: signupState?.session,
            emailToken: emailToken,
            source: signupState?.source,
            utm_term: signupState?.utm_term,
            utm_medium: signupState?.utm_medium,
            utm_source: signupState?.utm_source,
            utm_campaign: signupState?.utm_campaign,
            utm_content: signupState?.utm_content,
            utm_matchtype: signupState?.utm_matchtype,
            ad: signupState?.ad,
            adposition: signupState?.adposition,
            reference: signupState?.reference,
        };

        const url = `${baseUrl}/api/v5/nexus/validateEmailSignUp`;

        const { data } = await axios.post(url, payload);
        if (data?.status === 'success') {
            dispatch({
                type: 'SET_SESSION',
                payload: { session: data?.sessionDetails?.PHPSESSID || null, step: 2 },
            });
            dispatch({
                type: 'SET_INVITES',
                payload: data?.data?.invitations || [],
            });
            return data;
        }

        const apiErrors = data?.message || data?.error || data?.errors || 'Failed to validate signup';
        dispatch({ type: 'SET_ERROR', payload: apiErrors });
        return null;
    } catch (error) {
        const otpErrorMessage =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            'Failed to validate signup';
        dispatch({ type: 'SET_ERROR', payload: otpErrorMessage });
        return null;
    } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
    }
}

/**
 * Final registration step
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} state - Current state
 */
export function finalRegistration(dispatch, state) {
    const url = process.env.API_BASE_URL + '/api/v5/nexus/finalRegister';
    const payload = {
        session: state?.session,
        companyDetails: state?.companyDetails,
        userDetails: state?.userDetails,
        acceptInviteForCompanies: state?.acceptInviteForCompanies,
        rejectInviteForCompanies: state?.rejectInviteForCompanies,
    };
    axios
        .post(url, payload)
        .then((response) => {
            if (response?.data?.status === 'success') {
                dispatch({
                    type: 'SET_ACTIVE_STEP',
                    payload: 4,
                });
                const baseUrl = process.env.REDIRECT_URL + `?session=${response?.data?.sessionDetails?.PHPSESSID}`;
                window.location.href = appendMsg91QueryToUrl(baseUrl);
            }
        })
        .catch((error) => {
            dispatch({
                type: 'SET_ERROR',
                payload: error?.response?.data?.message || error?.message || 'Failed to complete registration',
            });
        });
}

/**
 * Fetch countries from API
 * @param {Function} dispatch - Redux dispatch function
 */
export async function fetchCountries(dispatch) {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/v5/web/getCountries`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const countriesData = data?.data || [];

        dispatch({
            type: 'SET_COUNTRIES',
            payload: countriesData,
        });

        return countriesData;
    } catch (error) {
        throw error;
    }
}

/**
 * Auto-populate country, state, and city based on IP geolocation
 * This function runs sequentially: fetch IP → select country → fetch states → select state → fetch cities → select city
 * @param {Function} dispatch - Redux dispatch function
 * @param {Array} countries - Array of countries
 * @param {Object} existingIpData - Existing IP data from state (optional)
 */
export async function autoPopulateFromIP(dispatch, countries, existingIpData = null) {
    try {
        // Step 1: Use existing IP data or fetch new
        let ipData = existingIpData;

        if (!ipData) {
            ipData = await getCountyFromIP();

            // Store IP data in state
            dispatch({
                type: 'SET_IP_DATA',
                payload: ipData,
            });
        }

        if (!ipData?.countryCode || !countries?.length) return;

        // Step 2: Find and select country
        const matchedCountry = countries.find((c) => c.shortName?.toLowerCase() === ipData.countryCode.toLowerCase());

        if (!matchedCountry) return;

        dispatch({
            type: 'SET_SELECTED_COUNTRY',
            payload: matchedCountry,
        });

        // Step 3: Fetch states for the selected country
        if (!matchedCountry.id) return;

        const states = await fetchStatesByCountry(matchedCountry.id);

        if (!ipData.stateProv || !states?.length) return;

        // Step 4: Find and select state
        const matchedState = states.find((s) => s.name?.toLowerCase() === ipData.stateProv.toLowerCase());

        if (!matchedState) return;

        dispatch({
            type: 'SET_COMPANY_DETAILS',
            payload: {
                state: matchedState.name,
                stateId: matchedState.id,
            },
        });

        // Step 5: Fetch cities for the selected state
        if (!matchedState.id) return;

        const cities = await fetchCitiesByState(matchedState.id);

        if (!ipData.city || !cities?.length) return;

        // Step 6: Find and select city
        const cityName = ipData.city.split('(')[0].trim();
        const matchedCity = cities.find((c) => c.name?.toLowerCase() === cityName.toLowerCase());

        if (!matchedCity) return;

        dispatch({
            type: 'SET_COMPANY_DETAILS',
            payload: {
                city: matchedCity.name,
                cityId: matchedCity.id,
            },
        });
    } catch (error) {
        // Silently fail if IP detection doesn't work
    }
}

/**
 * Fetch states by country ID
 * @param {number} countryId - Country ID
 * @returns {Promise<Array>} Array of states
 */
export async function fetchStatesByCountry(countryId) {
    if (!countryId) {
        throw new Error('Country ID is required');
    }

    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/v5/web/getStatesByCountryId/${countryId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the data to match typeahead format
        return data.data.map((state) => ({
            id: state.id,
            name: state.name,
        }));
    } catch (error) {
        throw error;
    }
}

/**
 * Fetch cities by state ID
 * @param {number} stateId - State ID
 * @returns {Promise<Array>} Array of cities
 */
export async function fetchCitiesByState(stateId) {
    if (!stateId) {
        throw new Error('State ID is required');
    }

    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/v5/web/getCitiesByStateId/${stateId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the data to match typeahead format
        return data.data.map((city) => ({
            id: city.id,
            name: city.name,
        }));
    } catch (error) {
        throw error;
    }
}

/**
 * Helper function to get country ID from country name
 * @param {string} countryName - Country name
 * @param {Array} countries - Countries array
 * @returns {string|null} Country shortname
 */
export function getCountryIdFromName(countryName, countries) {
    const country = countries.find((c) => c.name === countryName);
    return country ? country.shortname : null;
}
