import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Placeholder routes
router.get('/', async (req, res) => {
  res.json({ status: 'success', data: [] });
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  res.json({ status: 'success', message: 'Testimonial created' });
});

export default router;
