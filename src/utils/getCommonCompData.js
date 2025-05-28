export default function getCommonCompData(country) {
    console.log('⚡️ ~ :2 ~ getCommonCompData ~ country:', `@/data/${country}/common.json`);
    const commonData = require(`@/data/${country}/common.json`);
    return commonData || {};
}
