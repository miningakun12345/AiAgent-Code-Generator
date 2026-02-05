import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  // TODO: Implement login
  res.json({ message: 'Login endpoint' });
});

authRouter.post('/register', async (req, res) => {
  // TODO: Implement register
  res.json({ message: 'Register endpoint' });
});

