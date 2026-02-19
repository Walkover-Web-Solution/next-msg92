export default function getPlanServices(plan, currency, includedServices = []) {
    // Create a Set of service names that have dial_plan
    const servicesWithDialPlan = new Set(
        includedServices.filter((svc) => svc?.dial_plan != null).map((svc) => svc?.service_name)
    );

    const servicesList = [];
    for (const service of plan?.plan_services || []) {
        const rate = service?.service_credit?.service_credit_rates?.find(
            (rate) => rate?.currency?.short_name === currency
        );
        const servicename = service?.service_credit?.service?.name;
        const free_credits = rate?.free_credits;
        const follow_up_rate = rate?.follow_up_rate;

        // Skip this service if it has a dial_plan (prioritize dial_plan over extras)
        if (servicesWithDialPlan.has(servicename)) {
            continue;
        }

        servicesList.push({ servicename, free_credits, follow_up_rate });
    }
    const extra = {
        servicesList,
        postpaidAllowed: plan.postpaid_allowed,
        showExtra: !servicesList.every((svc) => svc.free_credits === -1),
    };
    return extra;
}
