import Image from '../src/components/commons/image';
import Tray from '../src/components/commons/tray';
import useMedia, { breakpoints } from '../src/hooks/use-media'

const Feed = () => { 
  const type = useMedia(breakpoints, ['lg', 'md', 'sm'], 'md');
  return (
    <>
      {
        <div>         
          <Tray
            type={type}
          >
            {
              new Array(30).fill(1).map((item, index) => (
                <Image
                  key={index}
                  alt={'some image'}  
                  height={600}
                  width={800}
                  src='/800/600'
                />
              ))
            }
          </Tray>
        </div>
      }     
     {
        <div>         
          <Tray
            type={type}
          >
            {
              new Array(30).fill(1).map((item, index) => (
                <Image
                  key={index}
                  alt={'some image'}  
                  height={624}
                  width={864}
                  src='/942/452'
                />
              ))
            }
          </Tray>
        </div>
      }     
    </>  
  );
};

export default Feed;
