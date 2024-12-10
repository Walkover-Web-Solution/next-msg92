import ChatBotDemoComp from '@/components/ChatBotDemoComp/ChatBotDemoComp';
import FooterComp from '@/components/FooterComp/FooterComp';
import HeadComp from '@/components/headComp';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';

export default function demochatbot() {
    return (
        <div>
            <HeadComp
                data={{
                    'title': 'Demo Chatbot - MSG91',
                    'description':
                        "Explore the capabilities of the MSG91 Demo Chatbot. See how AI-powered chatbots can streamline customer interactions, provide instant responses, and enhance user experience. Try the demo to understand the seamless integration and advanced features offered by MSG91's chatbot solutions.",
                }}
            />
            <NotificationBarComp
                componentData={{
                    'support': 'Contact',
                    'login': 'Login',
                    'hide': ['signup', 'singin'],
                }}
                pageInfo={{
                    'country': 'global',
                    'page': 'home',
                    'pathArray': [],
                    'pathURL': '',
                }}
            />
            <MenuBarComp
                componentData={{
                    'products': 'Products',
                    'products_list': [
                        {
                            'name': 'Applications',
                            'products': [
                                {
                                    'name': 'Hello',
                                    'slug': 'hello',
                                    'description': 'Ticketing and Chat',
                                },
                                {
                                    'name': 'Campaign',
                                    'slug': 'campaign',
                                    'description': 'Event-based Automation',
                                },
                                {
                                    'name': 'Segment',
                                    'slug': 'segmento',
                                    'description': 'Contact Management',
                                },
                                {
                                    'name': 'OTP',
                                    'slug': 'otp',
                                    'description': 'Simplified OTP Platform',
                                },
                            ],
                        },
                        {
                            'name': 'Channels',
                            'products': [
                                {
                                    'name': 'SMS',
                                    'slug': 'sms',
                                },
                                {
                                    'name': 'RCS',
                                    'slug': 'rcs',
                                },
                                {
                                    'name': 'Email',
                                    'slug': 'email',
                                },
                                {
                                    'name': 'WhatsApp',
                                    'slug': 'whatsapp',
                                },
                                {
                                    'name': 'Voice',
                                    'slug': 'voice',
                                },
                                {
                                    'name': 'Numbers',
                                    'slug': 'numbers',
                                },
                            ],
                        },
                        {
                            'name': 'Utilities',
                            'products': [
                                {
                                    'name': 'URL Shortener',
                                    'slug': 'shorturl',
                                    'description': 'Customize and Track URLs',
                                },
                                {
                                    'name': 'KnowledgeBase',
                                    'slug': 'knowledgebase',
                                    'description': 'Manage Help Documents and Guides',
                                },
                            ],
                        },
                    ],
                    'integrations': 'Integrations',
                    'integrations_list': {
                        'explore_btn': 'Explore More Plugins',
                        'content': [
                            {
                                'slug': 'shopify',
                                'name': 'Shopify',
                                'link': 'https://apps.shopify.com/msg91',
                            },
                            {
                                'slug': 'tally',
                                'name': 'Tally',
                                'link': 'https://msg91.com/partners-and-integrations/tally',
                            },
                            {
                                'slug': 'zapier',
                                'name': 'Zapier',
                                'link': 'https://msg91.com/partners-and-integrations/zapier',
                            },
                            {
                                'slug': 'freshworks',
                                'name': 'Freshworks',
                                'link': 'https://msg91.com/partners-and-integrations/freshworks',
                            },
                            {
                                'slug': 'firebase',
                                'name': 'Firebase',
                                'link': 'https://msg91.com/partners-and-integrations/firebase',
                            },
                            {
                                'slug': 'hubspot',
                                'name': 'HubSpot',
                                'link': 'https://msg91.com/partners-and-integrations/hubspot',
                            },
                            {
                                'slug': 'googlesheets',
                                'name': 'Google Sheets',
                                'link': 'https://msg91.com/help/how-to-send-sms-and-email-from-google-spreadsheet',
                            },
                        ],
                    },
                    'pricing': 'Pricing',
                    'pricing_list': [
                        {
                            'name': 'Applications',
                            'products': [
                                {
                                    'name': 'Hello',
                                    'slug': 'hello',
                                    'description': 'Contact Center',
                                },
                                {
                                    'name': 'Campaign',
                                    'slug': 'campaign',
                                    'description': 'Event-based Automation',
                                },
                                {
                                    'name': 'Segmento',
                                    'slug': 'segmento',
                                    'description': 'Contact Management',
                                },
                                {
                                    'name': 'OTP',
                                    'slug': 'otpwidget',
                                    'description': ' OTP widget SDK',
                                },
                            ],
                        },
                        {
                            'name': 'Channels',
                            'products': [
                                {
                                    'name': 'SMS',
                                    'slug': 'sms',
                                },
                                {
                                    'name': 'SendOTP',
                                    'slug': 'otp',
                                },
                                {
                                    'name': 'Email',
                                    'slug': 'email',
                                },
                                {
                                    'name': 'WhatsApp',
                                    'slug': 'whatsapp',
                                },
                                {
                                    'name': 'Voice',
                                    'slug': 'voice',
                                },
                                {
                                    'name': 'RCS',
                                    'slug': 'rcs',
                                },
                            ],
                        },
                        {
                            'name': 'Utilities',
                            'products': [
                                {
                                    'name': 'URL Shortener',
                                    'slug': 'shorturl',
                                    'description': 'Customize and Track URLs',
                                },
                                {
                                    'name': 'KnowledgeBase',
                                    'slug': 'knowledgebase',
                                    'description': 'Manage Help Documents and Guides',
                                },
                            ],
                        },
                    ],
                    'apidocs': 'API Docs',
                    'signup_btn': 'Sign Up',
                    'hide': ['signup', 'singin'],
                }}
                pageInfo={{
                    'country': 'global',
                    'page': 'home',
                    'pathArray': [],
                    'pathURL': '',
                }}
            />
            <ChatBotDemoComp />
            <FooterComp
                componentData={{
                    'hide': ['signup', 'singin'],
                    'products': {
                        'name': 'Our Products',
                        'links': [
                            {
                                'name': 'Hello',
                                'link': 'hello',
                            },
                            {
                                'name': 'Segmento',
                                'link': 'segmento',
                            },
                            {
                                'name': 'Campaign',
                                'link': 'campaign',
                            },
                            {
                                'name': 'OTP',
                                'link': 'otp',
                            },
                            {
                                'name': 'OTP-MagicLink',
                                'link': 'otp/magiclink',
                                'nested': true,
                            },
                        ],
                    },
                    'utilities': {
                        'name': 'Utilities',
                        'links': [
                            {
                                'name': 'URL Shortener',
                                'link': 'shorturl',
                            },
                            {
                                'name': 'KnowledgeBase',
                                'link': 'knowledgebase',
                            },
                            {
                                'name': 'Free WhatsApp link generator',
                                'link': 'free-whatsapp-link-generator',
                            },
                            {
                                'name': 'WhatsApp Chatbot',
                                'link': 'whatsapp/chatbot',
                            },
                        ],
                    },
                    'channels': {
                        'name': 'Channels',
                        'links': [
                            {
                                'name': 'SMS',
                                'link': 'sms',
                            },
                            {
                                'name': 'Email',
                                'link': 'email',
                            },
                            {
                                'name': 'WhatsApp',
                                'link': 'whatsapp',
                            },
                            {
                                'name': 'Voice',
                                'link': 'voice',
                            },
                            {
                                'name': 'Numbers',
                                'link': 'numbers',
                            },
                        ],
                    },
                    'resources': {
                        'name': 'Resources',
                        'links': [
                            {
                                'name': 'Guide',
                                'link': 'https://msg91.com/guide',
                            },
                            {
                                'name': 'Case Studies',
                                'link': 'https://msg91.com/case-studies',
                            },
                            {
                                'name': 'FAQ',
                                'link': 'https://msg91.com/help',
                            },
                            {
                                'name': 'API Documentation',
                                'link': 'https://docs.msg91.com/overview',
                            },
                            {
                                'name': 'Request a Feature',
                                'link': 'https://features.msg91.com/feature-requests',
                            },
                        ],
                    },
                    'discover': {
                        'name': 'Discover',
                        'links': [
                            {
                                'name': 'About us',
                                'link': 'about-us',
                            },
                            {
                                'name': 'Pricing',
                                'link': 'pricing/hello',
                            },
                            {
                                'name': 'Contact Us',
                                'link': 'contact-us',
                            },
                            {
                                'name': 'Developers',
                                'link': 'developers',
                            },
                            {
                                'name': 'MSG91 for startups',
                                'link': 'startups',
                            },
                            {
                                'name': 'Partners and integrations',
                                'link': 'partners-and-integrations',
                            },
                            {
                                'name': 'Become a partner',
                                'link': 'become-a-partner',
                            },
                            {
                                'name': 'Career',
                                'link': 'https://apply.workable.com/walkover/',
                            },
                            {
                                'name': 'Certificates',
                                'link': 'certificates',
                            },
                        ],
                    },
                    'policies': {
                        'links': [
                            {
                                'name': 'Terms of use',
                                'link': 'terms-of-use',
                            },
                            {
                                'name': 'Privacy policy',
                                'link': 'privacy-policy',
                            },
                            {
                                'name': 'GDPR',
                                'link': 'gdpr',
                            },
                            {
                                'name': 'Refund policy',
                                'link': 'refund-policy',
                            },
                            {
                                'name': 'No spam',
                                'link': 'no-spam',
                            },
                            {
                                'name': 'Startup policy',
                                'link': 'startup-policy',
                            },
                            {
                                'name': 'Fair pricing policy',
                                'link': 'fair-pricing-policy',
                            },
                            {
                                'name': 'Cookie policy',
                                'link': 'cookie-policy',
                            },
                        ],
                    },
                    'downloads': {
                        'name': 'Download Apps',
                        'apps': [
                            {
                                'name': 'Play Store',
                                'icon': '/img/icon/android.svg',
                                'link': 'https://play.google.com/store/apps/details?id=com.hellornapp',
                            },
                            {
                                'name': 'App Store',
                                'icon': '/img/icon/apple.svg',
                                'link': 'https://apps.apple.com/in/app/hello-by-msg91/id1635375551',
                            },
                        ],
                    },
                    'social': {
                        'name': 'Follow Us',
                        'apps': [
                            {
                                'name': 'Facebook',
                                'icon': '/img/icon/facebook.svg',
                                'link': 'https://www.facebook.com/msg91',
                            },
                            {
                                'name': 'LinkedIn',
                                'icon': '/img/icon/linkedin.svg',
                                'link': 'https://www.linkedin.com/company/msg91/',
                            },
                            {
                                'name': 'Twitter',
                                'icon': '/img/icon/twitter.svg',
                                'link': 'https://twitter.com/msg91',
                            },
                            {
                                'name': 'YouTube',
                                'icon': '/img/icon/youtube.svg',
                                'link': 'https://www.youtube.com/@WalkoverWS',
                            },
                        ],
                    },
                }}
                pageInfo={{
                    'country': 'global',
                    'page': 'home',
                    'pathArray': [],
                    'pathURL': '',
                }}
            />
        </div>
    );
}
