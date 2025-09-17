import PricingComp from '@/components/PricingComp/PricingComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getPricing from '@/utils/getPricing';

export default function PricingCountryPage({ pricingData, pageInfo, pageData, commonData, products, country }) {
    return (
        <PricingComp
            pricingData={pricingData}
            pageInfo={pageInfo}
            pageData={pageData}
            commonData={commonData}
            products={products}
            country={country}
        />
    );
}

export const getServerSideProps = async (context) => {
    const country = 'us';
    const product = context?.params?.products;
    const commonData = getCommonCompData(country);

    let pricingData;
    try {
        pricingData = await getPricing(country, product);
    } catch (error) {
        console.log(error);
    }
    let pageData = getPricingPageData(product);
    let products = getProducts();

    if (!pricingData) {
        return { notFound: true };
    } else {
        return {
            props: {
                pricingData: pricingData || {},
                pageInfo: { country: country, product: product },
                pageData,
                commonData,
                products,
                country: 'global',
            },
        };
    }
};

function getPricingPageData(product) {
    const data = require(`@/data/global/pricing.json`);
    if (data?.pageData[product]) {
        return data?.pageData[product] || {};
    }
    return data || {};
}

function getProducts() {
    const data = require(`@/data/global/pricing.json`);
    if (data?.products) {
        return data?.products || {};
    }
    return data || {};
}
