import { useState } from 'react'
import ComponentStateHandler, { useFetcher } from '../component-state-handler'
import CarouselCard from '../card/carousel-cards'
import { srGetAllGames } from '../../../sources/games'
import Slider from "react-slick";

const settings = {
        dots: true,
        infinite: true,
        autoPlay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        appendDots: dots => (
            <div
              style={{
                borderRadius: "10px",
                padding: "10px"
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
        customPaging: i => (
            <div
              style={{
                color: "#FFF"
              }}
            >
              &#8226;
            </div>
        ),
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
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
                    />
                )    
            }
        </div>
    )
}


function CarouselComp ({ data = []}) {
    const [games, setGames] = useState(data)
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
                {/* <Carousel
                    ssr
                    deviceType={'mobile'} // `deviceType` needs to be set
                    infinite={true}
                    autoPlay={true}
                    containerClass='carousel-container'
                    itemClass='carousel-image-item'
                    autoPlaySpeed={6000}
                    responsive={responsive}
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
                </Carousel> */}
                <div className="md:ml-20 lg:ml-20 md:w-11/12 lg:w-11/12">
                    <Slider {...settings}>
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
                    </Slider>
                </div>
            </ComponentStateHandler>
        )
    // return (
    //     <ComponentStateHandler
    //       state={fetchState}
    //       Loader={Loader}>
    //         <Loader />
    //     </ComponentStateHandler>
    // )
}

export default CarouselComp