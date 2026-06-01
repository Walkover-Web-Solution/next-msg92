/**
 * Format amounts with ISO currency code (e.g. "70 AED") instead of symbols (e.g. "د.إ70").
 * Matches subscription API `currency.short_name` from plan_amounts.
 */

export function formatPriceAmount(amount, currency, locale = 'en-IN') {
    if (amount == null || amount === '') return '—';
    if (Number(amount) === 0) return formatZeroPrice(currency);
    const formatted = Number(amount).toLocaleString(locale);
    return currency ? `${formatted} ${currency}` : formatted;
}

export function formatUnitPrice(rate, currency, locale = 'en-IN') {
    const n = Number(rate);
    if (Number.isNaN(n)) return currency ? `0 ${currency}` : '0';
    const options = n >= 1 ? { maximumFractionDigits: 2 } : { minimumFractionDigits: 2, maximumFractionDigits: 6 };
    const formatted = n.toLocaleString(locale, options);
    return currency ? `${formatted} ${currency}` : formatted;
}

export function formatZeroPrice(currency) {
    return currency ? `0 ${currency}` : '0';
}
