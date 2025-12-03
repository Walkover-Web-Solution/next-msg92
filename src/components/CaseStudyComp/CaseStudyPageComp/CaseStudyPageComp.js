import HeadComp from '@/components/HeadComp/HeadComp';
import Image from 'next/image';
import { MdChevronLeft } from 'react-icons/md';

export default function CaseStudyPageComp({ data, pageInfo }) {
    const headComp = {
        'title': `Customer success stories: ${data?.name} with MSG91 API Integration`,
    };
    return (
        <>
            <HeadComp data={headComp} pageInfo={pageInfo} />
            <div className='container max-w-4xl cont gap-12 py-12'>
                <div className='cont gap-3'>
                    <div className='text-sm'>
                        <a className='text-link' href='/case-studies'>
                            All Case Studies
                        </a>{' '}
                        /{' '}
                        <span className='font-medium underline underline-offset-2 text-link active-link'>
                            {data?.name}
                        </span>
                    </div>
                    <Image
                        src={`/assets/case-studies/${data?.slug}.png`}
                        width={400}
                        height={400}
                        alt={data?.slug}
                        className='lg:h-[60px] h-[40px] w-fit'
                        loading='lazy'
                    />
                    <h1 className='md:text-4xl text-2xl font-bold'>{data?.title}</h1>
                    {data?.content?.length > 0 && (
                        <ul className='cont gap-1'>
                            {data?.content?.map((item, index) => (
                                <li className='' key={index}>
                                    <span className='font-bold '>{item?.title}</span>: {item?.content}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='cont gap-1'>
                    <h2 className='md:text-2xl text-xl font-bold'>{data?.problems?.title}:</h2>
                    {data?.problems?.description && <p>{data?.problems?.description}</p>}
                    {data?.problems?.content?.length > 0 && (
                        <ul className='cont gap-4 list-disc'>
                            {data?.problems?.content?.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='cont gap-1'>
                    <h2 className='md:text-2xl text-xl font-bold'>{data?.solutions?.title}:</h2>
                    {data?.solutions?.description && <p>{data?.solutions?.description}</p>}
                    {data?.solutions?.content?.length > 0 && (
                        <ul className='cont gap-4 list-disc'>
                            {data?.solutions?.content?.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='cont gap-1'>
                    <h2 className='md:text-2xl text-xl font-bold'>{data?.results?.title}:</h2>
                    {data?.results?.description && <p>{data?.results?.description}</p>}
                    {data?.results?.content?.length > 0 && (
                        <ul className='cont gap-4 list-disc'>
                            {data?.results?.content?.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='cont gap-1'>
                    <h2 className='md:text-2xl text-xl font-bold'>{data?.conclusion?.title}:</h2>
                    {data?.conclusion?.description && <p>{data?.conclusion?.description}</p>}
                    {data?.conclusion?.content?.length > 0 && (
                        <ul className='cont gap-4 list-disc'>
                            {data?.conclusion?.content?.map((item, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                            ))}
                        </ul>
                    )}
                </div>
                <a className='text-link active-link flex items-center' href='/case-studies'>
                    <MdChevronLeft fontSize={24} /> All Case Studies
                </a>
            </div>
        </>
    );
}
