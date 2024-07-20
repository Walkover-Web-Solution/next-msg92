import IndexComp from '@/components/indexComp/indexComp';
import ProductComp from '@/components/productComp/productComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';

const Components = {
    IndexComp,
    ProductComp,
    NotificationBarComp
};

export default function Page(props) {
    if (props.components?.length > 0) {
        return (
            <div>
                {props.components.map((comp) => {
                    var Component = Components[comp.comp];
                    if (!Component) {
                        console.error(`Component ${comp.comp} not found`);
                        return null;
                    }
                    return <Component />;
                })}
            </div>
        );
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
    const params = context.params.slug;
    const res = await fetch('http://localhost:3000/api/fetch?lang=en&country=in');
    const data = await res.json();
    if (!res.ok) {
        return {
            notFound: true,
        };
    }

    return {
        props: data,
    };
};