import Image from 'next/image';
import styles from './BannerComp.module.scss';
import TrustedByComp from '../TrustedByComp/TrustedByComp';
export default function BannerComp({ data }) {
    return (
        <>
            <div className='container my-12 flex gap-6 relative md:h-[500px] flex-col md:flex-row'>
                <div className='flex flex-col gap-6 justify-between h-full jus md:w-1/2 z-10'>
                    <div className='flex flex-col gap-6'>
                        <span className={styles.tagline}>Customer soluition platform</span>
                        <h1 className='heading'>Connect with your customers via multiple channels</h1>
                        <h2 className='suheading'>
                            Secure and robust APIs for SMS, Email, Voice, Authentication and more.
                        </h2>
                    </div>
                    <button className='btn btn-md btn-primary'>Get started</button>
                    <TrustedByComp data={data?.trustedByComp} />
                </div>
                <Image
                    src={'/assets/global/index/banner.webp'}
                    width={1080}
                    height={1080}
                    className=' md:h-[600px] lg:h-[600px] w-auto md:absolute right-2 top-0 bottom-0'
                />
            </div>
        </>
    );
}
