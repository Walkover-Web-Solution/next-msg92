import { initialState } from './constants';

export function reducer(state, action) {
    switch (action.type) {
        case 'SET_INITIAL_STATES':
            return { ...state, ...action.payload };

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
            return { ...state, isLoading: false, error: 'Failed to send OTP' };

        case 'SET_ERROR':
            return { ...state, isLoading: false, error: action.payload };

        case 'SET_OTP_VERIFICATION_ERROR':
            return { ...state, isLoading: false, error: 'OTP verification failed' };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

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

        case 'SET_EMAIL_EDIT':
            return {
                ...state,
                emailRequestId: null,
                isLoading: false,
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

        case 'SET_PHONE_EDIT':
            return {
                ...state,
                mobileRequestId: null,
                isLoading: false,
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
                companyDetails: {
                    ...state.companyDetails,
                    companyName: action.payload.companyName,
                },
            };

        case 'SET_MOBILE':
            return {
                ...state,
                mobileIdentifier: action.payload.mobile,
            };

        case 'SET_SESSION':
            return {
                ...state,
                session: action.payload.session,
                activeStep: action.payload.step,
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
        case 'SET_INVITES':
            return {
                ...state,
                invites: action.payload || [],
            };
        case 'SET_COUNTRIES':
            return {
                ...state,
                countries: action.payload || null,
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}
