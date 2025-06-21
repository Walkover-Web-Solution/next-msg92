"use client"
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import styles from './LottiePlayer.module.scss';

export default function LottiePlayer({ lottie }) {
    const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
        const fetchLottieData = async () => {
            if (lottie) {
                try {
                    const response = await fetch(lottie);
                    const animationJson = await response.json();
                    const lottieOptions = {
                        loop: true,
                        autoplay: true,
                        animationData: animationJson,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    };
                    setAnimationData(lottieOptions);
                } catch (error) {
                    console.error('Error loading Lottie animation:', error);
                }
            }
        };

        fetchLottieData();
    }, [lottie]);
    if (animationData) {
        return (
            <div className={styles.lottie_animation}>
                <Lottie options={animationData} />
            </div>
        );
    }
}
