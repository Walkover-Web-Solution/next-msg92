export default function getCommonCompData(country, component) {
    const commonData = require(`@/data/${country}/common.json`);
    return commonData || {};
}
