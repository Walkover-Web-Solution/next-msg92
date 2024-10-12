import Image from 'next/image';

export default function TrustedByComp({ data }) {
    if (data && data?.logos?.length > 0 && data?.heading)
        return (
            <>
                <div className='flex flex-col gap-4'>
                    <div className='text-lg'>{data?.heading}</div>
                    <div className='flex gap-8 flex-wrap items-center'>
                        {data?.logos.map((img, index) => (
                            <Image
                                key={index}
                                src={img?.url}
                                alt={img?.name}
                                width={100}
                                height={100}
                                className='h-[24px] w-auto'
                            />
                        ))}
                    </div>
                </div>
            </>
        );
}
