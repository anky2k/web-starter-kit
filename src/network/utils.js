
import { loadMockServer } from '../mock';
import { getDateDiffSeconds } from '../utils/date';

const RETRY_COUNT = 3;
const RETRY_DELAY = 500;

const wait = (ms, payload = {}) => new Promise(resolve => setTimeout(() => resolve(payload), ms));

export const backoff = async (fn, reqObj, depth = 0) => {
  let result = {};
  reqObj.depth = depth;
  try {
    result = await fn(reqObj);
    if (result.ok) {
      return result;
    }
    if (depth > RETRY_COUNT) {
      throw result;
    }
    await wait(depth * RETRY_DELAY);
    return backoff(fn, reqObj, depth + 1);
  } catch (e) {
    if (depth > 3) {
      throw result;
    }
    await wait(depth * RETRY_DELAY);
    return backoff(fn, reqObj, depth + 1);
  }
};

export const resolvePromise = (data = {}) => (new Promise(resolve => {
  resolve(data);
}));

export const rejectPromise = (data = {}) => (new Promise((resolve, reject) => {
  reject(data);
}));

export const isObjectEmpty = obj => (obj instanceof Object && Object.keys(obj || {}).length <= 0);

const isValid = cachedItem => {
  if (!cachedItem.ttl) {
    return true;
  }
  return getDateDiffSeconds(new Date(cachedItem.ttl, new Date()));
};

export function apiMiddleWare(
  _promise,
  transformSuccess = data => (data),
  transformError = data => (data),
  settings = {}
) {
  const { shouldCache = false, backoff = false, ttl = 0 } = settings;
  const cache = {};
  let cacheKey = '';
  const wrapped = async (params = {}) => {
    let resp = {};
    try {
      await loadMockServer();
      cacheKey = JSON.stringify(params);
      const cachedItem = cache[cacheKey];
      if (cachedItem && isValid(cachedItem)) {
        return resolvePromise(cachedItem);
      }
      if (backoff) {
        resp = await backoff(_promise, params);
      } else {
        resp = await _promise(params);
      }
      if (isObjectEmpty(resp)) {
        resp = null;
      }
      if (!resp) {
        return _promise(params);
      }
      const tResponse = transformSuccess(resp);
      if (shouldCache) {
        tResponse.cacheTTL = ttl;
        cache[cacheKey] = tResponse;
      }
      return resolvePromise(tResponse);
    } catch (e) {
      return rejectPromise(transformError(e));
    }
  };

  const clearCache = () => {
    delete cache[cacheKey];
    return true;
  };
  return [wrapped, clearCache];
}
