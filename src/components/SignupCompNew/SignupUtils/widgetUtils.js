import { WIDGET_POLLING_CONFIG } from './constants';

/**
 * Processes widget data to extract allowed retry configurations
 * @param {Object} widgetData - Widget data from getWidgetData()
 * @returns {Object} Allowed retry configuration object
 */
export function processWidgetData(widgetData) {
    const allowedRetry = {};
    const primaryChannelsByProcessVia = {};

    // First pass: collect all primary processes
    for (let i = 0; i < widgetData?.processes?.length; i++) {
        const process = widgetData?.processes[i];
        const processViaName = process?.processVia?.name?.toLowerCase();
        const channelName = process?.channel?.name?.toLowerCase();
        const countryCodes = process?.countryCode || [];

        if (processViaName && channelName && processViaName !== 'retry') {
            if (!allowedRetry[processViaName]) {
                allowedRetry[processViaName] = { 'primary': [], 'secondary': [] };
                primaryChannelsByProcessVia[processViaName] = new Set();
            }

            countryCodes.forEach((countryCode) => {
                const channelData = { channel: channelName, country: countryCode };
                primaryChannelsByProcessVia[processViaName].add(channelName);

                const existsInPrimary = allowedRetry[processViaName].primary.some(
                    (item) => item.channel === channelName && item.country === countryCode
                );
                if (!existsInPrimary) {
                    allowedRetry[processViaName].primary.push(channelData);
                }

                const existsInSecondary = allowedRetry[processViaName].secondary.some(
                    (item) => item.channel === channelName && item.country === countryCode
                );
                if (!existsInSecondary) {
                    allowedRetry[processViaName].secondary.push(channelData);
                }
            });
        }
    }

    // Second pass: add retry processes to matching processVia
    for (let i = 0; i < widgetData?.processes?.length; i++) {
        const process = widgetData?.processes[i];
        const processViaName = process?.processVia?.name?.toLowerCase();
        const channelName = process?.channel?.name?.toLowerCase();
        const countryCodes = process?.countryCode || [];

        if (processViaName === 'retry' && channelName) {
            countryCodes.forEach((countryCode) => {
                const channelData = { channel: channelName, country: countryCode };

                for (let key in allowedRetry) {
                    if (primaryChannelsByProcessVia[key].has(channelName)) {
                        const existsInSecondary = allowedRetry[key].secondary.some(
                            (item) => item.channel === channelName && item.country === countryCode
                        );
                        if (!existsInSecondary) {
                            allowedRetry[key].secondary.push(channelData);
                        }
                    }
                }
            });
        }
    }

    return allowedRetry;
}

/**
 * Polls for widget data and dispatches it when available
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} onError - Error callback
 */
export function pollForWidgetData(dispatch, onError) {
    let attempts = 0;

    const widgetDataInterval = setInterval(() => {
        try {
            attempts++;

            // Check if getWidgetData function exists
            if (typeof window.getWidgetData !== 'function') {
                if (attempts >= WIDGET_POLLING_CONFIG.MAX_ATTEMPTS) {
                    clearInterval(widgetDataInterval);
                    if (onError) onError(new Error('getWidgetData function not available'));
                }
                return;
            }

            let widgetData = window.getWidgetData();

            if (widgetData) {
                const allowedRetry = processWidgetData(widgetData);
                console.log('allowedRetry', allowedRetry);

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
            } else if (attempts >= WIDGET_POLLING_CONFIG.MAX_ATTEMPTS) {
                clearInterval(widgetDataInterval);
                if (onError) onError(new Error('Widget data timeout'));
            }
        } catch (error) {
            if (dispatch) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to process widget data' });
            }
            if (onError) onError(error);
            clearInterval(widgetDataInterval);
        }
    }, WIDGET_POLLING_CONFIG.INTERVAL_MS);
}

/**
 * Sets up OTP widget script and initializes widget
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
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

                if (typeof window.initSendOTP === 'function') {
                    window.initSendOTP(configuration);
                } else {
                    if (onError) onError(new Error('initSendOTP function not available'));
                    return;
                }

                pollForWidgetData(dispatch, onError);
            } catch (error) {
                if (dispatch) {
                    dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize OTP widget' });
                }
                if (onError) onError(error);
            }
        };

        otpWidgetScript.onerror = (error) => {
            if (dispatch) {
                dispatch({ type: 'SET_ERROR', payload: 'Failed to load OTP widget script' });
            }
            if (onError) onError(error);
        };

        head.appendChild(otpWidgetScript);
    } else {
        // Set up polling even for existing scripts since widget might still be initializing
        pollForWidgetData(dispatch, onError);
    }
}

/**
 * Utility function to clean up widget script
 */
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
