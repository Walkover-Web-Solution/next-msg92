import axios from 'axios';
import getPlanServices from './getPlanServices';

const subscriptionProducts = ['segmento', 'email', 'hello', 'rcs'];

const msIds = {
    hello: '7',
    segmento: '2',
    email: '1',
    rcs: '9',
    whatsapp: '5',
};

const currencyByCountry = {
    in: 'INR',
    us: 'USD',
    gb: 'GBP',
};

export default async function getPricing(countryCode, page) {
    const msId = msIds[page];
    if (!msId) return {};

    const currency = currencyByCountry[countryCode] || 'USD';

    try {
        const plans = await fetchPlans(currency, msId);
        const simplifiedPlans = simplifyPlans(plans, currency);

        if (subscriptionProducts.includes(page)) {
            return simplifiedPlans;
        }

        if (page === 'whatsapp') {
            const voicePricing = getWhatsAppVoicePricing(currency);
            return mergeWhatsAppPricing(simplifiedPlans, voicePricing);
        }

        return {};
    } catch (error) {
        throw new Error(`Pricing fetch failed: ${error.message}`);
    }
}

/* -------------------------------------------------------------------------- */
/*                                    API                                     */
/* -------------------------------------------------------------------------- */

async function fetchPlans(currency, msId) {
    const { data } = await axios.get(`${process.env.SUBSCRIPTION_PRICING_URL}/plans`, {
        params: {
            currency,
            ms_id: msId,
            dial_plan_info: true,
        },
    });

    return data?.data || [];
}

function extractDialPlan(plan) {
    const rate = plan?.plan_services
        ?.flatMap((service) => service?.service_credit?.service_credit_rates || [])
        ?.find((rate) => rate?.dial_plan_info);

    if (!rate?.dial_plan_info) {
        return { columns: [], data: [] };
    }

    const { headers = [], data = [] } = rate.dial_plan_info;

    return {
        columns: headers.map((h) => ({
            key: h.key,
            label: h.userFriendlyName || h.key,
        })),
        data: data.map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))),
    };
}

function simplifyPlans(plans = [], currency) {
    return plans.map((plan) => {
        const amounts = plan?.plan_amounts?.filter((a) => a?.currency?.short_name === currency) || [];

        const getAmount = (type) => amounts.find((a) => a?.plan_type?.name === type)?.plan_amount ?? null;

        return {
            slug: plan?.slug,

            amount: {
                monthly: getAmount('Monthly'),
                yearly: getAmount('Yearly'),
            },

            discount: {
                type_id: plan?.discount?.type_id ?? 2,
                value: plan?.discount?.value ?? 0,
                duration: plan?.discount?.duration ?? 'monthly',
            },

            plan_features: (plan?.plan_features || []).map((feature) => ({
                name: feature?.feature?.name ?? feature?.userFriendlyName ?? feature?.key ?? '',
                is_visible: feature?.hide === true ? false : (feature?.is_visible ?? true),
                is_included: feature?.feature?.is_included ?? feature?.is_included ?? false,
            })),

            dial_plan: extractDialPlan(plan),
            extras: getPlanServices(plan, currency),
        };
    });
}

function getWhatsAppVoicePricing(currency) {
    try {
        const data = require('@/data/whatsappVoicePricing.json');
        return data[currency.toLowerCase()] || [];
    } catch {
        return [];
    }
}

function buildDialPlanFromVoicePricing(pricing = []) {
    if (!pricing.length) return null;

    return {
        columns: Object.keys(pricing[0]).map((key) => ({
            key,
            label: key,
        })),
        data: pricing.map((row) => ({ ...row })),
    };
}

function mergeWhatsAppPricing(messagePlans = [], voicePricing = []) {
    const voiceDialPlan = buildDialPlanFromVoicePricing(voicePricing);
    if (!voiceDialPlan) return messagePlans;

    if (!messagePlans.length) {
        return [
            {
                slug: 'whatsapp-voice',
                amount: { monthly: null, yearly: null },
                discount: { type_id: 2, value: 0, duration: 'monthly' },
                plan_features: [],
                dial_plan: voiceDialPlan,
                extras: { servicesList: [] },
            },
        ];
    }

    messagePlans[0] = {
        ...messagePlans[0],
        dial_plan: voiceDialPlan,
    };

    return messagePlans;
}
