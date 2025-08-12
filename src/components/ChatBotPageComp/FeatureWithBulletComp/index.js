import { MdArrowRightAlt } from 'react-icons/md';

export default function FeatureWithBulletComp({ data, index }) {
    return (
        <section key={index}>
            <div className={`container cont cont_gap cont_p`}>
                <div className='flex flex-col gap-1 cont_w'>
                    <span className='text-lg uppercase text-[var(--hello-dark-color)] font-bold'>{data?.tagline}</span>
                    <h2 className='text-3xl font-bold'>{data?.heading}</h2>
                    <p className='text-lg text-gray-500 '>{data?.subHeading}</p>
                </div>
                <div className={`cont_gap gap-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className='w-full max-w-[520px] aspect-square bg-[var(--hello-lite-color)] rounded-lg border'></div>
                    <div className='w-full cont gap-6 justify-center'>
                        {data?.content.map((feature, i) => (
                            <div className='flex gap-3' key={i}>
                                <MdArrowRightAlt className='text-2xl' />
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-700'>{feature.title}</h3>
                                    <p className='text-gray-500 max-w-[600px]'>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
