import Fragment, { useState, forwardRef } from "react";
import useVirtual from "react-cool-virtual";

const isItemLoadedArr = [];
isItemLoadedArr[5] = true;
const skeletonDelta = 2

const loadData = async ({ loadIndex }, fetchMore) => {
  // Set the state of a batch items as `true`
  // to avoid the callback from being invoked repeatedly
  isItemLoadedArr[loadIndex] = true;
  try {
    fetchMore();
  } catch (err) {
    // If there's an error set the state back to `false`
    isItemLoadedArr[loadIndex] = false;    
  }
};

const Paginator = ({children, fetchMore, totalSize, batchSize, Skeleton, horizontal = false, itemSize = 200}) => {
  const { outerRef, innerRef, items } = useVirtual({
    itemCount: totalSize,
    horizontal: horizontal,
    // Estimated item size (with padding)
    itemSize: itemSize,
    // The number of items that you want to load/or pre-load, it will trigger the `loadMore` callback
    // when the user scrolls within every items, e.g. 1 - 5, 6 - 10, and so on (default = 15)
    loadMoreCount: batchSize,
    // Provide the loaded state of a batch items to the callback for telling the hook
    // whether the `loadMore` should be triggered or not
    isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
    // We can fetch the data through the callback, it's invoked when more items need to be loaded
    loadMore: (e) => loadData(e, fetchMore),
  });  

  return (
    <div
      style={{ 
        width: (`${horizontal ? `${(batchSize + skeletonDelta) * itemSize}px` : 'auto'}`), 
        height: (`${!horizontal ? `${(batchSize + skeletonDelta) * itemSize}px` : 'auto'}`),
        overflow: "auto" 
      }}
      ref={outerRef}
    >
      <div ref={innerRef}>
        {
          items.map(
            ({ index, measureRef }) => {
              const showLoading =
              index === children.length - 1 && children.length < totalSize;
              return (
                <>
                  <div 
                  ref={measureRef}
                  key={index} 
                  className="w-auto h-auto"
                  >
                    {children[index]}
                  </div>
                  { showLoading && Skeleton }
                </>
              )
            }
          )
        }
      </div>
    </div>
  );
};

export default Paginator;

