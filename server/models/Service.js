import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      enum: ['massage', 'facial', 'body', 'hydrotherapy', 'package'],
      required: true,
    },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    duration: { type: Number, required: true }, // minutes
    price: { type: Number, required: true },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
