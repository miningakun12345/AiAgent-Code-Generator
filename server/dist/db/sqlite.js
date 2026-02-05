"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
exports.getDb = getDb;
const sql_js_1 = __importDefault(require("sql.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
let db = null;
async function initDb() {
    const dbPath = path_1.default.resolve(process.cwd(), config_1.default.DB_PATH);
    const dbDir = path_1.default.dirname(dbPath);
    if (!fs_1.default.existsSync(dbDir)) {
        fs_1.default.mkdirSync(dbDir, { recursive: true });
    }
    const SQL = await (0, sql_js_1.default)();
    // Load existing database or create new one
    if (fs_1.default.existsSync(dbPath)) {
        const fileBuffer = fs_1.default.readFileSync(dbPath);
        db = new SQL.Database(fileBuffer);
        logger_1.default.info('Loaded existing database from ' + dbPath);
    }
    else {
        db = new SQL.Database();
        logger_1.default.info('Created new database at ' + dbPath);
    }
    // Run migrations
    const migrations = fs_1.default.readFileSync(path_1.default.resolve(__dirname, 'migrations.sql'), 'utf8');
    db.run(migrations);
    logger_1.default.info('Database migrations applied');
    // Save database periodically
    setInterval(() => {
        if (db) {
            const data = db.export();
            const buffer = Buffer.from(data);
            fs_1.default.writeFileSync(dbPath, buffer);
            logger_1.default.info('Database saved');
        }
    }, 5000);
    return db;
}
function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
