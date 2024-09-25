import OtpMagicLinkComp from "@/components/magicLinkComp/magicLinkComp";

export default function OtpMagicLink() {
    const pageData = {
        'howWork': [
            {
                'icon': 'send',
                'title': 'Send',
                'description': 'When a user requests access, send them a Magic Link via their preferred channel.',
            },
            {
                'icon': 'click',
                'title': 'Click',
                'description': 'The user clicks the link, and they are instantly authenticated.',
            },
            {
                'icon': 'access',
                'title': 'Access',
                'description': 'It is that simple—no need to remember passwords or enter codes.',
            },
        ],
        'features': [
            {
                'icon': 'send',
                'title': 'Frictionless User Experience',
                'description':
                    'Magic Link allows users to authenticate instantly with just a click—no passwords or OTPs. It provides a smooth, hassle-free experience that enhances user satisfaction and reduces drop-offs.',
            },
            {
                'icon': 'click',
                'title': 'Multi-Channel Delivery',
                'description':
                    'Send Magic Links via email, SMS, WhatsApp, RCS, or any preferred channel, offering personalized access and reaching users where they are most comfortable.',
            },
            {
                'icon': 'access',
                'title': 'Secure & Reliable',
                'description':
                    'Each Magic Link is unique, encrypted, and time-sensitive, ensuring secure, one-time use access without compromising user data.',
            },
            {
                'icon': 'access',
                'title': 'Boost Conversions',
                'description':
                    'By simplifying the login process, Magic Link reduces authentication friction, leading to higher conversion rates and better user engagement.',
            },
        ],
        useCases: [
            {
                name: 'Healthcare',
                icon: 'MdOutlineHealthAndSafety',
                img: 'whatsapp-healthcare',
                description:
                    'For healthcare providers, ensuring patient data security is a top priority. With Magic Link, patients can easily access their medical records, test results, or appointment details by simply clicking a secure link sent via SMS, email, or WhatsApp. This improves the patient experience by eliminating the need for cumbersome logins while maintaining high security standards.',
                features: ['Secure access', 'Multi-channel delivery', 'Enhanced experience', 'Top-tier security'],
            },
            {
                name: 'E-Commerce',
                icon: 'MdOutlineStorefront',
                img: 'whatsapp-e-commerce',
                description:
                    'In the fast-paced world of online shopping, customers want a smooth and quick checkout experience. With Magic Link, shoppers can log in or register instantly with a single click, making the process hassle-free and reducing cart abandonment. No more forgotten passwords or slow OTP verification—just a seamless, one-click authentication for faster purchases.',
                features: ['One-click login', 'Faster checkout', 'Lower cart abandonment', 'Simplified process'],
            },
        ],
    };
    return <OtpMagicLinkComp pageData={pageData} />;
}
