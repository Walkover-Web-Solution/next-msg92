import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam';

export default function PricingCampaign({ pageData }) {
    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-2xl md:text-3xl font-bold capitalize'>Campaign Pricing </h1>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex xl:flex-row flex-col w-full gap-8'>
                    <div className='flex flex-col w-full md:gap-5 gap-3 h-full md:p-8 p-4 bg-white rounded'>
                        <h2 className='text-2xl md:text-3xl  font-semibold text-green-600 capitalize'>Free</h2>
                        <div className='flex flex-col text-base md:text-xl'>
                            <p>{pageData?.connectComp?.content || `Campaign usage is free.`}</p>
                            <p>
                                {pageData?.connectComp?.content2 ||
                                    `Channel wise pricing will be applicable for sending message.`}
                            </p>
                        </div>{' '}
                        <a href={getURL('signup', 'campaign')} target='_blank'>
                            <button className='btn btn-primary w-fit btn-md'>
                                {pageData?.get_started || 'Get Started'}
                            </button>
                        </a>
                    </div>
                    <div className='flex flex-col w-full gap-5 h-full md:p-8 p-4 bg-white rounded'>
                        <h2 className='text-2xl md:text-3xl font-semibold capitalize'>For third party APIs</h2>
                        <div className='flex flex-col gap-2 text-base md:text-xl'>
                            <p>{pageData?.for_third_party_apis?.line_one}</p>
                            <p className='text-sm'>{pageData?.for_third_party_apis?.line_two}</p>
                        </div>{' '}
                        <a href={getURL('signup', 'campaign')} target='_blank'>
                            <button className='btn btn-primary btn-outline w-fit btn-md'>
                                {pageData?.get_started || 'Get Started'}
                            </button>
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
