import Image from 'next/image';

export default function GridFeatureComp({ data }) {
    if (!data || !data.features?.length) return null;

    return (
        <div className='bg-neutral'>
            <div className='container py-20 flex flex-col gap-10'>
                {data?.heading && <h2 className='text-3xl font-bold text-center'>{data.heading}</h2>}
                {data?.subheading && (
                    <p className='text-center text-lg text-gray-600 max-w-3xl mx-auto'>{data.subheading}</p>
                )}
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
                    {data.features.map((feature, index) => (
                        <div
                            key={index}
                            className='flex flex-col gap-3 p-6 bg-white rounded-lg border hover:shadow-md transition-shadow'
                        >
                            {feature?.icon && (
                                <Image src={feature.icon} alt={feature.name} width={48} height={48} loading='lazy' />
                            )}
                            <h3 className='text-lg font-semibold'>{feature.name}</h3>
                            <p className='text-gray-600 text-sm leading-relaxed'>{feature.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
