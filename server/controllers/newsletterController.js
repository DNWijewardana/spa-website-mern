import Newsletter from '../models/Newsletter.js';

// POST /api/newsletter — subscribe
export const subscribe = async (req, res, next) => {
  try {
    const { email, source } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400);
      throw new Error('A valid email is required');
    }
    // Upsert so re-subscribing is idempotent (no duplicate-key error)
    await Newsletter.updateOne(
      { email: email.toLowerCase() },
      { $setOnInsert: { email: email.toLowerCase(), source: source || 'website' } },
      { upsert: true }
    );
    res.status(201).json({ message: "You're on the list. Welcome to the calm." });
  } catch (err) {
    next(err);
  }
};
