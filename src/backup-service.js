import fs from 'fs';
import path from 'path';
import FileService from './file-service.js';

class BackupService {
  constructor(filename) {
    this.fileService = new FileService(filename);
  }

  async backup(backupFilename) {
    const data = await this.fileService._readFile();
    await fs.promises.writeFile(path.join(process.cwd(), backupFilename), JSON.stringify(data, null, 2), 'utf-8');
  }

  async restore(backupFilename) {
    const backupData = JSON.parse(await fs.promises.readFile(path.join(process.cwd(), backupFilename), 'utf-8'));
    await this.fileService._writeFile(backupData);
  }
}

export default BackupService;
