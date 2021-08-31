import { useState, useRef, useEffect } from 'react';

const useIntersect = ({
  callback, root = null, rootMargin, threshold = 0
}) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        updateEntry(entry);
        callback(entry);
      },
      {
        root,
        rootMargin,
        threshold
      }
    );

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, entry];
};

export default useIntersect;

