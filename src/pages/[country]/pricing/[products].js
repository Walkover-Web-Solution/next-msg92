import PricingComp from '@/components/PricingComp';
import getCommonCompData from '@/utils/getCommonCompData';
import getPricing from '@/utils/pricing/getPricing';
import getVoicePricing from '@/utils/pricing/getVoicePricing';
import getSmsOtpPricing from '@/utils/pricing/getSmsOtpPricing';
import availableCountries from '@/data/availableCountries.json';

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
    // An unknown country prefix has no common.json; answer 404 instead of crashing with a 500.
    if (!availableCountries.some((c) => c.shortname.toLowerCase() === country)) {
        return { notFound: true };
    }
    const commonData = getCommonCompData(country);

    let pricingData;
    try {
        if (product === 'voice') {
            pricingData = await getVoicePricing(country);
        } else if (product === 'sms' || product === 'otp') {
            pricingData = await getSmsOtpPricing(country);
        } else {
            pricingData = await getPricing(country, product);
        }
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
