import { InlineWidget } from 'react-calendly';
import { MdDoneOutline } from 'react-icons/md';
export default function PartnersComp({ pageInfo, data }) {
    return (
        <>
            {' '}
            <div className='container gap-6 py-20'>
                <h1 class='text-4xl font-bold mb-2 weight-700'>{data?.heading || ' this is heading '}</h1>
                <h2 class='text-xl font-normal mb-4 w-full lg:w-1/2 gap-6'>
                    {data?.subheading || ' this is heading '}
                </h2>

                <a
                    href={data?.doc_btn_link}
                    className='btn btn-outline sm:btn-sm md:btn-md lg:btn-lg bg-black py-2 text-white'
                >
                    {data?.doc_btn}
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20 bg-neutral'>
                    <h2 class='text-4xl font-bold '>{data?.partnership?.heading || ' this is heading '}</h2>

                    {data?.partnership?.cards.map((card, index) => (
                        <div key={index} className='flex flex-col lg:flex-row gap-6 bg-white'>
                            {index % 2 === 0 ? (
                                <>
                                    <div className='flex-1 flex flex-col justify-center items-start p-4'>
                                        <h3 className='text-lg font-bold mb-4'>{card?.heading}</h3>
                                        <p>{card?.content}</p>
                                    </div>
                                    <div className='flex-1'>
                                        <img src={card?.icon} alt={card?.heading} className='w-full h-auto' />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='flex-1'>
                                        <img src={card?.icon} alt={card?.heading} className='w-full h-auto' />
                                    </div>
                                    <div className='flex-1 flex flex-col justify-center items-start p-4'>
                                        <h3 className='text-lg font-bold mb-4'>{card?.heading}</h3>
                                        <p>{card?.content}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div id='partnership-meet' className='container'>
                <InlineWidget
                    url='https://calendly.com/partnership-msg91/discussion'
                    styles={{ width: '100%', height: '700px' }}
                />
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <div className='flex flex-col'>
                        <h2 className='text-4xl font-bold'>{data?.becomePartner?.heading || ' this is heading '}</h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {data?.becomePartner?.cards.map((card, index) => (
                            <div key={index} className='flex flex-col gap-4 p-4 bg-white rounded '>
                                <div className='flex-shrink-0'>
                                    <MdDoneOutline className='text-blue-500' />
                                </div>
                                <div className='flex-grow'>
                                    <h3 className='text-lg font-bold mb-2'>{card?.heading}</h3>
                                    <p>{card?.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col gap-6 py-20'>
                <div className='flex flex-col'>
                    <h2 className='text-4xl font-bold'>{data?.ourPartner?.heading || 'Hear from our Partner'}</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {data?.ourPartner?.card.map((partner, index) => (
                        <div key={index} className='flex flex-col gap-4 p-4 bg-neutral rounded'>
                            <p>{partner?.content}</p>
                            <h3 className='text-lg font-bold mb-2'>{partner?.name}</h3>
                            <img src={partner?.icon} alt={partner?.name} className='w-20 h-10' />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
