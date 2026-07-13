import { Router } from 'express';
import { Portfolio } from '../models/portfolio.model';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ isActive: true });
    res.json({ status: 'success', data: portfolios });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    if (!portfolio) return res.status(404).json({ status: 'error', message: 'Portfolio not found' });
    res.json({ status: 'success', data: portfolio });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.status(201).json({ status: 'success', data: portfolio });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!portfolio) return res.status(404).json({ status: 'error', message: 'Portfolio not found' });
    res.json({ status: 'success', data: portfolio });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) return res.status(404).json({ status: 'error', message: 'Portfolio not found' });
    res.json({ status: 'success', message: 'Portfolio deleted' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
