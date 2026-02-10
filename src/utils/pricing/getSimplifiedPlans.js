/**
 * Converts raw API plans into a simplified shape for the UI (amounts, discount, features, extras, included with optional dial_plan per service).
 *
 * @param {Array<object>} [plans=[]] - Raw plan objects from the subscription API.
 * @param {string} currency - Currency code used to filter plan_amounts (e.g. 'INR', 'USD').
 * @param {string} symbol - Currency symbol for formatting prices (e.g. '₹', '$').
 * @param {string} locale - Locale for number formatting (e.g. 'en-IN', 'en-US').
 * @returns {Array<object>} Simplified plans with slug, amount, discount, plan_features, extras, included (each item may have dial_plan: { columns, data }).
 */
export default function getSimplifiedPlans(plans = [], currency, symbol = '', locale = 'en-US') {
    return plans.map((plan) => {
        const amounts = plan?.plan_amounts?.filter((amount) => amount?.currency?.short_name === currency) ?? [];

        const getAmount = (type) => amounts.find((amount) => amount?.plan_type?.name === type)?.plan_amount ?? null;

        // Build unified services array with all service information
        const services = (plan?.plan_services ?? []).map((service) => {
            const ratesForCurrency =
                service?.service_credit?.service_credit_rates?.filter((r) => r?.currency?.short_name === currency) ??
                [];
            const rate = ratesForCurrency[0];
            const rateWithDialPlan = ratesForCurrency.find((r) => r?.dial_plan_info);
            const dialplan =
                rateWithDialPlan?.dial_plan_info != null
                    ? normalizeDialPlanInfo(rateWithDialPlan.dial_plan_info)
                    : null;

            return {
                serviceName: service?.service_credit?.service?.name ?? '',
                included: rate?.free_credits ?? 0,
                extra: rate?.follow_up_rate ?? null,
                dialplan,
            };
        });

        const monthlyAmount = getAmount('Monthly');
        const yearlyAmount = getAmount('Yearly');
        const discount = getSimplifiedDiscount(plan?.plan_amounts?.[0]?.applied_discounts);

        // Pre-compute pricing with discount for both monthly and yearly
        const pricing = {
            monthly: computePricing(monthlyAmount, discount, symbol, locale),
            yearly: computePricing(yearlyAmount, discount, symbol, locale),
        };

        return {
            slug: plan?.slug,
            name: plan?.name,
            amount: {
                monthly: monthlyAmount,
                yearly: yearlyAmount,
            },
            pricing,
            services,
            plan_features: (plan?.plan_features ?? []).map((feature) => ({
                name: feature?.feature?.name ?? feature?.userFriendlyName ?? feature?.key ?? '',
                is_visible: feature?.hide === true ? false : (feature?.is_visible ?? true),
                is_included: feature?.feature?.is_included ?? feature?.is_included ?? false,
            })),
            postpaidAllowed: plan.postpaid_allowed,
        };
    });
}

/**
 * Builds simplified discount from applied_discounts array (uses first discount).
 */
function getSimplifiedDiscount(appliedDiscounts) {
    const discount = appliedDiscounts?.[0];
    if (!discount) return null;
    return {
        type_id: discount.discount_type_id,
        value: discount.value,
        duration: discount.duration,
        action: discount.discount_type?.action,
    };
}

/**
 * Computes pricing with discount applied.
 */
function computePricing(amount, discount, symbol, locale = 'en-US') {
    const numAmount = amount != null && !Number.isNaN(Number(amount)) ? Number(amount) : 0;

    if (numAmount === 0) {
        return { price: 'Free', originalPrice: null, discountLabel: null };
    }

    const formattedOriginal = `${symbol}${numAmount.toLocaleString(locale)}`;

    if (!discount || discount.value == null) {
        return { price: formattedOriginal, originalPrice: null, discountLabel: null };
    }

    // Calculate discounted amount
    const typeId = discount.type_id;
    const discountValue = Number(discount.value);
    let finalAmount = numAmount;

    if (typeId === 1) {
        // Fixed amount discount
        finalAmount = Math.max(0, numAmount - discountValue);
    } else if (typeId === 2) {
        // Percentage discount
        finalAmount = discountValue >= 100 ? 0 : Math.max(0, numAmount * (1 - discountValue / 100));
    }

    // Generate discount label
    const duration = discount.duration ?? 0;
    const monthText = `month${duration !== 1 ? 's' : ''}`;
    let discountLabel = null;

    if (typeId === 1) {
        discountLabel = `${symbol}${discountValue.toLocaleString(locale)} for ${duration} ${monthText}`;
    } else if (typeId === 2) {
        const percentage = discountValue >= 100 ? 100 : discountValue;
        discountLabel = `${percentage}% off for ${duration} ${monthText}`;
    }

    return {
        price: `${symbol}${finalAmount.toLocaleString(locale)}`,
        originalPrice: formattedOriginal,
        discountLabel,
    };
}

/**
 * Normalizes raw dial_plan_info from API into { columns, data }.
 */
function normalizeDialPlanInfo(dialPlanInfo) {
    const { headers = [], data = [] } = dialPlanInfo || {};
    return {
        columns: headers?.map((header) => ({
            key: header.key,
            label: header.userFriendlyName || header.key,
        })),
        data: data.map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))),
    };
}
