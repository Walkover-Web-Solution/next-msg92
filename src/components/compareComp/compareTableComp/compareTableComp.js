import globalFeatures from '@/data/compareDefault.json';
import whatsAppFeatures from '@/data/compare/whatsapp.json';
import Image from 'next/image';
export default function CompareTableComp({ data }) {
    let features;
    switch (data?.type) {
        case 'global':
            features = globalFeatures;
            break;
        case 'whatsapp':
            features = whatsAppFeatures;
            break;
        default:
            features = globalFeatures;
            break;
    }
    if (data?.type && data?.columns?.length && data?.rows?.length) {
        return (
            <div className='container cont cont_p gap-6'>
                <h2 className='heading font-semibold'>{data.heading}</h2>

                {data.tableHeading && <p className='text-xl'>{data.tableHeading}</p>}

                <div className='block w-full mx-auto w-full rounded-lg border border-gray-200 bg-base-100 overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='table w-full w-2/3'>
                            <thead>
                                <tr>
                                    <th className='w-1/4 py-6 px-4 text-xl'>{data.featureLabel}</th>

                                    {data.columns?.map((col, index) => (
                                        <th
                                            key={col.key}
                                            className={`py-6 px-4 text-black text-xl ${
                                                index === 0 ? 'rounded-t-lg bg-secondary' : ''
                                            }`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.rows?.map((row, index) => (
                                    <tr key={row.feature || index}>
                                        <td className='font-semibold border-x border-300 text-base text-gray-500'>
                                            {row.feature}
                                        </td>

                                        {data.columns?.map((col, colIndex) => (
                                            <td
                                                key={col.key}
                                                className={`border-r border-300 px-6 py-6 text-base align-top ${
                                                    colIndex === 0 ? 'bg-secondary' : 'text-gray-500'
                                                }`}
                                            >
                                                {row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {data.summary && <p>{data.summary}</p>}

                {data?.pricingNote && (
                    <p className='text-sm italic'>
                        {data.pricingNote}{' '}
                        {data?.pricingLink?.url && (
                            <a
                                href={data.pricingLink.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-accent underline'
                            >
                                {data.pricingLink.text}
                            </a>
                        )}
                    </p>
                )}
            </div>
        );
    }
    return (
        <div className='container cont cont_p gap-12'>
            <div className='cont gap-4'>
                <h2 className='md:text-3xl text-2xl font-bold'>{data?.heading}</h2>
                <div className='cont gap-1'>
                    {data?.content?.map((comp, index) => {
                        return (
                            <p key={index} className='md:text-lg text-base'>
                                {comp?.des}
                            </p>
                        );
                    })}
                </div>
            </div>
            <div className='hidden md:block overflow-x-auto rounded-lg border-b  bg-base-100 w-5/6 mx-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='w-1/4'></th>
                            <th className=' w-1/3 p-0  text-black'>
                                <div className='flex items-start rounded-t-lg border border-b-0 py-8 px-6  bg-secondary justify-start h-full'>
                                    <Image
                                        src='/assets/brand/msg91.svg'
                                        className='md:h-8 w-fit h-4'
                                        width={360}
                                        height={360}
                                        alt='MSG91'
                                        loading='lazy'
                                    />
                                </div>
                            </th>
                            <th className='w-1/3 py-8 text-black '>
                                <div className='flex items-start justify-start h-full '>
                                    <img
                                        src={data?.img}
                                        className='md:h-8 w-fit h-4 object-contain object-left'
                                        alt={data?.name || ''}
                                        loading='lazy'
                                        decoding='async'
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
                                            className='bg-secondary border-r  border-300 px-6 py-6
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
                    if (!data?.features[featureKey]) {
                        return null;
                    }
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
