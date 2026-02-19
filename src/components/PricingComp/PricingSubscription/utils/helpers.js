// Helper utilities for PricingSubscription component

/**
 * Checks if pricing data contains any yearly plans
 * @param {Array} pricingData - Array of pricing plans
 * @returns {boolean} True if any plan has yearly pricing
 */
export function checkHasYearlyPlans(pricingData) {
    if (!Array.isArray(pricingData)) return false;
    return pricingData.some((plan) => plan?.amount?.yearly != null);
}

/**
 * Gets the count of plans available for the selected tab type
 * @param {Array} pricingData - Array of pricing plans
 * @param {string} tabtype - 'Monthly' or 'Yearly'
 * @returns {number} Count of plans with pricing for the selected tab
 */
export function getPlansCountForTab(pricingData, tabtype) {
    if (!Array.isArray(pricingData)) return 0;
    const hasAmountForTab = (plan) =>
        tabtype === 'Monthly' ? plan?.amount?.monthly != null : plan?.amount?.yearly != null;
    return pricingData.filter(hasAmountForTab).length;
}
