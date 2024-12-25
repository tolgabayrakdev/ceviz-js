import fs from 'fs';

class FileService {
    constructor(filename) {
        this.filename = filename;
    }

    async _readFile() {
        const rawData = await fs.promises.readFile(this.filename, 'utf-8');
        return JSON.parse(rawData);
    }

    async _writeFile(data) {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.filename, jsonData, 'utf-8');
    }
}

export default FileService;
