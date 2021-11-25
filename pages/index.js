import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import ContentRail from '../src/components/content-rail';
import Carousel from '../src/components/commons/carousel';

const Home = props => {
  const { t } = useTranslation();


  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: props.title
        }}
      />
      <div className="w-full overflow-x-hidden">     
        <Carousel />   
        <ContentRail />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      title: 'test title'
    }
  };
}

export default Home;