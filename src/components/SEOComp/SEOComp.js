export default function SEOComp({ data }) {
    return (
        <>
            <div className='container flex flex-col gap-4 py-20'>
                <h2 className='text-3xl font-bold'>
                    Welcome to MSG91: Your Trusted Cloud Communication Platform as a Service
                </h2>
                <p>
                    Are you searching for a reliable and versatile cloud communication platform as a service? Look no
                    further! At MSG91, we specialize in providing top-notch mobile cloud communication platforms in
                    India. Whether you're a startup, small business, or a large enterprise, we have the perfect solution
                    to enhance your business communication.
                </p>
                <div id='dangerousContent' style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: data }}></div>
                <button
                    className='btn btn-primary w-fit'
                    onClick={() => {
                        const contentDiv = document.getElementById('dangerousContent');
                        const button = event.target;
                        if (contentDiv.style.display === 'none') {
                            contentDiv.style.display = 'block';
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
        </>
    );
}
