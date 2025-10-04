export default function getURLParams(paramsString) {
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
