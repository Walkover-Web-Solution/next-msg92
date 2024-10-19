import {
    MdAutoAwesome,
    MdDashboardCustomize,
    MdDialpad,
    MdOutlineAutoAwesome,
    MdOutlineDashboardCustomize,
} from 'react-icons/md';

export default function WhatsappLinkComp({ data }) {
    return (
        <>
            <div className='flex flex-col container py-20 gap-6 items-center justify-center'>
                <div className='flex flex-row items-center justify-center'>
                    <div className='flex flex-col items-center gap-6'>
                        <div className='flex flex-row items-center'>
                            <img src={data?.product?.icon} alt='Product Icon' />
                            <h2>{data?.product?.name}</h2>
                        </div>
                        <p className='text-lg text-green-500'>{data?.tagline}</p>
                        <h1 className='text-2xl  w-2/3 text-center'>{data?.heading}</h1>

                        <a href='#' target='_blank'>
                            <button className='btn btn-primary'>{data?.getstarted_btn}</button>
                        </a>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <img src={data?.banner_img} width={1000} alt='Banner Image' />
                </div>
            </div>
            <div className='flex flex-col gap-6 container py-20 '>
                <div className='flex flex-row '>
                    <h2 className='text-3xl '>{data?.steps.heading}</h2>
                </div>
                <div className='flex flex-row gap-6'>
                    {data?.steps?.cards.map((card, index) => (
                        <div key={index} className='flex flex-col gap-6'>
                            <div className=''>
                                {card?.icon === 'MdDialpad' && <MdDialpad style={{ height: '40px', width: '40px' }} />}
                                {card?.icon === 'MdOutlineDashboardCustomize' && (
                                    <MdOutlineDashboardCustomize style={{ height: '40px', width: '40px' }} />
                                )}
                                {card?.icon === 'MdOutlineAutoAwesome' && (
                                    <MdOutlineAutoAwesome style={{ height: '40px', width: '40px' }} />
                                )}
                            </div>
                            <h3 className='text-xl font-semibold'>{card?.title}</h3>
                            <p>{card?.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-6 container py-20 '>
                <div className='flex flex-row '>
                    <h2 className='text-3xl '>{data?.create.heading}</h2>
                </div>
                <div className='flex flex-row  gap-6 w-full lg:w-4/5'>
                    <div className='flex flex-col gap-6'>
                        {data?.create?.content.map((content, index) => (
                            <div key={index}>
                                <h2 className='text-xl font-semibold mb-2'>{content?.title}</h2>
                                <div className='flex flex-col gap-6'>
                                    <p>{content?.description}</p>
                                    {content?.feilds.map((field, fieldIndex) => (
                                        <div className='flex flex-col gap-2' key={fieldIndex}>
                                            <p>{field?.name}</p>
                                            <input
                                                className='input input-bordered rounded w-full max-w-lg'
                                                placeholder={field?.placeholder}
                                            />
                                            <p>{field?.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href={data?.create?.generate_btn_link} className='btn btn-primary'>
                        {data?.create?.generate_btn}
                    </a>
                    <div className=' mx-12 flex flex-col gap-6 items-start'>
                        <h2 className=' text-2xl'>Widget preview</h2>
                        <img src={data?.create?.image} width={800} height={1200} alt='Create QR Code/Widget/Link' />
                    </div>
                </div>
            </div>
        </>
    );
}
