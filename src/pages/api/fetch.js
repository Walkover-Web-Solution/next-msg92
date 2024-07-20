
export default function handler(req, res) {
    const { lang, country } = req.query;
    if (!lang) {
        res.status(400).json({ error: 'Name query parameter is required' });
        return;
    }

    try {
        console.log('api', req.query);        
        const data = require('@/data/in/en.json');
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'Hello from Next.js!' })
}