import countries from '@/data/countries.json';
export default function GetCurrencySymbol(country) {
    if (country) {
        const countryData = countries?.find((c) => c.shortname === country?.toUpperCase());
        if (countryData && countryData?.currency) {
            const currency = countryData?.currency || 'USD';
            switch (currency) {
                case 'GBP':
                    return { symbol: '£', currency: currency };
                case 'INR':
                    return { symbol: '₹', currency: currency };
                default:
                    return { symbol: '$', currency: currency };
            }
        } else return { symbol: '$', currency: 'USD' };
    } else return { symbol: '$', currency: 'USD' };
}
