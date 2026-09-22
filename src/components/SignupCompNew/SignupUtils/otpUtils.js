import { EMAIL_REGEX, MOBILE_REGEX, OTPRetryModes } from './constants';

/**
 * OTP sending function for functional components
 * @param {string} identifier - Email or mobile number
 * @param {boolean} notByEmail - Whether it's mobile (true) or email (false)
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} showToast - Toast notification function
 */
// Filter OTP methods: prioritize country-specific, fallback to default (country: 0)
export function getAvailableOtpMethods(methods, phoneCountry) {
    if (!methods?.length) return [];
    const code = phoneCountry ? parseInt(phoneCountry.countryCode) : null;
    const countrySpecific = code ? methods.filter((m) => m.country === code) : [];
    return countrySpecific.length > 0 ? countrySpecific : methods.filter((m) => m.country === 0);
}

export function sendOtp(identifier, notByEmail, dispatch, showToast = () => {}) {
    if (!new RegExp(EMAIL_REGEX).test(identifier) && !notByEmail) {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid email address.' });
        showToast('Invalid email address.');
        return;
    }
    if (!new RegExp(MOBILE_REGEX).test(identifier) && notByEmail) {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid mobile number.' });
        showToast('Invalid mobile number.');
        return;
    }

    dispatch({ type: 'SET_LOADING', payload: { isLoading: true, loadingType: 'send' } });

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
            const errorMessage = error?.message || 'Failed to send OTP';
            showToast(errorMessage);
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
        }
    );
}

/**
 * Resend OTP via widget retry API (same as legacy SignUp.retryOtp)
 */
export function retryOtp(channel, requestId, dispatch, showToast = () => {}) {
    if (!requestId) {
        dispatch({ type: 'SET_ERROR', payload: 'No request ID found. Please send OTP again.' });
        return;
    }

    const channelMap = {
        sms: OTPRetryModes.Sms,
        voice: OTPRetryModes.Voice,
        email: OTPRetryModes.Email,
        whatsapp: OTPRetryModes.Whatsapp,
    };
    const retryBy =
        channel == null || channel === ''
            ? null
            : /^\d+$/.test(String(channel))
              ? String(channel)
              : channelMap[String(channel).toLowerCase()] || null;

    dispatch({ type: 'SET_LOADING', payload: { isLoading: true, loadingType: 'send' } });

    window.retryOtp(
        retryBy,
        () => {
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_OTP_SENT', payload: true });
        },
        (error) => {
            const errorMessage = error?.message || 'Failed to resend OTP';
            showToast(errorMessage);
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
        },
        requestId
    );
}

/**
 * OTP verification function
 */
export function verifyOtp(otp, requestId, notByEmail, dispatch, state, onSuccess, onError = () => {}) {
    dispatch({ type: 'SET_LOADING', payload: { isLoading: true, loadingType: 'verify' } });
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
            const errorMessage = error?.message || 'OTP verification failed';
            dispatch({ type: 'SET_LOADING', payload: false });
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            onError(errorMessage);
        },
        requestId
    );
}

/**
 * Reset email OTP state
 */
export function resetEmailOtp(dispatch) {
    dispatch({ type: 'SET_EMAIL_EDIT' });
}

/**
 * Reset phone OTP state
 */
export function resetPhoneOtp(dispatch) {
    dispatch({ type: 'SET_PHONE_EDIT' });
}
