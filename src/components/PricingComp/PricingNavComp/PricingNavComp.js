'use client';

import getURL from '@/utils/getURL';
import Image from 'next/image';

export default function PricingNav({ products, page }) {
    const allProducts = [...(products?.applications ?? []), ...(products?.channels ?? [])];
    const activeProduct = allProducts.find((p) => p?.slug === page);

    if (!allProducts.length) return null;

    return (
        <>
            {/* Mobile: native select */}
            <div className='md:hidden py-3 max-w-[300px]'>
                <select
                    defaultValue={page ?? ''}
                    onChange={(e) => {
                        window.location.href = `/pricing/${e.target.value}`;
                    }}
                    className='w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm appearance-none'
                >
                    {allProducts.map((product, index) => (
                        <option key={index} value={product?.slug}>
                            {product?.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop: horizontal tabs */}
            <div className='hidden md:block w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                <div className='flex items-center gap-1 min-w-max border-b border-slate-100'>
                    {allProducts.map((product, index) => {
                        const isActive = page === product?.slug;
                        return (
                            <a
                                key={index}
                                href={getURL('pricing', product?.slug)}
                                className={`flex items-center gap-1.5 px-3 py-3 text-sm whitespace-nowrap border-b-2 -mb-px transition-all ${
                                    isActive
                                        ? 'border-indigo-500 text-indigo-600 font-medium'
                                        : 'border-transparent text-base hover:border-slate-200'
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
        </>
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
