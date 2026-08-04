import React, { useState, useEffect, useRef } from 'react';
import {
    MdKeyboardArrowDown as MdChevronDown,
    MdChevronRight,
    MdMessage,
    MdContentCopy,
    MdDownload,
    MdCheckCircle,
    MdArrowForward,
    MdWarning,
    MdOpenInNew,
} from 'react-icons/md';

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

export default function MSG91AppleMessagesLinkGenerator() {
    const [formData, setFormData] = useState({
        businessId: '',
        intentId: '',
        groupId: '',
        preFilledMessage: '',
    });

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

    const renderWidgetPreview = (isSkeleton) => (
        <div className='w-full flex flex-col gap-6 p-8 bg-slate-100 rounded-2xl'>
            {/* Action Buttons */}
            <div className='flex md:flex-row flex-col gap-3 justify-between w-full'>
                {isSkeleton ? (
                    <>
                        <div className='h-11 w-32 bg-slate-200 rounded-xl animate-pulse'></div>
                        <div className='h-11 w-44 bg-slate-200 rounded-xl animate-pulse'></div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleCopyLink}
                            className='flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200'
                        >
                            <MdContentCopy className='w-4 h-4' />
                            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        {qrCodeReady && (
                            <button
                                onClick={handleDownloadQR}
                                className='flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200'
                            >
                                <MdDownload className='w-4 h-4' />
                                Download QR Code
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Widget Card */}
            <div className='flex flex-col gap-4 mx-auto max-w-[360px] w-full'>
                <div
                    className={`flex flex-col gap-5 rounded-3xl p-8 bg-white shadow-xl border-2 ${isSkeleton ? 'border-slate-200' : 'border-slate-900'}`}
                >
                    {/* Logo */}
                    {isSkeleton ? (
                        <div className='w-14 h-14 bg-slate-200 rounded-xl animate-pulse'></div>
                    ) : (
                        <div className='w-14 h-14'>
                            <img
                                src='/assets/icons/products/imessage.svg'
                                alt='Apple Messages'
                                className='w-full h-full'
                            />
                        </div>
                    )}

                    {/* Welcome Message */}
                    {isSkeleton ? (
                        <div className='space-y-2'>
                            <div className='h-5 bg-slate-200 rounded-md animate-pulse w-3/4'></div>
                            <div className='h-5 bg-slate-200 rounded-md animate-pulse w-1/2'></div>
                        </div>
                    ) : (
                        <div className='text-xl font-semibold text-slate-900 leading-tight whitespace-pre-line'>
                            {formData.preFilledMessage || "Got any questions?\nWe're here to help."}
                        </div>
                    )}

                    {/* QR Code with Scanning Frame */}
                    <div className='flex justify-center py-2'>
                        <div className='relative p-4'>
                            <div
                                className={`absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] rounded-tl-md ${isSkeleton ? 'border-slate-200' : 'border-slate-900'}`}
                            ></div>
                            <div
                                className={`absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] rounded-tr-md ${isSkeleton ? 'border-slate-200' : 'border-slate-900'}`}
                            ></div>
                            <div
                                className={`absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] rounded-bl-md ${isSkeleton ? 'border-slate-200' : 'border-slate-900'}`}
                            ></div>
                            <div
                                className={`absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] rounded-br-md ${isSkeleton ? 'border-slate-200' : 'border-slate-900'}`}
                            ></div>
                            {isSkeleton ? (
                                <div className='w-[150px] h-[150px] bg-slate-200 rounded-md animate-pulse'></div>
                            ) : (
                                <div ref={qrCodeRef}></div>
                            )}
                        </div>
                    </div>

                    {/* Scan Instruction */}
                    {isSkeleton ? (
                        <div className='space-y-2'>
                            <div className='h-3 bg-slate-200 rounded-md animate-pulse w-full'></div>
                            <div className='h-3 bg-slate-200 rounded-md animate-pulse w-2/3'></div>
                        </div>
                    ) : (
                        <p className='text-sm text-slate-700 leading-relaxed'>
                            Scan this QR code to start an Apple Messages for Business conversation.
                        </p>
                    )}

                    {/* Message Us Button */}
                    {isSkeleton ? (
                        <div className='h-12 bg-slate-200 rounded-xl animate-pulse'></div>
                    ) : (
                        <a
                            href={generatedLink}
                            role='button'
                            target='_blank'
                            rel='noopener'
                            title='Apple Messages'
                            className='flex items-center justify-between gap-3 w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-6 h-6 flex-shrink-0'>
                                    <img
                                        src='/assets/icons/products/imessage.svg'
                                        alt='Apple Messages'
                                        className='w-full h-full'
                                    />
                                </div>
                                <span>Message Us</span>
                            </div>
                            <MdChevronRight className='w-5 h-5' />
                        </a>
                    )}

                    {/* Powered By */}
                    {isSkeleton ? (
                        <div className='h-4 w-28 bg-slate-200 rounded-md animate-pulse'></div>
                    ) : (
                        <div className='flex items-center'>
                            <img
                                src='https://msg91.com/img/poweredby.svg'
                                alt='Powered By MSG91'
                                className='opacity-70'
                            />
                        </div>
                    )}
                </div>

                {/* Chat Bubble Indicator */}
                {isSkeleton ? (
                    <div className='ms-auto bg-slate-200 rounded-full h-10 w-10 animate-pulse'></div>
                ) : (
                    <div className='ms-auto bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform'>
                        <MdChevronDown className='w-6 h-6 text-slate-900' />
                    </div>
                )}
            </div>
        </div>
    );

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
            <section className='bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 border-b border-slate-100'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
                    <div className='inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5 text-xs font-bold text-emerald-700 uppercase tracking-widest shadow-xs'>
                        <span>APPLE MESSAGES FOR BUSINESS</span>
                    </div>

                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight'>
                        Free Apple Messages for Business Link Generator
                    </h1>

                    <p className='text-lg sm:text-xl font-bold text-slate-700 max-w-3xl mx-auto'>
                        Generate Apple Messages for Business click-to-chat links and QR codes
                    </p>

                    <p className='text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>
                        Turn any website, email, or QR code into a one-tap Apple Messages for Business conversation —
                        pre-filled and routed to the right team automatically.
                    </p>

                    <div className='pt-4 flex flex-col items-center justify-center space-y-3'>
                        <button
                            onClick={scrollToGenerator}
                            className='bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold px-10 py-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition duration-200 flex items-center space-x-3 cursor-pointer'
                        >
                            <span>Generate</span>
                            <MdArrowForward className='w-5 h-5' />
                        </button>
                        <p className='text-xs text-slate-500 font-medium'>
                            Free to use. No MSG91 account required to generate a link.
                        </p>
                    </div>
                </div>
            </section>

            {/* "3 steps" Section */}
            <section id='how-it-works' className='py-16 bg-slate-50 border-b border-slate-200/70'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center max-w-2xl mx-auto mb-12'>
                        <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>
                            Get started in 3 simple steps
                        </h2>
                        <p className='text-slate-600 mt-2 text-sm'>
                            Create your custom click-to-chat URL and high-resolution QR code instantly.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-3 gap-8'>
                        {/* Step 1 */}
                        <div className='bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative space-y-4 hover:shadow-md transition'>
                            <div className='w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md shadow-emerald-500/20'>
                                01
                            </div>
                            <h3 className='text-lg font-bold text-slate-900'>Enter Business ID</h3>
                            <p className='text-sm text-slate-600 leading-relaxed'>
                                Enter your Apple Messages for Business ID that Apple issued after you registered your
                                business.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className='bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative space-y-4 hover:shadow-md transition'>
                            <div className='w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md shadow-emerald-500/20'>
                                02
                            </div>
                            <h3 className='text-lg font-bold text-slate-900'>Add Routing & Message</h3>
                            <p className='text-sm text-slate-600 leading-relaxed'>
                                Add an Intent ID and Group ID if you want this entry point to route conversations
                                automatically, and a pre-filled message so customers only need to tap Send.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className='bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative space-y-4 hover:shadow-md transition'>
                            <div className='w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md shadow-emerald-500/20'>
                                03
                            </div>
                            <h3 className='text-lg font-bold text-slate-900'>Generate & Share</h3>
                            <p className='text-sm text-slate-600 leading-relaxed'>
                                Click 'Generate' to create your link and QR code — ready to add to your website, emails,
                                or print materials.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Generator Tool Section */}
            <section id='generator' ref={generatorRef} className='container flex flex-col cont_p cont_gap'>
                <h2 className='text-3xl font-semibold'>Create your Apple Messages for Business link / QR code</h2>

                {/* Tabs */}
                <div className='flex gap-4 mb-6 border-b border-gray-200'>
                    <button
                        onClick={() => setShowPreview(false)}
                        className={`px-4 py-2 font-semibold transition ${
                            !showPreview
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setShowPreview(true)}
                        disabled={!hasGenerated}
                        className={`px-4 py-2 font-semibold transition ${
                            showPreview
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Edit Tab */}
                {!showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        <div className='w-full'>
                            <form className='flex flex-col gap-6' onSubmit={handleGenerate} noValidate=''>
                                {/* Business ID */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='businessId' className='font-semibold'>
                                        Apple Messages for Business ID <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        name='businessId'
                                        placeholder='e.g. 22222222-dddd-4444-bbbb-777777777777'
                                        value={formData.businessId}
                                        onChange={handleInputChange}
                                        required=''
                                    />
                                    {errors.businessId && <p className='text-red-500 text-xs'>{errors.businessId}</p>}
                                    <p className='text-xs text-gray-600'>
                                        Enter the unique Business ID Apple assigned you after registering for Messages
                                        for Business.
                                    </p>
                                </div>

                                {/* Intent ID */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='intentId' className='font-semibold'>
                                        Intent ID (optional)
                                    </label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        name='intentId'
                                        placeholder='e.g. account_question'
                                        value={formData.intentId}
                                        onChange={handleInputChange}
                                    />
                                    {errors.intentId && <p className='text-red-500 text-xs'>{errors.intentId}</p>}
                                    <p className='text-xs text-gray-600'>
                                        Define the purpose of the chat. Used together with Group ID to route the
                                        conversation.
                                    </p>
                                </div>

                                {/* Group ID */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='groupId' className='font-semibold'>
                                        Group ID (optional)
                                    </label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        name='groupId'
                                        placeholder='e.g. billing_department'
                                        value={formData.groupId}
                                        onChange={handleInputChange}
                                    />
                                    {errors.groupId && <p className='text-red-500 text-xs'>{errors.groupId}</p>}
                                    <p className='text-xs text-gray-600'>
                                        Define the department or team best suited to handle this conversation.
                                    </p>
                                </div>

                                {/* Pre-filled Message */}
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='preFilledMessage' className='font-semibold'>
                                        Pre-filled message (optional)
                                    </label>
                                    <textarea
                                        className='input input-bordered max-w-lg'
                                        name='preFilledMessage'
                                        rows={3}
                                        style={{ minHeight: '100px' }}
                                        placeholder='e.g. I have a question about my order'
                                        value={formData.preFilledMessage}
                                        onChange={handleInputChange}
                                    />
                                    {errors.preFilledMessage && (
                                        <p className='text-red-500 text-xs'>{errors.preFilledMessage}</p>
                                    )}
                                    <p className='text-xs text-gray-600'>
                                        Automatically fill this text in when a customer taps your link.
                                    </p>
                                </div>

                                {/* Validation Note */}
                                <div className=' flex items-center gap-2'>
                                    <MdWarning className='w-4 h-4 text-yellow-600 shrink-0 mt-0.5' />
                                    <p className='text-xs text-yellow-800'>
                                        Intent ID, Group ID, and message text can't contain the characters{' '}
                                        <code className=' font-mono'>&amp; # [ ] ( ) &#123; &#125; /</code>.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button type='submit' className='btn btn-primary btn-md w-fit'>
                                    Generate now
                                </button>
                            </form>
                        </div>

                        {/* Widget Skeleton Preview in Edit Tab */}
                        {renderWidgetPreview(true)}
                    </div>
                )}

                {/* Preview Tab */}
                {showPreview && (
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        {/* Left: Widget Code Snippet */}
                        <div className='w-full flex flex-col gap-4'>
                            <span className='text-xl font-semibold'>Widget code snippet</span>
                            <pre
                                style={{
                                    position: 'relative',
                                    background: '#1e293b',
                                    color: '#e2e8f0',
                                    padding: '3rem 1rem 1rem 1rem',
                                    borderRadius: '0.5rem',
                                    overflow: 'auto',
                                    fontSize: '1rem',
                                    lineHeight: '1.5',
                                    height: '100%',
                                }}
                            >
                                <div className='absolute right-2 top-2'>
                                    <button onClick={handleCopyCode} className='btn btn-sm btn-white'>
                                        <MdContentCopy />
                                        <span>{copiedCode ? 'Copied!' : 'Copy code'}</span>
                                    </button>
                                </div>
                                <code
                                    className='language-javascript'
                                    style={{
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all',
                                        background: 'transparent',
                                        color: 'inherit',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: widgetCode }}
                                ></code>
                            </pre>
                            <p>Copy and paste this code on every page of your website.</p>
                        </div>

                        {/* Right: Widget Preview */}
                        {renderWidgetPreview(false)}
                    </div>
                )}
            </section>

            {/* Secondary section — "Want this on your website?" */}
            <section
                id='website-integration'
                className='py-16 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white'
            >
                <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6'>
                    <span className='inline-block bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-white/20'>
                        EMBEDDABLE WEB BUTTON
                    </span>

                    <h2 className='text-3xl sm:text-4xl font-black tracking-tight'>
                        Want a Messages button on your website?
                    </h2>

                    <p className='text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed'>
                        Beyond a link or QR code, Apple also supports an embeddable Messages button using Apple's
                        official Messages for Business JavaScript library and a business ID. Our team can help you set
                        this up alongside your MSG91 integration.
                    </p>

                    <div className='pt-2'>
                        <a
                            href='https://msg91.com/contact-us'
                            className='inline-flex items-center space-x-2 bg-white text-emerald-700 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition duration-200'
                        >
                            <span>Talk to us about website integration</span>
                            <MdOpenInNew className='w-4 h-4' />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
