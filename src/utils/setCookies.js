import { getCookie, setCookie, setUtm } from '@/utils/utilis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function handleBrawserCookies() {
    let plugin;
    const router = useRouter();
    const browserPath = router.asPath;
    if (browserPath.includes('partners-and-integrations')) {
        plugin = browserPath.split('/')[2];
    }

    useEffect(() => {
        const search = window.location.search;
        if (search) {
            setCookie('msg91_query', search, 30);
        } else if (plugin) {
            setCookie('msg91_query', `?utm_campaign=tigerplugin&utm_source=${plugin}&utm_medium=website`, 30); //By Hardik
        }
        setUtm();
    }, []);
}
