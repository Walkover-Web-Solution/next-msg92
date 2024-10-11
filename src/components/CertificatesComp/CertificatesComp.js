export default function CertificatesComp({ pageInfo, data }) {
    return (
        <>
            {' '}
            <div className='container gap-6 py-20'>
                <h1 class='text-4xl font-bold py-2 lg:w-1/2'>{data?.heading || ' this is heading '}</h1>

                <a
                    href={data?.doc_btn_link}
                    className='btn btn-outline sm:btn-sm md:btn-md lg:btn-lg bg-black py-2 text-white'
                >
                    {data?.doc_btn}
                </a>
                <div className='row'>
                    <h2 className='text-xl font-normal py-4 w-full gap-6'>
                        {data?.trustedByComp?.heading || ' this is heading '}
                    </h2>
                </div>
                <div className='row flex flex-wrap '>
                    {data?.trustedByComp?.logos.map((logo, index) => (
                        <div key={index} className='col-6 md:col-4 lg:col-3 xl:col-2 p-4 item-start'>
                            <img src={logo?.url} alt={logo?.name} width={60} height={30} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <div className='grid grid-cols-1 gap-12 '>
                        <h2 className='text-3xl font-bold w-full'>
                            {data?.certificates?.heading || ' this is heading '}
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2  gap-12'>
                        {data?.certificates?.cards.map((card, index) => (
                            <div key={index} className=''>
                                <a href={card.url} target='_blank' rel='noopener noreferrer'>
                                    <div className='card'>
                                        <div className='text-lg font-medium'>{card?.name}</div>
                                        <div>
                                            <img
                                                src={card?.image}
                                                alt={card?.name}
                                                className='min-w-12 min-h-8'
                                                width={800}
                                                height={700}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
