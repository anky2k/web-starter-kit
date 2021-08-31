import { useState, useEffect } from 'react';

export const breakpoints = ['(min-width: 1080px)', '(min-width: 768px)', '(min-width: 320px)'];

function useMedia(queries, values, defaultValue) {
  const mediaQueryLists = (global.matchMedia && queries.map(q => global.matchMedia(q))) || [];
  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return values[index] ? values[index] : defaultValue;
  };
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    []
  );
  return value;
}
export default useMedia;
