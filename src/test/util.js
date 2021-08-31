import matchMediaPolyfill from 'mq-polyfill';

matchMediaPolyfill(global);

global.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'));
};

// mock cookie on document
Object.defineProperty(document, 'cookie', {
  get: jest.fn().mockImplementation(() => ('')),
  set: jest.fn().mockImplementation(() => (true))
});

export const observe = jest.fn();
export const unobserve = jest.fn();
export const disconnect = jest.fn();

global.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}));
