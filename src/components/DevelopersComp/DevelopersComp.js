import Image from 'next/image';
import { MdBeenhere, MdOutlineBeenhere } from 'react-icons/md';

export default function DevelopersComp({ pageInfo, data }) {
    return (
        <>
            <div className='container flex flex-col cont_gap cont_p'>
                <h1 className='text-5xl font-bold'>{data?.heading}</h1>
                <h2 className='text-xl md:w-1/2 gap-6'>{data?.subheading}</h2>
                <a href={data?.doc_btn_link} target='_blank'>
                    <button className='btn btn-primary'>{data?.doc_btn}</button>
                </a>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-4xl font-bold'>{data?.integrate?.heading}</h2>

                    <p className='text-lg'>{data?.integrate?.content}</p>
                    <p className='text-xl'>{data?.integrate?.subheading}</p>
                </div>
            </div>
            <div className='container flex flex-col cont_gap cont_p'>
                <h2 className='text-4xl font-bold'>{data?.communication?.heading}</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data?.communication?.card.map((card, index) => (
                        <div key={index} className='bg-neutral p-4 rounded-lg flex items-center gap-4'>
                            <MdOutlineBeenhere fontSize={40} className='text-accent' />
                            <p className='text-lg'>{card?.tag}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <h2 className='text-4xl font-bold'>{data?.msg91api?.heading}</h2>
                    {data?.msg91api?.comp.map((comp, index) => (
                        <div key={index} className='flex flex-col gap-2'>
                            <h3 className='text-2xl font-bold'>{comp?.heading}</h3>
                            <p className='text-lg'>{comp?.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='container flex flex-col md:flex-row items-center cont_gap cont_p'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-4xl font-bold'>{data?.customcode?.heading}</h2>
                    <p className='text-lg'>{data?.customcode?.content}</p>
                </div>
                <Image src={data?.customcode?.code} alt='code' width={700} height={700} className='w-1/2' />
            </div>

            <div className='bg-neutral'>
                <div className='container flex flex-col cont_gap cont_p'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold py-2'>{data?.setup?.heading}</h2>
                        <p className='text-lg mb-8'>{data?.setup?.description}</p>
                    </div>

                    <div className=' flex gap-4 sm:flex-row flex-col'>
                        {data?.setup?.type.map((app, index) => (
                            <div
                                key={index}
                                className='bg-primary p-4 rounded flex  items-center sm:w-[260px] w-full gap-2'
                            >
                                <Image width={40} height={40} src={app.icon} alt={app.name} />
                                <div className='flex flex-col '>
                                    <p className='text-sm text-white uppercase'>{app?.text}</p>
                                    <p className=' text-xl text-white'>{app?.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
