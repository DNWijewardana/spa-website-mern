import Testimonial from '../models/Testimonial.js';

// GET /api/testimonials  (?featured=true) — approved only
export const getTestimonials = async (req, res, next) => {
  try {
    const filter = { isApproved: true };
    if (req.query.featured === 'true') filter.isFeatured = true;
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

// POST /api/testimonials — guest submission (unapproved by default)
export const createTestimonial = async (req, res, next) => {
  try {
    const { guestName, rating, quote, service } = req.body;
    if (!guestName || !quote) {
      res.status(400);
      throw new Error('Name and quote are required');
    }
    const testimonial = await Testimonial.create({ guestName, rating, quote, service });
    res.status(201).json({ message: 'Thank you! Your review is pending approval.', testimonial });
  } catch (err) {
    next(err);
  }
};
