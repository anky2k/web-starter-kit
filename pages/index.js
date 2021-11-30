import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import ContentRail from '../src/components/content-rail';
import Carousel from '../src/components/commons/carousel';
import { srGetAllGames } from '../src/sources/games'

const Home = props => {
  const { t } = useTranslation();
  const { data } = props.res

  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: props.title
        }}
      />
      <div className="w-full overflow-x-hidden">     
        <Carousel data={data}/>   
        <ContentRail data={data} />
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const res = await srGetAllGames()

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: { res }, // will be passed to the page component as props
  }
}

export default Home;