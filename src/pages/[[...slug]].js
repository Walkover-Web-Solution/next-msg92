/* components */
import BannerComp from '../components/BannerComp/BannerComp';
import CaseStudiesComp from '../components/CaseStudiesComp/CaseStudiesComp';
import ChannelsComp from '../components/ChannelsComp/ChannelsComp';
import FactsComp from '../components/FactsComp/FactsComp';
import FaqsComp from '../components/FaqsComp/FaqsComp';
import FooterComp from '../components/FooterComp/FooterComp';
import MenuBarComp from '../components/MenuBarComp/MenuBarComp';
import MoreServicesComp from '../components/MoreServicesComp/MoreServicesComp';
import NotFoundComp from '../components/NotFoundComp/NotFoundComp';
import NotificationBarComp from '../components/NotificationBarComp/NotificationBarComp';
import PreFooterComp from '../components/PreFooterComp/PreFooterComp';
import ProductsComp from '../components/ProductsComp/ProductsComp';
import TrustedByComp from '../components/TrustedByComp/TrustedByComp';
import HeadComp from '../components/HeadComp';


const Components = {
  BannerComp,
  CaseStudiesComp,
  ChannelsComp,
  FactsComp,
  FaqsComp,
  FooterComp,
  MenuBarComp,
  MoreServicesComp,
  NotFoundComp,
  NotificationBarComp,
  PreFooterComp,
  ProductsComp,
  TrustedByComp,
  HeadComp
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