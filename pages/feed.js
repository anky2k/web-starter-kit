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
                    width={600}
                    // eslint-disable-next-line max-len
                    src="/image/upload/w_599,h_337,c_scale,f_webp,q_auto:eco/resources/0-101-externalli_666746733/app_cover/1170x658withlogo_45191934.jpg"
                  />
                  <div style={{ margin: '5px' }} />
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
