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
                <div className='flex gap-2'>
                    <div className='w-full flex flex-col gap-2 my-auto'>
                        {data?.content?.map((item, index) => (
                            <div
                                className={`transition-all cursor-pointer border-b py-3 ${
                                    index === data?.content?.length - 1 ? 'border-b-0' : ''
                                }`}
                                key={index}
                                onClick={() => {
                                    setActive(index);
                                }}
                            >
                                <h3 className='text-xl font-semibold text-primary'>{item.title}</h3>
                                <p
                                    className={`${styles.slideDescription} ${
                                        index === active ? styles.slideDescriptionActive : ''
                                    } text-md text-gray-500`}
                                >
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='w-full ratio-square h-[500px] bg-[var(--hello-lite-color)] rounded-lg border'></div>
                </div>
            </section>
        </>
    );
}
