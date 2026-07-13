import { Router } from "express";

import { submitContact } from "../controllers/contact.controller";
import validateContact from "../middleware/validate";

const router = Router();

/**
 * POST /api/contact
 */
router.post(
  "/contact",
  validateContact,
  submitContact
);

export default router;