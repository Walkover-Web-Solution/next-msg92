import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam';

export default function PricingCampaign({ pageData }) {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <h1 className='text-2xl md:text-3xl font-bold capitalize'>Campaign Pricing</h1>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex xl:flex-row flex-col gap-4 items-stretch'>
                    {/* Free card */}
                    <div className='flex flex-col p-6 rounded-2xl bg-indigo-50 border-2 border-indigo-300 shadow-lg shadow-indigo-100 w-full xl:max-w-sm'>
                        <h3 className='text-2xl font-bold mb-1 text-slate-900'>Free</h3>
                        <div className='flex flex-col gap-1 text-sm text-slate-600 mb-5 flex-1'>
                            <p>{pageData?.connectComp?.content || 'Campaign usage is free.'}</p>
                            <p>
                                {pageData?.connectComp?.content2 ||
                                    'Channel wise pricing will be applicable for sending message.'}
                            </p>
                        </div>
                        <a
                            href={getURL('signup', 'campaign')}
                            target='_blank'
                            className='w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-center transition-all block bg-indigo-600 text-white hover:bg-indigo-700'
                        >
                            {pageData?.get_started || 'Get Started'}
                        </a>
                    </div>

                    {/* Third party APIs card */}
                    <div className='group flex flex-col p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300 w-full xl:max-w-sm'>
                        <h3 className='text-2xl font-bold mb-1 text-slate-900'>For Third Party APIs</h3>
                        <div className='flex flex-col gap-1 text-sm text-slate-500 mb-5 flex-1'>
                            <p>
                                {pageData?.for_third_party_apis?.line_one ||
                                    'Using any third-party API will soon incur a charge for every 1,000 API calls.'}
                            </p>
                            {pageData?.for_third_party_apis?.line_two && (
                                <p className='text-xs text-slate-400'>{pageData?.for_third_party_apis?.line_two}</p>
                            )}
                        </div>
                        <a
                            href={getURL('signup', 'campaign')}
                            target='_blank'
                            className='w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-center transition-all block bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600'
                        >
                            {pageData?.get_started || 'Get Started'}
                        </a>
                    </div>
                </div>
                <ConnectWithTeam
                    href={'campaign'}
                    pageData={pageData?.connectComp}
                    product={'Campaign'}
                    isPlan={true}
                />
            </div>
        </div>
    );
}
