"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQuery = handleQuery;
const sqlite_1 = require("../../db/sqlite");
const logger_1 = __importDefault(require("../../utils/logger"));
async function handleQuery(query, language = 'javascript') {
    if (!query)
        throw new Error('query required');
    const db = (0, sqlite_1.getDb)();
    // 1. retrieval top 5 - simple keyword match for sql.js
    let rows = [];
    try {
        // sql.js doesn't support ai_embedding, use keyword search fallback
        const searchTerm = query.split(' ').slice(0, 3).join('%');
        const stmt = db.prepare(`SELECT id, filename, content FROM snippets WHERE content LIKE ? LIMIT 5`);
        stmt.bind([`%${searchTerm}%`]);
        while (stmt.step()) {
            rows.push(stmt.getAsObject());
        }
        stmt.free();
    }
    catch (err) {
        logger_1.default.warn('SQL retrieval failed, using fallback: ' + String(err));
    }
    const context = rows.map(r => `// ${r.filename || 'snippet'}\n${r.content}`).join('\n\n---\n\n');
    const prompt = `You are an on-device coding assistant for ${language}.\nContext:\n${context}\nUser: ${query}\nAssistant:`;
    // 2. generate response (simulated since sql.js doesn't have ai_generate)
    let output = '';
    try {
        // In a real implementation, this would call sqlite-ai or external LLM
        output = `Based on the context provided, here's my response to your query "${query}":\n\n` +
            `I found ${rows.length} relevant snippets.\n\n` +
            `Note: This is a demonstration response. In production, integrate with SQLite-AI extension or external LLM API.`;
    }
    catch (err) {
        logger_1.default.warn('Generation failed: ' + String(err));
        output = 'Unable to generate response at this time.';
    }
    // 3. save history
    try {
        const stmt = db.prepare(`INSERT INTO history (query, response) VALUES (?, ?)`);
        stmt.run([query, output]);
        stmt.free();
    }
    catch (err) {
        logger_1.default.warn('Failed to save history: ' + String(err));
    }
    return { answer: output, contextCount: rows.length };
}
