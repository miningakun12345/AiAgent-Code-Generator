import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import logger from '../../utils/logger';

export async function runCode(language: string, code: string) {
  // write temp file
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-agent-'));
  const filename = language === 'python' ? 'code.py' : 'code.js';
  const filePath = path.join(tmpDir, filename);
  fs.writeFileSync(filePath, code, 'utf8');

  // call sandbox runner script
  const runner = path.resolve(process.cwd(), 'sandbox', 'runner.sh');
  return new Promise((resolve) => {
    const proc = spawn('bash', [runner, filePath, language], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => (stdout += d.toString()));
    proc.stderr.on('data', (d) => (stderr += d.toString()));
    proc.on('close', (codeExit) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      resolve({ exitCode: codeExit, stdout, stderr });
    });
  });
}

