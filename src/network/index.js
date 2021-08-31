import parseResponse from './parse-response';
import { getUserId } from '../utils/user';

const options = (methodName, body, headersOpt = {}) => ({
  method: methodName,
  ...body && { body: JSON.stringify(body) },
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    'guest-token': getUserId(),
    ...headersOpt
  }
});

const timeout = () => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('request timed out')), 5000);
});

// eslint-disable-next-line max-len
const createFetcher = methodName => (url, body, headers) => Promise.race([fetch(url, options(methodName, body, headers)), timeout()]).then(parseResponse);
export const get = createFetcher('get');
export const post = createFetcher('post');
export const put = createFetcher('put');
export const patch = createFetcher('patch');
export const del = createFetcher('delete');
