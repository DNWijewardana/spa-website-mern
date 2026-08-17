import { Router } from 'express';
import {
  getAvailability,
  createBooking,
  getMyBookings,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/availability', getAvailability);
router.post('/', createBooking); // guest or authed
router.get('/mine', protect, getMyBookings);
router.patch('/:id/cancel', protect, cancelBooking);

export default router;
