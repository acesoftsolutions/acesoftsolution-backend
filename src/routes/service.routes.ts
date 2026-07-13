import { Router } from 'express';
import { Service } from '../models/service.model';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({ status: 'success', data: services });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get single service by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.json({ status: 'success', data: service });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Create service (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ status: 'success', data: service });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update service (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.json({ status: 'success', data: service });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.json({ status: 'success', message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
