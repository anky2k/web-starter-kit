const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require("chalk");

const localesPath = process.argv[2];
const lang = process.argv[3];

function buildForEachLanguage(lang) {
  console.log(chalk.green("Started exporting for language:: ") + chalk.underline.green(lang));
  try {
    execSync(`cross-env BASE_PATH=/${lang}/ npm run export -- -o dist/${lang}`, { cwd: './', stdio: 'inherit' });
    // fs.renameSync('./out', `./${lang}`);
    console.log(chalk.green("successfully build & rename folder."));
  } catch (error) {
    console.log(chalk.red('Unsuccessful build & rename folder', error));
  }
  console.log(chalk.green("Ended exporting for language:: ") + chalk.underline.green(lang) + "\n\n");
}

buildForEachLanguage(lang, localesPath);
