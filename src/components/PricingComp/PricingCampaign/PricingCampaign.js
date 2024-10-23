import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';

export default function PricingCampaign({ data }) {
    return (
        <div className='flex flex-col w-full gap-8'>
            <div className='flex flex-col w-full gap-4 h-fit p-8 bg-white rounded'>
                <h2 className=' text-3xl font-semibold text-green-600 capitalize'>Free</h2>
                <div className='flex flex-col text-xl'>
                    <p>{data?.connectComp?.content || `Campaign usage is free.`}</p>
                    <p>
                        {data?.connectComp?.content2 || `Channel wise pricing will be applicable for sending message.`}
                    </p>
                </div>{' '}
                <a href={getURL('signup', 'campaign')} target='_blank'>
                    <button className='btn btn-primary w-fit btn-md'>{data?.get_started || 'Get Started'}</button>
                </a>
            </div>
            <ConnectWithTeam href={'campaign'} data={data?.connectComp} product={'Campaign'} />
        </div>
    );
}
