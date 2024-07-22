export default function handler(req, res) {            
    try {
        const data = req.body;
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            const data = require('@/data/home.json');
            res.status(200).json(data);
            return;
            //res.status(400).json({ error: 'Data is an empty object' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'Hello from Next.js!' })
}



