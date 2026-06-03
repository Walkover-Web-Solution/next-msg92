export default function handlePlanStructure(plans, currency) {
    const structuredPlans = (plans || []).flatMap((plan) =>
        (plan?.plan_amounts || [])
            .filter((plan_amount) => plan_amount?.currency?.short_name === currency)
            .map((plan_amount) => ({
                name: plan?.name || null,
                amount: plan_amount?.plan_amount ?? null,
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
        const ratesWithDialPlan = ratesForCurrency.filter((r) => r?.dial_plan_info?.data?.length);
        const rateWithDialPlan = ratesWithDialPlan.sort(
            (a, b) => (b.dial_plan_info?.data?.length ?? 0) - (a.dial_plan_info?.data?.length ?? 0)
        )[0];
        const rate = rateWithDialPlan ?? ratesForCurrency[0];
        const dialPlan =
            rateWithDialPlan?.dial_plan_info != null ? normalizeDialPlanInfo(rateWithDialPlan.dial_plan_info) : null;
        return {
            name: service?.service_credit?.service?.name || null,
            freeCredit: rate?.free_credits || null,
            followUpRate: rate?.follow_up_rate || null,
            dialPlan,
            chunkSize: rate?.chunk_size || 1,
            postPaidAllowed: rate?.postpaid_allowed ?? null,
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
