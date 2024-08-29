import availableCountries from '@/data/availableCountries.json';
export default function getPageInfo(params) {
    let country = 'global';
    let page = 'home';

    if (params?.slug && params?.slug.length > 1) {
        if (availableCountries.some((c) => c.shortName === params?.slug[0])) {
            country = params?.slug[0];
            page = params?.slug[1];
        } else {
            page = params?.slug[0];
        }
    } else if (params?.slug && availableCountries.some((c) => c.shortName === params?.slug[0])) {
        country = params?.slug[0];
    } else if (params?.slug) {
        page = params?.slug[0];
    }

    return { country, page };
}
