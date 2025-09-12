import axios from 'axios';

export default async function getPricing(country, page) {
    const msId = msIds[page];
    const currencySymbol = currency[country] || '$';
    if (page === 'segmento' || page === 'email' || page === 'hello') {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
            );
            return response.data.data;
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    } else if (page === 'otp' || page === 'sms') {
        try {
            const response = await axios.get(
                `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
            );
            return response.data.data;
        } catch (error) {
            throw new Error('Some error on server: ' + error.message);
        }
    }
}
const msIds = {
    'hello': '7',
    'segmento': '2',
    'email': '1',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'uk': 'GBP',
};
