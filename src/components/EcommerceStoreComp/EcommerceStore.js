import ecommerceStore from '@/data/global/ecommerce-store.json';
export default function EcommerceStoreComp() {
    return (
        <>
            <div className='bg-neutral py-20'>
                <div className='container'>
                    <p className='text-gray-500'>{ecommerceStore.EcommerceStoreComp.description}</p>
                </div>
            </div>
        </>
    );
}
