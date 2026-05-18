import getURLParams from '@/utils/getURLParams';
import { getCookie, loginWithGitHubAccount, setSharedCookie } from '@/utils/utilis';

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
        const signupByGitHub = githubSignup === true || githubSignup === 'true';
        const githubCode = urlParams?.code;
        const githubState = urlParams?.state;

        // Handle source: URL first, then utm_source; if absent, read msg91_query cookie (set from location.search in _app)
        let sourceValue = urlParams?.source || urlParams?.utm_source || '';
        if (!sourceValue && typeof window !== 'undefined') {
            const msg91Query = getCookie('msg91_query');
            if (msg91Query) {
                const fromCookie = getURLParams(msg91Query);
                sourceValue = fromCookie?.source || fromCookie?.utm_source || '';
            }
        }

        dispatch({
            type: 'SET_INITIAL_STATES',
            payload: {
                ...state,
                signupByGitHub,
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
                activeStep: 1,
            },
        });
        if (signupByGitHub && githubCode && githubState) {
            if (typeof window !== 'undefined') {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.delete('githubsignup');
                currentUrl.searchParams.delete('code');
                currentUrl.searchParams.delete('state');
                if (getCookie('absignup') === 'a' && !currentUrl.searchParams.get('absignup')) {
                    currentUrl.searchParams.set('absignup', 'a');
                }
                window.history.replaceState(null, '', currentUrl.toString());
            }
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
 * Handle GitHub signup redirect (same OAuth flow as legacy signup)
 */
export function handleGithubSignup() {
    if (typeof window !== 'undefined') {
        setSharedCookie('absignup', 'a', 7);
    }
    loginWithGitHubAccount(false);
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
                    mobile: identifier,
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
