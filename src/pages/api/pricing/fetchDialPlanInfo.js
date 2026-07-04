import axios from 'axios';

export default async function handler(req, res) {
    const { service_id, dial_plan_id, currency, page_no, per_page, search } = req.query;
    const baseUrl = process.env.SUBSCRIPTION_PRICING_URL;

    try {
        const response = await axios.get(`${baseUrl}/fetchDialPlanInfo`, {
            params: {
                service_id,
                dial_plan_id,
                currency,
                ui_friendly: 1,
                page: page_no,
                per_page,
                search,
            },
        });

        return res.status(response.status).json(response.data);
    } catch (err) {
        return res.status(err.response.status).json(err.response.data);
    }
}
