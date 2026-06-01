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
