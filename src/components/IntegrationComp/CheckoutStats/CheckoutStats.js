export default function CheckoutStats({ data }) {
    if (!data?.items?.length) return null;

    return (
        <section className='bg-shopifyCheckout-primary py-9 md:py-11'>
            <div className='container cont'>
                <div className='flex flex-col md:flex-row md:items-stretch md:divide-x md:divide-shopifyCheckout-primaryFg/20'>
                    {data.items.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-1 flex-col gap-2 py-5 md:px-7 lg:px-8 ${
                                index !== data.items.length - 1
                                    ? 'border-b border-shopifyCheckout-primaryFg/20 md:border-b-0'
                                    : ''
                            }`}
                        >
                            {item?.value && (
                                <p className='text-3xl font-bold text-shopifyCheckout-primaryFg md:text-5xl'>
                                    {item.value}
                                </p>
                            )}
                            {item?.label && (
                                <p className='max-w-xs text-sm text-shopifyCheckout-primaryFg/75 md:text-base'>
                                    {item.label}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
