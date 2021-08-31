import React, { useEffect, useState } from 'react';

const elemRef = React.createRef();

export default function OnView(props) {
  const [showLoader, setShowLoader] = useState(true);
  const childrenLength = props.children.length;
  useEffect(
    () => {
      if (childrenLength > 0) {
        setShowLoader(false);
      }
      const observer = new window.IntersectionObserver(entries => {
        const isIntersectionTrue = entries[0].isIntersecting;
        props.hasMore && isIntersectionTrue && props.loadFunction();
      }, {
        rootMargin: '-20px' // preload a little early (20px before the distance between referred dom and root)
      });
      setShowLoader(true);
      observer.observe(elemRef.current);
      return () => observer.disconnect();
    },
    [childrenLength]
  );

  return (
    <>
      {props.children}
      {
        showLoader && (
          <div className="load-more-on-view" ref={elemRef}>
            {
              !!(props.hasMore) && (props.loader)
            }
            {
              !!(props.endOfLine) && (<div>...</div>)
            }
          </div>
        )
      }
    </>
  );
}
