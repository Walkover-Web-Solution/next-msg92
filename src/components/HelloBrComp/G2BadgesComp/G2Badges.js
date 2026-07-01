import Image from 'next/image';

export default function G2Badges({ data }) {
    if (!data?.badges?.length) return null;

    return (
        <section className='bg-stone-50'>
            <div className='container cont_p py-16 lg:py-20'>
                <div className='cont mx-auto flex max-w-5xl flex-col items-center gap-10 text-center md:gap-12'>
                    {data?.heading && (
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>{data.heading}</h2>
                    )}

                    <ul className='flex flex-wrap items-center justify-center gap-6 md:gap-8'>
                        {data.badges.map((badge, index) => (
                            <li key={index}>
                                <Image
                                    src={badge.src}
                                    alt={badge.alt}
                                    width={140}
                                    height={168}
                                    className='h-24 w-auto md:h-28'
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
