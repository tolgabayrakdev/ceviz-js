import fs from 'fs';

class FileService {
  constructor(filename) {
    this.filename = filename;
  }

  static fileExists(filename) {
    return fs.existsSync(filename);
  }

  static createFile(filename, initialData) {
    const data = JSON.stringify(initialData, null, 2);
    fs.writeFileSync(filename, data, 'utf8');
  }

  async _readFile() {
    const data = await fs.promises.readFile(this.filename, 'utf8');
    return JSON.parse(data);
  }

  async _writeFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.promises.writeFile(this.filename, jsonData, 'utf8');
  }
}

export default FileService;
