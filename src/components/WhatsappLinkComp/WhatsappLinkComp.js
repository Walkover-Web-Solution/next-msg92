import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import style from './WhatsappLinkComp.module.scss';
import GetMdIcons from '@/utils/getMdIcons';
import { MdChevronRight, MdCopyAll, MdDownload } from 'react-icons/md';

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

    const [formData, setFormData] = useState({
        phoneNumber: '',
        preFilledMessage: '',
        welcomeText: 'Hi there!\nHow can I help you?',
        brandImage: '',
    });

    const [generatedLink, setGeneratedLink] = useState('');
    const [widgetCode, setWidgetCode] = useState('');

    const qrCodeRef = useRef(null);
    const qrCodeInstance = useRef(null);

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
                });
                qrCodeInstance.current.makeCode(generatedLink);
                setQrCodeReady(true);

                // Generate widget code
                const widgetCodeHtml = `<script>
var options = {
  brandSetting: {
    brandImg: "${formData.brandImage}",
    welcomeText: \`${formData.welcomeText}\`, 
    messageText: \`${formData.preFilledMessage}\`,
    phoneNumber: "${formData.phoneNumber}",
  },
  chatButtonSetting: {
    backgroundColor: "#24d366",
    ctaText: 'Chat with us',
    marginLeft: "0",
    marginRight: "20",
    marginBottom: "20",
    position: "right",
  },
  enabled: true,
  isNewChatWidget: true
}
<\/script>
<script type="text/javascript" onload="CreateWhatsappChatWidget(options)" src="https://msg91.com/js/waWidget.js"><\/script>`;

                setWidgetCode(widgetCodeHtml);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }
    }, [
        showPreview,
        generatedLink,
        formData.brandImage,
        formData.welcomeText,
        formData.preFilledMessage,
        formData.phoneNumber,
    ]);

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
        setCopyLinkSuccess(false);
        setCopyCodeSuccess(false);
        setQrCodeReady(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopyLinkSuccess(true);
        setTimeout(() => setCopyLinkSuccess(false), 2000);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(widgetCode);
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

    const editForm = () => {
        setShowPreview(false);
        setQrCodeReady(false);
    };

    const brandImageSrc = formData.brandImage || 'https://msg91.com/img/icon/walink-whatsapp.svg';

    return (
        <>
            <script type='text/javascript' src='/js/qrcode.js' defer></script>
            <link rel='stylesheet' href='/walink.css' />
            <div className='container flex items-center flex-col gap-10'>
                <div className='flex w-full md:items-center flex-col gap-6'>
                    <div className='flex lg:flex-row flex-col md:items-center gap-2'>
                        <Image width={66} height={66} src={data?.product?.icon} alt='whatsapp logo' loading='lazy' />
                        <h1 className='text-5xl font-semibold'>{data?.product?.name}</h1>
                    </div>
                    <p className={style.tagline}>{data?.tagline}</p>
                    <p className='text-3xl md:w-3/5 md:text-center '>{data?.heading}</p>
                    <a href='#generate'>
                        <button className='btn btn-primary btn-md'>{data?.getstarted_btn}</button>
                    </a>
                </div>
                <Image
                    width={1080}
                    height={1080}
                    className='ms:w-4/5'
                    src={data?.banner_img}
                    alt='Whatsapp link generator'
                    loading='lazy'
                />
            </div>
            {data?.steps?.cards?.length > 0 && (
                <div className='container flex flex-col  cont_p gap-8'>
                    <h2 className='text-3xl'>{data?.steps?.heading}</h2>
                    <div className='grid gap-10 grid-cols-3'>
                        {data?.steps?.cards?.map((step, i) => {
                            const Icon = GetMdIcons(step?.icon);
                            return (
                                <div key={i} className='md:col-span-2 col-span-3 lg:col-span-1 flex flex-col gap-2'>
                                    <Icon fontSize={66} className='text-gray-500' />
                                    <h3 className='text-2xl font-semibold'>{step?.title}</h3>
                                    <p className='text-lg'>{step?.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className='container flex flex-col cont_p cont_gap' id='generate'>
                <h3 className='text-3xl'>{data?.create?.heading}</h3>
                <div>
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        <div className='w-full'>
                            {showPreview && (
                                <button onClick={editForm} className='text-link active-link mb-4'>
                                    Edit
                                </button>
                            )}
                            <form className='flex flex-col gap-6' onSubmit={generateLink} noValidate=''>
                                <span className='text-xl font-semibold'>Type your WhatsApp Number</span>
                                <p>
                                    Enter your WhatsApp number along with your country code (without the '+' symbol).
                                    For instance, if your country code is +91 and your WhatsApp number is 872849182,
                                    just type 91872849182.
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='phoneNumber'>WhatsApp number</label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        name='phoneNumber'
                                        placeholder='eg. 919000012345'
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required=''
                                    />
                                </div>

                                <p>
                                    Automatically send this text when a user clicks on your chat link, making it easier
                                    to start a conversation.
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='preFilledMessage'>
                                        Pre-Filled Message <span>(Optional)</span>
                                    </label>
                                    <textarea
                                        className='input input-bordered max-w-lg'
                                        name='preFilledMessage'
                                        placeholder='eg. Hello, I have a question about your service. Can you please help me?'
                                        value={formData.preFilledMessage}
                                        onChange={handleInputChange}
                                    />

                                    <div>Please enter a valid email address for shipping updates.</div>
                                </div>

                                <span className='text-xl font-semibold'>Widget Customisation</span>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='welcomeText'>Welcome text</label>
                                    <textarea
                                        className='input input-bordered max-w-lg'
                                        name='welcomeText'
                                        placeholder='Hi there! How can I help you?'
                                        value={formData.welcomeText}
                                        onChange={handleInputChange}
                                        required=''
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='brandImage'>
                                        Brand image URL
                                        <span>(Optional)</span>
                                    </label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        name='brandImage'
                                        placeholder='https://storage.googleapis.com/92283/image.png'
                                        value={formData.brandImage}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button type='submit' className='btn btn-voice btn-primary btn-md'>
                                    Generate Now
                                </button>
                            </form>
                        </div>

                        {!showPreview ? (
                            <div className='w-full flex gap-4 flex-col'>
                                <span className='text-xl font-semibold'>
                                    <span>Widget preview</span>
                                </span>
                                <img
                                    className='max-w-[460px]'
                                    src='/img/widget-preview.svg'
                                    alt='widget preview logo'
                                />
                            </div>
                        ) : (
                            <div className='w-full flex gap-4 flex-col'>
                                <span className='flex gap-4'>
                                    <span className='text-xl font-semibold'>Widget preview</span>
                                </span>
                                <div className='my-4'>
                                    <div>{generatedLink}</div>
                                </div>
                                <div className='flex gap-8 flex-col lg:flex-row'>
                                    <div className=' lg:w-1/2 flex flex-col gap-6 p-8 bg-gray-200'>
                                        <div className='flex md:flex-row flex-col gap-4 justify-between w-full'>
                                            <button onClick={copyLink} className='btn btn-primaryb btn-md btn-outline'>
                                                <MdCopyAll />
                                                <span>{copyLinkSuccess ? 'Copied!' : 'Copy Link'}</span>
                                            </button>
                                            <button
                                                onClick={downloadQRCode}
                                                className='btn btn-primaryb btn-md btn-outline'
                                            >
                                                <MdDownload />
                                                Download QR Code
                                            </button>
                                        </div>
                                        <div className='flex flex-col gap-4 w-fit max-w-[340px]'>
                                            <div className='flex flex-col gap-2 rounded-2xl w-fit border-2 p-8 border-black bg-white'>
                                                <div
                                                    style={{
                                                        backgroundColor: '#fff',
                                                        height: '50px',
                                                        width: '50px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <img
                                                        src={brandImageSrc}
                                                        alt='Brand Image'
                                                        style={{
                                                            height: '100%',
                                                        }}
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <div
                                                        style={{
                                                            backgroundColor: 'white',
                                                            display: 'inline-block',
                                                            margin: '0px 0px',
                                                            padding: '10px 0px',
                                                            borderRadius: 10,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: '20px',
                                                                lineHeight: '26px',
                                                                marginTop: '4px',
                                                                color: 'rgb(17, 17, 17)',
                                                                whiteSpace: 'pre-line',
                                                            }}
                                                        >
                                                            {formData.welcomeText}
                                                        </div>
                                                    </div>
                                                    <div ref={qrCodeRef}></div>
                                                    <div>Scan this QR code to initiate a WhatsApp chat with us.</div>
                                                </div>
                                                <div>
                                                    <a
                                                        href={generatedLink}
                                                        role='button'
                                                        target='_blank'
                                                        rel='noopener'
                                                        title='WhatsApp'
                                                        className='btn btn-primary'
                                                    >
                                                        <img
                                                            src='/assets/global/whatsapp-link/whatsapp-icon-white.svg'
                                                            alt='WhatsApp Link '
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft: 8,
                                                                marginRight: 8,
                                                                zIndex: 1,
                                                                color: 'rgb(255, 255, 255)',
                                                            }}
                                                        >
                                                            Chat With Us
                                                        </span>
                                                        <MdChevronRight fontSize={26} />
                                                    </a>
                                                </div>
                                                <div>
                                                    <img src='https://msg91.com/img/poweredby.svg' alt='Powered By' />
                                                </div>
                                            </div>
                                            <div className='ml-auto bg-green-400 rounded-full h-[44px] w-[44px] flex items-center justify-center'>
                                                <svg
                                                    width={23}
                                                    height={13}
                                                    viewBox='0 0 23 13'
                                                    fill='none'
                                                    style={{ pointerEvents: 'none', display: 'block' }}
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M2.20001 1.7334L11.6154 11.1488L21.0308 1.7334'
                                                        stroke='#000'
                                                        strokeWidth={2}
                                                        strokeLinecap='square'
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='lg:w-1/2'>
                                        <div>
                                            <span style={{ lineHeight: '38px' }}>
                                                <span className='text-xl font-semibold'>Widget code snippet</span>
                                            </span>
                                        </div>
                                        <p>Copy and paste this code on every page of your website.</p>
                                        <pre style={{ position: 'relative' }}>
                                            <div className='absolute right-0 '>
                                                <button onClick={copyCode} className='btn btn-md btn-white btn-outline'>
                                                    <MdCopyAll />
                                                    <span>{copyCodeSuccess ? 'Copied!' : 'Copy code'}</span>
                                                </button>
                                            </div>
                                            <code className='language-javascript hljs'>{widgetCode}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhatsappLinkComp;
