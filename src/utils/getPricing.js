import axios from 'axios';
import getPlanServices from './getPlanServices';

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
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}&dial_plan_info=true`
            );
            const messagePricing = getWhatsappmessagePricing(response);
            const voicePricing = getWhatsAppVoicePricing(currencySymbol);

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
const msIds = {
    'hello': '7',
    'segmento': '2',
    'email': '1',
    'whatsapp': '5',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'gb': 'GBP',
};

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

function getWhatsappmessagePricing(response) {
    const dialPlanInfoRaw = (response?.data?.data || [])
        .flatMap((plan) => plan?.plan_services || [])
        .flatMap((service) => service?.service_credit?.service_credit_rates || [])
        .flatMap((rate) => rate?.dial_plan_info?.data || []);

    const uniqueEntriesMap = new Map();

    for (const item of dialPlanInfoRaw) {
        const countryName = item?.country_name?.value ?? item?.country_name;
        if (!countryName) continue;

        const prefix = item?.prefix?.value ?? item?.prefix ?? null;
        const uniqueKey = `${countryName}_${prefix}`;

        if (!uniqueEntriesMap.has(uniqueKey)) {
            const getRate = (field) => {
                const val = item?.[field]?.value ?? item?.[field];
                return val === null || val === undefined ? null : val === '0E-10' || val === '0' ? '0' : String(val);
            };
            uniqueEntriesMap.set(uniqueKey, {
                country_name: countryName,
                prefix: prefix,
                marketing_rate: getRate('marketing_rate'),
                utility_rate: getRate('utility_rate'),
                authentication_rate: getRate('authentication_rate'),
            });
        }
    }
    return Array.from(uniqueEntriesMap.values()).sort((a, b) =>
        (a.country_name || '').localeCompare(b.country_name || '')
    );
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
