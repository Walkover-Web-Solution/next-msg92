export default function getData(params) {
    let pageData;
    let commonData;
    try {
        if (params?.page === 'pricing') {
            pageData = require(`@/data/pages/${params?.country}/${params?.page}.json`);
        } else {
            if (params?.country === 'global') {
                if (params.page === 'home') {
                    pageData = require(`@/data/pages/global/home.json`);
                } else {
                    pageData = require(`@/data/pages/global/${params?.pathURL}.json`);
                }
            } else {
                if (params.page === 'home') {
                    pageData = require(`@/data/pages/${params?.country}/home.json`);
                } else {
                    pageData = require(`@/data/pages/${params?.pathURL}.json`);
                }
            }
        }
        if (params?.country) {
            commonData = require(`@/data/pages/${params?.country}/common.json`);
        }
    } catch (err) {
        pageData = require(`@/data/notfound.json`);
    }
    return { pageData, commonData };
}
