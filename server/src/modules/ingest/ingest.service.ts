import { getDb } from '../../db/sqlite';
import logger from '../../utils/logger';

export async function ingestSnippet(payload: { language: string; filename?: string; content: string }) {
  const { language, filename, content } = payload;
  const db = getDb();

  const stmt = db.prepare(`INSERT INTO snippets (language, filename, content) VALUES (?, ?, ?)`);
  stmt.run([language || 'text', filename || null, content]);
  stmt.free();

  const result = db.exec('SELECT last_insert_rowid() as id');
  const snippetId = result[0]?.values[0]?.[0] as number || 0;

  // Create embedding - simulated for sql.js (no native embedding support)
  try {
    const embStmt = db.prepare(`INSERT INTO embeddings (snippet_id, vector) VALUES (?, ?)`);
    // Store a simple hash as placeholder vector
    const placeholderVector = Buffer.from(content.slice(0, 100)).toString('base64');
    embStmt.run([snippetId, placeholderVector]);
    stmt.free();
  } catch (err) {
    logger.warn('Failed to create embedding: ' + String(err));
  }

  return { id: snippetId };
}

