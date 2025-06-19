import Image from 'next/image';
import styles from './Banner.module.scss';
import TrustedBy from '../TrustedBy';
export default function Banner({ pageInfo, data }) {
    return (
        <div className='container flex items-center gap-6 cont_p lg:flex-row flex-col '>
            <div className='cont cont_p md:gap-8 gap-6 w-full'>
                <div className='cont md:gap-4 gap-2 w-full'>
                    <span className={`banner_tagline home tracking-widest uppercase sm:text-xl text-base`}>{data?.tagline}</span>
                    <h1 className='h1'>{data?.heading}</h1>
                    <p className='h1_sub'>{data?.subheading}</p>
                </div>
                <button className='btn btn-primary lg:btn-lg'>Get Started</button>
                <TrustedBy data={data?.trustedBy}/>
            </div>
            <Image
                className='lg:max-w-1/2 max-w-full'
                width={1080}
                height={1080}
                alt='hero Banner'
                src={'/assets/global/index/banner.webp'}
            />
        </div>
    );
}
