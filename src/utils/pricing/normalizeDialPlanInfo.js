export default function normalizeDialPlanInfo(dialPlanInfo) {
    const { headers = [], data = [] } = dialPlanInfo || {};
    return {
        columns: headers.map((header) => ({
            key: header.key,
            label: header.userFriendlyName || header.key,
        })),
        data: data.map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, cell?.value ?? '']))),
    };
}
