export default function getURLParams(paramsString) {
    // Remove path before '?' or '/' if exists, keep only the query string part
    if (typeof paramsString === 'string') {
        // If paramsString contains '?', use substring after '?'
        if (paramsString.includes('?')) {
            paramsString = paramsString.substring(paramsString.indexOf('?'));
        } else if (paramsString.includes('/')) {
            // If no '?', but contains '/', use substring after last '/'
            paramsString = paramsString.substring(paramsString.lastIndexOf('/') + 1);
        }
    }
    // Remove leading '?' if present
    const cleanString = paramsString.startsWith('?') ? paramsString.slice(1) : paramsString;

    // Handle empty string
    if (!cleanString || cleanString.trim() === '') {
        return {};
    }

    // Split by '&' and map each parameter
    const params = {};
    const paramPairs = cleanString.split('&').filter((pair) => pair.trim() !== '');

    paramPairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        if (key) {
            // Decode URL encoded values and handle boolean values
            const decodedValue = decodeURIComponent(value || '');
            params[key] = decodedValue === 'true' ? true : decodedValue === 'false' ? false : decodedValue;
        }
    });

    return params;
}
