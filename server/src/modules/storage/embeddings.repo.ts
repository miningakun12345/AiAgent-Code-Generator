import { getDb } from '../db/sqlite';

export class EmbeddingsRepo {
  insert(snippetId: number, vector: Buffer) {
    const db = getDb();
    const stmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
    stmt.run([snippetId, vector.toString('base64')]);
    stmt.free();
  }
}

