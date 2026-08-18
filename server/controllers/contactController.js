import ContactMessage from '../models/ContactMessage.js';

// POST /api/contact — store a contact message
export const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Name, email and message are required');
    }
    await ContactMessage.create({ name, email, message });
    // NOTE: send an email notification to the spa here in production.
    res.status(201).json({ message: "Thank you! We'll be in touch very soon." });
  } catch (err) {
    next(err);
  }
};
