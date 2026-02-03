import getPlanServices from './getPlanServices';

/**
 * Converts raw API plans into a simplified shape for the UI (amounts, discount, features, extras, included with optional dial_plan per service).
 *
 * @param {Array<object>} [plans=[]] - Raw plan objects from the subscription API.
 * @param {string} currency - Currency code used to filter plan_amounts (e.g. 'INR', 'USD').
 * @returns {Array<object>} Simplified plans with slug, amount, discount, plan_features, extras, included (each item may have dial_plan: { columns, data }).
 */
export default function getSimplifiedPlans(plans = [], currency) {
    return plans.map((plan) => {
        const amounts = plan?.plan_amounts?.filter((a) => a?.currency?.short_name === currency) ?? [];

        const getAmount = (type) => amounts.find((a) => a?.plan_type?.name === type)?.plan_amount ?? null;

        const included = (plan?.plan_services ?? []).map((service) => {
            const ratesForCurrency =
                service?.service_credit?.service_credit_rates?.filter((r) => r?.currency?.short_name === currency) ??
                [];
            const rateWithDialPlan = ratesForCurrency.find((r) => r?.dial_plan_info);
            const rateForAmount = ratesForCurrency[0] ?? rateWithDialPlan;
            const dial_plan =
                rateWithDialPlan?.dial_plan_info != null
                    ? normalizeDialPlanInfo(rateWithDialPlan.dial_plan_info)
                    : null;

            return {
                service_name: service?.service_credit?.service?.name,
                amount: rateForAmount?.free_credits ?? 0,
                dial_plan: dial_plan,
            };
        });

        return {
            slug: plan?.slug,
            name: plan?.name,
            amount: {
                monthly: getAmount('Monthly'),
                yearly: getAmount('Yearly'),
            },
            included,
            discount: {
                type_id: plan?.discount?.type_id ?? 2,
                value: plan?.discount?.value ?? 0,
                duration: plan?.discount?.duration ?? 'monthly',
            },
            plan_features: (plan?.plan_features ?? []).map((feature) => ({
                name: feature?.feature?.name ?? feature?.userFriendlyName ?? feature?.key ?? '',
                is_visible: feature?.hide === true ? false : (feature?.is_visible ?? true),
                is_included: feature?.feature?.is_included ?? feature?.is_included ?? false,
            })),
            extras: getPlanServices(plan, currency),
        };
    });
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
