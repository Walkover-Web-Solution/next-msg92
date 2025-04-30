import styles from './SLAComp.module.scss';

export default function SLAComp({ data }) {
    return (
        <div className='container blog-container w-100 max-w-4xl flex flex-col gap-10 py-20'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-bold'>{data?.heading}</h1>
                <p className=''>{data?.subheading}</p>
            </div>
            {data?.content.map((section, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{section?.heading}</h2>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: section?.content }} />
                </div>
            ))}
        </div>
    );
}
