import availableCountries from '@/data/availableCountries.json';
export default function getPageInfo(params) {
    let country = 'global';
    let page = 'home';
    let pathArray = params?.slug || [];
    let pathURL = pathArray.join('/');
    let baseURL =
        pathArray[0] && availableCountries.some((c) => c.shortname.toLowerCase() === pathArray[0])
            ? pathArray.slice(1).join('/')
            : pathArray.join('/');
    if (params?.slug && params?.slug.length > 1) {
        if (availableCountries.some((c) => c.shortname.toLowerCase() === params?.slug[0])) {
            country = params?.slug[0];
            page = params?.slug[1];
        } else {
            page = params?.slug[0];
        }
    } else if (params?.slug && availableCountries.some((c) => c.shortname.toLowerCase() === params?.slug[0])) {
        country = params?.slug[0];
    } else if (params?.slug) {
        page = params?.slug[0];
    }
    return { country, page, pathArray, pathURL, baseURL };
}
