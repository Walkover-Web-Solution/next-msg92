import GetMdIcons from '@/utils/getMdIcons';

export default function WhatsAppWhyComp({ pageInfo, data }) {
    if (!data) return null;

    const reasons = data?.reasons;
    const firstRowReasons = reasons.slice(0, 3);
    const secondRowReasons = reasons.slice(3, 5);

    const renderCard = (reason, index) => {
        const Icon = GetMdIcons(reason?.icon);
        return (
            <div
                key={index}
                className='bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between gap-4'
            >
                <div className='w-12 h-12 rounded-xl bg-whatsappChat-surface flex items-center justify-center text-whatsappChat-primary'>
                    {Icon && <Icon className='h-6 w-6' />}
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-semibold text-lg'>{reason?.title}</h3>
                    <p className='text-sm'>{reason?.desc}</p>
                </div>
            </div>
        );
    };

    return (
        <section className='bg-white'>
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading'>
                        {data?.heading_prefix}
                        <span className='text-whatsappChat-primary'>{data?.heading_accent}</span>
                        {data?.heading_suffix}
                    </h2>

                    {data?.subheading && <p className='subheading max-w-xl mx-auto'>{data?.subheading}</p>}
                </div>

                <div className='flex flex-col gap-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {firstRowReasons.map((reason, index) => renderCard(reason, index))}
                    </div>
                    {secondRowReasons.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full'>
                            {secondRowReasons.map((reason, index) => renderCard(reason, index + 3))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
