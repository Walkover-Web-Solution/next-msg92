import axios from 'axios';
import GetCurrencySymbol from './getCurrencySymbol';
import GetCountryDetails from '@/utils/getCurrentCountry';

export default async function getVoicePricing(country) {
    try {
        const countryRes = await axios.get(`${process.env.VOICE_API_URL}/public/country/`);
        const countryData = countryRes.data;

        if (!Array.isArray(countryData) || countryData.length === 0) return {};

        const { currency, symbol } = GetCurrencySymbol(country);

        const currentCountry = GetCountryDetails({ shortname: country, type: 'shortname' });
        const normalizedCode = currentCountry?.shortname?.toLowerCase() || country?.toLowerCase();

        const selectedCountry = countryData.find((item) => item?.country_code?.toLowerCase() === normalizedCode);

        if (!selectedCountry?.id) return { countryData, currency, symbol };

        const dialPlanRes = await axios.get(
            `${process.env.VOICE_API_URL}/public/dialplanPricing/?currency=${currency}`
        );
        const dialPlanId = dialPlanRes.data?.data?.dialplan_id;

        if (!dialPlanId) return { countryData, selectedCountry, currency, symbol };

        const pricingRes = await axios.get(
            `${process.env.VOICE_API_URL}/public/pricing/?cid=${selectedCountry.id}&dialplan_id=${dialPlanId}`
        );
        const plans = pricingRes.data?.data;

        if (!Array.isArray(plans) || plans.length === 0) {
            return { countryData, selectedCountry, currency, symbol };
        }

        return {
            countryData,
            selectedCountry,
            plans,
            dialPlanId,
            currency,
            symbol,
        };
    } catch (error) {
        throw new Error(`Voice pricing fetch failed: ${error.message}`);
    }
}
