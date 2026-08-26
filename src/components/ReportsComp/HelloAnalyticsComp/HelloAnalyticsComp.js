import Image from 'next/image';

export default function HelloAnalyticsComp({ pageInfo, data }) {
    if (!data?.img) return null;

    return (
        <section className='hello_analytics_bg'>
            <div className='container flex justify-center py-6'>
                <Image
                    src={data?.img}
                    alt={data?.alt}
                    width={1920}
                    height={1280}
                    className='w-full h-auto object-contain'
                    loading='lazy'
                />
            </div>
        </section>
    );
}
