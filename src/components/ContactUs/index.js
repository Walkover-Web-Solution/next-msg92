import { useState } from 'react';
import { MdOutlineLocalMall, MdOutlineSupportAgent } from 'react-icons/md';
import BookingModal from './BookingModal';
import ContactCard from './ContactCard';
import ContactHeader from './ContactHeader';
import MeetingCard from './MeetingCard';
import QrWithImageCard from './QrWithImageCard';

const SECTION_STYLE = {
    backgroundImage:
        'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
};

export default function ContactUsComp({ data, pageInfo }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const salesCard = data?.cards?.find((card) => card?.key === 'sales');
    const supportCard = data?.cards?.find((card) => card?.key === 'support');
    const meetingCard = data?.cards?.find((card) => card?.key === 'schedule-a-meeting');

    return (
        <section className='py-16 sm:py-20' style={SECTION_STYLE}>
            <div className='container cont flex flex-col gap-12 items-center'>
                <ContactHeader badge={data?.badge} heading={data?.heading} subheading={data?.subheading} />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch'>
                    {salesCard && <ContactCard card={salesCard} icon={MdOutlineLocalMall} />}
                    {meetingCard && <MeetingCard card={meetingCard} onBookSlot={() => setIsBookingOpen(true)} />}
                    {supportCard && <ContactCard card={supportCard} icon={MdOutlineSupportAgent} />}
                </div>

                {pageInfo?.country === 'in' && data?.rcs && <QrWithImageCard data={data?.rcs} />}
            </div>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </section>
    );
}
