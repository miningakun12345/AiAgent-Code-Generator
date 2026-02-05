import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || '3000',
  DB_PATH: process.env.DB_PATH || './data/data.db',
  SQLITE_AI_EXT: process.env.SQLITE_AI_EXT || './sqlite_extensions/libsqliteai.so',
  SANDBOX_IMAGE: process.env.SANDBOX_IMAGE || 'node:18',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379'
};

