const explore = require('source-map-explorer').default;
const path = require('path');

const basePath = __dirname;
const perfPath = path.join(basePath, '../perf');
const bundleSizesPath = path.join(basePath, '../perf/bundle-size');
const fs = require('fs');

// create the respctive directory if doesnot exist
if (!fs.existsSync(perfPath)) {
  fs.mkdirSync(perfPath);
}

if (!fs.existsSync(bundleSizesPath)) {
  fs.mkdirSync(bundleSizesPath);
}

// remove old files
fs.readdir(bundleSizesPath, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(bundleSizesPath, file), err => {
      if (err) throw err
    })
  }
  fs.rmdirSync(bundleSizesPath);
});

// generate new bundle size report
explore('.next/static/**/*.js', {
  output: {
    format: 'html',
    filename: `${bundleSizesPath}/report.html`
  },
  noRoot: true,
  onlyMapped: true
})
  .then((result = {}) => {
    result.errors.forEach(error => {
      if (error.isWarning) {
        console.log(`Issue during '${error.bundleName}; explore`, error.message);
      } else {
        console.log(`Failed to explore '${error.bundleName}'`, error.message);
      }
    });
  })
  .catch(error => {
    console.log('Failed to explore');
    if (error.errors) {
      error.errors.forEach(exploreError => {
        console.log(exploreError.bundleName);
        console.log(exploreError.message);
      });
    } else {
      console.log(error);
    }
  });
