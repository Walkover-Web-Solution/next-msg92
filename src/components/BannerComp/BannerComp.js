import Image from 'next/image';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import { LinkButton } from '../UIComponent/Buttons/LinkButton';
export default function BannerComp({ data }) {
    return (
        <>
            <div className='container my-20 flex gap-6 relative lg:h-[560px] flex-col lg:flex-row '>
                <div className='flex-col lg:gap-12 gap-8  h-full justify-center lg:w-1/2 z-10'>
                    <div className='flex-col gap-6'>
                        {data?.product && (
                            <div className='flex items-center gap-2'>
                                <Image src={data?.product?.icon} width={40} height={40} alt={data?.product?.name} />
                                <span className='font-semibold text-2xl'>{data?.product?.name}</span>
                            </div>
                        )}
                        <span className={`text-xl uppercase tracking-widest text-${data?.slug}`}>{data?.tagline}</span>
                        <h1 className='heading'>{data?.heading}</h1>
                        <h2 className='suheading'>{data?.subheading}</h2>
                    </div>

                    <LinkButton href={'/'} content={data?.getstarted_btn} customClasses={'btn btn-primary btn-md '} />
                    <TrustedByComp data={data?.trustedByComp} />
                </div>
                <div className='lg:absolute right-2 top-0 bottom-0 flex'>
                    <Image
                        src={data?.banner_img}
                        width={1080}
                        height={1080}
                        className='h-auto w-full max-w-[600px] m-auto'
                        alt={data?.tagline}
                    />
                </div>
            </div>
        </>
    );
}
