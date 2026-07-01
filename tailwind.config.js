/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.scss',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.scss',
    ],
    theme: {
        extend: {
            colors: {
                shopifyCheckout: {
                    cream: '#F1EDE5',
                    heading: '#191916',
                    accent: '#437060',
                    body: '#88867E',
                    note: '#B4B2AC',
                    primary: '#2C4A3C',
                    primaryFg: '#F1EDE5',
                    placeholder: '#D9D6CE',
                },
                shopifyBanner: {
                    content: '#F0F7E8',
                    visual: '#0A5840',
                    heading: '#111827',
                    headingAccent: '#5E8E3E',
                    body: '#374151',
                    primary: '#5E8E3E',
                    primaryFg: '#ffffff',
                    secondaryBg: '#ffffff',
                    secondaryFg: '#0A5840',
                    secondaryBorder: '#0A5840',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'checkout-hero-blend': 'linear-gradient(180deg, #FFFFFF 0%, #F1EDE5 10rem)',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                msg91: {
                    primary: '#212528',
                    secondary: '#E2F0FF',
                    accent: '#1E75BA',
                    neutral: '#FAFAFA',
                    hello: '#f2ca55',
                    'base-100': '#FFFFFF',
                    '--rounded-btn': '0.2rem',
                    'base-200': '#808080',
                },
            },
        ],
    },
};
