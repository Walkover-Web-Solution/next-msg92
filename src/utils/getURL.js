import { useRouter } from 'next/router';
import availableCountries from '@/data/availableCountries.json';
export default function getRelativeURL(type, link) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');

    const notGobal = availableCountries.some((country) => country.shortname.toLowerCase() === pathArray[1]);

    let relativeURL = '/';

    return relativeURL;
}
