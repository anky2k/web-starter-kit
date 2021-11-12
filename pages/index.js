import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import Gallery from '../src/components/game-gallery';

const Home = props => {
  const { t } = useTranslation();


  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'some game portal'
        }}
      />
      <div className="w-full overflow-x-hidden">        
        <Gallery />
      </div>
    </div>
  );
};

export default Home;
