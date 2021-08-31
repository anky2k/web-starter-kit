import { useState } from 'react';
import { srGetRepoDetails } from 'sources/repo-details';
import ComponentStateHandler, { useFetcher } from '../commons/component-state-handler';

const GitHubRepoDetails = props => {
  const { project = '', publisher = '' } = props;
  const [resp, setResp] = useState([]);
  const dataFetcher = () => srGetRepoDetails({ publisher, project });
  const onDataFetched = data => setResp(data);
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);

  function CustomLoader() {
    return (
      <div
        className="text-purple-600 mb-8 animate-bounce inline-block
        py-4 px-8 bg-teal-500 text-teal-100 rounded-lg"
      >
        I am a custom loader
      </div>
    );
  }

  function renderData(index, item, keyName) {
    let data = '';
    if (Array.isArray(item[keyName]) || item[keyName] instanceof Object) {
      data = JSON.stringify(item[keyName]);
    } else {
      data = item[keyName];
    }
    return (
      <li key={index} className="border list-none rounded-sm px-3 py-3">
        <span>
          {' '}
          <span>{`${keyName}`}</span>
          {' '}
          <span>{` - ${data}`}</span>
        </span>
      </li>
    );
  }
  return (
    <ComponentStateHandler
      state={fetchState}
      Loader={CustomLoader}
    >
      <div>
        <ul className="list-decimal px-2">
          {
            Object.keys(resp).map((keyName, index) => renderData(index, resp, keyName))
          }
        </ul>
      </div>
    </ComponentStateHandler>
  );
};

export default GitHubRepoDetails;
