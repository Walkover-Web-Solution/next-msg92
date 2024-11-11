// Parent Component
import Image from 'next/image';
import React, { useEffect } from 'react';
import style from './WhatsappLinkComp.module.scss';
import GetMdIcons from '@/utils/getMdIcons';
import { MdChevronRight, MdCopyAll, MdDownload } from 'react-icons/md';
const ParentComponent = ({ data }) => {
    console.log('🚀 ~ ParentComponent ~ data:', data);
    useEffect(() => {
        var qrcode = new QRCode(document.getElementById('qrcode'), {
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
        });
        $(function () {
            $('#wq-copy-btn').on('click', function (event) {
                event.preventDefault();
                var elementText = $('#whatsappChatWidgetStartChat').attr('href');
                navigator.clipboard.writeText(elementText);
                $(this).find('span').text('Copied!');
            });

            $('#wq-copy-code').on('click', function (event) {
                event.preventDefault();
                var elementText = $('#widget-code').text();
                navigator.clipboard.writeText(elementText);
                $(this).find('span').text('Copied!');
            });

            $('#edit').on('click', function () {
                $('#widget-dummy-preview, #widget-form').show();
                $('#widget-preview, #widget-code-wrp').hide();
            });

            $('.wq-create-link-btn').on('click', function (event) {
                event.preventDefault();
                var wp_number = $('#wqinputphone').val();
                var wp_message = $('#wqinputtext').val();
                var wp_welcome = $('#whatsappChatWidgetWelcomeText').val();
                var wp_brand = $('#whatsappChatWidgetBrandImage').val();

                // Example usage
                if (wp_number == '') {
                    alert('Please enter a phone number.');
                } else {
                    var wp_end_url = `https://wa.me/${wp_number}?text=${encodeURIComponent(wp_message)}`;
                    $('#widget-dummy-preview').hide();
                    $('#widget-preview').show();
                    $('#whatsappChatWidgetStartChat').attr('href', wp_end_url);
                    $('#dataBox').val(wp_end_url);
                    $('.wq-link-display-box').html(wp_end_url);
                    $('#whatsappChatWidgetBrandImagePreview').attr(
                        'src',
                        wp_brand ? wp_brand : 'https://msg91.com/img/icon/walink-whatsapp.svg'
                    );
                    makeQrCode();
                    widgetCode(wp_brand, wp_welcome, wp_message, wp_number);
                }
            });

            const downloadBtn = document.getElementById('downloadBtn');
            const qrcode1 = document.getElementById('qrcode');
            const toHideClassName = 'hide';
            function makeQrCode() {
                var elText = document.getElementById('dataBox');
                if (!elText.value) {
                    alert('Input a text');
                    elText.focus();
                    return;
                }
                qrcode.makeCode(elText.value);
            }

            downloadBtn.onclick = function (e) {
                e.preventDefault();
                // Image tag
                const img = qrcode1.getElementsByTagName('img')[0];

                // Canvas tag
                const canvas = qrcode1.getElementsByTagName('canvas')[0];

                // Padding to QRCode
                const padding = 40;

                // Adding padding to width and height
                canvas.width = canvas.width + padding;
                canvas.height = canvas.height + padding;

                // Canvas context
                const context = canvas.getContext('2d');
                // Clearing previous content
                context.clearRect(0, 0, canvas.width, canvas.height);
                // Making the background white
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                // Adding the image of QRCode
                // x and y are padding / 2
                context.drawImage(img, padding / 2, padding / 2);

                // Getting base64 url
                const image = canvas.toDataURL('image/png', 1);
                const filename = 'WhatsApp-QR-code-' + Date.now() + '.png';
                downloadImage(image, filename);
                //reset height and width
                canvas.width = 150;
                canvas.height = 150;
            };

            function downloadImage(image, filename) {
                // Creating hidden <a> tag to download
                var element = document.createElement('a');
                element.setAttribute('href', image);
                element.setAttribute('download', filename);
                element.setAttribute('class', toHideClassName);
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
            function widgetCode(barndImage, welcomeText, preFilledMsg, mobile) {
                var html = `&lt;script&gt;
var options = {
  brandSetting: {
    brandImg: "${barndImage}",
    welcomeText: \`${welcomeText}\`, 
    messageText: \`${preFilledMsg}\`,
    phoneNumber: "${mobile}",
  },
  chatButtonSetting: {
    backgroundColor: "#24d366", //now is used as Brand Color
    ctaText: 'Chat with us',
    marginLeft: "0",
    marginRight: "20",
    marginBottom: "20",
    position: "right",
  },
  enabled: true,
  isNewChatWidget: true // new property to switch between old and new widget 
}
&lt;/script&gt;
&lt;script type="text/javascript" onload="CreateWhatsappChatWidget(options)" src="https://msg91.com/js/waWidget.js"\&gt; &lt;/script&gt;`;

                $('#widget-code').html(html);
                hljs.highlightAll();
                $('#widget-code-wrp').show();
                $('#widget-form').hide();
            }
        });
    });
    return (
        <>
            <script type='text/javascript' src='/js/qrcode.js' defer></script>
            <script type='text/javascript' src='/js/jquery.min.js'></script>
            <script src='/js/highlight.min.js'></script>
            <link rel='stylesheet' href='/atom-one-dark.min.css' />
            <link rel='stylesheet' href='/walink.css' />
            <div className='container flex items-center flex-col gap-10'>
                <div className='flex w-full md:items-center flex-col gap-6'>
                    <div className='flex lg:flex-row flex-col md:items-center gap-2'>
                        <Image width={66} height={66} src={data?.product?.icon} alt='whatsapp logo' />
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
                <h3 className='text-3xl'>Create QR Code/Widget/Link</h3>
                <div>
                    <div className='flex gap-8 flex-col lg:flex-row'>
                        <div id='widget-form' className='w-full'>
                            <form className='flex flex-col gap-6' noValidate=''>
                                <h4 className='text-xl font-semibold'>Type your WhatsApp Number</h4>
                                <p>
                                    Enter your WhatsApp number along with your country code (without the ‘+’ symbol).
                                    For instance, if your country code is +91 and your WhatsApp number is 872849182,
                                    just type 91872849182.
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='wqinputphone'>WhatsApp number</label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='text'
                                        id='wqinputphone'
                                        placeholder='eg. 919000012345'
                                        required=''
                                    />
                                </div>

                                <p>
                                    Automatically send this text when a user clicks on your chat link, making it easier
                                    to start a conversation.
                                </p>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='wqinputtext'>
                                        Pre-Filled Message <span>(Optional)</span>
                                    </label>
                                    <textarea
                                        className='input input-bordered max-w-lg'
                                        id='wqinputtext'
                                        placeholder='eg. Hello, I have a question about your service. Can you please help me?'
                                        defaultValue={''}
                                    />

                                    <div>Please enter a valid email address for shipping updates.</div>
                                </div>

                                <h4 className='text-xl font-semibold'>Widget Customisation</h4>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='whatsappChatWidgetWelcomeText'>Welcome text</label>
                                    <textarea
                                        className='input input-bordered max-w-lg'
                                        id='whatsappChatWidgetWelcomeText'
                                        placeholder='Hi there! How can I help you?'
                                        required=''
                                        defaultValue={'Hi there!\nHow can I help you?'}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='whatsappChatWidgetBrandImage'>
                                        Brand image URL
                                        <span>(Optional)</span>
                                    </label>
                                    <input
                                        className='input input-bordered max-w-lg'
                                        type='email'
                                        id='whatsappChatWidgetBrandImage'
                                        placeholder='https://storage.googleapis.com/92283/image.png'
                                    />
                                </div>

                                <button type='submit' className='wq-create-link-btn btn btn-voice btn-primary btn-md'>
                                    Generate Now
                                </button>
                            </form>
                        </div>

                        <div id='widget-dummy-preview' className='w-full flex gap-4 flex-col'>
                            <h4 className='text-xl font-semibold'>
                                <span>Widget preview</span>
                            </h4>
                            <img className='max-w-[460px]' src='/img/widget-preview.svg' alt='widget preview logo' />
                        </div>
                    </div>

                    <div id='widget-preview' style={{ display: 'none' }}>
                        <h4 className='flex gap-4'>
                            <span className='text-xl font-semibold'>Widget preview</span>
                            <button id='edit' type='button' className='text-link active-link'>
                                Edit
                            </button>
                        </h4>
                        <div id='wq-generated-output' className='my-4'>
                            <div>https://wa.me/WhatsApp number?text=Pre-Filled Message</div>
                        </div>
                        <div className='flex gap-8 flex-col lg:flex-row'>
                            <div className=' lg:w-1/2 flex flex-col gap-6 p-8 bg-gray-200'>
                                <div className='flex md:flex-row flex-col gap-4 justify-between w-full'>
                                    <button className='btn btn-primaryb btn-md btn-outline' id='wq-copy-btn'>
                                        <MdCopyAll />
                                        <span>Copy Link</span>
                                    </button>
                                    <button className='btn btn-primaryb btn-md btn-outline' id='downloadBtn'>
                                        <MdDownload />
                                        Download QR Code
                                    </button>
                                    <input type='text' id='dataBox' style={{ display: 'none' }} />
                                </div>
                                <div className='flex flex-col gap-4 w-fit max-w-[340px]'>
                                    <div
                                        id='whatsappChatWidgetPreview'
                                        className='flex flex-col gap-2 rounded-2xl w-fit border-2 p-8 border-black bg-white'
                                    >
                                        <div
                                            id='whatsappChatWidgetHeaderPreview'
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
                                                src='https://msg91.com/img/icon/hello.svg'
                                                id='whatsappChatWidgetBrandImagePreview'
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
                                                    id='whatsappChatWidgetWelcomeTextPreview'
                                                    style={{
                                                        fontSize: '20px',
                                                        lineHeight: '26px',
                                                        marginTop: '4px',
                                                        color: 'rgb(17, 17, 17)',
                                                    }}
                                                >
                                                    Got any questions?
                                                    <br /> We’re here to help.
                                                </div>
                                            </div>
                                            <div id='qrcode'></div>
                                            <div>Scan this QR code to initiate a WhatsApp chat with us.</div>
                                        </div>
                                        <div id='whatsappChatWidgetButtonPreview'>
                                            <a
                                                id='whatsappChatWidgetStartChat'
                                                role='button'
                                                target='_blank'
                                                rel='noopener'
                                                href=''
                                                title='WhatsApp'
                                                className='btn btn-primary'
                                            >
                                                <img src='assets/global/whatsapp-link/whatsapp-icon-white.svg' />
                                                <span
                                                    id='whatsappChatWidgetButtonTextPreview'
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
                                            <img src='https://msg91.com/img/poweredby.svg' />
                                        </div>
                                    </div>
                                    <div className='ml-auto bg-green-400 rounded-full h-[44px] w-[44px] flex items-center justify-center'>
                                        <svg
                                            id='wa-widget-opened-svg'
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

                            <div className='lg:w-1/2' id='widget-code-wrp' style={{ display: 'none' }}>
                                <div>
                                    <h4 style={{ lineHeight: '38px' }}>
                                        <span className='text-xl font-semibold'>Widget code snipet</span>
                                    </h4>
                                </div>
                                <p>Copy and paste this code on every page of your website.</p>
                                <pre style={{ position: 'relative' }}>
                                    <div className='absolute right-0 '>
                                        <button className='btn btn-md btn-white btn-outline' id='wq-copy-code'>
                                            <MdCopyAll />
                                            <span>Copy code</span>
                                        </button>
                                    </div>
                                    <code className='language-javascript hljs' id='widget-code'></code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParentComponent;
