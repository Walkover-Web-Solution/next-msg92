import React from 'react';
import { MdContentCopy, MdDownload, MdChevronRight, MdKeyboardArrowDown as MdChevronDown } from 'react-icons/md';

const WidgetPreview = ({
    isSkeleton = false,
    logoSrc,
    welcomeMessage,
    qrCodeRef,
    scanInstruction,
    buttonText,
    buttonHref,
    buttonColor = '#007AFF',
    buttonGradient = null,
    iconInButton = null,
    onCopyLink,
    onDownloadQR,
    copyLinkSuccess,
    qrCodeReady,
    bubbleColor = 'blue-500',
}) => {
    const buttonStyle = buttonGradient ? { background: buttonGradient } : { backgroundColor: buttonColor };

    return (
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
                            onClick={onCopyLink}
                            className='flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200'
                        >
                            <MdContentCopy className='w-4 h-4' />
                            <span>{copyLinkSuccess ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                        {qrCodeReady && (
                            <button
                                onClick={onDownloadQR}
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
                            <img src={logoSrc} alt='Logo' className='w-full h-full' />
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
                            {welcomeMessage}
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
                        <p className='text-sm text-slate-700 leading-relaxed'>{scanInstruction}</p>
                    )}

                    {/* Action Button */}
                    {isSkeleton ? (
                        <div className='h-12 bg-slate-200 rounded-xl animate-pulse'></div>
                    ) : (
                        <a
                            href={buttonHref}
                            role='button'
                            target='_blank'
                            rel='noopener'
                            className='flex items-center justify-between gap-3 w-full py-3 px-5 rounded-xl text-white font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5'
                            style={buttonStyle}
                        >
                            <div className='flex items-center gap-3'>
                                {iconInButton && <div className='w-6 h-6 flex-shrink-0'>{iconInButton}</div>}
                                <span>{buttonText}</span>
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
                    <div
                        className={`ms-auto bg-${bubbleColor} rounded-full h-10 w-10 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform`}
                    >
                        <MdChevronDown className='w-6 h-6 text-slate-900' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WidgetPreview;
