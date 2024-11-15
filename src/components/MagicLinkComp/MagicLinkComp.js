import getURL from '@/utils/getURL';
import {
    MdAdsClick,
    MdApps,
    MdBolt,
    MdFlashOn,
    MdGppGood,
    MdLogin,
    MdMoving,
    MdOutlineHealthAndSafety,
    MdOutlineSend,
    MdOutlineStorefront,
    MdTouchApp,
} from 'react-icons/md';

export default function MagicLinkComp({ data }) {
    return (
        <>
            <div className='flex lg:flex-row flex-col container py-20 justify-between'>
                <div className='flex flex-col gap-6 justify-center'>
                    <div className='flex items-center'>
                        <img src={data?.product?.icon} alt='Product Icon' />
                        <p className='text-xl font-bold '>{data?.product?.name}</p>
                    </div>
                    <p className='text-lg'>{data?.tagline?.toUpperCase()}</p>
                    <h1 className='text-4xl font-bold '>{data?.heading}</h1>
                    <h2 className='text-xl '>{data?.subheading}</h2>
                    <a href={getURL('signup', 'magic-link', pageInfo)} target='_blank'>
                        <button className='btn btn-primary'>{data?.getstarted_btn}</button>
                    </a>
                </div>
                <div>
                    <img src={data?.banner_img} alt='Banner Image' />
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='flex flex-col container gap-6 py-20'>
                    <h2 className='text-3xl font-semibold'>{data?.why_magiclink?.heading}</h2>
                    <p className='text-lg '>{data?.why_magiclink?.content}</p>
                </div>
            </div>
            <div className='flex flex-col container gap-6 py-20'>
                <h2 className='text-3xl font-semibold'>{data?.work?.heading}</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {data?.work?.content.map((content, index) => (
                        <div key={index} className='flex flex-col gap-6 py-12 bg-neutral p-6'>
                            <div className='text-3xl text-blue-300 py-6 border border-gray-300 rounded-lg bg-white flex items-center justify-center w-1/6 md:w-1/6'>
                                {content?.icon === 'MdOutlineSend' && <MdOutlineSend />}
                                {content?.icon === 'MdTouchApp' && <MdTouchApp />}
                                {content?.icon === 'MdLogin' && <MdLogin />}
                            </div>
                            <p className='text-2xl font-semibold'>{content?.name}</p>
                            <p className='text-sm' dangerouslySetInnerHTML={{ __html: content?.description }}></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col py-20 gap-6'>
                    <div className='row'>
                        <h2 className='text-3xl font-bold'>{data?.choose_link?.heading}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {data?.choose_link?.cards.map((content, index) => (
                            <div key={index} className='flex flex-col gap-6 py-12'>
                                <div className='text-3xl text-blue-300 py-6 border border-gray-300 rounded-lg bg-white flex items-center justify-center w-1/6 md:w-1/6'>
                                    {content?.icon === 'MdBolt' && <MdBolt />}
                                    {content?.icon === 'MdApps' && <MdApps />}
                                    {content?.icon === 'MdGppGood' && <MdGppGood />}
                                    {content?.icon === 'MdMoving' && <MdMoving />}
                                </div>
                                <p className='text-2xl font-semibold'>{content?.title}</p>
                                <p className='text-sm' dangerouslySetInnerHTML={{ __html: content?.description }}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='container flex flex-col py-20 gap-6'>
                <div className='row'>
                    <h2 className='text-2xl md:text-3xl font-bold'>{data?.Across_industries?.heading}</h2>
                </div>
                <div className='flex flex-col gap-6'>
                    {data?.accros_industies?.content.map((industry, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-6 py-8 md:py-12 ${
                                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                            }`}
                        >
                            <div className='flex items-center justify-center w-full md:w-1/2'>
                                <img
                                    className='w-full h-auto object-cover  '
                                    src={industry?.image}
                                    alt='Industry Icon'
                                />
                            </div>

                            <div className='flex flex-col gap-6 w-full md:w-1/2 bg-neutral p-6 md:p-12'>
                                <div className='text-4xl md:text-6xl'>
                                    {industry?.icon === 'MdOutlineHealthAndSafety' && <MdOutlineHealthAndSafety />}
                                    {industry?.icon === 'MdOutlineStorefront' && <MdOutlineStorefront />}
                                </div>

                                <h2 className='text-2xl md:text-3xl font-semibold'>{industry?.title}</h2>
                                <p
                                    className='text-md md:text-lg'
                                    dangerouslySetInnerHTML={{ __html: industry?.description }}
                                ></p>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                    {industry?.cards.map((card, cardIndex) => (
                                        <div
                                            key={cardIndex}
                                            className='text-md md:text-lg font-normal bg-white border border-gray-300 rounded p-4 overflow-hidden'
                                        >
                                            {card?.line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
