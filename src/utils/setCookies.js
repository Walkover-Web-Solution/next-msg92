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
        if (search.includes('utm_')) {
            setCookie('msg91_query', search.replace(/service=\w+&?/, ''), 30); // If utm exists
        } else if (plugin) {
            setCookie('msg91_query', `?utm_campaign=tigerplugin&utm_source=${plugin}&utm_medium=website`, 30); //By Hardik
        }
        setUtm();
    }, []);
}
