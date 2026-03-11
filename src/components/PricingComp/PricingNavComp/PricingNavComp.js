import getURL from '@/utils/getURL';
import Image from 'next/image';
import Link from 'next/link';

export default function PricingNav({ products, page }) {
    const allProducts = [...(products?.applications ?? []), ...(products?.channels ?? [])];

    if (!allProducts.length) return null;

    return (
        <div className='w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3'>
            <div className='inline-flex items-center bg-white rounded-xl p-2 min-w-max'>
                {allProducts.map((product, index) => {
                    const isActive = page === product?.slug;
                    return (
                        <a
                            key={index}
                            href={getURL('pricing', product?.slug)}
                            className={`flex items-center gap-1 px-4 py-2 rounded rounded-br-none rounded-bl-none text-md font-medium whitespace-nowrap transition-all ${
                                isActive
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-slate-500 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <Image
                                src={product?.icon}
                                width={22}
                                height={22}
                                alt={`${product?.name} icon`}
                                loading='lazy'
                                sizes='22px'
                            />
                            {product?.name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export function ProductButton({ product, page }) {
    return (
        <a
            href={getURL('pricing', product?.slug)}
            className={`flex flex-col px-3 py-2 rounded hover:bg-secondary ${page === product?.slug && 'bg-secondary'}`}
        >
            <div className='flex items-center gap-1'>
                <Image
                    src={product?.icon}
                    width={32}
                    height={32}
                    alt={`${product?.name} icon`}
                    loading='lazy'
                    sizes='(max-width: 768px) 30px, 32px'
                />
                <h3 className='text-lg font-medium'> {product?.name}</h3>
            </div>
            {product?.description && <p className='text-sm'>{product?.description}</p>}
        </a>
    );
}
