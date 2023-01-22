import { exec as execAsync } from 'child_process';
import util from 'util';

const exec = util.promisify(execAsync);

const platform = process.argv[2] ?? 'all';

async function clean() {
  console.log('Clean...');
  await exec('rm -rf ./dist');
}

async function buildChrome() {
  console.log('Build extension for Chrome...');
  await exec(`mkdir -p ./dist/chrome`);
  await exec(`cp -r ./apps/chrome/* ./dist/chrome`);
  await exec(`cp -r ./extension/* ./dist/chrome/src`);
}

async function buildSafari() {
  console.log('Build extension for Safari...');
  await exec(`xcrun safari-web-extension-converter --macos-only --app-name "geeknews-web-clipper" --project-location "./" --bundle-identifier "me.ragingwind.geeknews" ./chrome --no-open --force`,
  {
    cwd: './dist/'
  });

  await exec(`xcodebuild -scheme geeknews-web-clipper SYMROOT="./dist" build`, {
    cwd: './dist/geeknews-web-clipper/'
  });
}

await clean();
await buildChrome();
await buildSafari();