describe('config', () => {
  beforeEach(() => jest.resetModules());
  describe('when the config is set', () => {
    it('returns values', () => {
      jest.mock('next/config', () => () => ({ publicRuntimeConfig: { basePath: '' } }));
      // eslint-disable-next-line global-require
      const { getBasePath, getLanguage, withBasePath } = require('./config');
      expect(getBasePath()).toBe('');
      expect(withBasePath('feed')).toBe('/feed');
      expect(getLanguage()).toBe('en-in');
    });

    it('returns en-in', () => {
      jest.mock('next/config', () => () => ({ publicRuntimeConfig: {} }));
      // eslint-disable-next-line global-require
      const { getBasePath, getLanguage, withBasePath } = require('./config');
      expect(getBasePath()).toBe('');
      expect(withBasePath('feed')).toBe('/feed');
      expect(getLanguage()).toBe('en-in');
    });
  });
});
