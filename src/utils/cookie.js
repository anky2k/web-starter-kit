import canUseDom from 'can-use-dom';
import { GUEST_TOKEN } from '../constants';

export const deleteAllCookies = () => {
  if (!canUseDom) return false;
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (!(name.replace(/\s/g, '') === GUEST_TOKEN)) {
      document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.localhost.com`;
    }
  });
  return true;
};

/**
 * [setItem this is used to set data]
 * @param {[string]} key [key name ]
 * @param {[string]} val [value]
 * @param {Object} opt [this is optional param, this will contextual options like expiry etc]
 */
export const setItem = (key, val, opt = {}) => {
  if (!canUseDom) return false;
  const cookieStr = `${key}=${val}; 
  path = ${opt.path || '/'}
  ;domain = ${opt.domain || '.localhost'}`;
  document.cookie = cookieStr;
  return true;
};

/**
 * [getItem this is to get item]
 * @param  {[string]} key [key name]
 * @return {[string]}     [description]
 */
export const getItem = key => {
  if (!canUseDom) return null;
  const nameEQ = `${key}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * [getAllItems description]
 * @return {[type]} [description]
 */
export const getAllItems = () => {
  if (!canUseDom) return {};
  const cookiesObj = {};
  const allcookies = document.cookie.split(';');
  for (let i = 0; i < allcookies.length; i += 1) {
    // eslint-disable-next-line prefer-destructuring
    cookiesObj[allcookies[i].split('=')[0].trim()] = allcookies[i].split('=')[1];
  }
  return cookiesObj;
};

/**
 * [removeItem this is to remove item basis key name]
 * @param  {[string]} key [key name]
 * @return {[bool]}     [description]
 */
export const removeItem = key => {
  if (!canUseDom) return false;
  document.cookie = `${key}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.localhost.com`;
  return true;
};

/**
 * [clearAll this is to clear all cookies]
 * @return {[bool]} [description]
 */
export const clearAll = () => {
  if (!canUseDom) return false;
  const opt = {};
  opt.expiresAt = (-1 * Date.now());
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i];
    this.setItem(c.split('=')[0], '', opt);
  }
  return true;
};

/**
 * [checkIfExists this is to check if sepcific cookie exists or not]
 * @param  {[string]} key [key name]
 * @return {[bool]}  [description]
 */
export const checkIfExists = key => (!!getItem(key));
