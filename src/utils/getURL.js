import { useRouter } from 'next/router';
import slugs from '@/data/specialPages.json';

export default function getURL(type, link) {
    const router = useRouter();
    const rawPath = router.asPath;
    let pathArray = rawPath.split('?')[0].split('/');
    const pathLength = pathArray?.length || 0;
    const currentCountry = slugs?.countries?.includes(pathArray[1]) ? pathArray[1] : null;
    const isGobal = currentCountry === null;

    let page = pathArray[2];
    switch (pathLength) {
        case 2: {
            if (isGobal) {
                page = slugs?.products?.includes(pathArray[1]) ? pathArray[1] : null;
            } else {
                page = slugs?.products?.includes(pathArray[2]) ? pathArray[2] : null;
            }
            break;
        }
        case 3: {
            if (pathArray.includes('pricing')) {
                pathArray.splice(pathArray.indexOf('pricing'), 1);
            }
            if (isGobal) {
                page = slugs?.products?.includes(pathArray[1]) ? pathArray[1] : null;
            } else {
                page = slugs?.products?.includes(pathArray[2]) ? pathArray[2] : null;
            }
            break;
        }
        case 4: {
            if (pathArray.includes('pricing')) {
                pathArray.splice(pathArray.indexOf('pricing'), 1);
            }
            if (isGobal) {
                page = slugs?.products?.includes(pathArray[1]) ? pathArray[1] : null;
            } else {
                page = slugs?.products?.includes(pathArray[2]) ? pathArray[2] : null;
            }
            break;
        }
    }

    let url = '/';
    switch (type) {
        case 'country':
            if (isGobal) {
                pathArray.splice(1, 0, link);
            } else {
                pathArray[1] = link;
            }
            url = pathArray.join('/');
            break;

        case 'product':
            if (isGobal) {
                pathArray = ['', link];
            } else {
                pathArray = ['', currentCountry, link];
            }
            url = pathArray.join('/');
            break;

        case 'pricing':
            if (isGobal) {
                pathArray = ['', 'pricing', link];
            } else {
                pathArray = ['', currentCountry, 'pricing', link];
            }
            url = pathArray.join('/');
            break;

        case 'terms':
            pathArray = ['', link];
            url = pathArray.join('/');
            break;

        default:
            url = pathArray.join('/');
            break;
    }

    return process.env.NEXT_PUBLIC_BASE_URL + url;
}
