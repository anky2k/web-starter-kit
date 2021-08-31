import getConfig from 'next/config';
import { trimFirstChar } from './utils/string';
import { apiBaseEndPoints, defaultApiBasePath } from './api-base';

export const isGlobalRoute = () => trimFirstChar(window.location.pathname).split('/')[0] === 'global';

export const getBasePath = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { basePath = '' } = publicRuntimeConfig;
  return basePath ? `${basePath}` : '';
};

// TODO replace this with a default from a constant
export const getLanguage = () => (trimFirstChar(getBasePath() || '/en-in'));

export const isMockMode = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { mockMode = '' } = publicRuntimeConfig;
  return (mockMode === 'y');
};

export const getApiBasePath = serviceType => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { appEnv = 'production' } = publicRuntimeConfig;
  return (apiBaseEndPoints[appEnv][serviceType] || defaultApiBasePath);
};

export const withBasePath = path => (`${getBasePath() || '/'}${path}`);
