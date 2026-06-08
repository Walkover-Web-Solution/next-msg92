export function getQueryParamsDeatils(url) {
    let params = (url || '').split('?')?.[1];
    if (params) {
        let paramsKeyValue = params.split('&');
        let userData = {};
        for (let keyValue of paramsKeyValue) {
            let data = keyValue.split('=');
            userData[data[0]] = data[1];
        }
        return userData;
    }
    return null;
}

export function getQueryStringFromObject(object) {
    let stringValue = '';
    for (let key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
            stringValue = stringValue + `${key}=${object[key]}&`;
        }
    }
    return stringValue;
}

export function getCookie(cookieName) {
    // Check if we're in a browser environment (SSR-safe)
    if (typeof document === 'undefined') {
        return null;
    }
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Return null if the cookie is not found
}

export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? '; expires=' + expirationDate.toUTCString() : '');
    document.cookie = name + '=' + cookieValue + '; path=/';
}

/** Keys stored in msg91_query / redirects / API must not include UI-only or auth params. */
export const MSG91_QUERY_EXCLUDE_KEYS = new Set([
    'absignup',
    'githubsignup',
    'githublogin',
    'code',
    'state',
    'session',
    'sessionId',
    'useV2signup',
    'emailToken',
    'mobileToken',
]);

const SHARED_COOKIE_EXPIRE = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';

/** Marketing params appended on signup redirects (from msg91_query). */
export const SIGNUP_MARKETING_QUERY_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_matchtype',
    'ad',
    'adposition',
    'reference',
    'source',
];

export function sanitizeMsg91QuerySearch(search) {
    if (!search) return '';
    const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
    const kept = new URLSearchParams();
    params.forEach((value, key) => {
        if (!MSG91_QUERY_EXCLUDE_KEYS.has(key) && value) {
            kept.set(key, value);
        }
    });
    const query = kept.toString();
    return query ? `?${query}` : '';
}

export function parseMsg91QueryCookie() {
    const raw = getCookie('msg91_query');
    if (!raw) return {};
    const sanitized = sanitizeMsg91QuerySearch(raw);
    if (!sanitized) return {};
    const queryString = sanitized.startsWith('?') ? sanitized.substring(1) : sanitized;
    return Object.fromEntries(new URLSearchParams(queryString).entries());
}

export function refreshMsg91QueryCookieFromRaw(searchOrCookie) {
    if (typeof document === 'undefined') return;
    const sanitized = sanitizeMsg91QuerySearch(searchOrCookie || getCookie('msg91_query') || '');
    if (sanitized) {
        setCookie('msg91_query', sanitized, 30);
    } else if (getCookie('msg91_query')) {
        document.cookie = `msg91_query=; ${SHARED_COOKIE_EXPIRE}; path=/`;
    }
}

export function getUtmFromCookies() {
    if (typeof document === 'undefined') return {};
    const parsed = parseMsg91QueryCookie();
    return Object.fromEntries(Object.entries(parsed).filter(([key]) => SIGNUP_MARKETING_QUERY_KEYS.includes(key)));
}

export function setSharedCookie(name, value, days = 1) {
    if (typeof document === 'undefined') return;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const isLocalhost = window.location.hostname === 'localhost';
    const cookieParts = [
        `${name}=${encodeURIComponent(value)}`,
        `expires=${expirationDate.toUTCString()}`,
        'path=/',
        'SameSite=Lax',
    ];
    if (!isLocalhost) {
        cookieParts.push('domain=.msg91.com');
        cookieParts.push('Secure');
    }

    document.cookie = cookieParts.join('; ');
}

/** Expire legacy .msg91.com cookies from old signup forEach (e.g. absignup). */
export function clearLegacySharedCookies() {
    if (typeof document === 'undefined') return;
    const isLocalhost = window.location.hostname === 'localhost';
    if (isLocalhost) return;
    const base = `${SHARED_COOKIE_EXPIRE}; path=/; domain=.msg91.com; SameSite=Lax; Secure`;
    document.cookie = `absignup=; ${base}`;
    SIGNUP_MARKETING_QUERY_KEYS.forEach((key) => {
        document.cookie = `${key}=; ${base}`;
    });
}

/** Host-scoped only — keeps AB signup UI on marketing site without sending absignup to panel. */
export function persistAbSignupFlag(days = 7) {
    if (typeof window === 'undefined') return;
    const isLocalhost = window.location.hostname === 'localhost';
    if (!isLocalhost) {
        document.cookie = `absignup=; ${SHARED_COOKIE_EXPIRE}; path=/; domain=.msg91.com; SameSite=Lax; Secure`;
    }
    setCookie('absignup', 'a', days);
    try {
        sessionStorage.setItem('absignup', 'a');
    } catch (_) {}
}

export function isAbSignupActive() {
    if (typeof window === 'undefined') return false;
    try {
        if (sessionStorage.getItem('absignup') === 'a') return true;
    } catch (_) {}
    return getCookie('absignup') === 'a';
}

export function loginWithGitHubAccount(loginProcess) {
    let state = Math.floor(100000000 + Math.random() * 900000000);
    let otherParams = loginProcess ? `githublogin=true` : `githubsignup=true`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&allow_signup=true&scope=user&redirect_uri=${process.env.REDIRECT_URL}/github-auth-token?${otherParams}&state=${state}`;
}

export function setUtm() {
    // Get all anchor tags in the document using querySelectorAll
    var anchorTags = document.querySelectorAll('.utm');
    // Loop through the anchor tags
    var utmParams = Object.fromEntries(
        getCookie('msg91_query')
            ?.replace('?', '')
            ?.split('&')
            ?.map((v) => v.split('=')) ?? []
    );
    for (var i = 0; i < anchorTags.length; i++) {
        let href = anchorTags[i].getAttribute('href'); // Get the current href value

        let params = {};
        const url = href?.split('?');
        if (url[1]) {
            params = Object.fromEntries(url[1]?.split('&')?.map((v) => v.split('=')) ?? []);
        }

        Object.assign(params, utmParams);
        const query = Object.entries(params)
            ?.map(([k, v]) => `${k}=${v}`)
            .join('&');

        if (href && query) {
            anchorTags[i].setAttribute('href', url[0] + (query ? '?' + query : ''));
        }
    }
}
