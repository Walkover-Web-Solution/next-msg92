import PricingNav from './PricingNavComp/PricingNavComp';
import PricingHello from './PricingHello/PricingHello';

export default function PricingComp({ data, pageInfo }) {
    let page;
    if (pageInfo?.country === 'global') {
        page = pageInfo?.pathArray[1];
    } else {
        page = pageInfo?.pathArray[2];
    }

    return (
        <>
            <div className='container my-10 flex gap-6'>
                <PricingNav products={data?.products} page={page} />
                {page === 'hello' && <PricingHello />}
            </div>
        </>
    );
}
