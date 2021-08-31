import 'raf/polyfill';

import '@testing-library/jest-dom/extend-expect';

global.fetch = require('jest-fetch-mock');

