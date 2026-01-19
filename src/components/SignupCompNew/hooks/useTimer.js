import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for countdown timer
 * @param {number} initialTime - Initial countdown time in seconds
 * @param {boolean} autoStart - Whether to start timer automatically
 * @returns {Object} Timer state and controls
 */
export function useTimer(initialTime = 30, autoStart = false) {
    const [timer, setTimer] = useState(initialTime);
    const [isActive, setIsActive] = useState(autoStart);
    const timerIdRef = useRef(null);

    useEffect(() => {
        if (isActive && timer > 0) {
            timerIdRef.current = setInterval(() => {
                setTimer((prevTime) => {
                    if (prevTime <= 1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        }

        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        };
    }, [isActive, timer]);

    const startTimer = (time = initialTime) => {
        setTimer(time);
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
        }
    };

    const resetTimer = (time = initialTime) => {
        stopTimer();
        setTimer(time);
    };

    const isExpired = timer === 0;

    return {
        timer,
        isActive,
        isExpired,
        startTimer,
        stopTimer,
        resetTimer,
    };
}
