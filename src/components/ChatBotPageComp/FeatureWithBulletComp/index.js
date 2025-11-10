import Image from 'next/image';
import { MdArrowRightAlt } from 'react-icons/md';

export default function FeatureWithBulletComp({ data, index }) {
    return (
        <section key={index}>
            <div className={`container cont cont_gap cont_p`}>
                <div className='flex flex-col gap-1 cont_w'>
                    <span className='text-lg uppercase text-[var(--hello-dark-color)] font-bold'>{data?.tagline}</span>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <p className='text-lg text-gray-500 '>{data?.subHeading}</p>
                </div>
                <div
                    className={`cont_gap gap-12 flex items-center ${
                        index % 2 === 0 ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'
                    }`}
                >
                    <Image
                        width={600}
                        height={600}
                        className='w-full h-fit max-w-[500px]'
                        src={data?.img}
                        alt='Voice Bot'
                        loading='lazy'
                    />
                    <div className='w-full cont gap-6 justify-center '>
                        {data?.content.map((feature, i) => (
                            <div className='flex gap-3' key={i}>
                                <MdArrowRightAlt className='text-2xl' />
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-700'>{feature.title}</h3>
                                    <p className='text-gray-500 max-w-[600px]'>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
