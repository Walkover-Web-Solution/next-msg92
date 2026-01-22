import getURLParams from '@/utils/getURLParams';

/**
 * Set initial states from URL parameters
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} state - Current state
 * @param {Object} urlParams - URL parameters
 */
export function setInitialStates(dispatch, state, urlParams) {
    try {
        if (!dispatch || typeof dispatch !== 'function') {
            return;
        }

        if (!state || typeof state !== 'object') {
            return;
        }

        const githubSignup = urlParams?.githubsignup;
        const githubCode = urlParams?.code;
        const githubState = urlParams?.state;

        // Handle source: if source exists in URL use it, otherwise fallback to utm_source
        const sourceValue = urlParams?.source || urlParams?.utm_source || '';

        dispatch({
            type: 'SET_INITIAL_STATES',
            payload: {
                ...state,
                githubSignup: githubSignup,
                githubCode: githubCode,
                githubState: githubState,
                source: sourceValue,
                utm_term: urlParams?.utm_term,
                utm_medium: urlParams?.utm_medium,
                utm_source: urlParams?.utm_source,
                utm_campaign: urlParams?.utm_campaign,
                utm_content: urlParams?.utm_content,
                utm_matchtype: urlParams?.utm_matchtype,
                ad: urlParams?.ad,
                adposition: urlParams?.adposition,
                reference: urlParams?.reference,
            },
        });
        if (githubCode && githubState) {
            dispatch({
                type: 'SET_ACTIVE_STEP',
                payload: 2,
            });
        }
    } catch (error) {
        if (dispatch) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize signup state' });
        }
    }
}

/**
 * Handle GitHub signup redirect
 */
export function handleGithubSignup() {
    const randomState = Math.floor(100000000 + Math.random() * 900000000);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&allow_signup=true&scope=user&redirect_uri=${process.env.REDIRECT_URL}/github-auth-token?githubsignup=true&state=${randomState}&absignup=a`;
}

/**
 * Set various user details
 * @param {string} type - Type of detail to set
 * @param {Function} dispatch - Redux dispatch function
 * @param {any} identifier - Value to set
 */
export function setDetails(type, dispatch, identifier) {
    try {
        if (!dispatch || typeof dispatch !== 'function') {
            return;
        }

        if (!type || !identifier) {
            return;
        }

        if (type === 'userDetails') {
            const firstName = identifier.split(' ')[0];
            const lastName = identifier.split(' ').slice(1).join(' ');
            dispatch({
                type: 'SET_USER_DETAILS',
                payload: {
                    firstName,
                    lastName,
                },
            });
        } else if (type === 'companyName') {
            dispatch({
                type: 'SET_COMPANY_NAME',
                payload: {
                    companyName: identifier,
                },
            });
        } else if (type === 'phone') {
            dispatch({
                type: 'SET_MOBILE',
                payload: {
                    phone: identifier,
                },
            });
        } else if (type === 'services') {
            dispatch({
                type: 'SET_SERVICES',
                payload: {
                    services: identifier,
                },
            });
        } else if (type === 'source') {
            dispatch({
                type: 'SET_SOURCE',
                payload: {
                    source: identifier,
                },
            });
        } else if (type === 'addressDetails') {
            dispatch({
                type: 'SET_ADDRESS_DETAILS',
                payload: identifier,
            });
        }
    } catch (error) {
        if (dispatch) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to set user details' });
        }
    }
}

/**
 * Handle UTM parameters from URL
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} urlParams - URL parameters
 * @returns {Object} Extracted UTM parameters
 */
export function handleUtmParams(dispatch, urlParams) {
    const utmParams = {};

    if (typeof window !== 'undefined') {
        // Use the passed urlParams parameter instead of calling getURLParams again
        const params = urlParams || getURLParams(window.location.search);

        // Extract UTM parameters from URL
        const paramNames = [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_term',
            'utm_content',
            'utm_matchtype',
            'ad',
            'adposition',
            'reference',
        ];

        paramNames.forEach((param) => {
            // Use bracket notation since params is an object, not URLSearchParams
            const value = params[param];
            if (value) {
                utmParams[param] = value;
            }
        });

        // Update state if we have UTM parameters and dispatch is provided
        if (dispatch && Object.keys(utmParams).length > 0) {
            dispatch({
                type: 'SET_UTM_PARAMS',
                payload: utmParams,
            });
        }
    }

    return utmParams;
}
