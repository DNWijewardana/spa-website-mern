import { Router } from 'express';
import { getTherapists, getTherapistBySlug } from '../controllers/therapistController.js';

const router = Router();

router.get('/', getTherapists);
router.get('/:slug', getTherapistBySlug);

export default router;
