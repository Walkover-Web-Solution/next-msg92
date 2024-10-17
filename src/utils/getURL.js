import { useRouter } from 'next/router';
import availableCountries from '@/data/availableCountries.json';
export default function getURL(type, link) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');
    console.log('🚀 ~ getURL ~ pathArray:', pathArray);

    const country = availableCountries.find((country) => {
        return country.shortname.toLowerCase() === pathArray[1];
    });
    console.log('🚀 ~ getURL ~ country:', country);
    const notGobal = Boolean(country);
    console.log('🚀 ~ getURL ~ notGobal:', notGobal);

    let url = '/';
    switch (type) {
        case 'country':
            if (notGobal) {
                pathArray[1] = link;
            } else {
                pathArray.splice(1, 0, link);
            }
            url = pathArray.join('/');
            break;

        case 'product':
            if (notGobal) {
                pathArray[1] = link;
            } else {
                pathArray.splice(1, 0, link);
            }
            url = pathArray.join('/');
            break;

        case 'pricing':
            if (notGobal) {
                pathArray[1] = link;
            } else {
                pathArray.splice(1, 0, link);
            }
            url = pathArray.join('/');
            break;

        default:
            pathArray[pathArray.length - 1] = link;
            url = pathArray.join('/');
            break;
    }

    return process.env.NEXT_PUBLIC_BASE_URL + url;
}
