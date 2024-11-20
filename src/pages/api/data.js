export default function handler(req, res) {
    let data;

    try {
        const params = req?.body;

        try {
            if (params?.page === 'pricing') {
                data = require(`@/data/${params?.country}/${params?.page}.json`);
            } else {
                if (params?.country === 'global') {
                    if (params.page === 'home') {
                        data = require(`@/data/global/home.json`);
                    } else {
                        data = require(`@/data/global/${params?.pathURL}.json`);
                    }
                } else {
                    if (params.page === 'home') {
                        data = require(`@/data/${params?.country}/home.json`);
                    } else {
                        data = require(`@/data/${params?.pathURL}.json`);
                    }
                }
            }
            if (data?.common) {
                data = require(`@/data/notfound.json`);
            }
        } catch (err) {
            data = require(`@/data/notfound.json`);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: 'page not found' });
    }
}
