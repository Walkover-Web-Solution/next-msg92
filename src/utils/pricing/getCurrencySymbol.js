import countries from '@/data/countries.json';

const localeMap = {
    INR: 'en-IN',
    GBP: 'en-GB',
    USD: 'en-US',
};

export default function GetCurrencySymbol(country) {
    if (country?.toLowerCase() === 'br-pt') {
        country = 'br';
    } else if (country?.toLowerCase() === 'fil-ph') {
        country = 'ph';
    }
    if (country) {
        const countryData = countries?.find((c) => c.shortname === country?.toUpperCase());
        if (countryData && countryData?.currency) {
            const currency = countryData?.currency || 'USD';
            const locale = localeMap[currency] || 'en-US';
            switch (currency) {
                case 'GBP':
                    return { symbol: '£', currency: currency, locale };
                case 'INR':
                    return { symbol: '₹', currency: currency, locale };
                default:
                    return { symbol: '$', currency: currency, locale };
            }
        } else return { symbol: '$', currency: 'USD', locale: 'en-US' };
    } else return { symbol: '$', currency: 'USD', locale: 'en-US' };
}
