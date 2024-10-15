import Image from 'next/image';

export default function FeatureComp({ data }) {
    return (
        <>
            <div className='bg-neutral'>
                <div className='container py-20 flex flex-col gap-6'>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <div className='grid grid-cols-2 md:gap-12 gap-6'>
                        {data?.features?.map((feature, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`lg:p-12 p-6 bg-white border flex items-center overflow-hidden gap-1 rounded ${
                                        (index + 1) % 3 === 0
                                            ? 'flex flex-col md:flex-row col-span-2'
                                            : 'flex flex-col lg:flex-col  md:flex-row lg:col-span-1 col-span-2'
                                    }`}
                                >
                                    <div className='flex flex-col gap-2'>
                                        {feature?.icon && (
                                            <Image src={feature?.icon} alt={feature?.name} width={40} height={40} />
                                        )}

                                        <h3 className='text-2xl font-semibold'>{feature?.name}</h3>
                                        <div
                                            className='text-lg'
                                            dangerouslySetInnerHTML={{ __html: feature?.content }}
                                        ></div>
                                    </div>
                                    <Image
                                        src={feature?.img}
                                        alt={feature?.name}
                                        className='w-full xl:max-w-[500px] lg:max-w-[400px] max-w-[200px] mx-12'
                                        width={420}
                                        height={420}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
