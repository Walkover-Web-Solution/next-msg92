export default function handler(req, res) {
    var folder = 'global';
    var file = 'home';
    try {
        const params = req.body;
        if (Object.keys(params).length !== 0) {
            console.log(params.slug.length);

            if (params.slug.length > 1) {
                folder = params.slug[0];
                file = params.slug[1];
            } else {
                folder = 'global';
                file = params.slug[0];
            }
        }
        let data;
        try {
            data = require(`@/data/${folder}/${file}.json`);
            if (data?.common) {
                data = require(`@/data/notfound.json`);
            }
        } catch (err) {
            data = require(`@/data/notfound.json`);
        }

        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'Hello from Next.js!' });
}
