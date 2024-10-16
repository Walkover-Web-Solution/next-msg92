import {
    MdAccountBalance,
    MdContactSupport,
    MdExpandMore,
    MdFlashOn,
    MdOutlineHealthAndSafety,
    MdOutlineQuestionMark,
    MdOutlineStorefront,
    MdOutlineSupport,
    MdOutlineSupportAgent,
    MdOutlineWatch,
    MdOutlineWatchLater,
} from 'react-icons/md';

export default function ChatBotComp({ data }) {
    return (
        <>
            <div className='flex lg:flex-row flex-col container py-20 justify-between'>
                <div className='flex flex-col gap-6  justify-center'>
                    <div className='flex items-center'>
                        <img src={data?.product?.icon} alt='Product Icon' />
                        <p className='text-xl font-bold '>{data?.product?.name}</p>
                    </div>
                    <p className='text-lg'>{data?.tagline}</p>
                    <h1 className='text-4xl font-bold '>{data?.heading}</h1>
                    <h2 className='text-xl '>{data?.subheading}</h2>
                    <a
                        href='https://web.msg91.com/signup?utm_campaign=tigerplugin&utm_source=tally&utm_medium=website'
                        target='_blank'
                    >
                        <button className='btn btn-primary'>{data?.getstarted_btn}</button>
                    </a>
                </div>
                <div>
                    <img src={data?.banner_img} alt='Banner Image' />
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col py-20 gap-6'>
                    <div className='row'>
                        <h2 className='text-3xl font-bold'>{data?.business_use?.heading}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {data?.business_use?.content.map((content, index) => (
                            <div key={index} className='flex flex-col gap-6 py-12'>
                                <div className='text-3xl text-green-700 py-6 border border-gray-300 rounded-lg bg-white flex items-center justify-center w-1/6 md:w-1/6'>
                                    {content?.icon === 'MdFlashOn' && <MdFlashOn />}
                                    {content?.icon === 'MdOutlineWatch' && <MdOutlineWatchLater />}
                                    {content?.icon === 'MDoutlineQuestion' && <MdContactSupport />}
                                    {content?.icon === 'MDoutlineSupport' && <MdOutlineSupportAgent />}
                                </div>
                                <p className='text-2xl font-semibold'>{content?.heading}</p>
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: content?.description }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col py-20 gap-6'>
                <div className='row'>
                    <h2 className='text-3xl font-bold'>{data?.Across_industries?.heading}</h2>
                </div>
                <div className='grid gap-6'>
                    {data?.Across_industries?.content.map((industry, index) => (
                        <div
                            key={index}
                            className={`flex flex-row gap-6 py-12 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className='flex items-center justify-center w-full'>
                                <img src={industry?.image} alt='Industry Icon' />
                            </div>
                            <div className='flex flex-col gap-6 w-full bg-neutral p-12'>
                                <div className='text-6xl'>
                                    {industry?.icon === 'MdOutlineHealthAndSafety' && <MdOutlineHealthAndSafety />}
                                    {industry?.icon === 'MdOutlineStorefront' && <MdOutlineStorefront />}
                                    {industry?.icon === 'MdAccountBalance' && <MdAccountBalance />}
                                </div>

                                <h2 className='text-3xl font-semibold'>{industry?.heading}</h2>
                                <p className='text-lg' dangerouslySetInnerHTML={{ __html: industry?.description }}></p>
                                <div className='grid grid-cols-2 gap-6'>
                                    {industry?.card.map((card, cardIndex) => (
                                        <div
                                            key={cardIndex}
                                            className='text-lg font-normal bg-white border border-gray-300 rounded p-4 '
                                        >
                                            {card?.line}
                                        </div>
                                    ))}
                                </div>
                                <div className='flex items-center'>
                                    <button>{industry?.more_btn}</button>
                                    <MdExpandMore />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
