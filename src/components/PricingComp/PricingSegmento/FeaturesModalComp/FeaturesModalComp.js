import { MdCheck, MdClose } from 'react-icons/md';

export default function FeaturesModalComp({ features, plan_name }) {
    return (
        <>
            <div className='flex  flex-col h-full overflow-scroll'>
                {features?.map((category) => {
                    return (
                        <div className='flex flex-col gap-2 mt-8'>
                            <h3 className='text-xl  font-bold'>{category?.category}</h3>
                            <div className='flex flex-col gap-3'>
                                {category?.items?.length > 0 &&
                                    category?.items?.map((feature, index) => {
                                        return (
                                            <p
                                                className='flex text-start hover:underline gap-1 tooltip tooltip-modal cursor-pointer'
                                                key={index}
                                                data-tip={feature?.description}
                                            >
                                                {feature?.notIncluded && feature?.notIncluded?.includes(plan_name) ? (
                                                    <MdClose className='mt-1' fontSize={18} color='#DC3645' />
                                                ) : (
                                                    <MdCheck className='mt-1' fontSize={18} color='#16A34A' />
                                                )}
                                                {feature?.name}
                                            </p>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
