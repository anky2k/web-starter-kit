import { useState, useEffect, useRef } from 'react';

const getPageSize = (children, pageSize) => (Math.ceil(children.length / pageSize));

const getElementValue = elem => (elem && elem.target && elem.target.attributes['data-contentindex'].value);

const canMoveNext = (nthElement, activePageNumber, pageSize, numberOfPages) => {
  const elementsPageBoundary = activePageNumber.current * pageSize;
  return (nthElement > elementsPageBoundary) && (activePageNumber.current !== numberOfPages);
};

const canMovePrev = (nthElement, activePageNumber, pageSize) => {
  const elementsPageBoundary = activePageNumber.current * pageSize;
  return (nthElement < elementsPageBoundary) && (activePageNumber.current !== 1);
};

const PageIndicators = ({
  children, scrolledElement, pageSize
}) => {
  const [activeIndicator, setActiveIndex] = useState(0);
  const numberOfPages = getPageSize(children, pageSize);
  const pages = new Array(numberOfPages).fill('');
  const previous = useRef();
  const activePageNumber = useRef(1);

  const nextPage = () => {
    activePageNumber.current += 1;
    setActiveIndex(activeIndicator + 1);
  };

  const firstPage = () => (setActiveIndex(0));

  const prevPage = () => {
    activePageNumber.current -= 1;
    setActiveIndex(activeIndicator - 1);
  };

  const movePage = element => {
    const currentElem = Number(element);
    const prevElem = Number(previous.current);

    /**
     * handle initial render, since intersection observe is async, elements getting detected are in random order
     * the first indicator needs to be handled during component mounting
     */
    if (currentElem === 1) {
      firstPage();
      previous.current = currentElem;
      activePageNumber.current = 1;
      return;
    }
    // no op for first page
    if (currentElem === pageSize) {
      return;
    }
    if (currentElem > prevElem && (canMoveNext(currentElem, activePageNumber, pageSize, numberOfPages))) nextPage();
    if (currentElem < prevElem && (canMovePrev(currentElem, activePageNumber, pageSize))) prevPage();
    previous.current = currentElem;
  };

  useEffect(() => {
    const element = getElementValue(scrolledElement);
    if (element) movePage(element);
  }, [scrolledElement]);

  /**
     * handle initial render, since intersection observe is async, elements getting detected are in random order
     * the first indicator needs to be handled during component mounting
     */
  // TODO terrible hack i hate myself for this - hopefully ill fix this soon
  useEffect(() => {
    setTimeout(() => {
      movePage('1');
    }, 100);
  }, []);

  return (
    <div
      data-testid="dt-page-indicators-container"
      className="w-full justify-end flex flex-row px-1 py-3"
    >
      {
        pages.map((page, index) => (
          <div
            data-testid="dt-page-indicator"
            key={index}
            data-active-page-index={activeIndicator}
            className={`${(activeIndicator === index) ? 'bg-purple-800' : 'bg-purple-200'}
            w-5 h-4 m-1 rounded-2xl
            `}
          />
        ))
      }
    </div>
  );
};

export default PageIndicators;
