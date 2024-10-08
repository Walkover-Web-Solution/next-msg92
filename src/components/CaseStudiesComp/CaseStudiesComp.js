import Image from 'next/image';
import Link from 'next/link';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function CaseStudiesComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-20'>
                <div className='container flex flex-col gap-6 '>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>

                    <div className='grid grid-cols-4 lg:grid-rows-2 md:grid-rows-4 grid-rows-6  md:gap-10 gap-6 '>
                        {data?.casestudies?.length > 0 &&
                            data?.casestudies.map((caseStudy, index) => {
                                return (
                                    <Link
                                        href={caseStudy?.link}
                                        target='_blank'
                                        key={`${index}`}
                                        className={`flex bg-white rounded-lg overflow-hidden hover:shadow-lg LinkButtonCard ${
                                            index !== 0
                                                ? 'md:col-span-4 xl:col-span-2 row-span-2 lg:row-span-1 col-span-4 md:flex-row flex flex-col'
                                                : 'col-span-4 xl:col-span-2 row-span-2  col-span-4 flex flex-col'
                                        }`}
                                    >
                                        <div
                                            className={`flex  items-center justify-center
                                             ${
                                                 index !== 0
                                                     ? ' md:min-h-[200px] md:min-w-[300px] min-h-[300px] max-h-[300px]'
                                                     : 'flex-grow min-h-[300px] max-h-[300px]'
                                             }`}
                                            style={{
                                                backgroundImage: `url(${caseStudy?.img})`,
                                                backgroundPosition: 'center center',
                                                backgroundSize: 'cover',
                                            }}
                                        >
                                            <Image
                                                height={600}
                                                width={600}
                                                className='h-[60px] w-auto'
                                                src={caseStudy?.logo}
                                                alt={`Logo of ${caseStudy?.description}`}
                                            />
                                        </div>
                                        <div
                                            className={`${
                                                index !== 0
                                                    ? 'lg:p-8 md:p-6 p-4 flex flex-col gap-2'
                                                    : 'lg:p-8 md:p-6 p-4 flex flex-col gap-2'
                                            }`}
                                        >
                                            <p className='text-xl'>{caseStudy?.description}</p>
                                            <LinkText className='link-btn'>{data?.linkText}</LinkText>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
