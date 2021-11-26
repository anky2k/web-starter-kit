import { useState } from 'react'
import useMedia, { breakpoints } from '../../../hooks/use-media'
import ComponentStateHandler, { useFetcher } from '../component-state-handler'
import CarouselCard from '../card/carousel-cards'
import { srGetAllGames } from '../../../sources/games'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40

  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};

function Loader() {
    return (     
        <div className={`ml-2 mt-2 mr-2`}>             
            {
                new Array(1).fill(1).map((data, index) =>
                    <div 
                        key={index} 
                        className="w-full h-40 md:h-60 lg:h-60
                        rounded-md
                        text-center     
                        pt-16                   
                        bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                    >
                           <span className="font-bold text-white">Carousel Will Come Here </span>
                    </div>                        
                )    
            }
        </div>
    )
}


function CarouselComp () {
    const type = useMedia(breakpoints, ['desktop', 'tablet', 'mobile'], 'mobile');
    const [games, setGames] = useState([])
    const dataFetcher = () => srGetAllGames();
    const onDataFetched = data => {
        setGames(data.data)
    };
    const [fetchState] = useFetcher(dataFetcher, onDataFetched);
        // return (
        //     <ComponentStateHandler
        //     state={fetchState}
        //     Loader={Loader}
        //     >  
        //         <Carousel
        //             ssr
        //             deviceType={'mobile'} // `deviceType` needs to be set
        //             infinite={true}
        //             autoPlay={true}
        //             containerClass='carousel-container'
        //             itemClass='carousel-image-item'
        //             autoPlaySpeed={6000}
        //             responsive={responsive}
        //             >
        //             {
        //                 games.slice(0, 6).map((data, index) =>
        //                     <div 
        //                         key={index} 
        //                         className="p-2"
        //                     >
        //                         <CarouselCard data={data} />
        //                     </div>
        //                 )    
        //             }
        //         </Carousel>
        //     </ComponentStateHandler>
        // )
    return (
        <ComponentStateHandler
          state={fetchState}
          Loader={Loader}>
            <Loader />
        </ComponentStateHandler>
    )
}

export default CarouselComp