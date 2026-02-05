"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingsRepo = void 0;
const sqlite_1 = require("../db/sqlite");
class EmbeddingsRepo {
    insert(snippetId, vector) {
        const db = (0, sqlite_1.getDb)();
        const stmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
        stmt.run([snippetId, vector.toString('base64')]);
        stmt.free();
    }
}
exports.EmbeddingsRepo = EmbeddingsRepo;
