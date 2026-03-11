import getURL from '@/utils/getURL';
import Image from 'next/image';

export default function PricingNav({ products, page }) {
    const allProducts = [...(products?.applications ?? []), ...(products?.channels ?? [])];

    if (!allProducts.length) return null;

    return (
        <div className='w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            <div className='flex items-center gap-1 min-w-max border-b border-slate-100'>
                {allProducts.map((product, index) => {
                    const isActive = page === product?.slug;
                    return (
                        <a
                            key={index}
                            href={getURL('pricing', product?.slug)}
                            className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all ${
                                isActive
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            <Image
                                src={product?.icon}
                                width={16}
                                height={16}
                                alt={`${product?.name} icon`}
                                loading='lazy'
                                sizes='16px'
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
