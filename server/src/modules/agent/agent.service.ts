import { getDb } from '../../db/sqlite';
import logger from '../../utils/logger';

export async function handleQuery(query: string, language: string = 'javascript') {
  if (!query) throw new Error('query required');

  const db = getDb();

  // 1. retrieval top 5 - simple keyword match for sql.js
  let rows: any[] = [];
  try {
    // sql.js doesn't support ai_embedding, use keyword search fallback
    const searchTerm = query.split(' ').slice(0, 3).join('%');
    const stmt = db.prepare(`SELECT id, filename, content FROM snippets WHERE content LIKE ? LIMIT 5`);
    stmt.bind([`%${searchTerm}%`]);
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
  } catch (err) {
    logger.warn('SQL retrieval failed, using fallback: ' + String(err));
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
  } catch (err) {
    logger.warn('Generation failed: ' + String(err));
    output = 'Unable to generate response at this time.';
  }

  // 3. save history
  try {
    const stmt = db.prepare(`INSERT INTO history (query, response) VALUES (?, ?)`);
    stmt.run([query, output]);
    stmt.free();
  } catch (err) {
    logger.warn('Failed to save history: ' + String(err));
  }

  return { answer: output, contextCount: rows.length };
}

