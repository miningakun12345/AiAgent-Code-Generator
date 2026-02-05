import { Router } from 'express';
import { handleQuery } from './agent.service';

export const agentRouter = Router();

agentRouter.post('/query', async (req, res) => {
  const { query, language } = req.body;
  try {
    const out = await handleQuery(req.app.locals.db, query, language || 'javascript');
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

