import CevizJS from "../../src/ceviz.js";

const db = new CevizJS("database.json");

(async () => {
    await db.defineSchema("users", {
        id: { type: "number", required: true, unique: true },
        name: { type: "string", required: true },
        age: { type: "number", required: true },
        email: { type: "string", required: true, unique: true },
    });
    await db.defineSchema("posts", {
        id: { type: "number", required: true, unique: true },
        title: { type: "string", required: true },
        content: { type: "string", required: true },
        author: { type: "string", required: true },
        publishedAt: { type: "date", required: true },
    });
    await db.defineSchema("comments", {
        id: { type: "number", required: true, unique: true },
        content: { type: "string", required: true },
        author: { type: "string", required: true },
        publishedAt: { type: "date", required: true },
        postId: { type: "number", required: true },
    });
})();

export default db;