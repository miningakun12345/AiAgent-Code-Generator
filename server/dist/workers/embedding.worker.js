"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmbeddingJob = void 0;
exports.startEmbeddingWorker = startEmbeddingWorker;
const sqlite_1 = require("../db/sqlite");
const queue_1 = require("./queue");
Object.defineProperty(exports, "addEmbeddingJob", { enumerable: true, get: function () { return queue_1.addEmbeddingJob; } });
function startEmbeddingWorker() {
    (0, queue_1.processQueue)(async (job) => {
        const { snippetId, content } = job.data;
        const db = (0, sqlite_1.getDb)();
        try {
            // Create embedding - use placeholder since sql.js doesn't support AI embeddings
            const placeholderVector = Buffer.from(content.slice(0, 100)).toString('base64');
            const stmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
            stmt.run([snippetId, placeholderVector]);
            stmt.free();
            console.log(`Created embedding for snippet ${snippetId}`);
        }
        catch (err) {
            console.error('Embedding worker error:', err);
        }
    });
}
