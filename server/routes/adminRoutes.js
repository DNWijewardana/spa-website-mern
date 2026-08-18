import { Router } from 'express';
import {
  getStats,
  getAllBookings,
  updateBookingStatus,
  getAllTestimonials,
  updateTestimonial,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Every admin route requires an authenticated admin user
router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id', updateBookingStatus);
router.get('/testimonials', getAllTestimonials);
router.patch('/testimonials/:id', updateTestimonial);

export default router;
