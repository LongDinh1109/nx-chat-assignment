import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const handleLogin = (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  const result = AuthService.login(username);
  if (!result) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  return res.json(result);
};

export const handleLogout = (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const result = AuthService.logout(userId);

  if (result.error) {
    return res.status(404).json(result);
  }

  return res.status(200).json(result);
};
