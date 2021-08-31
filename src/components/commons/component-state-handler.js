
import { useState, useEffect } from 'react';
import CircularLoader from './circular-loader';

function ComponentStateHandler({
  state, Loader, ErrorComp, children
}) {
  if (state === 'pending') {
    return Loader ? <Loader />
      : (<CircularLoader />);
  }
  if (state === 'fail') return ErrorComp ? <ErrorComp /> : null;
  if (state === 'success') return <>{children}</>;
}
/**
 *
 * @param {*} dataFetcher is a promise that resolves or rejects data, hence if the
 * data source is not an api we can have a function which promisifies data  - Promise.resolve(data)
 * @param {*} onDataFetched is a callback function which gets called with dataFetcher response as a param
 */
function useFetcher(dataFetcher, onDataFetched) {
  const [fetchState, setFetchState] = useState('pending');
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await dataFetcher();
        setData(data);
        if (onDataFetched) onDataFetched(data);
        setFetchState('success');
      } catch (e) {
        console.error(e);
        setFetchState('fail');
      }
    })();
  }, []);
  return [fetchState, data];
}

export { useFetcher };

export default ComponentStateHandler;
