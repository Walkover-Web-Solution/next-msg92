import Image from 'next/image';

export default function TrustedByComp({ data }) {
    if (data && data?.logos?.length > 0 && data?.heading)
        return (
            <>
                <div
                    className={`flex flex-col gap-4 ${
                        data?.fullwidth ? 'container cont_p items-center gap-6' : 'gap-4'
                    } `}
                >
                    <h2 className={` ${data?.fullwidth ? 'text-3xl font-bold' : 'text-lg'} `}>{data?.heading}</h2>
                    <div className='flex gap-4 md:gap-5 flex-wrap items-center'>
                        {data?.logos.map((img, index) => (
                            <Image
                                key={index}
                                src={img?.url}
                                alt={img?.name}
                                width={15}
                                height={15}
                                loading='lazy'
                                sizes='15px'
                                className='md:h-[20px] h-[15px] w-auto'
                            />
                        ))}
                    </div>
                </div>
            </>
        );
}
