import { useRouter } from 'next/router';

export default function getRelativeURL(link, type) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');
    if (type === 'pricing') {
        pathArray.splice(2, 0, 'pricing');
    } else pathArray[pathArray.length - 1] = link;
    const relativeURL = pathArray.join('/');

    return relativeURL;
}
