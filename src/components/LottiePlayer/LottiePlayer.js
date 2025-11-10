import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';
import styles from './LottiePlayer.module.scss';

export default function LottiePlayer({ lottie }) {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        const fetchLottieData = async () => {
            if (lottie) {
                try {
                    const response = await fetch(lottie);
                    const animationJson = await response.json();
                    setAnimationData(animationJson);
                } catch (error) {
                    console.error('Error loading Lottie animation:', error);
                }
            }
        };

        fetchLottieData();
    }, [lottie]);

    const options = {
        animationData: animationData,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);

    if (animationData) {
        return <div className={styles.lottie_animation}>{View}</div>;
    }

    return null;
}
