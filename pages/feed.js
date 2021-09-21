import Image from '../src/components/commons/image';
import Tray from '../src/components/commons/tray';
import Carousel from '../src/components/commons/carousel';

// pass image dimensions for basis breakpoint

const Feed = () => { 
  return (
    <>
      {
        <div>
          <Carousel>
              {
                [
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(20).jpg',
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(21).jpg',
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg',
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg',
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(24).jpg',
                  'https://mdbootstrap.com/img/Photos/Slides/img%20(25).jpg'
                ].map( (item, index) => (
                  <div key={index} className="w-full h-96 relative">
                    <Image
                      layout="fill"
                      alt={'some image'}                    
                      src={item}
                    />              
                  </div>
                ))
              }
          </Carousel>
          <Tray>
            {
              new Array(30).fill(1).map((item, index) => (
                <div key={index}>
                  <Image
                    alt={'some image'}  
                    height={300}
                    width={400}
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  />                  
                </div>
              ))
            }
          </Tray>
        </div>
      }     
    </>  
  );
};

export default Feed;
