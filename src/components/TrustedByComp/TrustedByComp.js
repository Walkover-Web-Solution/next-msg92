import Image from 'next/image';

export default function TrustedByComp({ data }) {
    if (data && data?.logos?.length > 0 && data?.heading)
        return (
            <>
                <div
                    className={`flex flex-col gap-4 ${data?.fullwidth ? 'container cont_p items-center gap-6' : 'gap-4'} `}
                >
                    <h2 className={` ${data?.fullwidth ? 'text-3xl font-bold' : 'text-lg'} `}>{data?.heading}</h2>
                    <div className='flex gap-5 flex-wrap items-center'>
                        {data?.logos.map((img, index) => (
                            <Image
                                key={index}
                                src={img?.url}
                                alt={img?.name}
                                width={100}
                                height={100}
                                className='h-[22px] w-auto'
                            />
                        ))}
                    </div>
                </div>
            </>
        );
}
