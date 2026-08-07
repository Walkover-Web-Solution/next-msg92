export const HELLO_MS_ID = 7;

export const HELLO_PLANS = {
    basic: {
        key: 'basic',
        name: 'Basic',
    },
    premium: {
        key: 'premium',
        name: 'Premium',
    },
};

export const CURRENCY_RATES = {
    USD: { symbol: '$', rate: 1, locale: 'en-US' },
    BRL: { symbol: 'R$', rate: 5.12, locale: 'pt-BR' },
    INR: { symbol: '₹', rate: 95.3, locale: 'en-IN' },
    AED: { symbol: 'AED ', rate: 3.6725, locale: 'en-AE' },
    EUR: { symbol: '€', rate: 0.88, locale: 'de-DE' },
};

export const COMPETITORS = {
    global: [
        {
            key: 'zendesk',
            name: 'Zendesk',
            region: 'global',
            model: 'seat',
            perAgent: 55,
            aiPerAgent: 50,
            perResolution: 1.5,
            note: 'Suite Team + Copilot + $1.50/automated resolution (zendesk.com)',
        },
        {
            key: 'intercom',
            name: 'Intercom',
            region: 'global',
            model: 'seat_res',
            perAgent: 85,
            perResolution: 0.99,
            note: 'Advanced seat + Fin $0.99/resolution (intercom.com/pricing)',
        },
        {
            key: 'freshdesk',
            name: 'Freshdesk',
            region: 'global',
            model: 'seat',
            perAgent: 55,
            aiPerAgent: 29,
            perResolution: 0.1,
            note: 'Pro + Freddy Copilot + AI Agent ~$0.10/session (freshworks.com)',
        },
        {
            key: 'zoho',
            name: 'Zoho Desk',
            region: 'global',
            model: 'seat',
            perAgent: 40,
            aiPerAgent: 0,
            perResolution: 0,
            note: 'Enterprise, Zia AI included (zoho.com/desk/pricing)',
        },
        {
            key: 'helpscout',
            name: 'Help Scout',
            region: 'global',
            model: 'seat',
            perAgent: 50,
            aiPerAgent: 0,
            perResolution: 0.75,
            note: 'Plus + AI Answers $0.75/resolution (helpscout.com/pricing)',
        },
        {
            key: 'hubspot',
            name: 'HubSpot Service Hub',
            region: 'global',
            model: 'seat',
            perAgent: 90,
            aiPerAgent: 0,
            perResolution: 0.5,
            note: 'Service Hub Professional + Breeze $0.50/resolution (hubspot.com)',
        },
        {
            key: 'gorgias',
            name: 'Gorgias',
            region: 'global',
            model: 'base_conv',
            basePlan: 60,
            perConv: 0.4,
            perResolution: 0.9,
            note: 'Basic + $0.40/ticket + AI Agent $0.90/resolution (gorgias.com/pricing)',
        },
        {
            key: 'front',
            name: 'Front',
            region: 'global',
            model: 'seat',
            perAgent: 59,
            aiPerAgent: 0,
            perResolution: 0.89,
            note: 'Growth + AI resolution $0.89/conversation (front.com/pricing)',
        },
        {
            key: 'tidio',
            name: 'Tidio',
            region: 'global',
            model: 'seat',
            perAgent: 39,
            aiPerAgent: 0,
            perResolution: 0.65,
            note: 'per-seat + Lyro AI $0.65/conversation',
        },
        {
            key: 'crisp',
            name: 'Crisp',
            region: 'global',
            model: 'crisp_tiered',
            plans: [
                { name: 'Free', base: 0, includedAIConvs: 0, perResolution: 0 },
                { name: 'Mini ($45)', base: 45, includedAIConvs: 90, perResolution: 0.056 },
                { name: 'Essentials ($95)', base: 95, includedAIConvs: 450, perResolution: 0.056 },
                { name: 'Plus ($295)', base: 295, includedAIConvs: 1350, perResolution: 0.056 },
            ],
            note: 'Crisp tiered plans: Free/Mini($45,90convs)/Essentials($95,450convs)/Plus($295,1350convs)',
        },
        {
            key: 'respondio',
            name: 'Respond.io',
            region: 'global',
            model: 'base_seat',
            basePlan: 159,
            includedSeats: 5,
            extraSeat: 20,
            perResolution: 0,
            note: 'Growth, 5 seats incl. — AI included in plan',
        },
    ],
    brazil: [
        {
            key: 'octadesk',
            name: 'Octadesk',
            region: 'brazil',
            model: 'seat',
            perAgent: 47,
            aiPerAgent: 0,
            perResolution: 0,
            note: 'per-agent, AI in all plans (octadesk.com/precos)',
        },
        {
            key: 'blipgo',
            name: 'Blip Go',
            region: 'brazil',
            model: 'flat',
            basePlanBRL: 299,
            perResolution: 0,
            note: 'Blip Go R$299/month — AI included (blip.ai)',
        },
        {
            key: 'zenvia',
            name: 'Zenvia',
            region: 'brazil',
            model: 'zenvia_tiered',
            plans: [
                { name: 'Starter', base: 0, includedCredits: 100, overage: 1.0 },
                { name: 'Specialist', base: 130, includedCredits: 500, overage: 0.28 },
                { name: 'Expert', base: 390, includedCredits: 2000, overage: 0.21 },
                { name: 'Professional', base: 845, includedCredits: 5000, overage: 0.19 },
            ],
            note: 'Zenvia Customer Cloud: Starter/Specialist/Expert/Professional tiers',
        },
        {
            key: 'movidesk',
            name: 'Movidesk',
            region: 'brazil',
            model: 'seat',
            perAgent: 44,
            aiPerAgent: 0,
            perResolution: 0,
            note: 'now Zenvia; all-in from R$199 (approx)',
        },
        {
            key: 'jivochat',
            name: 'JivoChat',
            region: 'brazil',
            model: 'seat',
            perAgent: 29,
            aiPerAgent: 0,
            perResolution: 0,
            note: 'JivoChat Professional ~$29/agent — AI included in plan',
        },
    ],
};

export const ALL_COMPETITORS = [...COMPETITORS.global, ...COMPETITORS.brazil].reduce((accumulator, competitor) => {
    accumulator[competitor.key] = competitor;
    return accumulator;
}, {});

export const CURRENCY_ORDER = ['USD', 'BRL', 'INR', 'AED', 'EUR'];
export const INPUT_MIN = 0;
export const INPUT_MAX = 9999999999;
