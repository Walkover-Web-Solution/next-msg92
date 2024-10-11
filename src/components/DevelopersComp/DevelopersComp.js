export default function DevelopersComp({ pageInfo, data }) {
    return (
        <>
            <div className='container gap-6 py-20'>
                <h1 class='text-4xl font-bold py-2 weight-700'>{data?.heading || ' this is heading '}</h1>
                <h2 class='text-xl font-normal py-4  w-full lg:w-1/2 gap-6'>
                    {data?.subheading || ' this is heading '}
                </h2>
                <a href={data?.doc_btn_link} target='_blank' className='btn btn-wide bg-black py-2 text-white'>
                    {data?.doc_btn}
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container gap-6 py-20'>
                    <div className=' row'>
                        <h1 class='text-4xl font-bold py-2 weight-700'>
                            {data?.integrate?.heading || ' this is heading '}
                        </h1>
                    </div>

                    <div className='row'>
                        <p class='text-lg font-normal py-4 gap-6'>{data?.integrate?.content || ' this is content '}</p>
                    </div>
                    <div className='row'>
                        <h2 class='text-xl font-normal py-4 w-1/2 gap-6'>
                            {data?.integrate?.subheading || ' this is heading '}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='container gap-6 py-20'>
                <h1 class='text-4xl font-bold py-2 weight-700'>
                    {data?.communication?.heading || ' this is heading '}
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {data?.communication?.card.map((card, index) => (
                        <div key={index} className='bg-neutral p-4 rounded-lg flex items-center'>
                            <div className='flex gap-4'>
                                <div className='w-1/4 color-black'>
                                    <img src={card.icon} alt={card.tag} className='w-full h-auto' />
                                </div>
                                <div className=''>
                                    <p className='text-lg text-black'>{card.tag}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='container gap-6 py-20'>
                <h1 className='text-4xl font-bold py-2 weight-500'>{data?.msg91api?.heading || ' this is heading '}</h1>
                {data?.msg91api?.comp.map((comp, index) => (
                    <div key={index}>
                        <h2 className='text-2xl font-bold py-2 weight-500'>{comp.heading || ' this is heading '}</h2>
                        <p className='text-lg font-normal py-2 '>{comp.content || ' this is heading '}</p>
                    </div>
                ))}
            </div>

            <div className='container mx-auto py-20 px-4 sm:px-6 lg:px-8 gap-6'>
                <div className='grid gap-4'>
                    <div className='p-4 rounded-lg flex flex-col md:flex-row items-center'>
                        <div className='ml-0 md:ml-4 mb-4 md:mb-0 md:w-1/2'>
                            <h2 className='text-xl font-bold mb-2'>{data?.customcode?.heading || 'Default Heading'}</h2>
                            <p className='text-lg'>{data?.customcode?.content || 'Default content goes here.'}</p>
                        </div>

                        <div className='flex-shrink-0 w-full md:w-1/2'>
                            <img
                                src={data?.customcode?.code || 'default-image-url'}
                                alt='code'
                                className='w-full h-auto object-contain'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-20 px-4 sm:px-6 lg:px-8 gap-6'>
                <h2 className='text-2xl font-bold py-2'>{data?.setup?.heading || 'This is heading'}</h2>
                <p className='text-lg mb-8'>{data?.setup?.description}</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {data?.setup?.type.map((type, index) => (
                        <div key={index} className='bg-neutral p-4 rounded-lg flex items-center justify-center'>
                            <div className='w-full'>
                                <a href={type.url} target='_blank' rel='noopener noreferrer'>
                                    <img src={type.icon} alt={type.name} className='w-full h-auto object-contain' />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
