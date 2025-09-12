import PricingComp from '@/components/PricingComp/PricingComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getPricing from '@/utils/getPricing';

export default function PricingCountryPage({ pricingData, pageInfo, pageData, commonData, products }) {
    return (
        <PricingComp
            pricingData={pricingData}
            pageInfo={pageInfo}
            pageData={pageData}
            commonData={commonData}
            products={products}
        />
    );
}

export const getServerSideProps = async (context) => {
    const country = context?.params?.country || 'global';
    const product = context?.params?.products;
    const commonData = getCommonCompData(country);

    let pricingData;
    try {
        pricingData = await getPricing(country, product);
    } catch (error) {
        console.log(error);
    }
    let pageData = getPricingPageData(country, product);
    let products = getProducts(country);
    console.log('⚡️ ~ :45 ~ getServerSideProps ~ pricingData:', pricingData);

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
            },
        };
    }
};

function getPricingPageData(country, product) {
    const data = require(`@/data/${country}/pricing.json`);
    if (data?.pageData[product]) {
        return data?.pageData[product] || {};
    }
    return data || {};
}

function getProducts(country) {
    const data = require(`@/data/${country}/pricing.json`);
    if (data?.products) {
        return data?.products || {};
    }
    return data || {};
}
