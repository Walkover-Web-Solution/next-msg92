import ecommerceStore from '@/data/global/ecommerce-store.json';
import Link from 'next/link';
export default function EcommerceStoreComp() {
    return (
        <>
            <div className='container py-10'>
                <div className='gap-5 md:gap-20 flex flex-col md:flex-row justify-center items-center md:items-start'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-black text-4xl font-bold'>{ecommerceStore.EcommerceStoreComp.title}</p>
                        <p className='text-gray-500'>{ecommerceStore.EcommerceStoreComp.description}</p>
                    </div>
                    <img src={ecommerceStore.EcommerceStoreComp.mainImage} alt='Ecommerce Store' width={200} />
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <p className='text-3xl font-bold '>{ecommerceStore.EcommerceStoreComp.bodyHeading}</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-4 lg:gap-8'>
                        {ecommerceStore.EcommerceStoreComp.card.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target='_blank'
                                className='bg-white flex flex-col gap-3 p-4 rounded-lg'
                            >
                                <div className='flex items-center gap-2'>
                                    <img src={item.image} alt={item.title} height={50} />
                                    <p className='text-black text-lg font-bold'>{item.title}</p>
                                </div>
                                <p className='text-gray-500'>{item.description}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container py-10'>
                <p className='text-3xl font-bold mb-10'>{ecommerceStore.EcommerceStoreComp.PluginHeading}</p>
                <div className=' flex flex-wrap gap-6'>
                    {ecommerceStore.EcommerceStoreComp.plugins.map((item, index) => (
                        <a target='_blank' href={item?.link} key={index} className='flex gap-4'>
                            <img width={360} height={260} src={item?.icon} alt={item?.name} className=' h-8 w-fit' />
                            <h3 className='text-lg font-bold mb-2'>{item?.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
