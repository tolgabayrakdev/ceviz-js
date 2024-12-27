class Validation {
    static async validate(schemaDefinition, item) {
        for (const key in schemaDefinition) {
            // 'id' alanını geçiyoruz
            if (key === 'id') {
                continue;
            }

            // Diğer alanlar için tür kontrolü
            if (schemaDefinition[key].type && typeof item[key] !== schemaDefinition[key].type) {
                throw new Error(`Invalid type for field '${key}', expected ${schemaDefinition[key].type}`);
            }
        }
    }
}

export default Validation;
