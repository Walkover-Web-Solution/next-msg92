import style from './SEOComp.module.scss';
export default function SEOComp({ data }) {
    return (
        <>
            <div className='container flex flex-col gap-6 py-20'>
                <h2 className='text-2xl font-bold'>{data?.heading}</h2>
                <div className='flex flex-col gap-2'>
                    <p>{data?.description}</p>
                    <div
                        className={style.seotext}
                        id='dangerousContent'
                        style={{ display: 'none' }}
                        dangerouslySetInnerHTML={{ __html: data?.data }}
                    ></div>
                    <button
                        className='text text-link active-link'
                        onClick={() => {
                            const contentDiv = document.getElementById('dangerousContent');
                            const button = event.target;
                            if (contentDiv.style.display === 'none') {
                                contentDiv.style.display = 'flex';
                                button.textContent = 'Read less';
                            } else {
                                contentDiv.style.display = 'none';
                                button.textContent = 'Read more';
                            }
                        }}
                    >
                        Read more
                    </button>
                </div>
            </div>
        </>
    );
}
