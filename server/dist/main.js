"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite_1 = require("./db/sqlite");
const agent_controller_1 = require("./modules/agent/agent.controller");
const ingest_controller_1 = require("./modules/ingest/ingest.controller");
const exec_controller_1 = require("./modules/exec/exec.controller");
const logger_1 = __importDefault(require("./utils/logger"));
const embedding_worker_1 = require("./workers/embedding.worker");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Initialize database
const db = (0, sqlite_1.initDb)();
app.locals.db = db;
// Start embedding worker
(0, embedding_worker_1.startEmbeddingWorker)();
// Routes
app.use('/api/agent', agent_controller_1.agentRouter);
app.use('/api/ingest', ingest_controller_1.ingestRouter);
app.use('/api/exec', exec_controller_1.execRouter);
// Serve frontend static files
app.use('/', express_1.default.static('frontend'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger_1.default.info(`Server listening on ${PORT}`);
});
