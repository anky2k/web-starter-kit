import React from 'react';
import Image from 'next/image';
const Img = React.memo(({
  src, alt = 'localhost', title, height, width, onClick, loading = 'lazy'
}) => {
  return (
    <>
      <Image
        height={height}
        width={width}
        layout="responsive"
        loading={loading}
        src={`https://picsum.photos/seed/${Math.random()}${src}`}
        alt={alt}
        title={title}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onClick={onClick}
        onKeyPress={() => true}
        role="presentation"
      />
    </>
  );
});
Img.displayName = 'ImageComponent'
export default Img;
