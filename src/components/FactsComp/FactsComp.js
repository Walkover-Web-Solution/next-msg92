export default function FactsComp({ data }) {
    return (
        <>
            <div className='bg-neutral py-20'>
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 container'>
                    {data?.length > 0 &&
                        data.map((stat, index) => {
                            return (
                                <div key={index} className='md:p-8 p-4 flex-col '>
                                    <h2 className='text-3xl font-bold mb-4'>{stat?.fact}</h2>
                                    <p className='text-xl'>{stat?.stat}</p>
                                    <p className='text-xl'>{stat?.per}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
