import axios from 'axios';
import GetCurrencySymbol from './getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';

export default async function getSmsOtpPricing(country) {
    const { currency, symbol } = GetCurrencySymbol(country);
    const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
    const origin = currentCountry?.name || 'United States';
    const destination = origin;

    const amountArray =
        origin === 'India' && currency === 'INR'
            ? ['1250', '3300', '5400', '10200', '20000', '76500', '154000']
            : ['5000'];

    try {
        const fetchRequests = amountArray.map(async (amount) => {
            const response = await axios.get(
                `${process.env.PRICING_URL}/api/v5/web/fetchPricingDetails?amount=${amount}&currency=${currency}&originCountry=${origin}&destinationCountry=${destination}`
            );
            return response.data.data;
        });

        const pricingData = await Promise.all(fetchRequests);

        return { pricingData, currency, symbol, origin, destination, amountArray };
    } catch (error) {
        console.error('getSmsOtpPricing error:', error.message);
        return { currency, symbol, origin, destination, amountArray };
    }
}
