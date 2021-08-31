import canUseDom from 'can-use-dom';
import cloneDeep from 'lodash/cloneDeep';
import { setItem } from './cookie';
import { GUEST_TOKEN, NO_SUPPORT } from '../constants';

export const getNewObjectCopy = ogObj => (cloneDeep(ogObj));

// params in  getInitialProps [ err, req, res, pathname, query, asPath, AppTree ]
export const withRouteState = Component => {
  if (!Component.getInitialProps) {
    Component.getInitialProps = async (params = {}) => {
      let routeState = {};
      if (canUseDom) {
        const routeStateKey = params.asPath.replace(/\//g, '');
        routeState = JSON.parse(window.sessionStorage.getItem(routeStateKey) || {});
        window.sessionStorage.removeItem(routeStateKey);
      }
      return {
        pathname: params.pathname,
        query: params.query,
        asPath: params.asPath,
        routeState
      };
    };
  }
  return Component;
};

export const generateUUID = persist => {
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
  if (persist) {
    setItem(GUEST_TOKEN, uuid);
  }
  return uuid;
};

export const share = () => {
  if (navigator.share) {
    const canonicalElement = document.querySelector('link[rel=canonical]');
    const url = canonicalElement?.href || document.location.href;
    return navigator.share({
      url
    });
  }
  return Promise.reject(NO_SUPPORT);
};

/** example
 * Router.pushState('/user, {name : ankit, age: 31})
 * This will work only on component in pages folder
 * pages/user.js ----
 * const User = props => {
 *  const {name, age} = props.routeState
 * return (
 *  <div>{name}</div>
 *  <div>{age}</div>
 * )
 * }
 * export default withRouteState(User)
 */
