import Image from 'next/image';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function CaseStudyComp({ data }) {
    return (
        <div className='container'>
            <div className='flex py-12 flex-col gap-6'>
                <h1 className='text-5xl font-bold'>{data?.heading}</h1>
                <p className='text-lg'>{data?.subheading}</p>
            </div>
            <div className='py-12 flex flex-col gap-8'>
                <h2 className='text-3xl font-semibold'>{data?.caseStudies?.heading}</h2>
                <div className='grid grid-cols-3 gap-16'>
                    {data?.caseStudies?.content?.map((caseStudy, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-6 border rounded p-4 '>
                                <Image
                                    src={`/assets/case-studies/${caseStudy?.img}.png`}
                                    width={100}
                                    height={100}
                                    alt={caseStudy?.img}
                                    className='h-[80px] max-w-3/4'
                                />
                                <h3 className='text-xl font-medium'>{caseStudy?.title}</h3>
                                <p dangerouslySetInnerHTML={{ __html: caseStudy?.caseStudies }}></p>

                                <div className='flex flex-wrap  gap-2'>
                                    <button className='btn btn-primary btn-sm'>Hello</button>
                                    <button className='btn btn-primary btn-sm'>Hello</button>
                                    <button className='btn btn-primary btn-sm'>Hello</button>
                                    <button className='btn btn-primary btn-sm'>Hello</button>
                                </div>
                                <LinkText>Learn More</LinkText>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
