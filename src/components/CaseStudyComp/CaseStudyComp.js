import Image from 'next/image';
import { LinkText } from '../UIComponent/Buttons/LinkButton';
import Link from 'next/link';
import { MdChevronLeft } from 'react-icons/md';

export default function CaseStudyComp({ data, pageInfo }) {
    //tag filter
    const tag = pageInfo?.pathArray[1] === 'tag' && pageInfo?.pathArray[2];
    let caseStudies = [];
    if (tag) {
        caseStudies = data?.caseStudies?.content.filter((caseStudy) => caseStudy?.tags?.some((t) => t?.slug === tag));
    } else {
        caseStudies = data?.caseStudies?.content;
    }

    //case study page data
    let caseStudy = data?.caseStudies?.content?.find((caseStudy) => {
        return caseStudy?.slug === pageInfo?.pathArray[1];
    });
    if (caseStudy) {
        return (
            <div>
                <div className='container flex flex-col gap-10 pb-16 pt-4'>
                    <div>
                        <a className='text-link' href='/case-studies'>
                            All Case Studies
                        </a>{' '}
                        /{' '}
                        <span className='font-medium underline underline-offset-2 text-link active-link'>
                            {caseStudy?.name}
                        </span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Image
                            src={`/assets/case-studies/${caseStudy?.slug}.png`}
                            width={100}
                            height={100}
                            alt={caseStudy?.slug}
                            className='h-[80px] max-w-3/4'
                        />
                        <h1 className='text-4xl font-bold md:w-2/3'>{caseStudy?.title}</h1>
                    </div>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>{data?.caseStudies?.headings?.industry}:</span>
                            <span>{caseStudy?.industry}</span>
                        </li>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>{data?.caseStudies?.headings?.purpose}:</span>
                            <span>{caseStudy?.purpose}</span>
                        </li>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>{data?.caseStudies?.headings?.features}:</span>
                            <span>{caseStudy?.features}</span>
                        </li>
                    </ul>
                </div>
                <div className='bg-gray'>
                    <div className='container flex flex-col gap-10 py-16'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${data?.caseStudies?.headings?.caseStudies} - ${caseStudy?.name}`}</h2>
                            <div className='text-lg' dangerouslySetInnerHTML={{ __html: caseStudy?.caseStudies }}></div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${data?.caseStudies?.headings?.problem}`}</h2>
                            <div className='text-lg' dangerouslySetInnerHTML={{ __html: caseStudy?.problem }}></div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold text-2xl'>{`${data?.caseStudies?.headings?.solution}`}</h2>
                            <div
                                className='text-lg'
                                dangerouslySetInnerHTML={{ __html: caseStudy?.solution?.description }}
                            ></div>
                            <ul className='list-disc flex flex-col gap-2 text-lg'>
                                {caseStudy?.solution?.content?.length > 0 &&
                                    caseStudy?.solution?.content?.map((solution, index) => {
                                        return <li key={index}>{solution}</li>;
                                    })}{' '}
                            </ul>
                            <p className='text-lg'>{caseStudy?.solution?.extra}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${data?.caseStudies?.headings?.benefit}`}</h2>
                            <div className='text-lg' dangerouslySetInnerHTML={{ __html: caseStudy?.benefit }}></div>
                        </div>
                        <a className='text-link active-link flex items-center' href='/case-studies'>
                            <MdChevronLeft fontSize={24} /> All Case Studies
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
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
                                            width={100}
                                            height={100}
                                            alt={caseStudy?.slug}
                                            className='h-[80px] max-w-3/4'
                                        />
                                        <h3 className='text-xl font-medium'>{caseStudy?.title}</h3>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: caseStudy?.caseStudies }}></div>
                                        </div>

                                        <div className='flex flex-wrap  gap-2'>
                                            {caseStudy?.tags?.map((tag, i) => {
                                                return <button className='btn btn-primary btn-sm'>{tag?.name}</button>;
                                            })}
                                        </div>

                                        <LinkText>Learn More</LinkText>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
