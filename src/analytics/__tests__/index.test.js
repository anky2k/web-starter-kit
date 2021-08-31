import * as analytics from '../index';
import { init as initMixpanel, track as trackEvent } from '../mixpanel';

jest.mock('../mixpanel', () => ({
  init: jest.fn(),
  track: jest.fn()
}));

describe('----- analytics index -----', () => {
  // it('should call init when track is called the first time', () => {
  //   const event = 'ViewPage';
  //   const payload = {
  //     a: 'b'
  //   };
  //   analytics.track(event, payload);
  //   const initSpy = jest.spyOn(analytics, 'init');
  //   expect(initSpy).toHaveBeenCalledTimes(1);
  //   analytics.track(event, payload);
  //   expect(initSpy).toHaveBeenCalledTimes(0);
  // });

  it('should call init method from imported analytics module', () => {
    analytics.init();
    expect(initMixpanel).toHaveBeenCalledTimes(1);
  });

  it('should call track method from imported analytics module', () => {
    const event = 'ViewPage';
    const payload = {
      a: 'b'
    };
    analytics.track(event, payload);
    expect(trackEvent).toHaveBeenCalledWith(event, payload);
    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it('should register unload event on window on init', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    analytics.init();
    expect(addEventListenerSpy).toHaveBeenCalledWith('unload', expect.anything());
  });
});

