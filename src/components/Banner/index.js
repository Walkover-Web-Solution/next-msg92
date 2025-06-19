import Image from 'next/image';
import styles from './Banner.module.scss';
export default function Banner({ pageInfo, data }) {
    return (
        <div className='container flex items-center gap-6 cont_p '>
            <div className='cont cont_p gap-12 w-full'>
                <div className='cont gap-4 w-full'>
                    <span className={`banner_tagline home tracking-widest uppercase text-2xl`}>{data?.tagline}</span>
                    <h1 className='h1 '>{data?.heading}</h1>
                    <p className='h1_sub'>{data?.subheading}</p>
                </div>
                <button className='btn btn-primary btn-lg'>Get Started</button>
            </div>
            <Image
                className='max-w-1/2'
                width={1080}
                height={1080}
                alt='hero Banner'
                src={'/assets/global/index/banner.webp'}
            />
        </div>
    );
}
