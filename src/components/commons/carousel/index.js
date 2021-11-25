import { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useMedia, { breakpoints } from '../../../hooks/use-media'
import ComponentStateHandler, { useFetcher } from '../component-state-handler'
import CarouselCard, { CarouselCardLoader } from '../card/carousel-cards'
import { srGetAllGames } from '../../../sources/games'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

function Loader() {
    const type = useMedia(breakpoints, ['lg', 'md', 'sm'], 'md');
    return (     
        <div className={`ml-2 mt-2`}>            
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={800}
                containerClass="carousel-container"
                deviceType={type}
                itemClass="carousel-item-padding-40-px"
                >
                {
                    new Array(6).fill(1).map((data, index) =>
                        <div 
                            key={index} 
                            className="p-2"
                        >
                            <CarouselCardLoader data={data} />
                        </div>
                    )    
                }
            </Carousel>         
        </div>
    )
}


function CarouselComp () {
    const type = useMedia(breakpoints, ['desktop', 'tablet', 'mobile'], 'desktop');
    const [games, setGames] = useState([])
    const dataFetcher = () => srGetAllGames();
    const onDataFetched = data => {
        setGames(data.data)
    };
    const [fetchState] = useFetcher(dataFetcher, onDataFetched);
    return (
        <ComponentStateHandler
          state={fetchState}
          Loader={Loader}
        >           
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={800}
                containerClass="carousel-container"
                deviceType={type}                
                itemClass="carousel-item-padding-40-px"
                >
                {
                    games.slice(0, 6).map((data, index) =>
                        <div 
                            key={index} 
                            className="p-2"
                        >
                            <CarouselCard data={data} />
                        </div>
                    )    
                }
            </Carousel>
       </ComponentStateHandler>
    )
}

export default CarouselComp