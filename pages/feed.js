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
                <div key={index}>
                  <Image
                    alt={'some image'}  
                    height={600}
                    width={800}
                    src="/800/600"
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
