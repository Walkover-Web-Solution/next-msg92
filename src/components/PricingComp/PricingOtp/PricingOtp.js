import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam';
import FaqsComp from '@/components/FaqsComp/FaqsComp';

export default function PricingOtp({ pageData }) {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <h1 className='text-3xl font-semibold capitalize '>OTP widget Pricing</h1>
            <div className='flex flex-col w-full gap-8'>
                <div className='flex flex-col w-full gap-4 h-fit p-8 bg-white rounded'>
                    <h2 className=' text-3xl font-semibold text-green-600 capitalize'>Free</h2>
                    <div className='flex flex-col text-xl'>
                        <p>{pageData?.connectComp?.content || `OTP widget/SDK usage is free.`}</p>
                        <p>
                            {pageData?.connectComp?.content2 ||
                                `Channel wise pricing will be applicable for sending message.`}
                        </p>
                    </div>{' '}
                    <a href={getURL('signup', 'otp')} target='_blank'>
                        <button className='btn btn-primary w-fit btn-md'>
                            {pageData?.get_started || 'Get Started'}
                        </button>
                    </a>
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
