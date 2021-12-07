import { useState } from 'react'
import CarouselCard from '../card/carousel-cards'
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

function CarouselComp ({ data = []}) {
    const [games] = useState(data)    
    return (                   
        <div className="md:ml-20 lg:ml-20 md:w-11/12 lg:w-11/12">
            <Slider {...settings}>
                {
                    games.map((data, index) =>
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
    )    
}

export default CarouselComp