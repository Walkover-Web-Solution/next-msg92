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
            <div className='hidden md:block overflow-x-auto rounded-lg border-b  bg-base-100 max-w-[1200px] mx-auto'>
                <table className='table min-w-[676px] '>
                    <thead>
                        <tr>
                            <th className='w-1/4'></th>
                            <th className=' w-1/3 p-0  text-black'>
                                <div className='flex items-start rounded-t-lg border border-b-0 py-8 px-6  bg-[#F0F7FF] justify-start h-full'>
                                    <Image
                                        src='/assets/brand/msg91.svg'
                                        className='md:h-8 w-fit h-4'
                                        width={360}
                                        height={360}
                                        alt='MSG91'
                                    />
                                </div>
                            </th>
                            <th className='w-1/3 py-8 text-black '>
                                <div className='flex items-start justify-start h-full '>
                                    <Image
                                        src={data?.img}
                                        className='md:h-8 w-fit h-4'
                                        width={360}
                                        height={360}
                                        alt={data?.name}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(features).map((featureKey, index) => {
                            const feature = features[featureKey];
                            if (data?.features[featureKey]) {
                                return (
                                    <tr key={index} className=''>
                                        <td className='font-semibold border-x border-300 text-base text-gray-500 w-1/5'>
                                            {feature.name}
                                        </td>
                                        <td
                                            className='bg-[#F0F7FF] border-r  border-300 px-6 py-6
                                         text-base w-1/3'
                                        >
                                            {feature?.msg91}
                                        </td>
                                        <td className='text-base text-gray-500 border-r w-1/3 px-6 py-6'>
                                            {data?.features[featureKey]}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className='md:hidden flex flex-col gap-4'>
                {Object.keys(features).map((featureKey, index) => {
                    const feature = features[featureKey];
                    return (
                        <div key={index} className='border rounded p-4 cont gap-2'>
                            <h3 className='font-bold text-accent'>{feature?.name}</h3>
                            <p className='text-sm'>
                                <strong>MSG91 - </strong>
                                {feature?.msg91}
                            </p>
                            <p className='text-sm'>
                                <strong>{data?.name} - </strong>
                                {data?.features[featureKey]}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
