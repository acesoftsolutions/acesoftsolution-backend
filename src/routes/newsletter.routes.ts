import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

const router = Router();

// GET NEWSLETTERS
router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.json({
        status: 'success',
        data: [],
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

// SUBSCRIBE NEWSLETTER
router.post(
  '/',
  [body('email').isEmail().withMessage('Valid email required')],
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(201).json({
        status: 'success',
        message: 'Subscribed successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
);

export default router;