import React from 'react';
import Image from 'next/image';

const Img = React.memo(({
  src, alt = 'games den'
}) => {
  // return src ? `https://d1lf3l2ndx18vw.cloudfront.net${src}` : `https://picsum.photos/seed/${src}${new Date().getTime()}/150`

  const loader = ({ src }) => {
    return `https://d1lf3l2ndx18vw.cloudfront.net${src}`
  }

  return (
    <Image
      unoptimized
      loader={loader}
      className={`
          position-relative overflow-hidden
          hover:scale-110 transition duration-500
          bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
        `}
      src={src || `https://picsum.photos/seed/${new Date().getTime()}/150`}
      alt={alt}
      layout="fill"
      object-fit="cover"
      role="presentation"
    />
  );
});

Img.displayName = 'ImageComponent'
export default Img;

const IconImg = React.memo(({
  src, alt = 'games den'
}) => {

  const loader = ({ src }) => {
    return `${src}`
  }

  return (
    <Image
      unoptimized
      loader={loader}
      className={`
          rounded-md
          position-relative overflow-hidden
          animate-appear bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
        `}
      src={src || `https://picsum.photos/seed/${new Date().getTime()}/150`}
      alt={alt}
      height="32"
      width="32"
      role="presentation"
    />
  );
});

IconImg.displayName = 'IconImageComponent'
export { IconImg };