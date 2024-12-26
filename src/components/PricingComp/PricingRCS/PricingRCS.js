import getURL from '@/utils/getURL';
import ConnectWithTeam from '../ConnectWithTeam/ConnectWithTeam';
import { InlineWidget } from 'react-calendly';

export default function PricingRCS({ data }) {
    return (
        <>
            <div className='flex flex-col gap-3 w-full'>
                <h1 className='text-3xl font-semibold capitalize '>RCS Pricing </h1>
                <div className='flex flex-col gap-6'>
                    <div className='p-8 flex flex-col gap-4 bg-white h-fit rounded'>
                        <h1 className='text-2xl'>Connect To Our Team For The Customized RCS Message Pricing</h1>

                        <button
                            onClick={() => document.getElementById('sales_modal').showModal()}
                            className='btn btn-primary btn-md'
                        >
                            Get Started
                        </button>
                    </div>
                    <ConnectWithTeam product={'RCS'} data={data?.connectComp} href={'rcs'} isPlan={false} />
                </div>
            </div>
            <dialog id='sales_modal' className='modal'>
                <div className='modal-box'>
                    <form method='dialog'>
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
                    </form>
                    <InlineWidget url='https://calendly.com/sales-msg91/pre-sales' styles={{ height: '680px' }} />
                </div>
            </dialog>
        </>
    );
}
