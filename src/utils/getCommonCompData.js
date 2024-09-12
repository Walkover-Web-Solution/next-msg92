export default function getCommonCompData(country) {
    const commonData = require(`@/data/${country}/common.json`);
    return commonData || {};
}
