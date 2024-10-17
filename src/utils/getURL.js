import { useRouter } from 'next/router';
import availableCountries from '@/data/availableCountries.json';
export default function getURL(type, link) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');
    console.log('🚀 ~ getURL ~ pathArray:', pathArray);

    const notGobal = availableCountries.some((country) => country.shortname.toLowerCase() === pathArray[1]);

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

        default:
            pathArray[pathArray.length - 1] = link;
            url = pathArray.join('/');
            break;
    }

    return process.env.NEXT_PUBLIC_BASE_URL + url;
}
