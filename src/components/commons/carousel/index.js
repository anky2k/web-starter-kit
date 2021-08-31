import React, { useEffect, useRef } from "react"
import Glide from "@glidejs/glide"
import "@glidejs/glide/dist/css/glide.core.min.css"
import ChevronLeft from '../svgicons/chevron-left'
import ChevronRight from '../svgicons/chevron-right'

function sliderAuto(slider, miliseconds) {
  const slidesCount = slider.track.childElementCount;
  let slideTimeout = null;
  let nextIndex = 1;
 
  function slide () {
    slideTimeout = setTimeout(
      function () {
        if (nextIndex >= slidesCount ) {
          nextIndex = 0;
        }
        slider.scrollItem(nextIndex++);
      },
      miliseconds
    );
  }
 
  slider.ele.addEventListener('glider-animated', function() {
    window.clearTimeout(slideTimeout);
    slide();
  });
 
  slide();
 }

const sliderConfiguration= {
  type: 'carousel',
  startAt: 0,
  focusAt: 'center',
  animationDuration: 600,
  animationTimingFunc: 'linear',
  perView: 1,
  // breakpoints: {
  //   600: {
  //     perView: 1
  //   }
  // },
  dots: '#dots',
  draggable: true,
  autoplay: 3000,
  peek: 200,
  slidesToShow: 'auto',
  slidesToScroll: 'auto'  
};

const Carousel = ({ children }) => {
  const slider = new Glide('.glide', sliderConfiguration);
  const carouselRef = useRef(null);

  useEffect(() => {
    new Glide('.glide', sliderConfiguration).mount()
    // new Glide('.glide').mount({ breakpoints })
    // sliderAuto(carouselRef.current, 1000)
  }, [])

  return (
    <>
      <div ref={carouselRef} className='glide bg-customblue mt-16'>
        <div className='glide__track' data-glide-el='track'>
          <ul className='glide__slides'>
            {
              children.map( (child, index) => <li key={index} className='glide__slide slider mx-2.5 bg-customblue'>{child}</li> )
            }            
          </ul>
        </div>        
        <div className="glide__bullets absolute left-2/4 bottom-3 text-white" data-glide-el="controls[nav]">
          <button className="glide__bullet ml-1" data-glide-dir="=0">.</button>
          <button className="glide__bullet ml-1" data-glide-dir="=1">.</button>
          <button className="glide__bullet ml-1" data-glide-dir="=2">.</button>
        </div>
        <div className='glide__arrows' data-glide-el='controls'>
          <button className='glide__arrow glide__arrow--prev absolute left-16 top-0 bottom-0 h-auto text-white font-bold focus:outline-none' data-glide-dir='<' >
            <ChevronLeft />
          </button>
          <button className='glide__arrow glide__arrow--next absolute right-16 top-0 bottom-0 h-auto text-white font-bold focus:outline-none' data-glide-dir='>' >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  )
}

export default Carousel