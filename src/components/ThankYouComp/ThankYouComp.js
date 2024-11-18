export default function ThankYouComp({ data }) {
    return (
        <>
            <div className='flex flex-col container py-40 cont_gap'>
                <h1 className='text-5xl text-center font-semibold'>{data}</h1>
                <p className='text-xl text-center font-medium'>
                    In case you want to login again,{' '}
                    <a href={process.env.LOGIN_URL} className='text-link active-link '>
                        Click here
                    </a>
                </p>
            </div>
        </>
    );
}
