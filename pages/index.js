import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';

const Home = props => {
  const { t } = useTranslation();
  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: props.title
        }}
      />
      <span className="font-bold m-auto text-purple-800 text-4xl">{t('welcome')}</span>
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
