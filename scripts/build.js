import { exec as execAsync } from 'child_process';
import { promisify } from 'util';
import { Manifest } from './manifest.js';

const exec = promisify(execAsync);

const platform = process.argv[2] ?? 'all';

async function clean() {
  console.log('Clean...');

  await exec('rm -rf ./dist');
}

async function build() {
  console.log('Build...');

  await exec(`mkdir -p ./dist/extension`);
  await exec(`cp -r ./src/* ./dist/extension`);
}

async function buildChrome() {
  console.log('Build extension for Chrome...');

  await exec(`cp -r ./dist/extension ./dist/chrome/`);
}

async function buildFirefox() {
  console.log('Build extension for Firefox...');

  try {
    await exec(`cp -r ./dist/extension ./dist/firefox/`);

    const manifest = new Manifest('./dist/firefox/manifest.json');
    await manifest.read({
      background: {
        scripts: ['./background.js']
      }
    });
    await manifest.write();
  } catch (e) {
    console.error(e);
  }
}

async function buildSafari() {
  console.log('Build extension for Safari...');

  const options = `--macos-only --app-name "geeknews-web-clipper" --project-location "./dist" --bundle-identifier "me.ragingwind.geeknews"`;
  const addtional = `--no-open --force`;

  await exec(`xcrun safari-web-extension-converter ${options} ./dist/extension ${addtional}`);
  await exec(`xcodebuild -scheme geeknews-web-clipper -configuration Release SYMROOT="../safari" build`, {
    cwd: './dist/geeknews-web-clipper/'
  });
}

await clean();
await build();

await buildChrome();
await buildFirefox();
await buildSafari();