import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestInfo: {
      name: String,
      email: String,
      phone: String,
    },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
    date: { type: String, required: true }, // YYYY-MM-DD
    timeSlot: { type: String, required: true }, // e.g. "14:30"
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    price: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Prevent double-booking the same therapist at the same date/time
bookingSchema.index(
  { therapist: 1, date: 1, timeSlot: 1 },
  { unique: true, partialFilterExpression: { therapist: { $type: 'objectId' } } }
);

export default mongoose.model('Booking', bookingSchema);
