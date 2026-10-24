import getPageInfo from '@/utils/getPageInfo';
import getCommonCompData from '@/utils/getCommonCompData';

const helloBrCountries = ['br', 'br-pt'];

// Server-only: resolves a catch-all slug to page props, or `null` when the page does not exist.
// Used by the catch-all route (SSG) and the experiment route (SSR) so both render identical data.
export default async function loadPageProps(slug) {
    const pageInfo = getPageInfo(slug?.length ? { slug } : {});
    const commonData = getCommonCompData(pageInfo?.country);

    const res = await fetch(`${process.env.BASE_URL}/api/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageInfo),
    });
    const data = await res.json();
    if (data?.NotFoundComp) {
        return null;
    }

    if (data?.Pricing && pageInfo?.page === 'hello' && helloBrCountries.includes(pageInfo?.country)) {
        try {
            const getPricing = (await import('@/utils/pricing/getPricing')).default;
            const rows = await getPricing(pageInfo.country, 'hello');
            if (Array.isArray(rows) && rows.length > 0) {
                data.Pricing = {
                    ...data.Pricing,
                    initialPricingData: rows,
                    initialCurrency: 'USD',
                };
            }
        } catch (e) {
            console.error('Pricing: getPricing failed', e);
        }
    }

    return {
        data: data || {},
        commonData: commonData || {},
        pageInfo,
    };
}
