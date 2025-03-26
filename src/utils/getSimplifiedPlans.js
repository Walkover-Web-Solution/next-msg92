import axios from 'axios';

export default async function getSubscriptions(currency, msId) {
    if (currency && msId) {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currency}&ms_id=${msId}`
            );
            return getSimplifiedPlans(currency, response.data.data);
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    }
}
export function getSimplifiedPlans(currency, plans) {
    let simplifiedPlans = [];
    simplifiedPlans = plans?.map((plan) => ({
        'name': plan?.name,
        'amount': plan?.plan_amounts
            ?.filter((amount) => amount?.currency?.short_name === currency)
            ?.map((amount) => amount?.plan_amount),

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
        'extras': plan?.plan_services?.map((service) => ({
            'service_name': service?.service_credit?.service?.name,
            'rate':
                service?.service_credit?.service_credit_rates?.find((rate) => rate?.currency?.short_name === currency)
                    ?.follow_up_rate || 0,
            'chunk':
                service?.service_credit?.service_credit_rates?.find((rate) => rate?.currency?.short_name === currency)
                    ?.chunk_size || 1,
        })),
    }));
    return simplifiedPlans || [];
}
