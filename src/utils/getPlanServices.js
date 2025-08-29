export default function getPlanServices(plan, currency) {
    const servicesList = [];
    for (const service of plan?.plan_services || []) {
        const rate = service?.service_credit?.service_credit_rates?.find(
            (rate) => rate?.currency?.short_name === currency
        );
        const servicename = service?.service_credit?.service?.name;
        const free_credits = rate?.free_credits;
        const follow_up_rate = rate?.follow_up_rate;
        servicesList.push({ servicename, free_credits, follow_up_rate });
    }
    const extra = {
        servicesList,
        postpaidAllowed: plan.postpaid_allowed,
        showExtra: !servicesList.every((svc) => svc.free_credits === -1),
    };
    return extra;
}
