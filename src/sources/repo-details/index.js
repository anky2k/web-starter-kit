
import { get } from 'network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getRepoDetails({ publisher, project }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('test')}/repos/${publisher}/${project}`;
    response = await get(apiPath);
    response.data.requestedWith = { publisher, project };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [srGetRepoDetails, clearGetRepoDetails] = apiMiddleWare(getRepoDetails, transformSuccess, transformError);

export { srGetRepoDetails, clearGetRepoDetails };
