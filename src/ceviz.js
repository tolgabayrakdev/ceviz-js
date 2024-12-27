import FileService from './file-service.js';
import SchemaService from './schema-service.js';
import BackupService from './backup-service.js';

class CevizJS {
  constructor(filename) {
    if (!filename.endsWith('.json')) {
      filename += '.json';
    }

    this.filename = filename;

    // Eğer dosya yoksa oluştur
    if (!FileService.fileExists(filename)) {
      FileService.createFile(filename, { schemas: {} });
    }

    this.fileService = new FileService(filename);
    this.schemaService = new SchemaService(filename);
    this.backupService = new BackupService(filename);

    this.schemas = {}; // Tanımlanmış şemaları saklamak için
  }

  async defineSchema(schemaName, schemaDefinition) {
    // Şema zaten tanımlandıysa, tekrar oluşturma
    if (this.schemas[schemaName]) {
      return this.schemas[schemaName];
    }

    // Şema oluşturma işlemi
    try {
      await this.schemaService.createSchema(schemaName, schemaDefinition);
      this.schemas[schemaName] = schemaDefinition; // Şemayı bellekte sakla
    } catch (error) {
      if (!error.message.includes(`Schema '${schemaName}' already exists`)) {
        throw error; // Farklı bir hata ise devam ettir
      }
    }

    return this.schemas[schemaName];
  }

  async create(schemaName, item) {
    return await this.schemaService.create(schemaName, item);
  }

  async findAll(schemaName) {
    return await this.schemaService.getAll(schemaName);
  }

  async findById(schemaName, id) {
    return await this.schemaService.findById(schemaName, id);
  }

  async update(schemaName, id, newItem) {
    return await this.schemaService.update(schemaName, id, newItem);
  }

  async delete(schemaName, id) {
    return await this.schemaService.delete(schemaName, id);
  }

  async backup(backupFilename) {
    return await this.backupService.backup(backupFilename);
  }

  async restore(backupFilename) {
    return await this.backupService.restore(backupFilename);
  }
}

export default CevizJS;
