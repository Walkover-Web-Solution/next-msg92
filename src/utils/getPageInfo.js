import availableCountries from '@/data/availableCountries.json';

//Extracts page info from the given slug array and query params.
export default function getPageInfo(slugArray, queryParams) {

    // Default country and page
    let country = 'global';
    let page = 'home';

    // Array of URL path segments
    let pathArray = slugArray || [];

    // URL path without query string
    let pathURL = pathArray.join('/');

    // URL path with query string from queryParams (if any)
    let queryString = '';
    if (queryParams && Object.keys(queryParams).length > 0) {
        queryString =
            '?' +
            Object.entries(queryParams)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
    }
    let url = pathURL + queryString;

    // Query string (currently unused, left as empty string)
    let qureyObj = queryParams || {};

    // URL path without country prefix (if present)
    let baseURL =
        pathArray[0] && availableCountries.some((c) => c.shortname.toLowerCase() === pathArray[0])
            ? pathArray.slice(1).join('/')
            : pathArray.join('/');

    // Determine country and page based on pathArray and available countries
    if (pathArray && pathArray.length > 1) {
        if (availableCountries.some((c) => c.shortname.toLowerCase() === pathArray[0])) {
            country = pathArray[0];
            page = pathArray[1];
        } else {
            page = pathArray[0];
        }
    } else if (pathArray && availableCountries.some((c) => c.shortname.toLowerCase() === pathArray[0])) {
        country = pathArray[0];
    } else if (pathArray) {
        page = pathArray[0];
    }

    return { country, page, pathArray, pathURL, baseURL, url, qureyObj };
}
