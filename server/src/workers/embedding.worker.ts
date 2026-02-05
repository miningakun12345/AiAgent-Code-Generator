import { getDb } from '../db/sqlite';
import { processQueue, addEmbeddingJob } from './queue';

export function startEmbeddingWorker() {
  processQueue(async (job) => {
    const { snippetId, content } = job.data;
    const db = getDb();
    
    try {
      // Create embedding - use placeholder since sql.js doesn't support AI embeddings
      const placeholderVector = Buffer.from(content.slice(0, 100)).toString('base64');
      const stmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
      stmt.run([snippetId, placeholderVector]);
      stmt.free();
      console.log(`Created embedding for snippet ${snippetId}`);
    } catch (err) {
      console.error('Embedding worker error:', err);
    }
  });
}

// Export function to add jobs from other modules
export { addEmbeddingJob };

