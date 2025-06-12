export default function getData(params) {
    let data;
    try {
        if (params?.page === 'pricing') {
            data = require(`@/data/pages/${params?.country}/${params?.page}.json`);
        } else {
            if (params?.country === 'global') {
                if (params.page === 'home') {
                    data = require(`@/data/pages/global/home.json`);
                } else {
                    data = require(`@/data/pages/global/${params?.pathURL}.json`);
                }
            } else {
                if (params.page === 'home') {
                    data = require(`@/data/pages/${params?.country}/home.json`);
                } else {
                    data = require(`@/data/pages/${params?.pathURL}.json`);
                }
            }
        }
        if (data?.common) {
        }
    } catch (err) {
        data = require(`@/data/notfound.json`);
    }
    return data;
}
