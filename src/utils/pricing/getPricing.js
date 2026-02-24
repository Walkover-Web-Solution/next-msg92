import axios from 'axios';
import getSimplifiedPlans from './getSimplifiedPlans';

/** @type {Record<string, string>} Map of product page slugs to subscription API ms_id values. */
const msIds = {
    hello: '7',
    segmento: '2',
    email: '1',
    rcs: '9',
    whatsapp: '5',
};

/** @type {Record<string, string>} Map of country codes to currency short names. */
const currencyByCountry = {
    in: 'INR',
    us: 'USD',
    gb: 'GBP',
};

/** @type {Record<string, string>} Map of currency codes to symbols. */
const currencySymbols = {
    INR: '₹',
    USD: '$',
    GBP: '£',
};

/** @type {Record<string, string>} Map of country codes to locales for number formatting. */
const localeByCountry = {
    in: 'en-IN',
    us: 'en-US',
    gb: 'en-GB',
};

/**
 * Fetches and returns simplified pricing plans for a given country and product page.
 *
 * @param {string} countryCode - Two-letter country code (e.g. 'in', 'us', 'gb').
 * @param {string} page - Product page slug (e.g. 'hello', 'segmento', 'email', 'rcs', 'whatsapp').
 * @returns {Promise<Array<object>|object>} Array of simplified plan objects (slug, amount, discount, plan_features, dial_plan, extras), or empty object `{}` if page has no msId.
 * @throws {Error} When the pricing API request fails.
 */
export default async function getPricing(countryCode, page) {
    const msId = msIds[page];
    if (!msId) return {};

    const currency = currencyByCountry[countryCode] || 'USD';
    const symbol = currencySymbols[currency] || '$';
    const locale = localeByCountry[countryCode] || 'en-US';

    try {
        const plans = await fetchPlans(currency, msId);
        return getSimplifiedPlans(plans, currency, symbol, locale);
    } catch (error) {
        throw new Error(`Pricing fetch failed: ${error.message}`);
    }
}

/**
 * Fetches raw plan data from the subscription pricing API.
 *
 * @param {string} currency - Currency code (e.g. 'INR', 'USD', 'GBP').
 * @param {string} msId - Product ms_id used by the subscription API.
 * @returns {Promise<Array<object>>} Raw plan objects from the API, or empty array if no data.
 */
async function fetchPlans(currency, msId) {
    const { data } = await axios.get(`${process.env.SUBSCRIPTION_PRICING_URL}/plans`, {
        params: {
            currency,
            ms_id: msId,
            dial_plan_info: true,
        },
    });

    return data?.data ?? [];
}
