import { Router } from 'express';
import { runCode } from './exec.service';

export const execRouter = Router();

execRouter.post('/run', async (req, res) => {
  const { language, code } = req.body;
  try {
    const out = await runCode(language || 'javascript', code);
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

