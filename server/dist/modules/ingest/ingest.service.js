"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestSnippet = ingestSnippet;
const sqlite_1 = require("../../db/sqlite");
const logger_1 = __importDefault(require("../../utils/logger"));
async function ingestSnippet(payload) {
    const { language, filename, content } = payload;
    const db = (0, sqlite_1.getDb)();
    const stmt = db.prepare(`INSERT INTO snippets (language, filename, content) VALUES (?, ?, ?)`);
    stmt.run([language || 'text', filename || null, content]);
    stmt.free();
    const result = db.exec('SELECT last_insert_rowid() as id');
    const snippetId = result[0]?.values[0]?.[0] || 0;
    // Create embedding - simulated for sql.js (no native embedding support)
    try {
        const embStmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
        // Store a simple hash as placeholder vector
        const placeholderVector = Buffer.from(content.slice(0, 100)).toString('base64');
        embStmt.run([snippetId, placeholderVector]);
        stmt.free();
    }
    catch (err) {
        logger_1.default.warn('Failed to create embedding: ' + String(err));
    }
    return { id: snippetId };
}
