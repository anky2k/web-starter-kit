import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const Home = props => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: 'some game portal'
        }}
      />
      <div>
        <div className="tabs tabs-boxed">
          <a className="tab tab-active">All Games</a> 
          <a className="tab">HTML5 Games</a> 
          <a className="tab">Board Games</a>
          <a className="tab">Other</a>
        </div>

        <div>Gallery</div>
      </div>
    </div>
  );
};

export default Home;
