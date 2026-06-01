import axios from 'axios';
import handlePlanStructure from './handlePlanStructure';

/** @type {Record<string, string>} Map of product page slugs to subscription API ms_id values. */
const msIds = {
    hello: '7',
    segmento: '2',
    email: '1',
    rcs: '9',
    whatsapp: '5',
    otpwidget: '8',
};

/** @type {Record<string, string>} Map of country codes to currency short names. */
const currencyByCountry = {
    in: 'INR',
    us: 'USD',
    gb: 'GBP',
    ae: 'AED',
};

/** @type {Record<string, string>} Map of country codes to locales for number formatting. */
const localeByCountry = {
    in: 'en-IN',
    us: 'en-US',
    gb: 'en-GB',
    ae: 'en-AE',
};

/**
 * Fetches and returns simplified pricing plans for a given country and product page.
 *
 * @param {string} countryCode - Two-letter country code (e.g. 'in', 'us', 'gb', 'ae').
 * @param {string} page - Product page slug (e.g. 'hello', 'segmento', 'email', 'rcs', 'whatsapp', 'otpwidget').
 * @returns {Promise<Array<object>|object>} Array of simplified plan objects (slug, amount, discount, plan_features, dial_plan, extras), or empty object `{}` if page has no msId.
 * @throws {Error} When the pricing API request fails.
 */
export default async function getPricing2(countryCode, page) {
    const msId = msIds[page];
    if (!msId) return {};

    const currency = currencyByCountry[countryCode] || 'USD';

    try {
        const requestCurrency = currency === 'AED' ? null : currency;
        const plans = await getSubscriptions(requestCurrency, msId);
        const structuredPlans = handlePlanStructure(plans, currency);
        return structuredPlans;
    } catch (error) {
        throw new Error(`Pricing fetch failed: ${error.message}`);
    }
}

/**
 * Fetches raw plan data from the subscription pricing API.
 *
 * @param {string|null} currency - Optional query currency (omit for AED pages — API rejects AED and returns full plans without this param).
 * @param {string} msId - Product ms_id used by the subscription API.
 * @returns {Promise<Array<object>>} Raw plan objects from the API, or empty array if no data.
 */
async function getSubscriptions(currency, msId) {
    const params = {
        ms_id: msId,
        dial_plan_info: true,
    };
    if (currency) params.currency = currency;

    const data = await axios.get(`${process.env.SUBSCRIPTION_PRICING_URL}/plans`, {
        params,
    });
    return data?.data?.data || [];
}
