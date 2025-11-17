import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useLottie } from 'lottie-react';
import styles from './LottiePlayer.module.scss';

export default function LottiePlayer({ lottie, className = '' }) {
    const containerRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [animationData, setAnimationData] = useState(null);

    const lottieCache = useMemo(() => new Map(), []);

    // 🔥 Lazy-load Lottie only when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // 🔥 Download JSON only when needed
    useEffect(() => {
        if (!shouldLoad || !lottie) return;

        if (lottieCache.has(lottie)) {
            setAnimationData(lottieCache.get(lottie));
            return;
        }

        fetch(lottie, { cache: 'force-cache' })
            .then((res) => res.json())
            .then((json) => {
                lottieCache.set(lottie, json);
                setAnimationData(json);
            })
            .catch((err) => console.error(err));
    }, [shouldLoad, lottie, lottieCache]);

    const options = useMemo(
        () => ({
            animationData,
            loop: true,
            autoplay: true,
            rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        }),
        [animationData]
    );

    const { View } = useLottie(options);

    return (
        <div ref={containerRef} className={`${styles.lottie_animation} ${className}`} aria-hidden='true'>
            {animationData ? View : null}
        </div>
    );
}
