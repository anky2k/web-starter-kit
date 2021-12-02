import useTranslation from '../src/hooks/use-translation';
import { SeoMeta } from '../src/components/commons/head-meta/seo-meta';
import ContentRail from '../src/components/content-rail';
import Carousel from '../src/components/commons/carousel';
import { srGetAllGames, srGetCarouselGames, srGetCategories } from '../src/sources/games'

const Home = props => {
  const { t } = useTranslation();
  const { data: rails } = props.railsData
  const { data: carousel } = props.carouselData
  const { data: categories } = props.gameCategories

  return (
    <div className="flex h-screen">
      <SeoMeta
        data={{
          title: props.title
        }}
      />
      <div className="w-full overflow-x-hidden">     
        <Carousel data={carousel}/>   
        <ContentRail data={rails} categories={categories} />
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  let railsData, carouselData, gameCategories
  try {
    railsData = await srGetAllGames()
    carouselData = await srGetCarouselGames()  
    gameCategories = await srGetCategories()  
  } catch(e) {
    console.log(e)
  }
  
  return {
    props: { railsData, carouselData, gameCategories }, // will be passed to the page component as props
  }
}

export default Home;