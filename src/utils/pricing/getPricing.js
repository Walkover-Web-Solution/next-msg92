import axios from 'axios';
import getPlanServices from './getPlanServices';

const products = ['segmento', 'email', 'hello', 'rcs'];

export default async function getPricing(country, page) {
    const msId = msIds[page];
    const currencySymbol = currency[country] || 'USD';
    if (products.includes(page)) {
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
            const response = await axios.get(`${process.env.SUBSCRIPTION_PRICING_URL}/${currencySymbol}&ms_id=${msId}`);
            const messagePricing =
                response?.data?.data.sort((a, b) => a.country_name.localeCompare(b.country_name)) || [];
            const voicePricing = getWhatsAppVoicePricing(currencySymbol) || [];
            return {
                messagePricing,
                voicePricing,
            };
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            return {};
        }
    } else {
        return {};
    }
}
const msIds = {
    'hello': '7',
    'segmento': '2',
    'email': '1',
    'rcs': '9',
    'whatsapp': '5',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'gb': 'GBP',
};

export function getSimplifiedPlans(currency, plans) {
    const simplifiedPlans = [];

    plans?.forEach((plan) => {
        const planAmounts = plan?.plan_amounts?.filter((amount) => amount?.currency?.short_name === currency);
        if (!planAmounts?.length) return;

        const monthlyAmount = planAmounts.find((a) => a?.plan_type?.name === 'Monthly')?.plan_amount;
        const yearlyAmount = planAmounts.find((a) => a?.plan_type?.name === 'Yearly')?.plan_amount;

        simplifiedPlans.push({
            slug: plan?.slug ?? (plan?.name || '').toLowerCase().replace(/\s+/g, '-'),
            amount: {
                monthly: monthlyAmount ?? null,
                yearly: yearlyAmount ?? null,
            },
            discount: {
                type_id: plan?.discount?.type_id ?? 2,
                value: plan?.discount?.value ?? 0,
                duration: plan?.discount?.duration ?? 'monthly',
            },
            plan_features: (plan?.plan_features || []).map((feature) => ({
                name: feature?.feature?.name ?? '',
                is_visible: feature?.is_visible ?? true,
                is_included: feature?.feature?.is_included ?? false,
            })),
            dial_plan: {
                headers: plan?.dial_plan?.headers ?? [],
                data: plan?.dial_plan?.data ?? [],
            },
        });
    });

    console.log('🚀 ~ getSimplifiedPlans ~ simplifiedPlans:', simplifiedPlans);
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
