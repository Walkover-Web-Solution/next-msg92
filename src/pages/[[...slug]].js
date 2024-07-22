<<<<<<< HEAD
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
=======
/* components */
import HeadComp from '../components/headComp';
import NotificationBarComp from '../components/notificationBarComp/notificationBarComp';
import MenuBarComp from '../components/menuBarComp/menuBarComp';

const Components = {
  HeadComp,
  NotificationBarComp,
  MenuBarComp
};

export default function Page(props) {
  return (
    <div>
      {Object.keys(props).map((key) => {
        const data = props[key];
        console.log("🚀 ~ Page ~ props:", data);
        var Component = Components[key];
        // Check if Component is undefined
        if (!Component) {
          console.error(`Component is undefined. Check your imports and component exports.`);
          return;
        }        
        return <Component key={`section-${key}`} data={data} />
      })}
    </div>
  );
>>>>>>> c48e7df (fixed comp call by string)
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
<<<<<<< HEAD
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
=======
  const params = context.params  
  const res = await fetch('http://localhost:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();  
  //console.log("🚀 ~ getStaticProps ~ data:", data)
  
  return {
    props: data,
  };  
>>>>>>> c48e7df (fixed comp call by string)
};