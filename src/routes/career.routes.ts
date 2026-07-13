import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  res.json({ status: 'success', data: [] });
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Career created' });
});

export default router;
