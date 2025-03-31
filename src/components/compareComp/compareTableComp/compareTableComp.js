import features from '@/data/compareDefault.json';
import Image from 'next/image';
export default function CompareTableComp({ data }) {
    return (
        <div className='container cont cont_p gap-12'>
            <div className='cont gap-4'>
                <h2 className='md:text-3xl text-2xl font-bold'>{data?.heading}</h2>
                <di className='cont gap-1'>
                    {data?.content?.map((comp, index) => {
                        return (
                            <p key={index} className='md:text-lg text-base'>
                                {comp?.des}
                            </p>
                        );
                    })}
                </di>
            </div>
            <div className='hidden md:block overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
                <table className='table min-w-[676px]'>
                    <thead>
                        <tr className=''>
                            <th className=''></th>
                            <th className='flex items-center justify-center h-full  bg-secondary rounded-t-lg text-black'>
                                <Image
                                    src='/assets/brand/msg91.svg'
                                    className='px-auto md:h-7 h-5'
                                    width={360}
                                    height={360}
                                    alt='MSG91'
                                />
                            </th>
                            <th className=''>
                                <Image
                                    src={data?.img}
                                    className='px-auto md:h-7 h-5'
                                    width={360}
                                    height={360}
                                    alt={data?.name}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(features).map((featureKey, index) => {
                            const feature = features[featureKey];
                            return (
                                <tr key={index}>
                                    <td className='font-se text-center'>{feature.name}</td>
                                    <td className='bg-secondary text-center'>{feature.msg91}</td>
                                    <td className='text-center'>{data.features[featureKey]}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='md:hidden flex flex-col gap-4'>
                {Object.keys(features).map((featureKey, index) => {
                    const feature = features[featureKey];
                    return (
                        <div key={index} className='border rounded p-4 cont gap-2'>
                            <h3 className='font-bold text-accent'>{feature.name}</h3>
                            <p className='text-sm'>
                                <strong>MSG91 - </strong>
                                {feature.msg91}
                            </p>
                            <p className='text-sm'>
                                <strong>{data?.name} - </strong>
                                {data.features[featureKey]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
