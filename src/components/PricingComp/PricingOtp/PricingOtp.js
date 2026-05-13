import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';

export default function PricingOtp({ pageData }) {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <h1 className='text-2xl md:text-3xl font-bold capitalize'>OTP Widget Pricing</h1>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex xl:flex-row flex-col gap-4 items-stretch'>
                    {/* Free card */}
                    <div className='flex flex-col p-6 rounded-2xl bg-indigo-50 border-2 border-indigo-300 shadow-lg shadow-indigo-100 w-full xl:max-w-sm'>
                        <h3 className='text-2xl font-bold mb-1 text-slate-900'>Free</h3>
                        <div className='flex flex-col gap-1 text-sm text-slate-600 mb-5 flex-1'>
                            <p>{pageData?.connectComp?.content || 'OTP widget/SDK usage is free.'}</p>
                            <p>
                                {pageData?.connectComp?.content2 ||
                                    'Channel wise pricing will be applicable for sending message.'}
                            </p>
                        </div>
                        <a
                            href={getURL('signup', 'otp')}
                            target='_blank'
                            className='w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-center transition-all block bg-indigo-600 text-white hover:bg-indigo-700'
                        >
                            {pageData?.get_started || 'Get Started'}
                        </a>
                    </div>
                </div>
                <ConnectWithTeam
                    pageData={pageData?.connectComp}
                    product={'OTP widget/SDK'}
                    href={'otp'}
                    isPlan={true}
                />
                <FaqsComp data={pageData?.faqComp} notCont={true} />
            </div>
        </div>
    );
}
