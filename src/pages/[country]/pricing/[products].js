import PricingComp from '@/components/PricingComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getPricing from '@/utils/pricing/getPricing';

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

    const isProduct =
        products?.applications?.some((app) => app.slug === product) ||
        products?.channels?.some((channel) => channel.slug === product) ||
        products?.services?.some((service) => service.slug === product);

    if (!pricingData || !isProduct) {
        return { notFound: true };
    } else {
        return {
            props: {
                pricingData: pricingData || {},
                pageInfo: {
                    country: country,
                    product: product,
                    page: product,
                    baseURL: `pricing/${product}`,
                    pathURL: `${country}/pricing/${product}`,
                },
                pageData,
                commonData,
                products,
                country,
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
