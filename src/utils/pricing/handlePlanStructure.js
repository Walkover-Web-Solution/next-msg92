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
        const rateWithDialPlan = ratesForCurrency.find((r) => r?.dial_plan_id);
        const rate = rateWithDialPlan ?? ratesForCurrency[0];
        const dialPlan = rateWithDialPlan?.dial_plan_id
            ? {
                  serviceId: service?.service_credit?.service?.id,
                  dialPlanId: rateWithDialPlan.dial_plan_id,
              }
            : null;
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
