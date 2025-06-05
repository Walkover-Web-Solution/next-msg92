import Image from 'next/image';
import { LinkText } from '../UIComponent/Buttons/LinkButton';
import Link from 'next/link';

export default function CaseStudyComp({ data, pageInfo }) {
    //tag filter
    const tag = pageInfo?.pathArray[1] === 'tag' && pageInfo?.pathArray[2];
    let caseStudies = [];
    if (tag) {
        caseStudies = data?.caseStudies?.content.filter((caseStudy) => caseStudy?.tags?.some((t) => t?.slug === tag));
    } else {
        caseStudies = data?.caseStudies?.content;
    }

    return (
        <div className=''>
            <div className='container flex py-12 flex-col gap-6'>
                <h1 className='text-5xl font-bold'>{data?.heading}</h1>
                <p className='text-lg'>{data?.subheading}</p>
            </div>
            <div className='bg-gray'>
                <div className='container py-12 flex flex-col gap-8'>
                    <h2 className='text-3xl font-semibold'>{data?.caseStudies?.heading}</h2>
                    <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10'>
                        {caseStudies?.map((caseStudy, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={`/case-studies/${caseStudy?.slug}`}
                                    className='flex flex-col gap-6 rounded p-6 bg-white LinkButtonCard '
                                >
                                    <Image
                                        src={`/assets/case-studies/${caseStudy?.slug}.png`}
                                        width={400}
                                        height={400}
                                        alt={caseStudy?.slug}
                                        className='h-[50px] w-fit '
                                    />
                                    <h3 className='text-xl font-medium'>{caseStudy?.title}</h3>
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: caseStudy?.caseStudies }}></div>
                                    </div>

                                    <div className='flex flex-wrap  gap-2'>
                                        {caseStudy?.tags?.map((tag, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className='bg-gray-100 px-2 py-1 rounded-full text-gray-600'
                                                >
                                                    {tag?.name}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <LinkText customClasses={'mt-auto'}>Learn More</LinkText>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
