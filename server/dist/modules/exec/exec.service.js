"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCode = runCode;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
async function runCode(language, code) {
    // write temp file
    const tmpDir = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), 'ai-agent-'));
    const filename = language === 'python' ? 'code.py' : 'code.js';
    const filePath = path_1.default.join(tmpDir, filename);
    fs_1.default.writeFileSync(filePath, code, 'utf8');
    // call sandbox runner script
    const runner = path_1.default.resolve(process.cwd(), 'sandbox', 'runner.sh');
    return new Promise((resolve) => {
        const proc = (0, child_process_1.spawn)('bash', [runner, filePath, language], { stdio: ['ignore', 'pipe', 'pipe'] });
        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', (d) => (stdout += d.toString()));
        proc.stderr.on('data', (d) => (stderr += d.toString()));
        proc.on('close', (codeExit) => {
            try {
                fs_1.default.rmSync(tmpDir, { recursive: true, force: true });
            }
            catch { }
            resolve({ exitCode: codeExit, stdout, stderr });
        });
    });
}
