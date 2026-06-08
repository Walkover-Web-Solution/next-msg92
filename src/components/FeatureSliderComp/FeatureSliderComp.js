import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdOutlineLightbulb, MdShield } from 'react-icons/md';
import styles from './FeatureSliderComp.module.scss';

const autoPlayInterval = 2500;

function FeatureMedia({ feature }) {
    if (feature?.video) {
        return (
            <div className={styles.mediaWrap}>
                <video
                    className='h-full w-full object-contain'
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={feature.name}
                >
                    <source src={feature.video} type='video/webm' />
                </video>
            </div>
        );
    }

    if (feature?.icon) {
        return (
            <div className={`relative ${styles.mediaWrap}`}>
                <Image
                    src={feature.icon}
                    alt={feature.name}
                    fill
                    className='object-contain'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    loading='lazy'
                />
            </div>
        );
    }

    return (
        <div className='flex h-full w-full items-center justify-center'>
            <span className='flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
                <MdShield className='h-10 w-10' aria-hidden />
            </span>
        </div>
    );
}

function FeatureSlide({ feature }) {
    return (
        <div className='w-full shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'>
            <div className={`flex h-full flex-col p-5 ${styles.card}`}>
                <div
                    className={`relative mb-5 aspect-[16/10] w-full select-none overflow-hidden rounded-2xl ${styles.graphicArea}`}
                >
                    <FeatureMedia feature={feature} />
                </div>
                <h3 className='mb-2 text-lg font-bold text-slate-900'>{feature.name}</h3>
                <p className='flex-grow text-sm leading-relaxed text-slate-500'>{feature.content}</p>
            </div>
        </div>
    );
}

export default function FeatureSliderComp({ data }) {
    const trackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const features = data?.features ?? [];
    const totalSlides = features.length;
    const lastIndex = Math.max(0, totalSlides - 1);

    const goToSlide = (index) => {
        const track = trackRef.current;
        const slide = track?.children[index];
        if (!slide) return;

        slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        setCurrentIndex(index);
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track?.children.length) return;

        let closestIndex = 0;
        let closestDistance = Infinity;

        Array.from(track.children).forEach((slide, index) => {
            const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setCurrentIndex(closestIndex);
    };

    useEffect(() => {
        if (features.length <= 1 || isPaused) return;

        const timer = setInterval(() => {
            goToSlide(currentIndex >= lastIndex ? 0 : currentIndex + 1);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIndex, isPaused, lastIndex, features.length]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'ArrowLeft') goToSlide(Math.max(0, currentIndex - 1));
            if (event.key === 'ArrowRight') goToSlide(Math.min(lastIndex, currentIndex + 1));
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentIndex, lastIndex]);

    if (!data || totalSlides === 0) return null;

    const arrowBtnClass = (disabled) =>
        `absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-md transition-all duration-200 hover:scale-105 hover:text-emerald-600 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12`;

    return (
        <section className='bg-neutral'>
            <div className='container py-12 sm:py-20'>
                <div className='mb-10 text-center md:mb-14'>
                    {data.heading && (
                        <h2 className='text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl md:text-4xl'>
                            {data.heading}
                        </h2>
                    )}
                    {data.subheading && (
                        <p className='mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base'>{data.subheading}</p>
                    )}
                </div>

                <div
                    className='group relative px-1 sm:px-4'
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className='overflow-hidden rounded-2xl'>
                        <div
                            ref={trackRef}
                            className={`flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth ${styles.track}`}
                            onScroll={handleScroll}
                        >
                            {features.map((feature, index) => (
                                <FeatureSlide key={`${feature.name}-${index}`} feature={feature} />
                            ))}
                        </div>
                    </div>

                    <button
                        type='button'
                        className={`${arrowBtnClass(currentIndex === 0)} -left-2 sm:-left-6`}
                        onClick={() => goToSlide(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        aria-label='Previous feature'
                    >
                        <MdChevronLeft className='text-sm sm:text-base' aria-hidden />
                    </button>

                    <button
                        type='button'
                        className={`${arrowBtnClass(currentIndex === lastIndex)} -right-2 sm:-right-6`}
                        onClick={() => goToSlide(currentIndex + 1)}
                        disabled={currentIndex === lastIndex}
                        aria-label='Next feature'
                    >
                        <MdChevronRight className='text-sm sm:text-base' aria-hidden />
                    </button>
                </div>

                <div className='mt-8 flex flex-col items-center gap-4'>
                    <div className='flex items-center space-x-2' role='tablist' aria-label='Feature slides'>
                        {features.map((feature, index) => (
                            <button
                                key={index}
                                type='button'
                                role='tab'
                                aria-selected={index === currentIndex}
                                aria-label={`Go to ${feature.name}`}
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'w-6 bg-emerald-600'
                                        : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                                }`}
                            />
                        ))}
                    </div>

                    <div className='flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3.5 py-1.5 text-xs text-slate-400 shadow-sm'>
                        <MdOutlineLightbulb className='text-emerald-500' aria-hidden />
                        <span>Swipe, use arrow keys, or click indicators to explore more.</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
