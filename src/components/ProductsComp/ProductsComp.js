import Image from 'next/image';
import Link from 'next/link';
import style from './ProductsComp.module.scss';
import { LinkText } from '../UIComponent/Buttons/LinkButton';

export default function ProductsComp({ data }) {
    if (data && data?.length > 0)
        return (
            <>
                <div className='bg-neutral py-20'>
                    <div className='container grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-6 '>
                        {data.map((product, index) => (
                            <Link href={product?.link} key={index}>
                                <div className={`${style[product?.name.toLowerCase()]} ${style?.card} LinkButtonCard`}>
                                    <div className='flex flex-col gap-4'>
                                        <Image width={40} height={40} src={product?.icon} alt={product?.name} />
                                        <span className={style.tagline_sm}>{product?.tagline}</span>
                                        <h2 className='text-2xl font-bold'>{product?.name}</h2>
                                        <h3 className='text-lg'>{product?.description}</h3>
                                        <LinkText className='link-btn' href={'/'}>
                                            {product.linkText}
                                        </LinkText>
                                    </div>
                                    <Image
                                        width={480}
                                        height={480}
                                        quality={100}
                                        className='2xl:h-[260px] xl:h-[250px] lg:h-[200px] h-[200px] w-auto sm:ml-auto'
                                        src={product?.img}
                                        alt={product?.name}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
}
