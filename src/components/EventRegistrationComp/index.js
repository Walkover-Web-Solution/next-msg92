import EventDetails from './EventDetails';
import RegistrationForm from './RegistrationForm';

export default function EventRegistrationComp({ data }) {
    return (
        <section>
            <div className='container cont_p'>
                <div className='mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-blue-100 bg-slate-50 shadow-xl md:flex-row'>
                    <EventDetails data={data} />
                    <RegistrationForm data={data?.form} />
                </div>
            </div>
        </section>
    );
}
