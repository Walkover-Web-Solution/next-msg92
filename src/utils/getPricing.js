import axios from 'axios';

const msIds = {
    'hello': '7',
    'segmento': '2',
    'email': '1',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'gb': 'GBP',
};

export default async function getPricing(country, page) {
    const msId = msIds[page];
    const currencySymbol = currency[country] || 'USD';
    if (page === 'segmento' || page === 'email' || page === 'hello') {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
            );

            return getSimplifiedPlans(currencySymbol, response.data.data);
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    } else if (page === 'whatsapp') {
        try {
            const response = await axios.get(`${process.env.WHATSAPP_PRICING_URL}/${currencySymbol}`);
            const messagePricing = response?.data?.data.sort((a, b) => a.country_name.localeCompare(b.country_name));
            const voicePricing = getWhatsAppVoicePricing(currencySymbol) || [];
            return {
                messagePricing: messagePricing || [],
                voicePricing: voicePricing || [],
            };
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    } else {
        return {};
    }
}

export function getSimplifiedPlans(currency, plans) {
    let simplifiedPlans = [];

    plans?.forEach((plan) => {
        const planAmounts = plan?.plan_amounts?.filter((amount) => amount?.currency?.short_name === currency);

        if (planAmounts && planAmounts.length > 0) {
            // Create a separate plan for each amount
            planAmounts.forEach((amount) => {
                simplifiedPlans.push({
                    'name': plan?.name,
                    'amount': {
                        plan_amount: amount?.plan_amount,
                        plan_type: amount?.plan_type?.name,
                    },
                    'included': plan?.plan_services?.map((service) => ({
                        'service_name': service?.service_credit?.service?.name,
                        'amount':
                            service?.service_credit?.service_credit_rates?.find(
                                (rate) => rate?.currency?.short_name === currency
                            )?.free_credits || 0,
                    })),
                    'features': plan?.plan_features
                        ?.filter((feature) => feature?.is_visible || !feature?.feature?.is_included)
                        ?.map((feature) => ({
                            'name': feature?.feature?.name,
                            'is_included': feature?.is_visible && feature?.feature?.is_included ? true : false,
                        })),
                    'extras': getPlanServices(plan, currency),
                });
            });
        }
    });

    return simplifiedPlans || [];
}

function getWhatsAppVoicePricing(currency) {
    try {
        const data = require(`@/data/whatsappVoicePricing.json`);
        const voicePricing = data[currency?.toLowerCase() || 'usd'];
        return voicePricing;
    } catch (error) {
        console.error('There was an error fetching the data!', error);
    }
}

function getPlanServices(plan, currency) {
    const servicesList = [];
    for (const service of plan?.plan_services || []) {
        const rate = service?.service_credit?.service_credit_rates?.find(
            (rate) => rate?.currency?.short_name === currency
        );
        const servicename = service?.service_credit?.service?.name;
        const free_credits = rate?.free_credits;
        const follow_up_rate = rate?.follow_up_rate;
        servicesList.push({ servicename, free_credits, follow_up_rate });
    }
    const extra = {
        servicesList,
        postpaidAllowed: plan.postpaid_allowed,
        showExtra: !servicesList.every((svc) => svc.free_credits === -1),
    };
    return extra;
}
