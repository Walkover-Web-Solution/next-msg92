import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    //Temporary Data
    activeStep: 3,
    widgetData: null,
    allowedRetry: null,
    isLoading: false,
    source: null,
    session: null,
    otpSent: false,
    otpSendFailed: false,
    emailIdentifier: null,
    emailRequestId: null,
    emailToken: null,

    mobileIdentifier: null,
    mobileRequestId: null,
    mobileToken: null,
    mobileOtpVerified: false,

    //Final Register Data
    userDetails: { firstName: '', lastName: '' },
    companyDetails: {
        industry: null,
        state: null,
        zipcode: null,
        city: null,
        address: null,
        gstNo: null,
        cityId: null,
        countryId: null,
        stateId: null,
        customCity: '',
        companyName: null,
        country: null,
        service: [],
    },
    acceptInviteForCompanies: [],
    rejectInviteForCompanies: [],
    utm_term: null,
    utm_medium: null,
    utm_source: null,
    utm_campaign: null,
    utm_content: null,
    utm_matchtype: null,
    ad: null,
    adposition: null,
    reference: null,
};

const MOBILE_REGEX = /^[+]?[0-9]{7,15}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const OTPRetryModes = {
    Sms: '11',
    Voice: '4',
    Email: '3',
    Whatsapp: '6',
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ACTIVE_STEP':
            return { ...state, activeStep: action.payload };

        case 'SET_WIDGET_DATA':
            return {
                ...state,
                widgetData: action.payload.widgetData,
                allowedRetry: action.payload.allowedRetry,
            };

        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_OTP_ERROR':
            return { ...state, isLoading: false, otpSendFailed: true };

        case 'SET_EMAIL_OTP_SUCCESS':
            return {
                ...state,
                emailRequestId: action.payload.requestId,
                emailIdentifier: action.payload.identifier,
                isLoading: false,
                otpSent: true,
            };

        case 'SET_EMAIL_VERIFICATION_SUCCESS':
            return {
                ...state,
                emailToken: action.payload.accessToken,
                isLoading: false,
                activeStep: 2,
                otpSent: false,
            };

        case 'SET_MOBILE_OTP_SUCCESS':
            return {
                ...state,
                mobileRequestId: action.payload.requestId,
                mobileIdentifier: action.payload.identifier,
                isLoading: false,
                otpSent: true,
            };

        case 'SET_MOBILE_VERIFICATION_SUCCESS':
            return {
                ...state,
                mobileToken: action.payload.accessToken,
                isLoading: false,
                mobileOtpVerified: true,
                otpSent: false,
            };

        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                },
            };

        case 'SET_COMPANY_NAME':
            return {
                ...state,
                companyName: action.payload.companyName,
            };

        case 'SET_MOBILE':
            return {
                ...state,
                mobileIdentifier: action.payload.mobile,
            };
        case 'SET_SERVICES':
            return {
                ...state,
                companyDetails: {
                    ...state.companyDetails,
                    service: action.payload.services,
                },
            };
        case 'SET_SOURCE':
            return {
                ...state,
                source: action.payload.source,
            };

        case 'SET_ADDRESS_DETAILS':
            return {
                ...state,
                companyDetails: {
                    ...state.companyDetails,
                    address: action.payload.address,
                    zipcode: action.payload.zipcode,
                    country: action.payload.country,
                    state: action.payload.state,
                    city: action.payload.city,
                    countryId: action.payload.countryId,
                    stateId: action.payload.stateId,
                    cityId: action.payload.cityId,
                },
            };

        case 'SET_OTP_SENT':
            return { ...state, otpSent: action.payload };
        case 'SET_UTM_PARAMS':
            return {
                ...state,
                utm_term: action.payload.utm_term || state.utm_term,
                utm_medium: action.payload.utm_medium || state.utm_medium,
                utm_source: action.payload.utm_source || state.utm_source,
                utm_campaign: action.payload.utm_campaign || state.utm_campaign,
                utm_content: action.payload.utm_content || state.utm_content,
                utm_matchtype: action.payload.utm_matchtype || state.utm_matchtype,
                ad: action.payload.ad || state.ad,
                adposition: action.payload.adposition || state.adposition,
                reference: action.payload.reference || state.reference,
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const SignupCtx = createContext();

export function SignupProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <SignupCtx.Provider value={{ state, dispatch }}>{children}</SignupCtx.Provider>;
}

export function useSignup() {
    return useContext(SignupCtx);
}

export function otpWidgetSetup(dispatch, onSuccess, onError) {
    const currentTimestamp = new Date().getTime();
    const existingScript = document.getElementById('otpWidgetScript');

    // If script already exists, don't add it again
    if (!existingScript) {
        const head = document.getElementsByTagName('head')[0];
        const otpWidgetScript = document.createElement('script');
        otpWidgetScript.type = 'text/javascript';
        otpWidgetScript.id = 'otpWidgetScript';
        otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${currentTimestamp}`;

        otpWidgetScript.onload = () => {
            try {
                const configuration = {
                    widgetId: process.env.OTP_WIDGET_TOKEN,
                    tokenAuth: process.env.WIDGET_AUTH_TOKEN,
                    success: (data) => {
                        if (onSuccess) onSuccess(data);
                    },
                    failure: (error) => {
                        if (onError) onError(error);
                    },
                    exposeMethods: true,
                };

                window.initSendOTP(configuration);

                const widgetDataInterval = setInterval(() => {
                    try {
                        let widgetData = window.getWidgetData();
                        if (widgetData) {
                            const allowedRetry = {
                                email: widgetData?.processes?.find(
                                    (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Email
                                ),
                                whatsApp: widgetData?.processes?.find(
                                    (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Whatsapp
                                ),
                                voice: widgetData?.processes?.find(
                                    (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Voice
                                ),
                                sms: widgetData?.processes?.find(
                                    (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Sms
                                ),
                            };

                            if (dispatch) {
                                dispatch({
                                    type: 'SET_WIDGET_DATA',
                                    payload: {
                                        widgetData,
                                        allowedRetry,
                                    },
                                });
                            }

                            clearInterval(widgetDataInterval);
                        }
                    } catch (error) {
                        console.error('Error processing widget data:', error);
                        if (onError) onError(error);
                        clearInterval(widgetDataInterval);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error initializing OTP widget:', error);
                if (onError) onError(error);
            }
        };

        otpWidgetScript.onerror = (error) => {
            console.error('Error loading OTP widget script:', error);
            if (onError) onError(error);
        };

        head.appendChild(otpWidgetScript);
    } else {
        // If script already exists, try to get widget data immediately
        if (window.getWidgetData && dispatch) {
            const widgetData = window.getWidgetData();
            if (widgetData) {
                const allowedRetry = {
                    email: widgetData?.processes?.find(
                        (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Email
                    ),
                    whatsApp: widgetData?.processes?.find(
                        (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Whatsapp
                    ),
                    voice: widgetData?.processes?.find(
                        (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Voice
                    ),
                    sms: widgetData?.processes?.find(
                        (e) => e.processVia?.value === '5' && e.channel?.value === OTPRetryModes.Sms
                    ),
                };

                dispatch({
                    type: 'SET_WIDGET_DATA',
                    payload: {
                        widgetData,
                        allowedRetry,
                    },
                });
            }
        }
    }
}

// Utility function to clean up widget script
export function cleanupOtpWidget() {
    const existingScript = document.getElementById('otpWidgetScript');
    if (existingScript) {
        existingScript.remove();
    }

    // Clean up global variables
    if (window.initSendOTP) {
        delete window.initSendOTP;
    }
    if (window.getWidgetData) {
        delete window.getWidgetData;
    }
    if (window.sendOtp) {
        delete window.sendOtp;
    }
}

export default function checkSession() {
    try {
        const url = process.env.API_BASE_URL + '/api/v5/nexus/checkSession';
        // Simple cookie getter function
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const payload = { session: getCookie('sessionId') };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(url, requestOptions)
            .then((response) => response?.json())
            .then((result) => {
                if (result?.status === 'success') {
                    // Redirect to dashboard or success page
                    window.location.href = '/dashboard'; // or appropriate success URL
                }
            });
    } catch (error) {
        console.log('No Session Found');
    }
}

// OTP sending function for functional components
export function sendOtp(identifier, notByEmail, dispatch, showToast = console.error) {
    if (!new RegExp(EMAIL_REGEX).test(identifier) && !notByEmail) {
        showToast('Invalid email address.');
        return;
    }
    if (!new RegExp(MOBILE_REGEX).test(identifier) && notByEmail) {
        showToast('Invalid mobile number.');
        return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    window.sendOtp(
        identifier,
        (data) => {
            if (notByEmail) {
                dispatch({
                    type: 'SET_MOBILE_OTP_SUCCESS',
                    payload: {
                        requestId: data?.message,
                        identifier: identifier,
                        message: 'OTP has been successfully sent to',
                    },
                });
            } else {
                dispatch({
                    type: 'SET_EMAIL_OTP_SUCCESS',
                    payload: {
                        requestId: data?.message,
                        identifier: identifier,
                        message: 'OTP has been successfully sent to',
                    },
                });
            }
        },
        (error) => {
            showToast(error?.message || 'Failed to send OTP');
            dispatch({ type: 'SET_OTP_ERROR' });
        }
    );
}

export function verifyOtp(otp, requestId, notByEmail, dispatch, onSuccess, onError = console.error) {
    dispatch({ type: 'SET_LOADING', payload: true });
    window.verifyOtp(
        `${otp}`,
        (data) => {
            dispatch({ type: 'SET_LOADING', payload: false });
            if (data?.type === 'success') {
                if (!notByEmail) {
                    dispatch({
                        type: 'SET_EMAIL_VERIFICATION_SUCCESS',
                        payload: {
                            accessToken: data.message,
                            message: 'Email verified successfully.',
                        },
                    });
                } else {
                    dispatch({
                        type: 'SET_MOBILE_VERIFICATION_SUCCESS',
                        payload: {
                            accessToken: data.message,
                            message: 'Mobile verified successfully.',
                        },
                    });
                }

                if (onSuccess) {
                    onSuccess(data);
                }
            }
        },
        (error) => {
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_OTP_VERIFICATION_ERROR' });
            onError(error?.message || 'OTP verification failed');
        },
        requestId
    );
}

export function setDetails(type, dispatch, identifier) {
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
}

export function validateEmailSignUp() {
    const url = process.env.API_BASE_URL + '/api/v5/nexus/validateGithubSignUp';
    const payload = {
        session: state?.session,
        emailToken: state?.emailToken,
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
                window.location.href = response?.data?.redirectUrl;
            }
        })
        .catch((error) => {
            console.log('Error validating GitHub signup:', error);
        });
}

export function handleUtmParams(dispatch) {
    const utmParams = {};

    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);

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
            const value = urlParams.get(param);
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

// API functions for location data
export async function fetchCountries() {
    const response = await fetch(`${process.env.API_BASE_URL}/api/v5/web/getCountries`, {
        method: 'GET',
    });
    return response.json();
}

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
        console.error('Error fetching states:', error);
        throw error;
    }
}

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
        console.error('Error fetching cities:', error);
        throw error;
    }
}

// Helper function to get country ID from country name
export function getCountryIdFromName(countryName, countries) {
    const country = countries.find((c) => c.name === countryName);
    return country ? country.shortname : null;
}
