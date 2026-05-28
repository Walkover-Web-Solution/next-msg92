import { toast } from 'react-toastify';

export function getErrorMessage(err) {
    return err?.message;
}

function injectOtpWidgetScriptIfNeeded() {
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

export function handleMobileWidgetFailure(err) {
    toast.error(getErrorMessage(err));
}
