import axios from 'axios';
import getPlanServices from './getPlanServices';

const PLAN_CONFIG = {
    unlimitedWa: {
        displayName: 'unlimitedWa',
        price: 2,
        period: ' / Month',
        features: [
            '2 months free subscription',
            "Messages charged at Meta's exact rate",
            'Built for scale and daily messaging',
        ],
    },
    freeWA: {
        displayName: 'freeWA',
        price: 0,
        period: ' / Month',
        features: [
            'Charged only per message sent',
            'Standard MSG91 message pricing applies',
            'Built for occasional messaging needs',
        ],
    },
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
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}&dial_plan_info=true`
            );
            const messagePricing = getWhatsappmessagePricing(response);
            const voicePricing = getWhatsAppVoicePricing(currencySymbol);

            return {
                messagePricing: messagePricing || [],
                voicePricing: voicePricing || [],
                planConfig: PLAN_CONFIG,
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
    const getValue = (field) => field?.value ?? field ?? null;
    const allPricingData = [];
    const seenKeys = new Set();
    const sortByCountry = (a, b) => (a.country_name || '').localeCompare(b.country_name || '');

    for (const plan of response?.data?.data || []) {
        if (!plan?.name) continue;

        for (const service of plan?.plan_services || []) {
            for (const rate of service?.service_credit?.service_credit_rates || []) {
                for (const item of rate?.dial_plan_info?.data || []) {
                    const countryName = getValue(item.country_name);
                    if (!countryName) continue;

                    const key = `${plan.name}_${countryName}_${getValue(item.prefix)}`;

                    if (!seenKeys.has(key)) {
                        seenKeys.add(key);
                        allPricingData.push({
                            planName: plan.name,
                            country_name: countryName,
                            prefix: getValue(item.prefix),
                            marketing_rate: getValue(item.marketing_rate),
                            utility_rate: getValue(item.utility_rate),
                            authentication_rate: getValue(item.authentication_rate),
                        });
                    }
                }
            }
        }
    }

    return allPricingData.sort(sortByCountry);
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
