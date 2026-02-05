import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDb } from './db/sqlite';
import { agentRouter } from './modules/agent/agent.controller';
import { ingestRouter } from './modules/ingest/ingest.controller';
import { execRouter } from './modules/exec/exec.controller';
import logger from './utils/logger';
import { startEmbeddingWorker } from './workers/embedding.worker';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Initialize database
const db = initDb();
app.locals.db = db;

// Start embedding worker
startEmbeddingWorker();

// Routes
app.use('/api/agent', agentRouter);
app.use('/api/ingest', ingestRouter);
app.use('/api/exec', execRouter);

// Serve frontend static files
app.use('/', express.static('frontend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});

