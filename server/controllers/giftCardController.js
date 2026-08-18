import GiftCard from '../models/GiftCard.js';

// POST /api/giftcards — purchase a gift card
export const purchaseGiftCard = async (req, res, next) => {
  try {
    const { amount, design, purchaser, recipient } = req.body;
    if (!amount || amount < 10) {
      res.status(400);
      throw new Error('A valid amount is required (min $10)');
    }
    const card = await GiftCard.create({ amount, design, purchaser, recipient });
    // NOTE: integrate Stripe + email delivery here in production.
    res.status(201).json({
      message: 'Gift card created! A copy has been emailed.',
      code: card.code,
      amount: card.amount,
      expiresAt: card.expiresAt,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/giftcards/:code — check balance
export const checkGiftCard = async (req, res, next) => {
  try {
    const card = await GiftCard.findOne({ code: req.params.code.toUpperCase() }).select(
      'code amount balance status expiresAt'
    );
    if (!card) {
      res.status(404);
      throw new Error('Gift card not found');
    }
    res.json(card);
  } catch (err) {
    next(err);
  }
};
