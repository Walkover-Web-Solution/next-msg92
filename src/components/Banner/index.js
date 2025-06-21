import Image from 'next/image';
import TrustedBy from '../TrustedBy';
export default function Banner({ pageInfo, data }) {
    return (
        <div className='container flex items-center gap-6 cont_p lg:flex-row flex-col '>
            <div className='cont cont_p md:gap-8 gap-6 w-full'>
                <div className='cont md:gap-3 gap-2 w-full'>
                    <div className='flex items-center gap-1'>
                        <Image
                            className='h-fit w-12'
                            width={48}
                            height={48}
                            src={data?.product?.icon}
                            alt={`${data?.product?.name} Logo`}
                        />
                        <span className='text-2xl font-semibold'>{data?.product?.name}</span>
                    </div>
                    <span className={`${data?.slug} banner_tagline tracking-widest uppercase sm:text-xl text-base`}>
                        {data?.tagline}
                    </span>
                    <h1 className='h1'>{data?.heading}</h1>
                    <p className='h1_sub'>{data?.subheading}</p>
                </div>
                {data?.getstarted_btn && <button className='btn btn-primary lg:btn-lg'>{data?.getstarted_btn}</button>}
                {data?.trustedBy && <TrustedBy data={data?.trustedBy} />}
            </div>
            {data?.banner_img && (
                <Image
                    className='lg:max-w-1/2 max-w-full h-fit w-full'
                    width={1080}
                    height={1080}
                    alt={`${data?.product?.name} Banner Image`}
                    src={data?.banner_img}
                />
            )}
        </div>
    );
}
