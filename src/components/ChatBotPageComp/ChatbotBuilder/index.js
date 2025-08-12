import FeatureWithBulletComp from '../FeatureWithBulletComp';

export function ChatbotBuilder({ data }) {
    return (
        <section className='container cont cont_gap cont_p'>
            {data?.map((item, index) => (
                <FeatureWithBulletComp data={item} index={index} />
            ))}
        </section>
    );
}
