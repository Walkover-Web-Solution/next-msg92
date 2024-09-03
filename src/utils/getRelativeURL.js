import { useRouter } from 'next/router';

export default function getRelativeURL(link) {
    const router = useRouter();
    const rawPath = router.asPath;
    const pathArray = rawPath.split('?')[0].split('/');
    pathArray[pathArray.length - 1] = link;
    const relativeURL = pathArray.join('/');

    return relativeURL;
}
