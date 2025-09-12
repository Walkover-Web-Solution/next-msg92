import axios from 'axios';

export default async function getPricing(country, page) {
    const msId = msIds[page];
    const currencySymbol = currency[country] || '$';
    try {
        const response = await axios.get(
            `${process.env.SUBSCRIPTION_PRICING_URL}/plans?currency=${currencySymbol}&ms_id=${msId}`
        );
        return response.data.data;
    } catch (error) {
        throw new Error('Some error on server: ' + error.message);
    }
}
const msIds = {
    'campaign': '1',
    'hello': '2',
    'segmento': '3',
    'otp': '4',
    'email': '5',
    'sms': '6',
    'voice': '7',
    'whatsapp': '8',
    'rcs': '9',
    'telegram': '10',
    'numbers': '11',
    'push': '12',
    'knowledgebase': '13',
    'shortener': '14',
    'hosting': '15',
    'reports': '16',
};

const currency = {
    'in': 'INR',
    'us': 'USD',
    'uk': 'GBP',
};
