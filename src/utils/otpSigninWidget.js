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

/**
 * Default MSG91 widget UI uses mat-radio-group: processByEnums.MOBILE = "1", EMAIL = "2".
 * Verify API success payload often does not include channel — read the live UI from shadow DOM.
 */
export function getMsg91OtpWidgetContactMode() {
    if (typeof document === 'undefined') return null;
    const host = document.querySelector('msg91-otp-provider');
    const top = host?.shadowRoot;
    if (!top) return null;

    const visit = (root, fn) => {
        fn(root);
        root.querySelectorAll('*').forEach((el) => {
            if (el.shadowRoot) visit(el.shadowRoot, fn);
        });
    };

    let mode = null;
    visit(top, (r) => {
        if (mode) return;
        const group = r.querySelector('mat-radio-group');
        if (!group) return;

        const checkedInput = group.querySelector('input[type="radio"]:checked');
        if (checkedInput) {
            const v = String(checkedInput.value);
            if (v === '2') mode = 'email';
            else if (v === '1') mode = 'mobile';
            return;
        }

        const buttons = [...group.querySelectorAll('mat-radio-button')];
        let selectedIndex = -1;
        buttons.forEach((b, i) => {
            if (
                b.classList.contains('mat-mdc-radio-checked') ||
                b.classList.contains('mat-radio-checked') ||
                b.querySelector('input[type="radio"]:checked')
            ) {
                selectedIndex = i;
            }
        });
        if (selectedIndex === 1) mode = 'email';
        else if (selectedIndex === 0) mode = 'mobile';
    });

    return mode;
}

/**
 * After verify, MSG91 may call success with the verify API object or a raw token string
 * (e.g. JWT / "Already Verified"). Prefer shadow-DOM Mobile/Email toggle; then API hints.
 */
export function resolveOtpWidgetLoginTarget(data, emailLoginUrl, mobileLoginUrl) {
    const code = typeof data === 'string' ? data : (data?.message ?? data?.['access-token'] ?? data?.access_token);
    if (code == null || code === '') {
        return { loginUrl: mobileLoginUrl, code: null };
    }
    if (typeof data === 'string') {
        return { loginUrl: mobileLoginUrl, code: data };
    }

    const uiMode = getMsg91OtpWidgetContactMode();
    if (uiMode === 'email') {
        return { loginUrl: emailLoginUrl, code };
    }
    if (uiMode === 'mobile') {
        return { loginUrl: mobileLoginUrl, code };
    }

    const ch = data?.channel;
    const name = String(ch?.name ?? ch?.Name ?? '').toUpperCase();
    const val = ch?.value ?? ch?.Value ?? data?.channelValue;
    const retryEmailChannel = val === 3 || val === '3';
    const isEmail =
        name === 'EMAIL' ||
        retryEmailChannel ||
        String(data?.channelName ?? '').toUpperCase() === 'EMAIL' ||
        String(data?.processType ?? data?.process_type ?? '') === '3';

    return {
        loginUrl: isEmail ? emailLoginUrl : mobileLoginUrl,
        code,
    };
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
