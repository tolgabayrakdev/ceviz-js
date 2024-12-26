import FileService from './file-service.js';
import SchemaService from './schema-service.js';
import BackupService from './backup-service.js';

class CevizJS {
  constructor(filename) {
    if (!filename.endsWith('.json')) {
      filename += '.json';
    }

    this.filename = filename;
    this.fileService = new FileService(filename);
    this.schemaService = new SchemaService(filename);
    this.backupService = new BackupService(filename);
  }

  async createSchema(schemaName, schemaDefinition) {
    await this.schemaService.createSchema(schemaName, schemaDefinition);
  }

  async create(schemaName, item) {
    await this.schemaService.create(schemaName, item);
  }


  async backup(backupFilename) {
    await this.backupService.backup(backupFilename);
  }

  async restore(backupFilename) {
    await this.backupService.restore(backupFilename);
  }
}

export default CevizJS;