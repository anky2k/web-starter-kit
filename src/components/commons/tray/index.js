import React, { useRef, useState } from 'react';
import PageIndicators from './page-indicators';
import useIntersect from '../../../hooks/use-intersect';

const TrayContent = ({
  rootRef, child, childIndex, onScroll
}) => {
  const [ref] = useIntersect({
    root: rootRef.current,
    callback: onScroll
  });

  return (
    <div
      data-contentindex={(childIndex + 1)}
      ref={ref}
      data-testid="dt-tray-content"
      className="min-w-1/6 m-1 w-10"
    >
      {child}
    </div>
  );
};

const trayContentEnteringViewPort = entry => {
  if (entry && (entry.intersectionRatio > 0)) {
    return entry.target.attributes['data-contentindex'].value;
  }
  return '';
};

const TrayPageSize = {
  sm: 4,
  md: 4,
  lg: 4,
  peek: 3
};
const canRenderIndicators = (children, showIndicators, type) => (children.length && children.length > TrayPageSize[type] && showIndicators);

const Tray = React.forwardRef(({ children, type = 'md', showIndicators }, ref) => {
  const [element, setElement] = useState({});
  const rootRef = useRef();

  const onTrayContentScroll = entry => {
    if (trayContentEnteringViewPort(entry)) {
      setElement(entry);
    }
  };

  return (
    <>
      <div
        className="rail-base min-h-200"
        ref={ref || rootRef}
        data-testid="dt-tray-container"
      >
        {children.length && children.map((child, index) => (
          <TrayContent
            onScroll={onTrayContentScroll}
            key={index}
            rootRef={rootRef}
            child={child}
            type={type}
            childIndex={index}
          />
        ))}
        {!children.length // single element
          && (
            <TrayContent
              onScroll={onTrayContentScroll}
              rootRef={rootRef}
              child={children}
              type={type}
              childIndex={0}
            />
          )}
      </div>
      {
        canRenderIndicators(children, showIndicators, type) && (
          <PageIndicators
            type={type}
            pageSize={TrayPageSize[type]}
            scrolledElement={element}
          >
            {children}
          </PageIndicators>
        )
      }
    </>
  );
});

export default Tray;
