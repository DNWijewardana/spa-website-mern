import Booking from '../models/Booking.js';
import Testimonial from '../models/Testimonial.js';
import Service from '../models/Service.js';
import ContactMessage from '../models/ContactMessage.js';
import Newsletter from '../models/Newsletter.js';

// GET /api/admin/stats — dashboard summary counts
export const getStats = async (req, res, next) => {
  try {
    const [bookings, pending, services, subscribers, messages] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Service.countDocuments({ isActive: true }),
      Newsletter.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
    ]);
    res.json({ bookings, pendingBookings: pending, services, subscribers, unreadMessages: messages });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('service', 'name price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/bookings/:id — update status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/testimonials — all, including unapproved
export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/testimonials/:id — approve / feature
export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }
    res.json(testimonial);
  } catch (err) {
    next(err);
  }
};
