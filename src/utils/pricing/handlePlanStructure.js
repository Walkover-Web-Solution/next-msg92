export default function handlePlanStructure(plans, currency) {
    const structuredPlans = plans.flatMap((plan) =>
        (plan?.plan_amounts || []).map((plan_amount) => ({
            name: plan?.name || null,
            amount: plan_amount?.plan_amount || null,
            type: plan_amount?.plan_type?.name || null,
            discount: plan_amount?.applied_discounts || [],
            services: handleServices(plan?.plan_services || [], currency),
            features: handleFeatures(plan?.plan_features || []),
        }))
    );
    return structuredPlans;
}

function handleFeatures(features) {
    return features
        .filter((feature) => !feature?.is_visible || feature?.is_visible == 1)
        .map((feature) => ({
            name: feature?.feature?.name,
            included: feature?.feature?.is_included === 1,
        }));
}

function handleServices(services, currency) {
    return services.map((service) => {
        const allRates = service?.service_credit?.service_credit_rates ?? [];
        const ratesForCurrency = allRates.filter((r) => r?.currency?.short_name === currency);
        const rate = ratesForCurrency[0];
        // Prefer dial_plan_info from currency-matched rate, fall back to any rate that has it
        const rateWithDialPlan =
            ratesForCurrency.find((r) => r?.dial_plan_info) ?? allRates.find((r) => r?.dial_plan_info);
        const dialPlan =
            rateWithDialPlan?.dial_plan_info != null ? normalizeDialPlanInfo(rateWithDialPlan.dial_plan_info) : null;
        return {
            name: service?.service_credit?.service?.name || null,
            freeCredit: rate?.free_credits || null,
            followUpRate: rate?.follow_up_rate || null,
            dialPlan,
            chunkSize: rate?.chunk_size || 1,
        };
    });
}

function normalizeDialPlanInfo(dialPlanInfo) {
    const { headers = [], data = [] } = dialPlanInfo || {};
    return {
        columns: headers.map((header) => ({
            key: header.key,
            label: header.userFriendlyName || header.key,
        })),
        data: data.map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))),
    };
}
