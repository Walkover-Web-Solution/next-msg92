import React, { useEffect, useState, useMemo } from 'react';
import { useLottie } from 'lottie-react';
import styles from './LottiePlayer.module.scss';

export default function LottiePlayer({ lottie, className = '' }) {
    const [animationData, setAnimationData] = useState(null);

    // ✅ Cache animation JSONs in memory (avoid refetch)
    const lottieCache = useMemo(() => new Map(), []);

    useEffect(() => {
        let isMounted = true;

        const fetchLottieData = async () => {
            if (!lottie) return;

            // ✅ Use cached version if available
            if (lottieCache.has(lottie)) {
                setAnimationData(lottieCache.get(lottie));
                return;
            }

            try {
                const response = await fetch(lottie, { cache: 'force-cache' });
                const animationJson = await response.json();

                // ✅ Cache in memory and browser
                lottieCache.set(lottie, animationJson);
                if (isMounted) setAnimationData(animationJson);
            } catch (error) {
                console.error('Error loading Lottie animation:', error);
            }
        };

        fetchLottieData();

        return () => {
            isMounted = false;
        };
    }, [lottie, lottieCache]);

    const options = useMemo(
        () => ({
            animationData,
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet',
                progressiveLoad: true,
            },
        }),
        [animationData]
    );

    const { View } = useLottie(options);

    return (
        <div className={`${styles.lottie_animation} ${className}`} aria-hidden='true'>
            {animationData ? View : null}
        </div>
    );
}
