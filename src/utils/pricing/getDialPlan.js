/**
 * Extracts and normalizes dial plan info from a plan's service credit rates.
 *
 * @param {object} plan - Raw plan object from the API (may contain plan_services with service_credit_rates).
 * @returns {{ columns: Array<{ key: string, label: string }>, data: Array<object> }} Normalized dial plan with column definitions and row data; empty structure if no dial_plan_info.
 */
export default function getDialPlan(plan) {
    const rate = plan?.plan_services
        ?.flatMap((service) => service?.service_credit?.service_credit_rates || [])
        ?.find((rate) => rate?.dial_plan_info);

    if (!rate?.dial_plan_info) {
        return { columns: [], data: [] };
    }

    const { headers = [], data = [] } = rate.dial_plan_info;

    return {
        columns: headers?.map((header) => ({
            key: header.key,
            label: header.userFriendlyName || header.key,
        })),
        data: data.map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))),
    };
}
