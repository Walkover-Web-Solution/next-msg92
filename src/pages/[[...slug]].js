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
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = async (context) => {
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
};