import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  res.json({
    status: 'success',
    data: {
      siteName: 'Ace Soft Solution',
      tagline: 'Transforming Businesses Through Technology',
      email: 'info@acesoftsolutions.com',
      phone: '+1 (234) 567-890',
      address: '123 Tech Innovators Avenue, Suite 100, San Francisco, CA 94102',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      }
    }
  });
});

router.put('/', protect, authorize('admin'), async (req, res) => {
  res.json({ status: 'success', message: 'Settings updated' });
});

export default router;
