/* components */
import HeadComp from '../components/HeadComp';
import NotificationBarComp from '../components/NotificationBarComp/NotificationBarComp';
import MenuBarComp from '../components/MenuBarComp/MenuBarComp';
import BannerComp from '../components/BannerComp/BannerComp';

const Components = {
  HeadComp,
  NotificationBarComp,
  MenuBarComp,
  BannerComp
};

export default function Page(props) {
  return (
    <>
      {Object.keys(props).map((key) => {
        const data = props[key];      
        var Component = Components[key];        
        if (!Component) {
          console.error(`Component is undefined. Check your imports and component exports.`);
          return;
        }        
        return <Component key={`section-${key}`} data={data} />
      })}          
    </>
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
  //console.log("🚀 ~ getStaticProps ~ params:", context.params)
  const res = await fetch('http://localhost:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();  
  return {
    props: data,
  };  
};