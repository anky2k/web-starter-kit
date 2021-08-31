import { init as initMixpanel, track as trackEvent, flushQueue } from './mixpanel';

let initiated = false;

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

