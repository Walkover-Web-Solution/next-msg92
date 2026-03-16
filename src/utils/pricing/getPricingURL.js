import slugs from '@/data/specialPages.json';

export default function getPricingURL(pageInfo) {
    let path = '/pricing/hello';
    const isPricingPage = slugs.pricing.includes(pageInfo?.page);
    switch (pageInfo?.country) {
        case 'global':
            if (pageInfo?.page !== 'pricing') {
                path = '/pricing/' + ((isPricingPage && pageInfo?.page) || 'hello');
            } else {
                path = '/pricing/hello';
            }
            break;

        default:
            if (pageInfo?.page !== 'pricing') {
                path = '/' + pageInfo?.country + '/pricing/' + ((isPricingPage && pageInfo?.page) || 'hello');
            } else {
                path = '/' + pageInfo?.country + '/pricing/' + 'hello';
            }
            break;
    }
    return process.env.BASE_URL + path;
}
