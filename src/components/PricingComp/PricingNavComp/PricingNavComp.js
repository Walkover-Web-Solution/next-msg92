import getURL from '@/utils/getURL';
import Image from 'next/image';
import Link from 'next/link';

export default function PricingNav({ products, page }) {
    console.log('🚀 ~ PricingNav ~ products:', products);
    return (
        <>
            <div className='flex w-full justify-start md:hidden '>
                <div className='dropdown marker:hidden cursor-pointer bg-white w-52 rounded '>
                    <div tabIndex={0} role='button' className='px-3 py-2 capitalize'>
                        {page}
                    </div>
                    <ul
                        tabIndex={0}
                        className='flex flex-col gap-2 menu dropdown-content bg-white rounded z-[9999] w-full p-1 shadow'
                    >
                        {products?.applications.map((product, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={getURL('pricing', product?.slug)}
                                    className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${
                                        page === product?.slug && 'bg-secondary'
                                    }`}
                                >
                                    <div className='flex items-center gap-1'>
                                        <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                                        <h3 className='text-lg font-medium'> {product?.name}</h3>
                                    </div>
                                </Link>
                            );
                        })}
                        {products?.channels.map((product, index) => {
                            return (
                                <>
                                    <Link
                                        key={index}
                                        href={getURL('pricing', product?.slug)}
                                        className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${
                                            page === product?.slug && 'bg-secondary'
                                        }`}
                                    >
                                        <div className='flex items-center gap-1'>
                                            <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                                            <h3 className='text-lg font-medium'> {product?.name}</h3>
                                        </div>
                                        {product?.description && <p className='text-sm'>{product?.description}</p>}
                                    </Link>
                                </>
                            );
                        })}
                        {products?.utilities.map((product, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={getURL('pricing', product?.slug)}
                                    className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${
                                        page === product?.slug && 'bg-secondary'
                                    }`}
                                >
                                    <div className='flex items-center gap-1'>
                                        <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                                        <h3 className='text-lg font-medium'> {product?.name}</h3>
                                    </div>
                                    {product?.description && <p className='text-sm'>{product?.description}</p>}
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className='md:flex hidden flex-col gap-3 min-w-[210px]'>
                <h2>Applications</h2>
                <ul className='flex flex-col gap-2'>
                    {products?.applications.map((product, index) => {
                        return (
                            <li key={index}>
                                <ProductButton product={product} page={page} />
                            </li>
                        );
                    })}
                </ul>
                <h2>Channels</h2>
                <ul className='flex flex-col gap-2'>
                    {products?.channels.map((product, index) => {
                        return (
                            <li key={index}>
                                <ProductButton product={product} page={page} />
                            </li>
                        );
                    })}
                </ul>
                <h2>Utilities</h2>
                <ul className='flex flex-col gap-2'>
                    {products?.utilities.map((product, index) => {
                        return (
                            <li key={index}>
                                <ProductButton product={product} page={page} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export function ProductButton({ product, page }) {
    return (
        <Link
            href={getURL('pricing', product?.slug)}
            className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${page === product?.slug && 'bg-secondary'}`}
        >
            <div className='flex items-center gap-1'>
                <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                <h3 className='text-lg font-medium'> {product?.name}</h3>
            </div>
            {product?.description && <p className='text-sm'>{product?.description}</p>}
        </Link>
    );
}
