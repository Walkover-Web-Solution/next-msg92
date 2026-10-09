import { useEffect, useRef } from 'react';

export default function WhatsAppProblemSolutionComp({ pageInfo, data }) {
    if (!data) return null;

    const videoSrc = data?.video;
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(() => {});
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }
            },
            { threshold: 0.25 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section ref={containerRef} className={`w-full ${data?.bg} overflow-hidden`}>
            <div className='container cont_p flex flex-col gap-8 lg:gap-10 items-center'>
                {data?.heading_prefix && (
                    <div className='text-center flex flex-col gap-3 max-w-4xl mx-auto'>
                        <h2 className='heading'>
                            {data?.heading_prefix}
                            <span className='text-whatsappChat-primary'>{data?.heading_accent}</span>
                            {data?.heading_suffix}
                        </h2>

                        {data?.subheading && <p className='subheading max-w-2xl mx-auto'>{data?.subheading}</p>}
                    </div>
                )}

                {videoSrc && (
                    <div className='w-full max-w-5xl rounded-xl overflow-hidden shadow-md bg-white border border-slate-200'>
                        <video
                            ref={videoRef}
                            className='w-full h-auto object-cover block'
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={data?.heading_prefix}
                        >
                            <source src={videoSrc} type='video/webm' />
                        </video>
                    </div>
                )}
            </div>
        </section>
    );
}
