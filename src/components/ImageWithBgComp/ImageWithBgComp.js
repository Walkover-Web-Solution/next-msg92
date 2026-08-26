import Image from 'next/image';

export default function ImageWithBgComp({ pageInfo, data }) {
    if (!data?.img) return null;

    return (
        <section className={data?.bg}>
            <div className='container flex justify-center py-6'>
                <Image
                    src={data?.img}
                    alt={data?.alt}
                    width={data?.width}
                    height={data?.height}
                    className='w-full h-auto object-contain'
                    loading='lazy'
                />
            </div>
        </section>
    );
}
