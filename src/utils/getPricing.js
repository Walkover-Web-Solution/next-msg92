import axios from 'axios';
import getPlanServices from './getPlanServices';

export default async function getPricing(country, page) {
    const msId = msIds[page];
    const currencySymbol = currency[country] || '$';
    if (page === 'segmento' || page === 'email' || page === 'hello') {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
            );

            return getSimplifiedPlans(currencySymbol, response.data.data);
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    } else if (page === 'otp' || page === 'sms') {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
            );
            return response.data.data;
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    }
}
const msIds = {
    'hello': '7',
    'segmento': '2',
    'email': '1',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'uk': 'GBP',
};

export function getSimplifiedPlans(currency, plans) {
    let simplifiedPlans = [];
    simplifiedPlans = plans?.map((plan) => ({
        'name': plan?.name,
        'amount': plan?.plan_amounts
            ?.filter((amount) => amount?.currency?.short_name === currency)
            ?.map((amount) => ({
                plan_amount: amount?.plan_amount,
                plan_type: amount?.plan_type?.name,
            })),

        'included': plan?.plan_services?.map((service) => ({
            'service_name': service?.service_credit?.service?.name,
            'amount':
                service?.service_credit?.service_credit_rates?.find((rate) => rate?.currency?.short_name === currency)
                    ?.free_credits || 0,
        })),
        'features': plan?.plan_features
            ?.filter((feature) => feature?.is_visible || !feature?.feature?.is_included)
            ?.map((feature) => ({
                'name': feature?.feature?.name,
                'is_included': feature?.is_visible && feature?.feature?.is_included ? true : false,
            })),
        'extras': getPlanServices(plan, currency),
    }));
    return simplifiedPlans || [];
}
