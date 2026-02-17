// Data transformation utilities for pricing plans

/**
 * Formats service display text based on included credits
 * @param {string} serviceName - Name of the service
 * @param {number|string} included - Number of included credits or -1 for unlimited
 * @returns {string} Formatted display text
 */
export function formatServiceDisplayText(serviceName, included) {
    const isUnlimited = included === -1 || included === '-1';
    return isUnlimited ? `Unlimited ${serviceName}` : `${Number(included)} ${serviceName}/month`;
}

/**
 * Transforms plan services into included services format
 * @param {Object} plan - Pricing plan object
 * @returns {Array} Array of included services with display text and dial plan info
 */
export function transformIncludedServices(plan) {
    return (plan?.services ?? []).map((service) => {
        const dialPlan = service?.dialplan;
        const serviceName = service?.serviceName;
        return {
            displayText: formatServiceDisplayText(serviceName, service.included),
            hasDialPlan: Boolean(dialPlan?.data?.length > 0),
            service_name: serviceName,
        };
    });
}

/**
 * Transforms plan services into extra services format
 * @param {Object} plan - Pricing plan object
 * @param {string} symbol - Currency symbol
 * @returns {Array} Array of extra services with pricing info
 */
export function transformExtraServices(plan, symbol) {
    const postpaidAllowed = plan?.postpaidAllowed;

    return (plan?.services ?? [])
        .filter((service) => {
            const freeCredits = service?.included;
            const hasDialPlan = service?.dialplan != null;
            return !hasDialPlan && freeCredits !== -1 && freeCredits !== '-1';
        })
        .map((service) => {
            const followUpRate = service?.extra;
            const serviceName = service?.serviceName;
            const showRate = followUpRate && postpaidAllowed;
            return showRate
                ? { label: `${symbol}${followUpRate}/${serviceName}/month`, isNoExtra: false }
                : { label: `No extra ${serviceName}`, isNoExtra: true };
        });
}

/**
 * Transforms plan features into displayable format
 * @param {Object} plan - Pricing plan object
 * @returns {Array} Array of visible features with inclusion status
 */
export function transformFeatures(plan) {
    const planFeatures = plan?.plan_features;
    if (!planFeatures) return [];

    return planFeatures
        .filter((feature) => {
            const isVisible = feature.is_visible;
            return isVisible;
        })
        .map((feature) => {
            const featureName = feature.name;
            const isIncluded = feature.is_included;
            return { name: featureName, is_included: isIncluded };
        });
}

/**
 * Gets a formatted plan title from plan data
 * @param {Object} plan - Pricing plan object
 * @returns {string} Formatted plan title
 */
export function getPlanTitle(plan) {
    if (plan?.name) return plan.name;
    if (plan?.slug) {
        return String(plan.slug).charAt(0).toUpperCase() + String(plan.slug).slice(1);
    }
    return 'Plan';
}

/**
 * Transforms a pricing plan into a simplified card format
 * @param {Object} plan - Pricing plan object
 * @param {string} tabtype - 'Monthly' or 'Yearly'
 * @param {Object} plansPageData - Page data for CTA text
 * @param {string} symbol - Currency symbol
 * @returns {Object} Simplified plan card data
 */
export function simplifiedPlanToCard(plan, tabtype, plansPageData, symbol) {
    const isMonthly = tabtype === 'Monthly';
    const period = isMonthly ? 'Monthly' : 'Yearly';

    // Get pre-computed pricing for the selected tab
    const pricing = isMonthly ? plan?.pricing?.monthly : plan?.pricing?.yearly;

    const included = transformIncludedServices(plan);
    const extra = transformExtraServices(plan, symbol);
    const features = transformFeatures(plan);
    const title = getPlanTitle(plan);
    const hasDialPlan =
        plan?.services?.some((service) => {
            const dialPlan = service?.dialplan;
            return dialPlan?.data?.length > 0;
        }) ?? false;

    return {
        slug: plan?.slug,
        title,
        price: pricing?.price ?? 'Free',
        originalPrice: pricing?.originalPrice ?? null,
        discountLabel: pricing?.discountLabel ?? null,
        period,
        ctaText: plansPageData?.ctaText,
        showLink: true,
        linkText: plansPageData?.viewCallingRatesText,
        hasDialPlan,
        included,
        features,
        extra,
    };
}
