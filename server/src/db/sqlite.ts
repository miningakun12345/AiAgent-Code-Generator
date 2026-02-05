import initSqlJs, { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';
import config from '../config';
import logger from '../utils/logger';

let db: Database | null = null;
let SqlJs: any = null;

export async function initDb() {
  const dbPath = path.resolve(process.cwd(), config.DB_PATH);
  const dbDir = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  SqlJs = await initSqlJs();

  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SqlJs.Database(fileBuffer);
    logger.info('Loaded existing database from ' + dbPath);
  } else {
    db = new SqlJs.Database();
    logger.info('Created new database at ' + dbPath);
  }

  // Run migrations
  if (db) {
    const migrations = fs.readFileSync(path.resolve(__dirname, 'migrations.sql'), 'utf8');
    db.run(migrations);
    logger.info('Database migrations applied');

    // Save database periodically
    setInterval(() => {
      if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
        logger.info('Database saved');
      }
    }, 5000);
  }

  return db;
}

export function getDb(): Database {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

