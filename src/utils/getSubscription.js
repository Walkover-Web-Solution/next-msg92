import axios from 'axios';

export default async function GetSubscriptions(currency, msId) {
    if (currency && msId) {
        try {
            // changeCurrencySymbol(currency);
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currency}&ms_id=${msId}`
            );
            return response.data.data;
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    }
}
