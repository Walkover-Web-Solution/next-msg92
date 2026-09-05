export default function CalloutComp({ data }) {
    if (!data?.heading) return null;

    return (
        <section className='container pb-12'>
            <div className='rounded-xl bg-secondary border border-sky-100 p-6 sm:p-8 max-w-4xl mx-auto text-center flex flex-col items-center gap-3'>
                <h3 className='subheading font-semibold'>{data?.heading}</h3>
                {data?.description && (
                    <p className='text-sm md:text-base text-gray-600 max-w-2xl'>{data?.description}</p>
                )}
            </div>
        </section>
    );
}
