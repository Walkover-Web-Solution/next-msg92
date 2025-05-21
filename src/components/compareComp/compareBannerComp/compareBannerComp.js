import Image from 'next/image';

export default function CompareBannerComp({ data, pageInfo }) {
    return (
        <div className='container cont_p flex gap-6 h-fit flex-col lg:flex-row overflow-hidden items-center justify-between'>
            <div className='cont cont_w lg:w-1/2 gap-4'>
                <h1 className='md:text-4xl text-2xl font-bold'>{data?.heading}</h1>
                <h2 className='md:text-xl text-lg '>{data?.subheading}</h2>
            </div>
            <div className='items-center justify-center flex rounded overflow-hidden w-full xl:max-w-[560px] max-w-[400px] '>
                <div
                    className='p-8 items-center justify-center flex gap-4 w-full aspect-square'
                    style={{ backgroundColor: '#1E75BA' }}
                >
                    <div className='xl:min-w-20 xl:h-20 sm:min-w-18 sm:h-18 min-w-14 h-14 bg-white flex items-center justify-center rounded-lg'>
                        <Image
                            src={'/assets/brand/favicon.svg'}
                            className='sm:h-10 w-fit'
                            width={40}
                            height={40}
                            alt='MSG91'
                        />
                    </div>
                </div>
                <div
                    className='p-8 items-center justify-center flex gap-4 w-full aspect-square'
                    style={{ backgroundColor: data?.color }}
                >
                    <div className='xl:min-w-20 xl:h-20 sm:min-w-18 sm:h-18 min-w-14 h-14 bg-white flex items-center justify-center rounded-lg'>
                        <Image src={data?.img} className='sm:h-10 h-8 w-fit' width={40} height={40} alt='MSG91' />
                    </div>
                </div>
            </div>
        </div>
    );
}
