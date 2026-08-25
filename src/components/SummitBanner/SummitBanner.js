import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './SummitBanner.module.scss';

const EVENT_TIME = new Date('2026-09-05T18:30:00+05:30').getTime();

const padValue = (val) => String(Math.max(0, val)).padStart(2, '0');

export default function SummitBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const forcePreview = searchParams.get('preview_banner') === 'true' || searchParams.get('indore') === 'true';

        if (forcePreview) {
            try {
                sessionStorage.removeItem('msg91SummitBannerClosed');
            } catch (e) {}
            setIsVisible(true);
            return;
        }

        if (process.env.NODE_ENV === 'production') {
            try {
                if (sessionStorage.getItem('msg91SummitBannerClosed') === '1') {
                    return;
                }
            } catch (e) {}
        }

        const indoreLocalities = [
            'indore',
            'ahirkheri',
            'rau',
            'mhow',
            'sanwer',
            'hatod',
            'mangliya',
            'bicholi',
            'kanadia',
        ];

        const isIndoreInIndia = (city, country, region) => {
            const normCity = (city || '').trim().toLowerCase();
            const normRegion = (region || '').trim().toLowerCase();
            const normCountry = (country || '').trim().toUpperCase();
            const isIndia = normCountry === 'IN' || normCountry === 'IND' || normCountry === 'INDIA';
            const isIndore = indoreLocalities.some((loc) => normCity.includes(loc) || normRegion.includes(loc));
            return isIndia && isIndore;
        };

        const evaluateAndShow = (city, country, region) => {
            const matches = isIndoreInIndia(city, country, region);
            if (process.env.NODE_ENV !== 'production') {
                console.log('[SummitBanner] Geo Detected:', { city, country, region, matches });
            }
            if (matches) {
                setIsVisible(true);
            }
        };

        try {
            const cachedGeo = sessionStorage.getItem('msg91_user_geo');
            if (cachedGeo) {
                const { city, country, region } = JSON.parse(cachedGeo);
                evaluateAndShow(city, country, region);
                return;
            }
        } catch (e) {}

        const saveGeoAndCheck = (city, country, region) => {
            try {
                sessionStorage.setItem('msg91_user_geo', JSON.stringify({ city, country, region }));
            } catch (e) {}
            evaluateAndShow(city, country, region);
        };

        fetch('https://get.geojs.io/v1/ip/geo.json')
            .then((res) => res.json())
            .then((data) => {
                const city = data?.city || '';
                const region = data?.region || '';
                const country = data?.country_code || data?.country || '';
                if (city || region) {
                    saveGeoAndCheck(city, country, region);
                } else {
                    throw new Error('no data');
                }
            })
            .catch(() => {
                fetch('https://ipwho.is/')
                    .then((res) => res.json())
                    .then((data) => {
                        const city = data?.city || '';
                        const region = data?.region || '';
                        const country = data?.country_code || data?.country || '';
                        if (city || region) {
                            saveGeoAndCheck(city, country, region);
                        } else {
                            throw new Error('no data');
                        }
                    })
                    .catch(() => {
                        fetch('https://api.db-ip.com/v2/free/self')
                            .then((res) => res.json())
                            .then((data) => {
                                const city = data?.city || '';
                                const region = data?.stateProv || data?.region || '';
                                const country = data?.countryCode || data?.countryName || '';
                                if (city || region) {
                                    saveGeoAndCheck(city, country, region);
                                }
                            })
                            .catch(() => {});
                    });
            });
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const updateCountdown = () => {
            const difference = EVENT_TIME - Date.now();
            if (difference <= 0) {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                return;
            }
            setTimeLeft({
                days: padValue(Math.floor(difference / 86400000)),
                hours: padValue(Math.floor((difference % 86400000) / 3600000)),
                minutes: padValue(Math.floor((difference % 3600000) / 60000)),
                seconds: padValue(Math.floor((difference % 60000) / 1000)),
            });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);
        return () => clearInterval(timer);
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        try {
            sessionStorage.setItem('msg91SummitBannerClosed', '1');
        } catch (e) {}
    };

    if (!isVisible) return null;

    return (
        <div
            id='msg91-summit-banner'
            className={styles.summitBannerWrapper}
            role='region'
            aria-label='MSG91 E-Commerce Summit'
        >
            <div className='container'>
                <div className={styles.bannerCard}>
                <button
                    type='button'
                    className={styles.bannerClose}
                    id='msg91SummitClose'
                    aria-label='Close event banner'
                    onClick={handleClose}
                >
                    &times;
                </button>

                <div className={styles.bannerMain}>
                    <div className={styles.bannerEyebrow}>MSG91 E-Commerce Summit</div>
                    <h2 className={styles.bannerTitle}>
                        Shopify Store Owners<span>Join Us in Indore.</span>
                    </h2>
                    <div className={styles.bannerPerks}>
                        <span>Invite Only</span>
                        <span className={styles.bannerDot}></span>
                        <span>Free Entry</span>
                        <span className={styles.bannerDot}></span>
                        <span>High Tea</span>
                    </div>
                </div>

                <div className={styles.bannerDetails}>
                    <div className={styles.bannerDate}>05 September 2026</div>
                    <div className={styles.bannerTime}>6:30 PM onwards</div>
                    <div className={styles.bannerLocation}>
                        <a
                            href='https://www.google.com/maps/place/Walkover/@22.7469512,75.8929134,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fd37c63496b9:0xf190bda9147f9d62!8m2!3d22.7469512!4d75.8929134!16s%2Fg%2F1hm34wlnl?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Walkover Office, Indore &#8599;
                        </a>
                        <div className={styles.bannerCity}>Indore, Madhya Pradesh</div>
                    </div>
                </div>

                <div className={styles.bannerAction}>
                    <div className={styles.countdownWrap}>
                        <div className={styles.countdownLabel}>Starts In</div>
                        <div className={styles.countdown}>
                            <div className={styles.countItem}>
                                <span className={styles.countNumber} id='msg91Days'>
                                    {timeLeft.days}
                                </span>
                                <span className={styles.countUnit}>Days</span>
                            </div>
                            <span className={styles.countSeparator}>:</span>
                            <div className={styles.countItem}>
                                <span className={styles.countNumber} id='msg91Hours'>
                                    {timeLeft.hours}
                                </span>
                                <span className={styles.countUnit}>Hrs</span>
                            </div>
                            <span className={styles.countSeparator}>:</span>
                            <div className={styles.countItem}>
                                <span className={styles.countNumber} id='msg91Minutes'>
                                    {timeLeft.minutes}
                                </span>
                                <span className={styles.countUnit}>Mins</span>
                            </div>
                            <span className={styles.countSeparator}>:</span>
                            <div className={styles.countItem}>
                                <span className={styles.countNumber} id='msg91Seconds'>
                                    {timeLeft.seconds}
                                </span>
                                <span className={styles.countUnit}>Secs</span>
                            </div>
                        </div>
                    </div>
                    <Link
                        className={styles.bannerCta}
                        href='/event-registration'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <span>Reserve Your Seat</span>
                        <span className={styles.bannerArrow}>&rarr;</span>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}
