export default function StartupFormsComp() {
    return (
        <>
            <div className='h-[1800px]'>
                <script async src='https://tally.so/widgets/embed.js'></script>
                {/* <iframe className="airtable-embed" src="https://tally.so/r/wkdrdM" frameborder="0" onmousewheel="" width="100%" height="760px"></iframe> */}
                <iframe
                    data-tally-src='https://tally.so/r/nPzR7B?transparentBackground=1'
                    width='100%'
                    height='100%'
                    frameBorder='0'
                    marginHeight='0'
                    marginWidth='0'
                    title='MSG91 for Startups'
                ></iframe>
            </div>
        </>
    );
}
