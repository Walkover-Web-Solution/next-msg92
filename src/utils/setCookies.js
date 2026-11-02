import { getCookie, setCookie, setUtm, sanitizeMsg91QuerySearch } from '@/utils/utilis';
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
            const sanitized = sanitizeMsg91QuerySearch(search);
            if (sanitized) {
                setCookie('msg91_query', sanitized, 30);
            }
        } else if (plugin) {
            setCookie('msg91_query', `?utm_campaign=tigerplugin&utm_source=${plugin}&utm_medium=website`, 30); //By Hardik
        }
        setUtm();
    }, []);
}
