import { useState } from 'react';
import styles from './FeaturesAccordionComp.module.scss';

export default function FeaturesAccordionComp({ data }) {
    const [active, setActive] = useState(0);
    return (
        <>
            <section className='container cont cont_gap cont_p'>
                <div className='flex flex-col gap-1 cont_w'>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <p className='subheading'>{data?.subHeading}</p>
                </div>

                <div className='flex gap-12 items-center'>
                    <div className='w-full flex flex-col md:gap-2 my-auto gap-6'>
                        {data?.content?.map((item, index) => (
                            <div
                                className={`transition-all cursor-pointer lg:border-b py-3 cont gap-4 ${
                                    index === data?.content?.length - 1 ? 'border-b-0' : ''
                                }`}
                                key={index}
                                onClick={() => setActive(index)}
                            >
                                <h3 className='text-xl font-semibold text-primary'>{item.title}</h3>
                                <p
                                    className={`${styles.slideDescription} ${
                                        index === active ? styles.slideDescriptionActive : ''
                                    } text-md text-gray-500`}
                                >
                                    {item.description}
                                </p>
                                <img
                                    className='w-full h-fit max-w-[400px] object-contain lg:hidden'
                                    src={item?.img}
                                    alt='bot'
                                />
                            </div>
                        ))}
                    </div>
                    <img
                        className='lg:w-1/2 xl:w-1/3 h-fit lg:block hidden'
                        src={data?.content?.[active]?.img}
                        alt='bot'
                    />
                </div>
            </section>
        </>
    );
}
