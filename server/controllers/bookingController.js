import Booking from '../models/Booking.js';
import Service from '../models/Service.js';

// All 30-min slots the spa offers in a day
const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

// GET /api/bookings/availability?date=YYYY-MM-DD&therapistId=
export const getAvailability = async (req, res, next) => {
  try {
    const { date, therapistId } = req.query;
    if (!date) {
      res.status(400);
      throw new Error('date is required (YYYY-MM-DD)');
    }
    const query = { date, status: { $ne: 'cancelled' } };
    if (therapistId) query.therapist = therapistId;

    const taken = await Booking.find(query).select('timeSlot -_id');
    const takenSlots = new Set(taken.map((b) => b.timeSlot));
    const available = ALL_SLOTS.filter((s) => !takenSlots.has(s));
    res.json({ date, available });
  } catch (err) {
    next(err);
  }
};

// POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const { serviceId, therapist, date, timeSlot, guestInfo, notes } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    const booking = await Booking.create({
      user: req.user?._id,
      guestInfo: req.user ? undefined : guestInfo,
      service: service._id,
      therapist: therapist || undefined,
      date,
      timeSlot,
      price: service.price,
      notes,
    });

    res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409);
      return next(new Error('That time slot is no longer available'));
    }
    next(err);
  }
};

// GET /api/bookings/mine
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service', 'name duration price image')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookings/:id/cancel
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    next(err);
  }
};
