import axios from 'axios';
import getCountyFromIP from '@/utils/getCountyFromIP';

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
                    window.location.href = process.env.REDIRECT_URL + `/api/nexusRedirection.php?session=${session}`;
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
                    reject(data || { message: 'OTP verification failed' });
                },
                (error) => {
                    reject(error);
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

        const apiErrors = data?.errors || 'Failed to validate signup';
        dispatch({ type: 'SET_ERROR', payload: apiErrors });
        return null;
    } catch (error) {
        const otpErrorMessage = error?.response?.data?.message || error?.message || 'Failed to validate signup';
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
                window.location.href =
                    process.env.REDIRECT_URL + `?session=${response?.data?.sessionDetails?.PHPSESSID}`;
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
 * Fetch countries list and auto-detect user's country from IP
 * @param {Function} dispatch - Redux dispatch function
 * @param {boolean} autoDetect - Whether to auto-detect country from IP (default: true)
 */
export async function fetchCountries(dispatch, autoDetect = true) {
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

        // Auto-detect country from IP
        if (autoDetect && countriesData.length > 0) {
            try {
                const ipData = await getCountyFromIP();
                const detectedCountryCode = ipData?.countryCode?.toLowerCase();

                if (detectedCountryCode) {
                    const matchedCountry = countriesData.find(
                        (c) => c.shortName?.toLowerCase() === detectedCountryCode
                    );

                    if (matchedCountry) {
                        dispatch({
                            type: 'SET_SELECTED_COUNTRY',
                            payload: matchedCountry,
                        });
                    }
                }
            } catch (ipError) {}
        }

        return data;
    } catch (error) {
        throw error;
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
