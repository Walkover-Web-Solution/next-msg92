import Image from 'next/image';

const bentoSpans = [
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-6',
    'md:col-span-2 md:flex md:justify-center lg:col-span-12',
];

function FeatureMedia({ feature }) {
    if (feature?.video) {
        return (
            <video
                className='absolute inset-0 h-full w-full object-contain p-2'
                autoPlay
                muted
                loop
                playsInline
                aria-label={feature.name}
            >
                <source src={feature.video} type='video/webm' />
            </video>
        );
    }

    if (feature?.icon) {
        return (
            <Image
                src={feature.icon}
                alt={feature.name}
                fill
                className='object-contain p-2'
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading='lazy'
            />
        );
    }

    return null;
}

function FeatureCard({ feature, compact = false }) {
    const hasMedia = feature?.video || feature?.icon;

    if (compact) {
        return (
            <div className='flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center hover:shadow-lg transition-shadow'>
                <h3 className='text-lg font-semibold text-gray-900'>{feature.name}</h3>
                <p className='max-w-3xl text-sm leading-relaxed text-gray-600'>{feature.content}</p>
            </div>
        );
    }

    return (
        <div className='flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-lg transition-shadow'>
            {hasMedia && (
                <div className='relative mb-4 aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-neutral'>
                    <FeatureMedia feature={feature} />
                </div>
            )}
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold text-gray-900'>{feature.name}</h3>
                <p className='text-sm leading-relaxed text-gray-600'>{feature.content}</p>
            </div>
        </div>
    );
}

export default function GridFeatureComp({ data }) {
    if (!data || !data.features?.length) return null;

    const isBento = data?.layout === 'bento';

    return (
        <div className='bg-neutral'>
            <div className='container flex flex-col gap-10 py-20'>
                {data?.heading && <h2 className='text-center text-3xl font-bold'>{data.heading}</h2>}
                {data?.subheading && (
                    <p className='mx-auto max-w-3xl text-center text-lg text-gray-600'>{data.subheading}</p>
                )}

                {isBento ? (
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12'>
                        {data.features.map((feature, index) => {
                            const isCompact = !feature?.video && !feature?.icon;
                            return (
                                <div key={index} className={bentoSpans[index] || 'lg:col-span-4'}>
                                    <div
                                        className={
                                            isCompact
                                                ? 'w-full md:max-w-[calc((100%-1.25rem)/2)] lg:max-w-none'
                                                : 'w-full'
                                        }
                                    >
                                        <FeatureCard feature={feature} compact={isCompact} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {data.features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} compact={!feature?.video && !feature?.icon} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
