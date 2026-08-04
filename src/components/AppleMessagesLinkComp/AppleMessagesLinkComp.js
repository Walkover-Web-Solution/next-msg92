import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import style from './AppleMessagesLinkComp.module.scss';
import GetMdIcons from '@/utils/getMdIcons';
import { MdChevronRight, MdCopyAll, MdDownload } from 'react-icons/md';

const loadScript = (src, onLoadCallback) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = onLoadCallback;
    document.body.appendChild(script);
};

const AppleMessagesLinkComp = ({ data }) => {
    const [generatedLink, setGeneratedLink] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [qrCodeReady, setQrCodeReady] = useState(false);

    const [formData, setFormData] = useState({
        businessId: '',
        intentId: '',
        groupId: '',
        preFilledMessage: '',
    });

    const [fieldMapping] = useState({
        'apple messages for business id': 'businessId',
        'intent id (optional)': 'intentId',
        'group id (optional)': 'groupId',
        'pre-filled message (optional)': 'preFilledMessage',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load necessary scripts dynamically
        loadScript('/js/qrcode.js', () => {
            loadScript('/js/jquery.min.js', () => {
                if (document.getElementById('apple-qrcode') && typeof QRCode !== 'undefined') {
                    var qrcode = new QRCode(document.getElementById('apple-qrcode'), {
                        width: 150,
                        height: 150,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                    });
                }
            });
        });
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.businessId.trim()) {
            newErrors.businessId = 'Business ID is required';
        }

        // Check for restricted characters in optional fields
        const restrictedChars = /[&#[\](){}\/]/;

        if (formData.intentId && restrictedChars.test(formData.intentId)) {
            newErrors.intentId = 'Intent ID cannot contain & # [ ] ( ) { } or /';
        }

        if (formData.groupId && restrictedChars.test(formData.groupId)) {
            newErrors.groupId = 'Group ID cannot contain & # [ ] ( ) { } or /';
        }

        if (formData.preFilledMessage && restrictedChars.test(formData.preFilledMessage)) {
            newErrors.preFilledMessage = 'Message cannot contain & # [ ] ( ) { } or /';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const mappedName = fieldMapping[name] || name;
        setFormData((prev) => ({
            ...prev,
            [mappedName]: value,
        }));
        // Clear error for this field when user starts typing
        if (errors[mappedName]) {
            setErrors((prev) => ({
                ...prev,
                [mappedName]: '',
            }));
        }
    };

    const generateLink = () => {
        if (!validateForm()) {
            return;
        }

        let link = `https://bcrw.apple.com/urn:biz:${formData.businessId}`;

        const params = [];
        if (formData.intentId) {
            params.push(`biz-intent-id=${encodeURIComponent(formData.intentId)}`);
        }
        if (formData.groupId) {
            params.push(`biz-group-id=${encodeURIComponent(formData.groupId)}`);
        }
        if (formData.preFilledMessage) {
            params.push(`body=${encodeURIComponent(formData.preFilledMessage)}`);
        }

        if (params.length > 0) {
            link += '?' + params.join('&');
        }

        setGeneratedLink(link);
        setShowPreview(true);
        setQrCodeReady(false);

        // Clear existing QR code before generating new one
        const qrContainer = document.getElementById('apple-qrcode');
        if (qrContainer) {
            qrContainer.innerHTML = '';
        }

        // Generate QR code after a short delay to ensure DOM is ready
        setTimeout(() => {
            if (document.getElementById('apple-qrcode') && typeof QRCode !== 'undefined') {
                const qrcode = new QRCode(document.getElementById('apple-qrcode'), {
                    width: 150,
                    height: 150,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                });
                qrcode.makeCode(link);
                setQrCodeReady(true);
            }
        }, 100);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const downloadQRCode = () => {
        const qrcodeElement = document.getElementById('apple-qrcode');
        if (!qrcodeElement) return;

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
    };

    const resetForm = () => {
        setFormData({
            businessId: '',
            intentId: '',
            groupId: '',
            preFilledMessage: '',
        });
        setGeneratedLink('');
        setShowPreview(false);
        setQrCodeReady(false);
        setErrors({});
    };

    return (
        <>
            <script type='text/javascript' src='/js/qrcode.js' defer></script>
            <script type='text/javascript' src='/js/jquery.min.js'></script>
            <div className='container flex items-center flex-col gap-10 px-4 sm:px-6'>
                <div className='flex w-full md:items-center flex-col gap-6 text-center'>
                    <div className='flex lg:flex-row flex-col md:items-center justify-center gap-2'>
                        <Image
                            width={66}
                            height={66}
                            src={data?.product?.icon}
                            alt='Apple Messages for Business logo'
                            loading='lazy'
                        />
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold'>{data?.product?.name}</h1>
                    </div>
                    <p className={style.tagline}>{data?.tagline}</p>
                    <p className='text-xl sm:text-2xl md:text-3xl md:w-3/5 md:text-center'>{data?.heading}</p>
                    {data?.subheading && (
                        <p className='text-base sm:text-lg md:text-xl md:w-3/5 md:text-center text-gray-600'>
                            {data?.subheading}
                        </p>
                    )}
                    <a href='#generate'>
                        <button className='btn btn-primary btn-md w-full sm:w-auto'>{data?.getstarted_btn}</button>
                    </a>
                    <p className='text-xs sm:text-sm text-gray-500'>{data?.note}</p>
                </div>

                {/* 3 Steps Section */}
                <div className='w-full py-6 sm:py-10'>
                    <h2 className='text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-10'>
                        {data?.steps?.heading}
                    </h2>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
                        {data?.steps?.cards?.map((step, index) => (
                            <div key={index} className='bg-gray-50 p-4 sm:p-6 rounded-lg'>
                                <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                    <div className='text-xl sm:text-2xl'>{GetMdIcons(step?.icon)}</div>
                                    <h3 className='text-base sm:text-lg md:text-xl font-semibold'>{step?.title}</h3>
                                </div>
                                <p className='text-xs sm:text-sm md:text-base text-gray-600'>{step?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Generator Form Section */}
                <div id='generate' className='w-full py-6 sm:py-10 bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8'>
                    <h2 className='text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-10'>
                        {data?.create?.heading}
                    </h2>

                    <div className='grid lg:grid-cols-2 gap-8 sm:gap-12'>
                        {/* Form */}
                        <div className='space-y-6'>
                            {data?.create?.content?.map((section, sIndex) => (
                                <div key={sIndex} className='space-y-3 sm:space-y-4'>
                                    <h3 className='text-lg sm:text-xl font-semibold'>{section?.title}</h3>
                                    {section?.description && (
                                        <p className='text-gray-600 text-xs sm:text-sm'>{section?.description}</p>
                                    )}
                                    {section?.feilds?.map((field, fIndex) => {
                                        const fieldName = field?.name?.toLowerCase().trim();
                                        const mappedName = fieldMapping[fieldName] || fieldName;
                                        return (
                                            <div key={fIndex} className='space-y-1 sm:space-y-2'>
                                                <label className='block text-xs sm:text-sm font-medium'>
                                                    {field?.name}
                                                </label>
                                                <input
                                                    type='text'
                                                    name={fieldName}
                                                    placeholder={field?.placeholder}
                                                    value={formData[mappedName] || ''}
                                                    onChange={handleInputChange}
                                                    className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                                                        errors[mappedName] ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {errors[mappedName] && (
                                                    <p className='text-red-500 text-xs sm:text-sm'>
                                                        {errors[mappedName]}
                                                    </p>
                                                )}
                                                {field?.description && (
                                                    <p className='text-gray-500 text-xs'>{field?.description}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}

                            {/* Validation Note */}
                            <div className='bg-yellow-50 border border-yellow-200 p-3 sm:p-4 rounded-lg'>
                                <p className='text-xs sm:text-sm text-yellow-800'>{data?.create?.validationNote}</p>
                            </div>

                            <button onClick={generateLink} className='btn btn-primary btn-md w-full'>
                                {data?.create?.generate_btn}
                            </button>
                        </div>

                        {/* Preview Panel */}
                        <div className='bg-white p-4 sm:p-6 rounded-lg border'>
                            {!showPreview ? (
                                <div className='text-center text-gray-500 py-12 sm:py-20'>
                                    <p className='text-sm sm:text-base'>
                                        Fill in the form and click Generate to see your link and QR code
                                    </p>
                                </div>
                            ) : (
                                <div className='space-y-4 sm:space-y-6'>
                                    <h3 className='text-xl sm:text-2xl font-semibold'>{data?.preview?.heading}</h3>

                                    {/* Generated Link */}
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium'>{data?.preview?.linkLabel}</label>
                                        <div className='flex flex-col sm:flex-row gap-2'>
                                            <input
                                                type='text'
                                                value={generatedLink}
                                                readOnly
                                                className='flex-1 p-3 border rounded-lg bg-gray-50 text-sm'
                                            />
                                            <button
                                                onClick={copyLink}
                                                className='btn btn-secondary btn-md flex items-center justify-center gap-2 w-full sm:w-auto'
                                            >
                                                <MdCopyAll />
                                                <span className='hidden sm:inline'>
                                                    {copySuccess ? 'Copied!' : 'Copy link'}
                                                </span>
                                                <span className='sm:hidden'>{copySuccess ? 'Copied!' : 'Copy'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* QR Code */}
                                    <div className='space-y-3 sm:space-y-4'>
                                        <div id='apple-qrcode' className='flex justify-center'></div>
                                        {qrCodeReady && (
                                            <button
                                                onClick={downloadQRCode}
                                                className='btn btn-secondary btn-md w-full flex items-center justify-center gap-2'
                                            >
                                                <MdDownload />
                                                {data?.preview?.downloadBtn}
                                            </button>
                                        )}
                                    </div>

                                    {/* Preview Caption */}
                                    <p className='text-center text-xs sm:text-sm text-gray-600'>
                                        {data?.preview?.caption}
                                    </p>

                                    {/* Disclaimer */}
                                    <p className='text-center text-xs text-gray-500'>{data?.preview?.disclaimer}</p>

                                    {/* Edit Button */}
                                    <button onClick={resetForm} className='btn btn-outline btn-md w-full'>
                                        {data?.preview?.editBtn}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Secondary Section */}
                {data?.secondary && (
                    <div className='w-full py-6 sm:py-10 bg-blue-50 rounded-lg p-4 sm:p-6 md:p-8 text-center'>
                        <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>{data?.secondary?.heading}</h2>
                        <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto'>
                            {data?.secondary?.body}
                        </p>
                        <a href={data?.secondary?.ctaLink}>
                            <button className='btn btn-primary btn-md w-full sm:w-auto'>
                                {data?.secondary?.ctaText}
                            </button>
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default AppleMessagesLinkComp;
