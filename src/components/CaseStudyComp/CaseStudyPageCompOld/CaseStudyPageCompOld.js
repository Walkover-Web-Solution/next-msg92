import HeadComp from '@/components/HeadComp/HeadComp';
import Image from 'next/image';
import { MdChevronLeft } from 'react-icons/md';

export default function CaseStudyPageCompOld({ data, pageInfo }) {
    const headComp = {
        'title': `Customer success stories: ${data?.name} with MSG91 API Integration`,
    };

    return (
        <>
            <HeadComp data={headComp} pageInfo={pageInfo} />
            <div>
                <div className='container flex flex-col gap-10 pb-16 pt-4'>
                    <div>
                        <a className='text-link' href='/case-studies'>
                            All Case Studies
                        </a>{' '}
                        /{' '}
                        <span className='font-medium underline underline-offset-2 text-link active-link'>
                            {data?.name}
                        </span>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <Image
                            src={`/assets/case-studies/${data?.slug}.png`}
                            width={400}
                            height={400}
                            alt={data?.slug}
                            className='h-[80px] w-fit'
                            loading='lazy'
                        />
                        <h1 className='text-4xl font-bold md:w-2/3'>{data?.title}</h1>
                    </div>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>{data?.caseStudies?.headings?.industry || 'Industry'}:</span>
                            <span>{data?.industry}</span>
                        </li>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>{data?.caseStudies?.headings?.purpose || 'Purpose'}:</span>
                            <span>{data?.purpose}</span>
                        </li>
                        <li className='flex gap-2 text-lg'>
                            <span className='font-bold'>
                                {data?.caseStudies?.headings?.features || 'Features in use'}:
                            </span>
                            <span>{data?.features}</span>
                        </li>
                    </ul>
                </div>
                <div className='bg-gray'>
                    <div className='container flex flex-col gap-10 py-16'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${
                                data?.caseStudies?.headings?.caseStudies || 'Case Studies '
                            } - ${data?.name}`}</h2>
                            <div className='text-lg' dangerouslySetInnerHTML={{ __html: data?.caseStudies }}></div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${
                                data?.caseStudies?.headings?.problem || 'Problems'
                            }`}</h2>

                            <ul className='list-disc flex flex-col gap-2 text-lg'>
                                {data?.htmlproblem?.length > 0 &&
                                    data?.htmlproblem?.map((solution, index) => {
                                        return <li key={index}>{solution}</li>;
                                    })}{' '}
                            </ul>
                            {data?.problem && (
                                <div className='text-lg' dangerouslySetInnerHTML={{ __html: data?.problem }}></div>
                            )}
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-bold text-2xl'>{`${
                                data?.caseStudies?.headings?.solution || 'Solutions'
                            }`}</h2>
                            {data?.solution?.description && (
                                <div
                                    className='text-lg'
                                    dangerouslySetInnerHTML={{ __html: data?.solution?.description }}
                                ></div>
                            )}

                            <ul className='list-disc flex flex-col gap-2 text-lg'>
                                {data?.solution?.content?.length > 0 &&
                                    data?.solution?.content?.map((solution, index) => {
                                        return <li key={index}>{solution}</li>;
                                    })}{' '}
                                {data?.solution?.htmlcontent?.length > 0 &&
                                    data?.solution?.htmlcontent?.map((solution, index) => {
                                        return <li dangerouslySetInnerHTML={{ __html: solution }} key={index}></li>;
                                    })}{' '}
                            </ul>
                            <p className='text-lg'>{data?.solution?.extra}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-bold text-2xl'>{`${
                                data?.caseStudies?.headings?.benefit || 'Benefit'
                            }`}</h2>
                            <div className='text-lg' dangerouslySetInnerHTML={{ __html: data?.benefit }}></div>
                        </div>
                        <a className='text-link active-link flex items-center' href='/case-studies'>
                            <MdChevronLeft fontSize={24} /> All Case Studies
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
