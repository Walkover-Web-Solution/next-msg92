import { LinkText } from '@/components/1UIComponents/Buttons';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Producs.module.scss';

export default function Products({ data }) {
    return (
        <div className='bg-neutral py-20'>
            <div className='container grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-6 '>
                {data?.content.map((product, index) => (
                    <Link href={product?.link} key={index}>
                        <div
                            className={`${
                                styles[product?.name.toLowerCase()]
                            } xl:py-8 xl:pl-8 lg:py-4 lg:pl-4 md:py-8 md:pl-8 py-4 pl-4 gap-3 items-center flex flex-col sm:flex-row rounded-lg hover:shadow-lg LinkButtonCard`}
                        >
                            <div className='flex flex-col gap-4'>
                                <Image width={40} height={40} src={product?.icon} alt={product?.name} />
                                <span className={styles.tagline_sm}>{product?.tagline}</span>
                                <h2 className='text-2xl font-bold'>{product?.name}</h2>
                                <p className='text-lg'>{product?.description}</p>
                                <LinkText className='link-btn'>{data?.linkText}</LinkText>
                            </div>
                            <Image
                                width={420}
                                height={420}
                                className='2xl:h-[260px] xl:h-[250px] lg:h-[200px] h-[200px] w-auto sm:ml-auto'
                                src={product?.img}
                                alt={product?.name}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
