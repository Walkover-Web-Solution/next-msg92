export default function Facts({ data }) {
    return (
        <>
            <div className='bg-neutral py-20'>
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 container'>
                    {data?.length > 0 &&
                        data.map((stat, index) => {
                            return (
                                <div key={index} className='flex flex-col text-center '>
                                    <p className='text-3xl font-bold mb-4'>{stat?.fact}</p>
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
