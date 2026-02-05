"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetsRepo = void 0;
const sqlite_1 = require("../db/sqlite");
class SnippetsRepo {
    create(language, filename, content) {
        const db = (0, sqlite_1.getDb)();
        const stmt = db.prepare(`INSERT INTO snippets (language, filename, content) VALUES (?, ?, ?)`);
        stmt.run([language, filename, content]);
        stmt.free();
        const result = db.exec('SELECT last_insert_rowid() as id');
        return { id: result[0]?.values[0]?.[0] || 0 };
    }
    findById(id) {
        const db = (0, sqlite_1.getDb)();
        const stmt = db.prepare(`SELECT * FROM snippets WHERE id = ?`);
        stmt.bind([id]);
        if (stmt.step()) {
            const result = stmt.getAsObject();
            stmt.free();
            return result;
        }
        stmt.free();
        return null;
    }
}
exports.SnippetsRepo = SnippetsRepo;
