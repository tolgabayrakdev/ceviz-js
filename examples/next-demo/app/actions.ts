import CevizJS from "../../../src/ceviz.js";

const db = new CevizJS("database.json");

await db.createSchema("users", {
    id: { type: "number", required: true, unique: true },
    name: { type: "string", required: true },
    age: { type: "number", required: true },
    email: { type: "string", required: true, unique: true },
});

export async function createUser() {
    await db.create("users", {
        name: "John Doe",
        age: 30,
        email: "aRbJ6@example.com"
    });
}

export async function getAllUsers() {
    return await db.schemaService.getAll("users");
}