import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown as MdChevronDown, MdCheckCircle, MdWarning, MdArrowForward } from 'react-icons/md';
import WidgetPreview from '@/components/Shared/WidgetPreview';
import WidgetCodeSnippet from '@/components/Shared/WidgetCodeSnippet';
import TabNavigation from '@/components/Shared/TabNavigation';
import HeroSection from '@/components/Shared/HeroSection';
import StepsSection from '@/components/Shared/StepsSection';
import SecondaryCTA from '@/components/Shared/SecondaryCTA';
import FAQSection from '@/components/Shared/FAQSection';
import PreFooter from '@/components/Shared/PreFooter';

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

export default function MSG91AppleMessagesLinkGenerator({ data }) {
    const [formData, setFormData] = useState({
        businessId: '',
        intentId: '',
        groupId: '',
        preFilledMessage: '',
    });

    // Initialize formData from data structure
    useEffect(() => {
        if (data?.create?.content) {
            const fieldMapping = {
                'apple messages for business id': 'businessId',
                'intent id (optional)': 'intentId',
                'group id (optional)': 'groupId',
                'pre-filled message (optional)': 'preFilledMessage',
            };
            const initialFormData = {};
            data.create.content.forEach((section) => {
                section.feilds?.forEach((field) => {
                    const key = field.name.toLowerCase();
                    const fieldName = fieldMapping[key] || key.replace(/[^a-z0-9]/g, '');
                    initialFormData[fieldName] = '';
                });
            });
            setFormData(initialFormData);
        }
    }, [data]);

    const [errors, setErrors] = useState({});
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [qrCodeReady, setQrCodeReady] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [widgetCode, setWidgetCode] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);
    const qrCodeRef = useRef(null);
    const qrCodeInstance = useRef(null);
    const generatorRef = useRef(null);

    // Validation logic as specified in content doc
    const validateField = (name, value) => {
        const restrictedRegex = /[&#[\](){}\/]/;
        if (['intentId', 'groupId', 'preFilledMessage'].includes(name)) {
            if (value && restrictedRegex.test(value)) {
                return "Intent ID, Group ID, and message text can't contain the characters & # [ ] ( ) { } or /.";
            }
        }
        if (name === 'businessId' && !value.trim()) {
            return 'Apple Messages for Business ID is required.';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const err = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
    };

    // Construct URL based on Apple specifications
    const buildAppleLink = (data) => {
        if (!data.businessId.trim()) return '';
        let url = `https://bcrw.apple.com/urn:biz:${data.businessId.trim()}`;
        const params = [];
        if (data.intentId.trim()) {
            params.push(`biz-intent-id=${encodeURIComponent(data.intentId.trim())}`);
        }
        if (data.groupId.trim()) {
            params.push(`biz-group-id=${encodeURIComponent(data.groupId.trim())}`);
        }
        if (data.preFilledMessage.trim()) {
            params.push(`body=${encodeURIComponent(data.preFilledMessage.trim())}`);
        }
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    };

    const handleGenerate = (e) => {
        if (e) e.preventDefault();

        let hasError = false;
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const err = validateField(key, formData[key]);
            if (err) {
                newErrors[key] = err;
                hasError = true;
            }
        });

        setErrors(newErrors);

        if (!hasError) {
            const link = buildAppleLink(formData);
            setGeneratedLink(link);
            setShowPreview(true);
            setHasGenerated(true);
            showToast('Apple Messages link & QR code updated successfully!');
        } else {
            showToast('Please resolve validation errors in the form.');
        }
    };

    // Auto-update the generated link when switching tabs after first generation
    useEffect(() => {
        if (hasGenerated) {
            setGeneratedLink(buildAppleLink(formData));
        }
    }, [showPreview]);

    const editForm = () => {
        setShowPreview(false);
    };

    useEffect(() => {
        // Load qrcode.js library
        loadScript('/js/qrcode.js')
            .then(() => {
                console.log('QRCode library loaded successfully');
                setScriptLoaded(true);
            })
            .catch((error) => {
                console.error('Failed to load QRCode library:', error);
            });
    }, []);

    useEffect(() => {
        setGeneratedLink(buildAppleLink(formData));
    }, []);

    // Generate QR code when link is generated
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

                // Generate widget code
                const widgetCodeHtml = `&lt;script&gt;
var options = {
  businessId: "${formData.businessId}",
  intentId: "${formData.intentId}",
  groupId: "${formData.groupId}",
  preFilledMessage: \`${formData.preFilledMessage}\`,
  enabled: true
}
&lt;/script&gt;
&lt;script type="text/javascript" onload="CreateAppleMessagesWidget(options)" src="https://msg91.com/js/appleMessagesWidget.js"&gt;&lt;/script&gt;`;

                setWidgetCode(widgetCodeHtml);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }
    }, [
        showPreview,
        generatedLink,
        formData.businessId,
        formData.intentId,
        formData.groupId,
        formData.preFilledMessage,
    ]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleCopyLink = () => {
        if (!generatedLink) return;
        const tempInput = document.createElement('input');
        tempInput.value = generatedLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopied(true);
        showToast('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
    };

    const handleCopyCode = () => {
        if (!widgetCode) return;
        const tempInput = document.createElement('input');
        tempInput.value = widgetCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopiedCode(true);
        showToast('Widget code copied to clipboard!');
        setTimeout(() => setCopiedCode(false), 2500);
    };

    const handleDownloadQR = () => {
        if (!qrCodeRef.current) return;

        const qrcodeElement = qrCodeRef.current;
        const img = qrcodeElement.getElementsByTagName('img')[0];
        const canvas = qrcodeElement.getElementsByTagName('canvas')[0];

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
        const filename = `Apple-Messages-QR-code-${Date.now()}.png`;

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

        showToast('QR Code downloaded successfully!');
    };

    const scrollToGenerator = () => {
        if (generatorRef.current) {
            generatorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col'>
            {/* Toast Notification */}
            {toastMessage && (
                <div className='fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-fade-in text-sm font-medium'>
                    <MdCheckCircle className='w-5 h-5 text-emerald-400' />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Hero Section */}
            <HeroSection
                badge={data?.tagline}
                title={data?.product?.name}
                subtitle={data?.heading}
                description={data?.subheading}
                buttonText={data?.getstarted_btn}
                buttonAction={scrollToGenerator}
                footerText={data?.note}
                themeColor='emerald'
            />

            {/* "3 steps" Section */}
            <StepsSection
                title={data?.steps?.heading}
                description=''
                steps={data?.steps?.cards?.map((card) => ({
                    title: card.title,
                    description: card.description,
                }))}
                themeColor='emerald'
            />

            {/* Generator Tool Section */}
            <section id='generator' ref={generatorRef} className='container flex flex-col cont_p cont_gap'>
                <h2 className='text-3xl font-semibold'>{data?.create?.heading}</h2>

                {/* Tabs */}
                <TabNavigation showPreview={showPreview} setShowPreview={setShowPreview} hasGenerated={hasGenerated} />

                {/* Edit Tab */}
                {!showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        <div className='w-full'>
                            <form className='flex flex-col gap-6' onSubmit={handleGenerate} noValidate=''>
                                {data?.create?.content?.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className='flex flex-col gap-6'>
                                        {section.title && (
                                            <span className='text-xl font-semibold'>{section.title}</span>
                                        )}
                                        {section.description && <p>{section.description}</p>}
                                        {section.feilds?.map((field, fieldIndex) => {
                                            const fieldMapping = {
                                                'apple messages for business id': 'businessId',
                                                'intent id (optional)': 'intentId',
                                                'group id (optional)': 'groupId',
                                                'pre-filled message (optional)': 'preFilledMessage',
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
                                                    {field.placeholder?.includes('e.g.') &&
                                                    field.placeholder.length > 30 ? (
                                                        <textarea
                                                            className='input input-bordered max-w-lg'
                                                            name={fieldName}
                                                            rows={3}
                                                            style={{ minHeight: '100px' }}
                                                            placeholder={field.placeholder}
                                                            value={formData[fieldName] || ''}
                                                            onChange={handleInputChange}
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
                                                    {errors[fieldName] && (
                                                        <p className='text-red-500 text-xs'>{errors[fieldName]}</p>
                                                    )}
                                                    <p className='text-xs text-gray-600'>{field.description}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}

                                {/* Validation Note */}
                                {data?.create?.validationNote && (
                                    <div className='flex items-center gap-2'>
                                        <MdWarning className='w-4 h-4 text-yellow-600 shrink-0 mt-0.5' />
                                        <p className='text-xs text-yellow-800'>{data.create.validationNote}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button type='submit' className='btn btn-primary btn-md w-fit'>
                                    {data?.create?.generate_btn}
                                </button>
                            </form>
                        </div>

                        {/* Widget Skeleton Preview in Edit Tab */}
                        <WidgetPreview
                            isSkeleton={true}
                            logoSrc='/assets/icons/products/imessage.svg'
                            welcomeMessage="Got any questions?\nWe're here to help."
                            qrCodeRef={qrCodeRef}
                            scanInstruction='Scan this QR code to start an Apple Messages for Business conversation.'
                            buttonText='Message Us'
                            buttonHref='#'
                            buttonColor='#007AFF'
                            iconInButton={
                                <img
                                    src='/assets/icons/products/imessage.svg'
                                    alt='Apple Messages'
                                    className='w-full h-full'
                                />
                            }
                            bubbleColor='blue-500'
                        />
                    </div>
                )}

                {/* Preview Tab */}
                {showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        {/* Left: Widget Code Snippet */}
                        <WidgetCodeSnippet widgetCode={widgetCode} onCopy={handleCopyCode} copySuccess={copiedCode} />

                        {/* Right: Widget Preview */}
                        <WidgetPreview
                            isSkeleton={false}
                            logoSrc='/assets/icons/products/imessage.svg'
                            welcomeMessage={formData.preFilledMessage || "Got any questions?\nWe're here to help."}
                            qrCodeRef={qrCodeRef}
                            scanInstruction='Scan this QR code to start an Apple Messages for Business conversation.'
                            buttonText='Message Us'
                            buttonHref={generatedLink}
                            buttonColor='#007AFF'
                            iconInButton={
                                <img
                                    src='/assets/icons/products/imessage.svg'
                                    alt='Apple Messages'
                                    className='w-full h-full'
                                />
                            }
                            onCopyLink={handleCopyLink}
                            onDownloadQR={handleDownloadQR}
                            copyLinkSuccess={copied}
                            qrCodeReady={qrCodeReady}
                            bubbleColor='blue-500'
                        />
                    </div>
                )}
            </section>

            {/* Secondary section — "Want this on your website?" */}
            <SecondaryCTA
                badge='EMBEDDABLE WEB BUTTON'
                title={data?.secondary?.heading}
                description={data?.secondary?.body}
                buttonText={data?.secondary?.ctaText}
                buttonLink={data?.secondary?.ctaLink}
                themeColor='emerald'
            />

            {/* FAQ Section */}
            {data?.FaqsComp && (
                <FAQSection heading={data?.FaqsComp?.heading} faqs={data?.FaqsComp?.faqs} themeColor='emerald' />
            )}

            {/* PreFooter Section */}
            {data?.PreFooterComp && (
                <PreFooter
                    content={data?.PreFooterComp?.content}
                    buttons={data?.PreFooterComp?.buttons}
                    themeColor='emerald'
                />
            )}
        </div>
    );
}
