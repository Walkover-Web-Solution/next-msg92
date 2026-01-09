import axios from 'axios';
import getPlanServices from './getPlanServices';

const allowedPlans = ['Quantum', 'Titan'];
const defaultFeatures = {
    Quantum: [
        'Charged only per message sent',
        'Standard MSG91 message pricing applies',
        'Built for occasional messaging needs',
    ],
    Titan: [
        '2 months free subscription',
        "Messages charged at Meta's exact rate",
        'Built for scale and daily messaging',
    ],
};

/**
 * Builds plan configuration for Quantum and Titan plans only
 * @param {Array} plans - Array of plan objects from API
 * @param {string} currencySymbol - Currency symbol (e.g., 'USD', 'INR')
 * @param {string} periodType - Period type ('monthly' or 'yearly')
 * @returns {Object} - Configuration object with plan details
 */
function buildPlanConfig(plans, currencySymbol, periodType = 'monthly') {
    const config = {};
    const period = periodType.toLowerCase();
    const periodMap = {
        monthly: { search: 'monthly', display: ' / Month' },
        yearly: { search: 'yearly', display: ' / Year' },
    };
    const periodConfig = periodMap[period] || periodMap.monthly;

    plans?.forEach((plan) => {
        if (!plan?.name || !allowedPlans.includes(plan.name)) return;

        const planAmounts = plan?.plan_amounts?.filter((amount) => amount?.currency?.short_name === currencySymbol);

        if (!planAmounts?.length) return;

        const planAmount =
            planAmounts.find((amount) => amount?.plan_type?.name?.toLowerCase() === periodConfig.search) ||
            planAmounts[0];

        config[plan.name] = {
            displayName: plan.name,
            price: planAmount?.plan_amount || 0,
            period: periodConfig.display,
            features: defaultFeatures[plan.name] || defaultFeatures.Quantum,
        };
    });

    return config;
}

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
            const messagePricingByPlan = getWhatsAppMessagePricing(response);
            const voicePricing = getWhatsAppVoicePricing(currencySymbol);
            const dynamicPlanConfig = buildPlanConfig(response.data.data, currencySymbol);

            // Combine message pricing with plan config into structured format
            const messagePricing = simplifiedMessagePricingWithConfig(
                messagePricingByPlan,
                dynamicPlanConfig,
                response.data.data,
                currencySymbol
            );

            return {
                messagePricing: messagePricing || [],
                voicePricing: voicePricing || [],
                planConfig: dynamicPlanConfig,
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

/**
 * Extracts WhatsApp message pricing data for Quantum and Titan plans
 * @param {Object} response - API response containing plan data
 * @returns {Object} - Object with plan names as keys and arrays of country pricing data as values
 */
function getWhatsAppMessagePricing(response) {
    const allowedPlans = ['Quantum', 'Titan'];
    const getValue = (field) => field?.value ?? field ?? null;
    const pricingDataByPlan = {};
    const seenKeys = new Set();
    const sortByCountry = (a, b) => (a.country_name || '').localeCompare(b.country_name || '');

    for (const plan of response?.data?.data || []) {
        if (!plan?.name || !allowedPlans.includes(plan.name)) continue;
        if (!pricingDataByPlan[plan.name]) {
            pricingDataByPlan[plan.name] = [];
        }
        for (const service of plan?.plan_services || []) {
            for (const rate of service?.service_credit?.service_credit_rates || []) {
                for (const item of rate?.dial_plan_info?.data || []) {
                    const countryName = getValue(item.country_name);
                    if (!countryName) continue;

                    const key = `${plan.name}_${countryName}_${getValue(item.prefix)}`;
                    if (seenKeys.has(key)) continue;

                    seenKeys.add(key);
                    pricingDataByPlan[plan.name].push({
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

    Object.values(pricingDataByPlan).forEach((data) => data.sort(sortByCountry));
    return pricingDataByPlan;
}

/**
 * Combines message pricing data with plan configuration
 * @param {Object} messagePricingByPlan - Object with plan names as keys and country data arrays as values
 * @param {Object} planConfig - Plan configuration object from buildPlanConfig
 * @param {Array} plans - Original plan array from API
 * @param {string} currencySymbol - Currency symbol (e.g., 'USD', 'INR')
 * @returns {Array} - Array of plan objects
 */
function simplifiedMessagePricingWithConfig(messagePricingByPlan, planConfig, plans, currencySymbol) {
    const ALLOWED_PLANS = ['Quantum', 'Titan'];
    const simplifiedPlans = [];

    for (const plan of plans || []) {
        if (!plan?.name || !ALLOWED_PLANS.includes(plan.name)) continue;
        if (!messagePricingByPlan[plan.name]?.length) continue;

        const planAmounts = plan?.plan_amounts?.filter((amount) => amount?.currency?.short_name === currencySymbol);
        if (!planAmounts?.length) continue;

        const monthlyAmount =
            planAmounts.find((amount) => amount?.plan_type?.name?.toLowerCase() === 'monthly') || planAmounts[0];

        const config = planConfig[plan.name];
        simplifiedPlans.push({
            planName: plan.name,
            amount: {
                plan_amount: monthlyAmount?.plan_amount || 0,
                plan_type: monthlyAmount?.plan_type?.name || 'monthly',
            },
            description: config?.features || defaultFeatures[plan.name] || defaultFeatures.Quantum,
            country_data: messagePricingByPlan[plan.name],
        });
    }

    return simplifiedPlans;
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
