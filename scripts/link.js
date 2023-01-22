import { exec } from 'child_process';

const apps = [
  ['../../extension', './apps/chrome/src'],
  ['../../extension', './apps/firefox/src'],
];

console.log('Link extension code to extension apps...');

for await (const app of apps) {
  await exec(`ln -nsf ${app[0]} ${app[1]}`);
}