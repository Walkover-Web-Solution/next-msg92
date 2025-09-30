import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    //Temporary Data
    activeStep: 2,
    widgetData: null,
    allowedRetry: null,
    isLoading: false,
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
    session: null,
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

        case 'SET_EMAIL_TOKEN':
            return { ...state, emailToken: action.payload };

        case 'SET_MOBILE_TOKEN':
            return { ...state, mobileToken: action.payload };

        case 'SET_PERSONAL':
            return { ...state, personal: action.payload };

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

        case 'SET_OTP_SENT':
            return { ...state, otpSent: action.payload };
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
    console.log('⚡️ ~ :337 ~ verifyOtp ~ otp:', otp);
    dispatch({ type: 'SET_LOADING', payload: true });
    window.verifyOtp(
        `${otp}`,
        (data) => {
            console.log('⚡️ ~ :321 ~ verifyOtp ~ data:', data);
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
