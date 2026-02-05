import { getDb } from '../db/sqlite';

export class SnippetsRepo {
  create(language: string, filename: string | null, content: string) {
    const db = getDb();
    const stmt = db.prepare(`INSERT INTO snippets (language, filename, content) VALUES (?, ?, ?)`);
    stmt.run([language, filename, content]);
    stmt.free();
    
    const result = db.exec('SELECT last_insert_rowid() as id');
    return { id: result[0]?.values[0]?.[0] || 0 };
  }

  findById(id: number) {
    const db = getDb();
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

