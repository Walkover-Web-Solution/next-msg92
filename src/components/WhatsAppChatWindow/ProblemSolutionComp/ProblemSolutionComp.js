import LottiePlayer from '@/components/LottiePlayer/LottiePlayer';

export default function WhatsAppProblemSolutionComp({ data, pageInfo }) {
    const lottieSrc = data?.lottie || '/assets/lotties/whatsapp_chat_window.json';

    return (
        <section className='w-full bg-gradient-to-b from-[#F8FAFC] via-[#EEF2F6] to-[#F8FAFC] py-10 md:py-16 border-y border-gray-200/70 overflow-hidden'>
            <div className='container cont_p flex justify-center items-center'>
                <div className='w-full max-w-6xl rounded-[28px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-white border border-gray-200/80'>
                    <LottiePlayer lottie={lottieSrc} className='w-full h-auto' />
                </div>
            </div>
        </section>
    );
}
