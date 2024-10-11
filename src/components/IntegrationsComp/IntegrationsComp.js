import { MdCheckCircleOutline } from 'react-icons/md';

export default function IntegrationsComp({ pageInfo, data }) {
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
                    target='_blank'
                    className='btn btn-outline sm:btn-sm md:btn-md lg:btn-lg bg-black py-2 text-white'
                >
                    {data?.doc_btn}
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <h2 class='text-3xl font-bold '>{data?.addon?.heading || ' this is heading '}</h2>
                    <p class='text-xl font-normal'>{data?.addon?.subheading || ' this is heading '}</p>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {data?.addon?.cards.map((card, index) => (
                            <a
                                href={card?.url}
                                target='_blank'
                                className='flex flex-col items-start justify-center p-4 bg-white rounded shadow h-full'
                            >
                                <img src={card.icon} alt={card.name} className='w-16 h-16 mb-2' />
                                <h3 className='text-lg font-bold mb-2'>{card.name}</h3>
                                <p className='mb-4'>{card.description}</p>
                                <p className='text-sm text-gray-500'>{card.author}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col py-20 gap-6'>
                <div className='flex flex-row '>
                    <h2 className='text-3xl font-bold'>{data?.section?.heading}</h2>
                </div>
                <div className='flex flex-row gap-6 bg-neutral justify-between p-6'>
                    <div className='flex flex-col bg-neutral'>
                        <div className='text-xl font-bold'>{data?.section?.tag}</div>
                        <div className='text-lg font-normal'>{data?.section?.subtag}</div>
                    </div>
                    <div>
                        <a href={data?.section?.url} target='_blank' className='btn bg-black py-2 text-white w-full'>
                            {data?.section?.partner_btn}
                        </a>
                    </div>
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col py-20 gap-6'>
                    <h2 className='text-3xl font-bold'>{data?.plugin?.subheading}</h2>
                    <div className='flex flex-col gap-4'>
                        {data?.plugin?.build?.map((item, index) => (
                            <div key={index} className='flex items-center gap-2'>
                                <MdCheckCircleOutline className='text-green-500' />
                                <p>{item.line}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container flex flex-col gap-6 py-20'>
                <div className='flex flex-row justify-start'>
                    <h2 className='text-3xl font-bold'>{data?.partner?.heading}</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                    {data?.partner?.card.map((item, index) => (
                        <div key={index} className='bg-neutral flex flex-col gap-6 p-4'>
                            <p>{item?.content}</p>
                            <h3>{item?.name}</h3>
                            <img src={item?.icon} alt={item?.name} className='w-20 h-10' />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
