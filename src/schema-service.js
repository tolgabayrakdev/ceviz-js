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

        // Şema validasyonunu yap
        await Validation.validate(schema.schemaDefinition, item);

        const newId = schema.lastId + 1;
        const newItem = { id: newId, ...item };
        schema.data.push(newItem);
        schema.lastId = newId;
        await this.fileService._writeFile(data);
    }

    // Diğer schema işlemleri burada olacak (getAll, update, delete, vb.)
}

export default SchemaService;
