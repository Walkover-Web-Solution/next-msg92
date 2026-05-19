import { EMAIL_REGEX, MOBILE_REGEX } from './constants';

/**
 * OTP sending function for functional components
 * @param {string} identifier - Email or mobile number
 * @param {boolean} notByEmail - Whether it's mobile (true) or email (false)
 * @param {Function} dispatch - Redux dispatch function
 * @param {string} channel - Optional channel for retry (e.g., 'sms', 'voice', 'whatsapp')
 * @param {Function} showToast - Toast notification function
 */
// Filter OTP methods: prioritize country-specific, fallback to default (country: 0)
export function getAvailableOtpMethods(methods, phoneCountry) {
    if (!methods?.length) return [];
    const code = phoneCountry ? parseInt(phoneCountry.countryCode) : null;
    const countrySpecific = code ? methods.filter((m) => m.country === code) : [];
    return countrySpecific.length > 0 ? countrySpecific : methods.filter((m) => m.country === 0);
}

export function sendOtp(identifier, notByEmail, dispatch, channel = null, showToast = () => {}) {
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

    dispatch({ type: 'SET_LOADING', payload: true });

    // If channel is specified, use it for retry
    const sendOtpArgs = channel ? [identifier, channel] : [identifier];

    window.sendOtp(
        ...sendOtpArgs,
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
 * OTP verification function
 * @param {string} otp - OTP code
 * @param {string} requestId - Request ID from send OTP
 * @param {boolean} notByEmail - Whether it's mobile (true) or email (false)
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} state - Current state
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
export function verifyOtp(otp, requestId, notByEmail, dispatch, state, onSuccess, onError = () => {}) {
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
 * @param {Function} dispatch - Redux dispatch function
 */
export function resetEmailOtp(dispatch) {
    dispatch({ type: 'SET_EMAIL_EDIT' });
}

/**
 * Reset phone OTP state
 * @param {Function} dispatch - Redux dispatch function
 */
export function resetPhoneOtp(dispatch) {
    dispatch({ type: 'SET_PHONE_EDIT' });
}
