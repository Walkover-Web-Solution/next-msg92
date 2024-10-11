import Image from 'next/image';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
import { LinkButton } from '../UIComponent/Buttons/LinkButton';
import styles from './BannerComp.module.scss';
export default function BannerComp({ data }) {
    console.log('🚀 ~ BannerComp ~ data:', data);
    return (
        <>
            <div className='container cont_p flex gap-6 h-fit flex-col lg:flex-row '>
                <div className='flex flex-col lg:gap-12 gap-8 h-full justify-center lg:w-1/2 w-full z-10'>
                    <div className='flex flex-col gap-6'>
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
                <div className={styles.cont}>
                    <Image
                        className={styles.img}
                        src={data?.banner_img}
                        width={2000}
                        height={2000}
                        alt={data?.tagline}
                    />
                </div>
            </div>
        </>
    );
}
