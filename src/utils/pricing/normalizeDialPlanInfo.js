/** Internal BOT model identifiers returned by the API but not offered on public pricing. */
const HIDDEN_PUBLIC_DIAL_PLAN_IDENTIFIERS = new Set(['my-claude', 'default']);

function dialPlanRowIdentifier(row) {
    const id = row?.identifier?.value ?? row?.slug?.value ?? row?.identifier ?? row?.slug;
    return typeof id === 'string' ? id.trim().toLowerCase() : '';
}

export default function normalizeDialPlanInfo(dialPlanInfo) {
    const { headers = [], data = [] } = dialPlanInfo || {};
    const visibleColumns = headers.filter((header) => header?.hide !== true);
    const filteredData = data.filter((row) => !HIDDEN_PUBLIC_DIAL_PLAN_IDENTIFIERS.has(dialPlanRowIdentifier(row)));

    return {
        columns: visibleColumns.map((header) => ({
            key: header.key,
            label: header.userFriendlyName || header.key,
        })),
        data: filteredData.map((row) =>
            Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))
        ),
    };
}
