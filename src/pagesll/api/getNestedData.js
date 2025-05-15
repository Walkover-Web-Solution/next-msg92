export default function handler(req, res) {
    let data;

    try {
        const params = req?.body;
        try {
            if (params?.country === 'global') {
                data = require(`@/data/global/${params?.pathURL}.json`);
            } else {
                data = require(`@/data/${params?.pathURL}.json`);
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
