export default function handler(req, res) {
    try {
        const params = req.body;
        const folder = params.slug[0] ? params.slug[0] : 'global';
        const file = params.slug[1] ? params.slug[1] : 'home';
        const data = require(`@/data/${folder}/${file}.json`);
        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'Hello from Next.js!' })
}