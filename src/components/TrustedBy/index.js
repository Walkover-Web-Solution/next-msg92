import Image from 'next/image';

export default function TrustedBy({ data }) {
    return (
        <div className='cont md:gap-4 gap-2'>
            <h2 className='md:text-xl text-md'>{data?.heading}</h2>
            <div className='flex items-center sm:gap-6 gap-4 flex-wrap'>
                {data?.logos?.length > 0 &&
                    data?.logos?.map((logo, index) => (
                        <Image
                            key={logo?.name + index}
                            className='w-fit sm:h-6 h-4'
                            width={360}
                            height={120}
                            src={logo?.url}
                            alt={`${logo?.name} Logo`}
                        />
                    ))}
            </div>
        </div>
    );
}
