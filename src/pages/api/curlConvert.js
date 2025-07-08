// pages/api/curlConvert.js
import { toPython, toNode, toPhp, toRuby } from 'curlconverter';

const fixedCurls = {
    'sms': 'curl -X POST "https://control.msg91.com/api/v5/flow/" \\\n-H "Authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"template_id":"EntertemplateID","sender":"EnterSenderID","short_url":"1 (On) or 0 (Off)","mobiles":"919XXXXXXXXX","VAR1":"VALUE 1","VAR2":"VALUE 2"}\'',
    'rcs': 'curl -X POST "https://control.msg91.com/api/v5/rcs/send-rcs-message/bulk/" \\\n-H "authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"customer_numbers":["918818888761","918818888763"],"project_id":"{{project_id}}","function_name":"text_message","text":"rcs test"}\'',
    'email':
        'curl -X POST "https://control.msg91.com/api/v5/email/send" \\\n-H "Authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"to":[{"name":"Mark","email":"recipient@email.address"}],"from":{"name":"Joe","email":"sender@email.address"},"cc":[{"email":"cc@email.address"},{"email":"test@email.address"}],"bcc":[{"email":"bcc@email.address"},{"email":"test1@email.address"}],"domain":"The domain which you have registered with us. We sign DKIM with this domain.","mail_type_id":"1 for Transactional, 2 for Notificational, 3 for Promotional - Default is 3","in_reply_to":"If the current mail is reply of any mail then that mail Message ID.","reply_to":[{"email":"mail1@domain.com"},{"email":"mail2@domain.com"}],"attachments":[{"filePath":"Public path for file.","fileName":"File Name"},{"file":"File in Data URI format data:content/type;base64,<data>.","fileName":"File Name"}],"template_id":"YOUR_UNIQUE_TEMPLATE_NAME","variables":{"VAR1":"VAR1 VALUE","VAR2":"VAR2 VALUE"}}\'',
    'voice':
        'curl -X POST "https://control.msg91.com/api/v5/voice/call/" \\\n-H "Authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"template":"yourtemplate","caller_id":"91999999999","client_number":"918888888888","callback_url":"https://status.callback.com","variables":{"var1":{"type":"number","as_digits":true,"value":"1234"},"var2":{"type":"currency","currency_code":"USD","value":"100"}}}\'',
    'whatsapp':
        'curl -X POST "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/" \\\n-H "Authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"integrated_number":"Intergated WhatsApp Number, with country code","recipient_number":"Mobile Number","content_type":"text","text":"Message Content"}\'',
    'numbers':
        'curl -X POST "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/" \\\n-H "Authkey: <authkey>" \\\n-H "accept: application/json" \\\n-H "content-type: application/json" \\\n-d \'{"integrated_number":"Intergated WhatsApp Number, with country code","recipient_number":"Mobile Number","content_type":"text","text":"Message Content"}\'',
};

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST method allowed' });
    }

    const { curlKey } = req.body;

    const curl = fixedCurls[curlKey];

    if (!curl) {
        return res.status(404).json({ error: 'No matching fixed cURL found' });
    }

    try {
        const snippets = {
            python: toPython(curl),
            node: toNode(curl),
            php: toPhp(curl),
            ruby: toRuby(curl),
            curl: curl,
        };

        res.status(200).json({ curl, snippets }); // ⬅️ include the cURL
    } catch (err) {
        res.status(500).json({ error: 'Conversion failed', details: err.message });
    }
}
