export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone } = req.body || {};
    if (!name || !phone) {
        return res.status(400).json({ error: 'Missing name or phone' });
    }

    const authkey = process.env.WHATSAPP_AUTHKEY;
    const integratedNumber = process.env.SUMMIT_WA_INTEGRATED_NUMBER;
    const apiUrl = process.env.SUMMIT_WA_API_URL;

    if (!authkey || !integratedNumber || !apiUrl) {
        return res.status(500).json({ error: 'WhatsApp credentials not configured' });
    }

    const cleanPhone = phone.toString().replace(/\D/g, '');

    const payload = {
        integrated_number: integratedNumber,
        content_type: 'template',
        payload: {
            messaging_product: 'whatsapp',
            type: 'template',
            template: {
                name: 'registration_confirmation_5th_sept',
                language: {
                    code: 'en',
                    policy: 'deterministic',
                },
                namespace: 'cc258334_41ce_4f12_856a_dc4e207b74b4',
                to_and_components: [
                    {
                        to: [cleanPhone],
                        components: {
                            body_name: {
                                type: 'text',
                                value: name,
                                parameter_name: 'name',
                            },
                            button_1: {
                                subtype: 'url',
                                type: 'text',
                                value: 'https://www.google.com/maps/search/?api=1&query=5th+Floor,+LIC+Tower+PU-03,+Wing+B,+Scheme+No+54,+Indore,+MP+452011',
                            },
                            button_2: {
                                subtype: 'url',
                                type: 'text',
                                value: 'https://m.9m.io/ipcy82y',
                            },
                        },
                    },
                ],
            },
        },
    };

    try {
        console.log('[Summit WhatsApp Payload]:', JSON.stringify(payload, null, 2));

        const waResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authkey,
            },
            body: JSON.stringify(payload),
        });

        const waData = await waResponse.json();
        console.log('[Summit WhatsApp Response]:', JSON.stringify(waData, null, 2));

        return res.status(200).json({ success: true, data: waData });
    } catch (error) {
        console.error('[Summit WhatsApp Error]:', error);
        return res.status(500).json({ error: error?.message || 'Failed to send WhatsApp message' });
    }
}
