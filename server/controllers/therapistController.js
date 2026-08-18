import Therapist from '../models/Therapist.js';

// GET /api/therapists
export const getTherapists = async (req, res, next) => {
  try {
    const therapists = await Therapist.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(therapists);
  } catch (err) {
    next(err);
  }
};

// GET /api/therapists/:slug
export const getTherapistBySlug = async (req, res, next) => {
  try {
    const therapist = await Therapist.findOne({ slug: req.params.slug, isActive: true });
    if (!therapist) {
      res.status(404);
      throw new Error('Therapist not found');
    }
    res.json(therapist);
  } catch (err) {
    next(err);
  }
};
