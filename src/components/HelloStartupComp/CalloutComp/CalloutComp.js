export default function CalloutComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container pb-12'>
            <div className='cont cont_gap rounded-xl bg-secondary border border-sky-100 p-6 sm:p-8 max-w-4xl mx-auto text-center items-center'>
                <h3 className='subheading font-semibold text-gray-900'>{data?.heading}</h3>
                {data?.description && (
                    <p className='text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto m-0'>
                        {data?.description}
                    </p>
                )}
            </div>
        </section>
    );
}
