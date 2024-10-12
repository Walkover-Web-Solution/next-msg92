import Image from 'next/image';
import { MdHealthAndSafety } from 'react-icons/md';
export default function NewHelloComp({ data }) {
    return (
        <>
            <div className='container flex flex-col lg:flex-row gap-6 py-20'>
                <div className='flex flex-col gap-6 w-full lg:w-1/2'>
                    <p>{data?.bannerComp?.product?.subname}</p>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={data?.bannerComp?.product?.icon}
                            width={50}
                            height={50}
                            alt={data?.bannerComp?.product?.name}
                        />
                        <span className='text-lg font-semibold'>{data?.bannerComp?.product?.name}</span>
                    </div>
                    <h1
                        className='text-4xl font-bold'
                        dangerouslySetInnerHTML={{ __html: data?.bannerComp?.heading }}
                    ></h1>
                    <p className='text-uppercase col-ls-20 hello-dark font-semibold text-hello'>
                        {data?.bannerComp?.tagline}
                    </p>
                    <p
                        className='text-uppercase col-ls-20 text-lg font-semibold'
                        dangerouslySetInnerHTML={{ __html: data?.bannerComp?.subheading }}
                    ></p>
                    <button className='btn btn-primary w-fit text-uppercase'>
                        <a href='https://msg91.com/signup?source=msg91&utm_source=msg91Website'>
                            {data?.bannerComp?.getstarted_btn}
                        </a>
                    </button>
                    <p className=' col-ls-20 font-semibold '>{data?.bannerComp?.trustedByComp?.heading}</p>
                    <div className='flex flex-wrap gap-4'>
                        {data?.bannerComp?.trustedByComp?.logos.map((logo) => (
                            <a key={logo.name} href={logo.url} target='_blank'>
                                <Image src={logo.url} width={80} height={40} alt={logo.name} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className='flex items-center justify-center w-full lg:w-1/2'>
                    <Image src={data?.bannerComp?.banner_img} width={500} height={500} alt='Hello Banner' />
                </div>
            </div>
            <div className='bg-[#f4ff80]'>
                <div className='container flex flex-col lg:flex-row gap-6 py-20'>
                    <div className='flex flex-col gap-6 w-full'>
                        <h2 className='text-2xl font-bold'>{data?.discover?.heading}</h2>
                        <p className='text-lg'>{data?.discover?.subheading}</p>
                        <p className='text-lg'>{data?.discover?.subtag}</p>
                        <div className='grid grid-cols-2 gap-6'>
                            {data?.discover?.tags.map((tag) => (
                                <div key={tag?.name} className='flex items-center'>
                                    <div className='rounded-full'>
                                        <MdHealthAndSafety width={40} height={40} />
                                    </div>
                                    {/* <Image src={tag?.icon } width={50} height={50} alt={tag?.name} /> */}
                                    <span className='text-lg ml-2b font-semibold'>{tag?.name}</span>
                                </div>
                            ))}
                        </div>
                        <p className='text-lg'>{data?.discover?.extra}</p>
                    </div>
                </div>{' '}
            </div>
        </>
    );
}
