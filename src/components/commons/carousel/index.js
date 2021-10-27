import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Slider = ({ children }) => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1          
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1          
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1          
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1          
        }
      };
      
      // code samples - https://github.com/YIZHUANG/react-multi-carousel/blob/master/stories/index.stories.js
      
      return(
        <Carousel 
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            keyBoardControl={true}
            customTransition="all .4"
            transitionDuration={400}
        >
            {
                children.map( child => child)
            }
        </Carousel>
      );
}

export default Slider
