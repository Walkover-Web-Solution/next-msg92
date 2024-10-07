import { useRouter } from 'next/router';
import availableCountries from '@/data/availableCountries.json';
export default function getRelativeURL(link, type) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');

    // find id the country is global
    const notGobal = availableCountries.some((country) => country.shortname.toLowerCase() === pathArray[1]);

    let relativeURL = '/';
    if (notGobal) {
        switch (type) {
            case 'product':
                if (pathArray.length > 2) {
                    pathArray[pathArray.length - 1] = link;
                    relativeURL = pathArray.join('/');
                    console.log('🚀 ~ getRelativeURL ~ relativeURL:', relativeURL);
                }
                break;

            case 'pricing':
                if (pathArray.length > 2) {
                    pathArray.splice(2, 1);
                    pathArray[pathArray.length - 1] = link;
                    relativeURL = pathArray.join('/');
                }
                break;

            case 'country':
                pathArray[1] = link;
                relativeURL = pathArray.join('/');
                break;

            default:
                pathArray[pathArray.length - 1] = link;
                relativeURL = pathArray.join('/');
                break;
        }
    } else {
        switch (type) {
            case 'product':
                if (pathArray.length > 1) {
                    pathArray.splice(1, 1);
                    pathArray[pathArray.length - 1] = link;
                    relativeURL = pathArray.join('/');
                }
                break;

            case 'country':
                pathArray.splice(1, 0, link);
                relativeURL = pathArray.join('/');
                break;

            default:
                pathArray[pathArray.length - 1] = link;
                relativeURL = pathArray.join('/');
                break;
        }
    }
    return relativeURL;
}
