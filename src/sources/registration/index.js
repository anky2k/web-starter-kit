import { post } from '../../network';
import { getApiBasePath } from '../../config';
import { apiMiddleWare } from '../../network/utils';
import { getItem } from '../../utils/cookie'


export async function sendOtp({ id }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('service')}/send-otp`;
    response = await post(apiPath, {
      id
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function verifyOtp({ number, otp }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('service')}/verify-otp`;
    response = await post(apiPath, {
      number,
      otp
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function login({ id }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('service')}/login`;
    response = await post(apiPath, {
      id
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function verifyToken() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('service')}/verify-token`;
    response = await post(apiPath);
    const { data } = response;
    if (data.status === 401) {
      response = {}
      response.data = await refreshToken()
    }
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function refreshToken() {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('service')}/refresh-token`;
    response = await post(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function checkAuth(req) {
  try {
    if (getItem('x-access-token')) {
      const resp = await srVerifyToken();
      if (resp.status === 403) {
        return Promise.resolve('new');
      }
      return Promise.resolve('existing');
    } else {
      return Promise.resolve('new');
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

