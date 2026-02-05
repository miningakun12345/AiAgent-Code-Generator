import { Router } from 'express';
import { ingestSnippet } from './ingest.service';

export const ingestRouter = Router();

ingestRouter.post('/snippet', async (req, res) => {
  const { language, filename, content } = req.body;
  try {
    const out = await ingestSnippet(req.app.locals.db, { language, filename, content });
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

