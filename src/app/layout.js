export const metadata = {
    title: 'MSG91',
    description: 'The official MSG91 platform',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}
