import Image from 'next/image';
import Link from 'next/link';

export default function PricingNav({ products, page }) {
    return (
        <>
            <div className='flex flex-col gap-3 max-w-[190px]'>
                <h2>Applications</h2>
                <ul className='flex flex-col gap-2'>
                    {products?.applications.map((product, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={`/${product?.slug}`}
                                    className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${page === product?.slug && 'bg-secondary'}`}
                                >
                                    <div className='flex items-center gap-1'>
                                        <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                                        <h3 className='text-lg font-medium'> {product?.name}</h3>
                                    </div>
                                    <p className='text-sm'>{product?.description}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <h2>Channels</h2>
                <ul className='flex flex-col gap-2'>
                    {products?.channels.map((product, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={`/${product?.slug}`}
                                    className='flex flex-col px-3 py-2 rounded hover:bg-secondary'
                                >
                                    <div className='flex items-center gap-1'>
                                        <Image src={product?.icon} width={32} height={32} alt={product?.name} />
                                        <h3 className='text-lg font-medium'> {product?.name}</h3>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
