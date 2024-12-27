import FileService from './file-service.js';
import Validation from './validation.js';

class SchemaService {
    constructor(filename) {
        this.fileService = new FileService(filename);
    }

    async createSchema(schemaName, schemaDefinition = {}) {
        const data = await this.fileService._readFile();
        if (data.schemas[schemaName]) {
            throw new Error(`Schema '${schemaName}' already exists`);
        }
        data.schemas[schemaName] = { data: [], lastId: 0, schemaDefinition };
        await this.fileService._writeFile(data);
    }

    async create(schemaName, item) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }

        // Şema validasyonunu yap (mevcut verileri kontrol et)
        await Validation.validate(schema.schemaDefinition, item, schema.data);

        // ID oluşturulması
        const newId = schema.lastId + 1;
        const newItem = { id: newId, ...item };
        schema.data.push(newItem);
        schema.lastId = newId;
        await this.fileService._writeFile(data);
    }


    async getAll(schemaName) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }
        return schema.data;
    }

    async findById(schemaName, id) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }
        const item = schema.data.find(item => item.id === id);
        if (!item) {
            throw new Error(`Item with ID '${id}' not found`);
        }
        return item;
    }

    async update(schemaName, id, newItem) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }

        const index = schema.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Item with ID '${id}' not found`);
        }

        // Şema validasyonunu yap
        await Validation.validate(schema.schemaDefinition, newItem);

        // Eski öğeyi güncelle
        schema.data[index] = { ...schema.data[index], ...newItem };
        await this.fileService._writeFile(data);
    }

    async delete(schemaName, id) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }

        const index = schema.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Item with ID '${id}' not found`);
        }

        schema.data.splice(index, 1);
        await this.fileService._writeFile(data);
    }

    async search(schemaName, query) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }

        return schema.data.filter(item => {
            for (let key in query) {
                if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    async sortBy(schemaName, field, ascending = true) {
        const data = await this.fileService._readFile();
        const schema = data.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema '${schemaName}' does not exist`);
        }

        schema.data.sort((a, b) => {
            if (a[field] < b[field]) return ascending ? -1 : 1;
            if (a[field] > b[field]) return ascending ? 1 : -1;
            return 0;
        });
        await this.fileService._writeFile(data);
    }
}

export default SchemaService;
