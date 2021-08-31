import { GUEST_TOKEN, USER_TOKEN } from '../constants';
import { generateUUID } from './app';
import { getItem } from './cookie';

// check user status login or not
export const getUserId = () => (getItem(USER_TOKEN) || getItem(GUEST_TOKEN) || (generateUUID(true)));

export const getUserIdHash = () => {
  const userId = getUserId();
  let hash = 0;
  let chr = '';
  if (userId.length === 0) return hash;
  for (let i = 0; i < userId.length; i + 1) {
    chr = userId.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

