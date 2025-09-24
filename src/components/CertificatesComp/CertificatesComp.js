export default function CertificatesComp({ pageInfo, data }) {
    return (
        <div>
            <div className='container cont cont_gap cont_p'>
                <h1 class='text-4xl font-bold py-2 cont_w'>{data?.heading}</h1>
                <a href={data?.doc_btn_link}>
                    <button className='btn btn-primary btn-fit'>{data?.doc_btn}</button>
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col gap-6 py-20'>
                    <div className='grid grid-cols-1 gap-12 '>
                        <h2 className='text-3xl font-bold w-full'>{data?.certificates?.heading}</h2>
                    </div>
                    <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-12'>
                        {data?.certificates?.cards.map((card, index) => (
                            <div key={index} className=''>
                                <a href={card?.url} target='_blank' rel='noopener noreferrer'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='font-medium'>{card?.name}</div>
                                        <div>
                                            <img
                                                src={card?.image}
                                                alt={card?.name}
                                                className='min-w-12 min-h-8 rounded-lg hover:shadow-lg'
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
        </div>
    );
}
