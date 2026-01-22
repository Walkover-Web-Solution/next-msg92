import { getCookie, setCookie } from '@/utils/utilis';

/**
 * Update the source parameter in msg91_query cookie
 * @param {string} newSource - New source value to update
 */
export function updateSourceInCookie(newSource) {
    if (typeof window === 'undefined') return;

    try {
        const currentCookie = getCookie('msg91_query');

        if (!currentCookie) {
            // If no cookie exists, create one with the new source
            setCookie('msg91_query', `?source=${encodeURIComponent(newSource)}`, 30);
            return;
        }

        // Parse existing cookie query string
        const queryString = currentCookie.startsWith('?') ? currentCookie.substring(1) : currentCookie;
        const params = new URLSearchParams(queryString);

        // Update or add source parameter
        params.set('source', newSource);

        // Rebuild query string and update cookie
        const updatedQuery = '?' + params.toString();
        setCookie('msg91_query', updatedQuery, 30);
    } catch (error) {
        console.error('Failed to update source in cookie:', error);
    }
}

/**
 * Append msg91_query cookie parameters to a redirect URL
 * @param {string} baseUrl - Base URL to append parameters to
 * @returns {string} URL with msg91_query parameters appended
 */
export function appendMsg91QueryToUrl(baseUrl) {
    if (typeof window === 'undefined') return baseUrl;

    try {
        const msg91Query = getCookie('msg91_query');

        if (!msg91Query) {
            return baseUrl;
        }

        // Remove leading '?' if present in cookie
        const queryString = msg91Query.startsWith('?') ? msg91Query.substring(1) : msg91Query;

        // Check if baseUrl already has query parameters
        const separator = baseUrl.includes('?') ? '&' : '?';

        return `${baseUrl}${separator}${queryString}`;
    } catch (error) {
        console.error('Failed to append msg91_query to URL:', error);
        return baseUrl;
    }
}
