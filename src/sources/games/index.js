import { get } from '../../network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getAllGames() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('app')}/data/games.json`;
    response = await get(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getCarouselGames() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('app')}/data/carousel.json`;
    response = await get(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getCategories() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('app')}/data/categories.json`;
    response = await get(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [srGetAllGames, clearAllGames] = apiMiddleWare(getAllGames, transformSuccess, transformError);

export { srGetAllGames, clearAllGames };


const [srGetCategories, clearCategories] = apiMiddleWare(getCategories, transformSuccess, transformError);

export { srGetCategories, clearCategories };


const [srGetCarouselGames, clearCarouselGames] = apiMiddleWare(getCarouselGames, transformSuccess, transformError);

export { srGetCarouselGames, clearCarouselGames };
