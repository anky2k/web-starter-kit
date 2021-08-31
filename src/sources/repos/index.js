import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getTopRepos({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('test')}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [srGetTopRepos, clearGetTopRepos] = apiMiddleWare(getTopRepos, transformSuccess, transformError);

export { srGetTopRepos, clearGetTopRepos };
