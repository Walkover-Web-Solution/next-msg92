import Image from 'next/image';
import Link from 'next/link';
import styles from './NewHelloComp.module.scss';
import { MdHealthAndSafety } from 'react-icons/md';

export default function NewHelloComp({ data }) {
    return (
        <>
            <div className='container flex md:flex-row flex-col cont_gap cont_p justify-between'>
                <div className='flex flex-col gap-8 w-full lg:w-1/3'>
                    <div className='flex flex-col gap-4'>
                        <p className={`${styles.intro}`}>{data?.bannerComp?.product?.subname}</p>
                        <div className='flex items-center gap-2'>
                            <Image
                                src={data?.bannerComp?.product?.icon}
                                width={50}
                                height={50}
                                alt={data?.bannerComp?.product?.name}
                            />
                            <span className={styles?.hello}>{data?.bannerComp?.product?.name}</span>
                        </div>
                    </div>

                    <h1
                        className={'md:text-6xl text-4xl font-bold'}
                        dangerouslySetInnerHTML={{ __html: data?.bannerComp?.heading }}
                    ></h1>
                    <div className='flex flex-col gap-4'>
                        <p className={`${styles.boost} text-hello`}>{data?.bannerComp?.tagline}</p>
                        <p className='text-2xl'>{data?.bannerComp?.subheading}</p>
                    </div>
                    <Link
                        className={styles?.getstarted}
                        href='https://msg91.com/signup?source=msg91&utm_source=msg91Website'
                    >
                        {data?.bannerComp?.getstarted_btn}
                    </Link>
                    <div className='flex flex-col gap-4'>
                        <p className=' text-lg '>{data?.bannerComp?.trustedByComp?.heading}</p>
                        <div className='flex flex-wrap gap-4'>
                            {data?.bannerComp?.trustedByComp?.logos.map((logo) => (
                                <a key={logo.name} href={logo.url} target='_blank'>
                                    <Image src={logo.url} width={80} height={40} alt={logo.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <Image
                    className='flex items-center justify-center w-full lg:w-1/2'
                    src={data?.bannerComp?.banner_img}
                    width={500}
                    height={500}
                    alt='Hello Banner'
                />
            </div>

            <div className='bg-[#f4ff80]'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-4xl font-bold'>{data?.discover?.heading}</h2>
                    <p className='text-xl'>{data?.discover?.subheading}</p>
                    <p className='text-xl'>{data?.discover?.subtag}</p>
                    <div className='grid grid-cols-2 gap-6'>
                        {data?.discover?.tags.map((tag) => (
                            <div key={tag?.name} className='flex items-center gap-2'>
                                <div className='rounded-full p-2 bg-white h-[60px] w-[60px] flex items-center justify-center shadow-lg'>
                                    <MdHealthAndSafety fontSize={30} />
                                </div>
                                <span className='text-2xl font-semibold'>{tag?.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className='text-xl'>{data?.discover?.extra}</p>
                </div>
            </div>
            <div className='bg-primary'>
                <div className='container flex flex-col gap-20 cont_p'>
                    {data?.FeatureComp?.features?.length > 0 &&
                        data?.FeatureComp?.features?.map((feature, index) => {
                            return (
                                <div
                                    className={`${
                                        styles[feature?.color]
                                    } bg-white lg:px-20 px-10 py-10 flex lg:flex-row flex-col justify-between  items-center gap-16`}
                                    key={index}
                                >
                                    <div className='flex flex-col gap-4 lg:w-1/2'>
                                        <Image src={feature?.icon} width={70} height={70} alt='hello' />
                                        <h3 className='text-2xl font-bold'>{feature?.name}</h3>
                                        <div
                                            className='text-lg'
                                            dangerouslySetInnerHTML={{ __html: feature?.content }}
                                        />
                                    </div>
                                    <Image src={feature?.img} width={400} height={400} className='h-auto' alt='hello' />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div>
                <div className='container flex flex-col cont_gap cont_p text-2xl'>
                    <p>{data?.prefooter?.text1}</p>
                    <p>{data?.prefooter?.text2}</p>
                </div>

                <div style={{ 'width': '100vw', overflow: 'hidden' }}></div>
                <div className='marquee mt-5 mb-5'>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                    <span className='yellow'>Connect</span>
                    <span className='purple'>Engage</span>
                    <span className='blue'>Thrive</span>
                </div>
                <div className='container flex flex-col cont_gap cont_p text-2xl'>
                    <p>{data?.prefooter?.text3}</p>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <Link
                            className={styles?.getstarted}
                            href='https://msg91.com/signup?source=msg91&utm_source=msg91Website'
                        >
                            get started
                        </Link>
                        <Link
                            className={styles?.sales}
                            href='https://msg91.com/signup?source=msg91&utm_source=msg91Website'
                        >
                            Contact sales
                        </Link>
                    </div>
                    <p>{data?.prefooter?.text4}</p>
                </div>
            </div>
        </>
    );
}
