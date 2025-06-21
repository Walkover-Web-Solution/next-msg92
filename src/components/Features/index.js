import Image from 'next/image';
import LottiePlayer from '../LottiePlayer';

export default function Features({ data }) {
    if (data?.features && data?.features.length > 0) {
        return (
            <div className='bg-neutral w-full'>
                <div className='container cont cont_gap cont_p'>
                    <h2 className='h2'>Features</h2>
                    <div className='grid grid-cols-2 md:gap-16 gap-8'>
                        {data?.features?.map((feature, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`bg-white border flex items-center overflow-hidden rounded justify-between lg:p-12 md:p-8 sm:p-6 p-4 lg:gap-12 md:gap-10 gap-6 ${
                                        (index + 1) % 3 === 0 ||
                                        (index === data?.features?.length - 1 && data?.features?.length % 3 === 1)
                                            ? 'flex flex-col lg:flex-row col-span-2'
                                            : 'flex flex-col lg:col-span-1 col-span-2'
                                    }`}
                                >
                                    <div className='cont gap-1 w-full'>
                                        <h3 className='h3'>{feature?.name}</h3>
                                        <p
                                            className='h3_sub text-neutral-800'
                                            dangerouslySetInnerHTML={{ __html: feature?.content }}
                                        />
                                    </div>

                                    <FeatureGraphic src={feature?.img} name={feature?.name} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function FeatureGraphic({ src, name }) {
    if (src) {
        if (src.endsWith('.json')) {
            return <LottiePlayer lottie={src} />;
        } else {
            return <Image src={src} width={720} height={720} className='w-full' alt={`${name} Image`} />;
        }
    } else {
        return <div className='w-full aspect-square max-w-[500px]'></div>;
    }
}
