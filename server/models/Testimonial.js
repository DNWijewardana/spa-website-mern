import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    guestName: { type: String, required: true },
    photo: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    service: { type: String },
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
