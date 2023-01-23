import { readFile, writeFile } from 'fs/promises';

export class Manifest {
  constructor(filePath) {
    this.filePath = filePath;
    this.fileOpt = { encoding: 'utf8' };
    this.manifest = {};
  }

  async read(patch = {}) {
    this.manifest = JSON.parse(await readFile(this.filePath, this.fileOpt));
    this.update(patch);
  }

  update(manifest) {
    this.manifest = {
      ...this.manifest,
      ...manifest
    }
  }

  async write() {
    await writeFile(this.filePath, JSON.stringify(this.manifest, null, 4), this.fileOpt);
  }
}