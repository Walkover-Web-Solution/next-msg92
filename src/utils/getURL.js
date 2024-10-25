import { useRouter } from 'next/router';
import slugs from '@/data/specialPages.json';

export default function getURL(type, link) {
    const router = useRouter();
    const rawPath = router.asPath;
    let pathArray = rawPath.split('?')[0].split('/');
    let rowPathArray = rawPath.split('?')[0].split('/');
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
                rowPathArray.splice(1, 0, link);
            } else {
                rowPathArray[1] = link;
                console.log('🚀 ~ getURL ~ pathArray:', pathArray);
            }
            url = rowPathArray.join('/');
            break;

        case 'product':
            if (isGobal) {
                rowPathArray = ['', link];
            } else {
                rowPathArray = ['', currentCountry, link];
            }
            url = rowPathArray.join('/');
            break;

        case 'pricing':
            if (isGobal) {
                rowPathArray = ['', 'pricing', link];
            } else {
                rowPathArray = ['', currentCountry, 'pricing', link];
            }
            url = rowPathArray.join('/');
            break;

        case 'terms':
            rowPathArray = ['', link];
            url = rowPathArray.join('/');
            break;

        case 'signup':
            url = '/signup' + '?utm_source=' + link + '&source=msg91';
            break;

        default:
            url = rowPathArray.join('/');
            break;
    }

    return process.env.BASE_URL + url;
}
