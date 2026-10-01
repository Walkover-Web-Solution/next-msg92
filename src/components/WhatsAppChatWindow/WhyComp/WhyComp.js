import GetMdIcons from '@/utils/getMdIcons';

export default function WhatsAppWhyComp({ data }) {
    if (!data) return null;

    const reasons = data?.reasons || [];
    const row1 = reasons.slice(0, 3);
    const row2 = reasons.slice(3, 5);

    const renderCard = (reason, index) => {
        const Icon = GetMdIcons(reason?.icon);
        return (
            <div key={index} className='bg-white rounded-lg border p-6 flex flex-col justify-between gap-4'>
                <div className='w-12 h-12 rounded-lg bg-[#529837]/10 flex items-center justify-center text-[#529837]'>
                    {Icon && <Icon className='h-6 w-6' />}
                </div>
                <h3 className='font-semibold text-lg text-[#18181B]'>{reason?.title}</h3>
                <p className='text-[#4B5563] text-sm leading-relaxed'>{reason?.desc}</p>
            </div>
        );
    };

    return (
        <section className='bg-white'>
            <div className='container cont_p flex flex-col gap-10'>
                <div className='text-center flex flex-col gap-3'>
                    <h2 className='heading text-[#18181B]'>
                        {data?.heading_prefix}
                        <span className='text-[#529837]'>{data?.heading_accent}</span>
                    </h2>

                    <p className='subheading text-[#4B5563] max-w-xl mx-auto'>{data?.subheading}</p>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {row1.map((reason, index) => renderCard(reason, index))}
                    </div>
                    {row2.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
                            {row2.map((reason, index) => renderCard(reason, index + 3))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
