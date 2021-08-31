import { promises as fs } from 'fs';
import path from 'path';
import canUseDom from 'can-use-dom';
import { get } from 'network';
import { apiMiddleWare } from 'network/utils';
import { getApiBasePath } from '../../config';

const middlewareSettings = {
  shouldCache: true
};

const transformSuccess = data => data;
const transformError = data => data;

async function getLocaleData(locale = 'en-in') {
  let response = {};
  if (!canUseDom) {
    const postsDirectory = path.join(process.cwd(), 'public/i10n');
    const filePath = path.join(postsDirectory, `${locale}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
  try {
    response = await get(`${getApiBasePath('app')}/i10n/${locale}.json`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getLocales, clearLocales] = apiMiddleWare(getLocaleData, transformSuccess, transformError, middlewareSettings);

export { getLocales, clearLocales };
