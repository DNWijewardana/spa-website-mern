import { Router } from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Admin
router.post('/', protect, authorize('admin'), createService);
router.patch('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;
