import { toast } from 'react-toastify';

export const MULTIPLE_ACCOUNTS_MESSAGE =
    'This mobile number is associated with multiple accounts. Please login using email.';

export function injectOtpWidgetScriptIfNeeded() {
    const existingScript = document.getElementById('otpWidgetScript');
    if (existingScript) return;

    const head = document.getElementsByTagName('head')[0];
    const otpWidgetScript = document.createElement('script');
    otpWidgetScript.type = 'text/javascript';
    otpWidgetScript.id = 'otpWidgetScript';
    otpWidgetScript.src = `${process.env.WIDGET_SCRIPT}?v=${new Date().getTime()}`;
    head.appendChild(otpWidgetScript);
}

/** Script loads async; initSendOTP is only safe after this resolves. */
export function waitForInitSendOTP(timeoutMs = 20000) {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('OTP widget unavailable'));
            return;
        }
        injectOtpWidgetScriptIfNeeded();
        const deadline = Date.now() + timeoutMs;
        const id = window.setInterval(() => {
            if (typeof window.initSendOTP === 'function') {
                window.clearInterval(id);
                resolve();
            } else if (Date.now() > deadline) {
                window.clearInterval(id);
                reject(new Error('initSendOTP not available'));
            }
        }, 50);
    });
}

export function otpWidgetSetup() {
    injectOtpWidgetScriptIfNeeded();
}

export function isMultipleAccountsError(err) {
    if (err == null) return false;
    const status = err?.status || err?.data?.status;
    if (status === 'multiple') return true;

    const str =
        typeof err === 'string'
            ? err
            : err?.message || err?.error || (Array.isArray(err?.errors) ? err.errors[0] : err?.errors) || '';

    return /multiple\s+accounts|associated with multiple|more than one account/i.test(String(str));
}

export function handleMobileWidgetFailure(err) {
    if (isMultipleAccountsError(err)) {
        toast.error(MULTIPLE_ACCOUNTS_MESSAGE);
        return;
    }
    const msg =
        typeof err === 'string'
            ? err
            : err?.message ||
              err?.error ||
              (Array.isArray(err?.errors) ? err.errors[0] : err?.errors) ||
              'Something went wrong. Please try again.';
    toast.error(msg);
}
