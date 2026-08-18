import { Router } from 'express';
import { purchaseGiftCard, checkGiftCard } from '../controllers/giftCardController.js';

const router = Router();

router.post('/', purchaseGiftCard);
router.get('/:code', checkGiftCard);

export default router;
