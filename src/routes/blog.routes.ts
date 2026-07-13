import { Router } from 'express';
import { Blog } from '../models/blog.model';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ status: 'success', data: blogs });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.json({ status: 'success', data: blog });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ status: 'success', data: blog });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.json({ status: 'success', data: blog });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.json({ status: 'success', message: 'Blog deleted' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
