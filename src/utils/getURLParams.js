export default function getURLParams(paramsString) {
    if (!paramsString || typeof paramsString !== 'string') {
        return {};
    }

    const query = paramsString.includes('?') ? paramsString.slice(paramsString.indexOf('?') + 1) : paramsString;

    if (!query.trim()) {
        return {};
    }

    const params = {};
    new URLSearchParams(query).forEach((value, key) => {
        params[key] = value === 'true' ? true : value === 'false' ? false : value;
    });

    return params;
}
