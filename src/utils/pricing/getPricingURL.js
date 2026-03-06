import slugs from '@/data/specialPages.json';

export default function getPricingURL(pageInfo) {
    let path = '/pricing/sms';
    const isPricingPage = slugs.pricing.includes(pageInfo?.page);
    switch (pageInfo?.country) {
        case 'global':
            if (pageInfo?.page !== 'pricing') {
                path = '/pricing/' + ((isPricingPage && pageInfo?.page) || 'sms');
            } else {
                path = '/pricing/sms';
            }
            break;

        default:
            if (pageInfo?.page !== 'pricing') {
                path = '/' + pageInfo?.country + '/pricing/' + ((isPricingPage && pageInfo?.page) || 'sms');
            } else {
                path = '/' + pageInfo?.country + '/pricing/' + 'sms';
            }
            break;
    }
    return process.env.BASE_URL + path;
}
