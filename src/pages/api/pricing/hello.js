import axios from 'axios';
import handlePlanStructure from '@/utils/pricing/handlePlanStructure';

const MS_ID = '7';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const requested = String(req.query.currency || 'USD').toUpperCase();
    const currency = requested === 'BRL' ? 'BRL' : 'USD';
    const baseUrl = process.env.SUBSCRIPTION_PRICING_URL;

    if (!baseUrl) {
        return res.status(200).json({ pricingData: [], currency: 'USD', unavailable: true });
    }

    const fetchPlans = async (curr) => {
        const { data } = await axios.get(`${baseUrl}/plans`, {
            params: {
                currency: curr,
                ms_id: MS_ID,
            },
        });
        const raw = data?.data?.data || [];
        return handlePlanStructure(raw, curr);
    };

    try {
        const pricingData = await fetchPlans(currency);
        return res.status(200).json({ pricingData, currency });
    } catch (err) {
        if (currency === 'BRL') {
            try {
                const pricingData = await fetchPlans('USD');
                return res.status(200).json({ pricingData, currency: 'USD', brlFallback: true });
            } catch {
                return res.status(200).json({ pricingData: [], currency: 'USD' });
            }
        }
        return res.status(200).json({ pricingData: [], currency: 'USD' });
    }
}
