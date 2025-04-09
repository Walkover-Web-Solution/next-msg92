import specialpages from '@/data/specialPages.json';
export default function getCommonCompData(country) {
    let commonData = {};
    if (specialpages?.countries.includes(country)) {
        commonData = require(`@/data/${country}/common.json`);
    } else {
        commonData = require(`@/data/global/common.json`);
    }
    return commonData || {};
}
