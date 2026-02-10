export default function contvertToLocal(number, currency, locale = null) {
    // If locale is provided, use it directly
    if (locale) {
        return Number(number).toLocaleString(locale);
    }

    // Fallback to currency-based logic for backward compatibility
    if (currency === 'INR') {
        return Number(number).toLocaleString('en-IN');
    } else {
        return Number(number).toLocaleString('en-US');
    }
}
