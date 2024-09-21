export default function GetCurrencySymbol(currency) {
    console.log('🚀 ~ GetCurrencySymbol ~ currency:', currency);
    switch (currency) {
        case 'GBP':
            return '£';
        case 'INR':
            return '₹';
        default:
            return '$';
    }
}
