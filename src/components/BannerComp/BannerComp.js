import Image from 'next/image';
import styles from './BannerComp.module.scss';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import { LinkButton } from '../UIComponent/Buttons/LinkButton';
export default function BannerComp({ data }) {
    return (
        <>
            <div className='container my-20 flex gap-6 relative lg:h-[560px] flex-col lg:flex-row '>
                <div className='flex flex-col lg:gap-12 gap-8  h-full justify-center lg:w-1/2 z-10'>
                    <div className='flex flex-col gap-6'>
                        <span className={styles.tagline}>{data?.tagline}</span>
                        <h1 className='heading'>{data?.heading}</h1>
                        <h2 className='suheading'>{data?.subheading}</h2>
                    </div>

                    <LinkButton href={'/'} content={data?.getstarted_btn} customClasses={'btn btn-primary btn-md '} />
                    <TrustedByComp data={data?.trustedByComp} />
                </div>

                <Image
                    src={data?.banner_img}
                    width={1080}
                    height={1080}
                    className='lg:h-full w-auto lg:absolute right-2 top-0 bottom-0'
                    alt={data?.tagline}
                />
            </div>
        </>
    );
}
