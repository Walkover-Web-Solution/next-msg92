import getDialPlan from './getDialPlan';
import getPlanServices from './getPlanServices';

/**
 * Converts raw API plans into a simplified shape for the UI (amounts, discount, features, dial_plan, extras).
 *
 * @param {Array<object>} [plans=[]] - Raw plan objects from the subscription API.
 * @param {string} currency - Currency code used to filter plan_amounts (e.g. 'INR', 'USD').
 * @returns {Array<object>} Simplified plans with slug, amount, discount, plan_features, dial_plan, extras, included.
 */
export default function getSimplifiedPlans(plans = [], currency) {
    return plans.map((plan) => {
        const amounts = plan?.plan_amounts?.filter((a) => a?.currency?.short_name === currency) ?? [];

        const getAmount = (type) => amounts.find((a) => a?.plan_type?.name === type)?.plan_amount ?? null;

        const included = (plan?.plan_services ?? []).map((service) => {
            const rate = service?.service_credit?.service_credit_rates?.find(
                (rate) => rate?.currency?.short_name === currency
            );
            return {
                service_name: service?.service_credit?.service?.name,
                amount: rate?.free_credits ?? 0,
            };
        });

        return {
            slug: plan?.slug,
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
            dial_plan: getDialPlan(plan),
            extras: getPlanServices(plan, currency),
        };
    });
}
