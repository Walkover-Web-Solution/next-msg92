import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import style from './WhatsappLinkComp.module.scss';
import GetMdIcons from '@/utils/getMdIcons';
import {
    MdChevronRight,
    MdCopyAll,
    MdDownload,
    MdContentCopy,
    MdKeyboardArrowDown as MdChevronDown,
} from 'react-icons/md';
import WidgetPreview from '@/components/Shared/WidgetPreview';
import WidgetCodeSnippet from '@/components/Shared/WidgetCodeSnippet';
import TabNavigation from '@/components/Shared/TabNavigation';
import HeroSection from '@/components/Shared/HeroSection';
import StepsSection from '@/components/Shared/StepsSection';
import SecondaryCTA from '@/components/Shared/SecondaryCTA';
import FAQSection from '@/components/Shared/FAQSection';
import PreFooter from '@/components/Shared/PreFooter';
import { generateWidgetScript } from '@/utils/generateWidgetScript';

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

const WhatsappLinkComp = ({ data }) => {
    const [qrCodeReady, setQrCodeReady] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
    const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        preFilledMessage: '',
        welcomeText: 'Hi there!\nHow can I help you?',
        brandImage: '',
    });

    // Initialize formData from data structure
    useEffect(() => {
        if (data?.create?.content) {
            const fieldMapping = {
                'whatsapp number': 'phoneNumber',
                'pre-filled message(optional)': 'preFilledMessage',
                'welcome text': 'welcomeText',
                'brand image url(optional)': 'brandImage',
            };
            const initialFormData = {};
            data.create.content.forEach((section) => {
                section.feilds?.forEach((field) => {
                    const key = field.name.toLowerCase();
                    const fieldName = fieldMapping[key] || key.replace(/[^a-z0-9]/g, '');
                    initialFormData[fieldName] = initialFormData[fieldName] || '';
                });
            });
            setFormData(initialFormData);
        }
    }, [data]);

    const [generatedLink, setGeneratedLink] = useState('');
    const [widgetCode, setWidgetCode] = useState('');

    const qrCodeRef = useRef(null);
    const qrCodeInstance = useRef(null);

    useEffect(() => {
        // Load qrcode.js library
        loadScript(`${process.env.BASE_URL}/js/qrcode.js`)
            .then(() => {
                console.log('QRCode library loaded successfully');
                setScriptLoaded(true);
            })
            .catch((error) => {
                console.error('Failed to load QRCode library:', error);
            });
    }, []);

    // Generate QR code when preview is shown and link is generated
    useEffect(() => {
        if (showPreview && generatedLink && qrCodeRef.current && typeof QRCode !== 'undefined') {
            // Clear previous QR code
            qrCodeRef.current.innerHTML = '';

            try {
                qrCodeInstance.current = new QRCode(qrCodeRef.current, {
                    width: 150,
                    height: 150,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.L,
                });
                qrCodeInstance.current.makeCode(generatedLink);
                setQrCodeReady(true);

                // Generate widget code using common function
                const widgetCodeHtml = generateWidgetScript(
                    'whatsapp',
                    {
                        brandSetting: {
                            brandImg: formData.brandImage,
                            welcomeText: formData.welcomeText,
                            messageText: formData.preFilledMessage,
                            phoneNumber: formData.phoneNumber,
                        },
                    },
                    process.env.BASE_URL
                );

                setWidgetCode(widgetCodeHtml);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }
    }, [showPreview, generatedLink, Object.keys(formData)]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const generateLink = (e) => {
        e.preventDefault();

        if (!formData.phoneNumber.trim()) {
            alert('Please enter a phone number.');
            return;
        }

        const wp_end_url = `https://wa.me/${formData.phoneNumber}?text=${encodeURIComponent(
            formData.preFilledMessage
        )}`;

        setGeneratedLink(wp_end_url);
        setShowPreview(true);
        setHasGenerated(true);
        setCopyLinkSuccess(false);
        setCopyCodeSuccess(false);
        setQrCodeReady(false);
    };

    // Auto-update the generated link when switching tabs after first generation
    useEffect(() => {
        if (hasGenerated) {
            const wp_end_url = `https://wa.me/${formData.phoneNumber}?text=${encodeURIComponent(
                formData.preFilledMessage
            )}`;
            setGeneratedLink(wp_end_url);
        }
    }, [showPreview]);

    const copyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopyLinkSuccess(true);
        setTimeout(() => setCopyLinkSuccess(false), 2000);
    };

    const copyCode = () => {
        if (!widgetCode) return;
        const tempInput = document.createElement('input');
        tempInput.value = widgetCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopyCodeSuccess(true);
        setTimeout(() => setCopyCodeSuccess(false), 2000);
    };

    const downloadQRCode = () => {
        if (!qrCodeRef.current) return;

        const img = qrCodeRef.current.getElementsByTagName('img')[0];
        const canvas = qrCodeRef.current.getElementsByTagName('canvas')[0];

        if (!img || !canvas) return;

        const padding = 40;
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;
        canvas.width += padding;
        canvas.height += padding;

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, padding / 2, padding / 2);

        const image = canvas.toDataURL('image/png', 1);
        const filename = `WhatsApp-QR-code-${Date.now()}.png`;

        const element = document.createElement('a');
        element.setAttribute('href', image);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Reset canvas dimensions
        canvas.width = originalWidth;
        canvas.height = originalHeight;
    };

    const brandImageSrc = formData.brandImage || `${process.env.BASE_URL}/img/icon/walink-whatsapp.svg`;

    return (
        <>
            <script type='text/javascript' src={`${process.env.BASE_URL}/js/qrcode.js`} defer></script>
            <link rel='stylesheet' href={`${process.env.BASE_URL}/walink.css`} />

            {/* Hero Section */}
            <HeroSection
                badge={data?.tagline}
                title={data?.product?.name}
                subtitle={data?.heading}
                description='Simple tool to create WhatsApp click to chat QR code/Widget/Link for your website or landing pages.'
                buttonText={data?.getstarted_btn}
                buttonAction={() => document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' })}
                themeColor='green'
            />

            {/* Steps Section */}
            {data?.steps?.cards?.length > 0 && (
                <StepsSection
                    heading={data?.steps?.heading}
                    steps={data?.steps?.cards?.map((card) => ({
                        title: card.title,
                        description: card.description,
                    }))}
                    themeColor='green'
                />
            )}

            <div className='container flex flex-col cont_p cont_gap' id='generate'>
                <h3 className='text-3xl'>{data?.create?.heading}</h3>

                {/* Tabs */}
                <TabNavigation showPreview={showPreview} setShowPreview={setShowPreview} hasGenerated={hasGenerated} />

                {/* Edit Tab */}
                {!showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        <div className='w-full'>
                            <form className='flex flex-col gap-6' onSubmit={generateLink} noValidate=''>
                                {data?.create?.content?.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className='flex flex-col gap-6'>
                                        {section.title && (
                                            <span className='text-xl font-semibold'>{section.title}</span>
                                        )}
                                        {section.description && <p>{section.description}</p>}
                                        {section.feilds?.map((field, fieldIndex) => {
                                            const fieldMapping = {
                                                'whatsapp number': 'phoneNumber',
                                                'pre-filled message(optional)': 'preFilledMessage',
                                                'welcome text': 'welcomeText',
                                                'brand image url(optional)': 'brandImage',
                                            };
                                            const key = field.name.toLowerCase();
                                            const fieldName = fieldMapping[key] || key.replace(/[^a-z0-9]/g, '');
                                            const isRequired = field.name.includes('(required)');
                                            return (
                                                <div key={fieldIndex} className='flex flex-col gap-2'>
                                                    <label htmlFor={fieldName} className='font-semibold'>
                                                        {field.name}
                                                        {isRequired && <span className='text-red-500'>*</span>}
                                                    </label>
                                                    {field.placeholder?.includes('\n') ||
                                                    field.placeholder.length > 30 ? (
                                                        <textarea
                                                            className='input input-bordered max-w-lg'
                                                            name={fieldName}
                                                            rows={3}
                                                            style={{ minHeight: '100px' }}
                                                            placeholder={field.placeholder}
                                                            value={formData[fieldName] || ''}
                                                            onChange={handleInputChange}
                                                            required={isRequired}
                                                        />
                                                    ) : (
                                                        <input
                                                            className='input input-bordered max-w-lg'
                                                            type='text'
                                                            name={fieldName}
                                                            placeholder={field.placeholder}
                                                            value={formData[fieldName] || ''}
                                                            onChange={handleInputChange}
                                                            required={isRequired}
                                                        />
                                                    )}
                                                    <p className='text-xs text-gray-600'>{field.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}

                                <button type='submit' className='btn btn-voice btn-primary btn-md'>
                                    {data?.create?.generate_btn}
                                </button>
                            </form>
                        </div>

                        {/* Widget Skeleton Preview in Edit Tab */}
                        <WidgetPreview
                            isSkeleton={true}
                            logoSrc={brandImageSrc}
                            welcomeMessage="Got any questions?\nWe're here to help."
                            qrCodeRef={qrCodeRef}
                            scanInstruction='Scan this QR code to start a WhatsApp conversation with us.'
                            buttonText='Chat With Us'
                            buttonHref='#'
                            buttonGradient='linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                            iconInButton={
                                <img
                                    src={`${process.env.BASE_URL}/assets/global/whatsapp-link/whatsapp-icon-white.svg`}
                                    alt='WhatsApp'
                                    className='w-full h-full'
                                />
                            }
                            bubbleColor='green-500'
                        />
                    </div>
                )}

                {/* Preview Tab */}
                {showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        {/* Left: Widget Code Snippet */}
                        <WidgetCodeSnippet widgetCode={widgetCode} onCopy={copyCode} copySuccess={copyCodeSuccess} />

                        {/* Right: Widget Preview */}
                        <WidgetPreview
                            isSkeleton={false}
                            logoSrc={brandImageSrc}
                            welcomeMessage={formData.welcomeText || "Got any questions?\nWe're here to help."}
                            qrCodeRef={qrCodeRef}
                            scanInstruction='Scan this QR code to start a WhatsApp conversation with us.'
                            buttonText='Chat With Us'
                            buttonHref={generatedLink}
                            buttonGradient='linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                            iconInButton={
                                <img
                                    src={`${process.env.BASE_URL}/assets/global/whatsapp-link/whatsapp-icon-white.svg`}
                                    alt='WhatsApp'
                                    className='w-full h-full'
                                />
                            }
                            onCopyLink={copyLink}
                            onDownloadQR={downloadQRCode}
                            copyLinkSuccess={copyLinkSuccess}
                            qrCodeReady={qrCodeReady}
                            bubbleColor='green-500'
                        />
                    </div>
                )}
            </div>

            {/* FAQ Section */}
            {data?.FaqsComp && (
                <FAQSection heading={data?.FaqsComp?.heading} faqs={data?.FaqsComp?.faqs} themeColor='green' />
            )}

            {/* PreFooter Section */}
            {data?.PreFooterComp && (
                <PreFooter
                    content={data?.PreFooterComp?.content}
                    buttons={data?.PreFooterComp?.buttons}
                    themeColor='green'
                />
            )}
        </>
    );
};

export default WhatsappLinkComp;
