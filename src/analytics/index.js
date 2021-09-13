import { init as initMixpanel, track as trackEvent, flushQueue } from './mixpanel';

let initiated = false;
const LCP_TIME = 6000;

export const init = () => {
  initMixpanel();
  window.addEventListener('unload', () => {
    flushQueue();
  });
  initiated = true;
};
export const track = (event, payload) => {
  if (!initiated) init();
  trackEvent(event, payload);
};

export const timedOutInit = () => {
  if (initiated) return true;
  setTimeout(() => init(), LCP_TIME);
  return true;
};