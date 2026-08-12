import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body);
  res.status(201).json({ user: createdUser, message: 'User created' });
});

export default router;
