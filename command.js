// #!/usr/bin/env node
const program = require('commander');
const { exec, spawnSync, fork } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const projectRoot = process.cwd();

function moveLanguagesBuildToDestDir(languages) {
  languages.forEach(lang => {
    fs.renameSync(`./dist/${lang}`, `./out/${lang}`);
  });
}

function readDefaultConfig() {
  try {
    const config = fs.readFileSync(path.resolve(projectRoot, 'mlb.config.json'), 'utf-8');
    console.log(chalk.blue('Reading default config...'));
    return JSON.parse(config);
  } catch (err) {
    return {};
  }
}

async function normalizeOptions(languages) {
  const configs = readDefaultConfig();
  console.log(configs);
  if (languages) {
    configs.languages = [...new Set([...languages.split(','), ...configs.languages])];
  }
  return configs;
}

async function run() {
  const paramLanguages = program.opts();
  spawnSync('rm ', ['-rf', '/build /dist /out']);
  const configs = await normalizeOptions(paramLanguages.languages);
  const { languages, localesPath } = configs;

  await Promise.all([...languages.map(lang => new Promise((resolve, reject) => {
    const child = fork(path.resolve(__dirname, './command-child.js'), [localesPath, lang, projectRoot], { cwd: './', stdio: 'inherit' });

    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  })),

  new Promise((resolve, reject) => {
    const child = exec('npm run export', { cwd: './' });
    child.stdout.on('data', data => {
      console.log(chalk.blue(`\nReceived chunk ${data}`));
    });
    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  })
  ]);

  moveLanguagesBuildToDestDir(languages);
  spawnSync('rm ', ['-rf', path.resolve(projectRoot, '/build'), path.resolve(projectRoot, '/dist')]);
}

program
  .version('0.0.1')
  .description('Build Multilingual:');

program
  .option('-l, --languages [languages]', 'specify List of languages defaulting to en')
  .option('-lsp, --localesPath [localesPath]', 'specify Locales Path defaulting to \'public/locales\'')
  .action(run);

program.parse(process.argv);
