class Validation {
    static async validate(schemaDefinition, item, existingData = []) {
        for (const key in schemaDefinition) {
            // 'id' alanını geçiyoruz
            if (key === 'id') {
                continue;
            }

            const field = schemaDefinition[key];

            // Diğer alanlar için tür kontrolü
            if (field.type && typeof item[key] !== field.type) {
                throw new Error(`Invalid type for field '${key}', expected ${field.type}`);
            }

            // Unique alanları kontrol et
            if (field.unique) {
                const duplicate = existingData.find(existingItem => existingItem[key] === item[key]);
                if (duplicate) {
                    throw new Error(`Duplicate value for unique field '${key}': ${item[key]}`);
                }
            }
        }
    }
}

export default Validation;
