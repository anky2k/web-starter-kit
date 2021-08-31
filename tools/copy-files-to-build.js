const path = require('path');

const basePath = __dirname;
const fs = require('fs');

const buildPath = path.join(basePath, '../out');
const appStats = path.join(basePath, '../out/stats');
const bundleSizes = path.join(basePath, '../out/stats/bundle-size');
const env = process.env.APP_ENV;

if (env === 'production') {
  // eslint-disable-next-line no-console
  console.log(' noop in prod mode!!!! ');
  return
}

// check if build exists
if (!fs.existsSync(buildPath)) {
  // eslint-disable-next-line no-console
  console.log(' please run npm run export before this task!!! ');
}

// create perf path
if (!fs.existsSync(appStats)) {
  fs.mkdirSync(appStats);
}

// create bundle size space
if (!fs.existsSync(bundleSizes)) {
  fs.mkdirSync(bundleSizes);
}

// // copy bundle size report
const bundleSizeRptSrc = path.join(basePath, '../perf/bundle-size');
const rstream = fs.createReadStream(`${bundleSizeRptSrc}/report.html`, { encoding: 'utf8' });
const wstream = fs.createWriteStream(`${bundleSizes}/index.html`);
rstream.pipe(wstream);
