import Image from 'next/image';
import styles from './BannerComp.module.scss';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
export default function BannerComp({ data }) {
    return (
        <>
            <div className='container my-20 flex gap-6 relative lg:h-[560px] flex-col lg:flex-row '>
                <div className='flex flex-col lg:gap-16 gap-8  h-full lg:w-1/2 z-10'>
                    <div className='flex flex-col gap-6'>
                        <span className={styles.tagline}>{data?.tagline}</span>
                        <h1 className='heading'>{data?.heading}</h1>
                        <h2 className='suheading'>{data?.subheading}</h2>
                    </div>
                    <button className='btn btn-md btn-primary mb-auto'>{data?.getstarted_btn}</button>
                    <TrustedByComp data={data?.trustedByComp} />
                </div>
                <Image
                    src={data?.banner_img}
                    width={1080}
                    height={1080}
                    className='lg:h-full w-auto lg:absolute right-2 top-0 bottom-0'
                />
            </div>
        </>
    );
}
