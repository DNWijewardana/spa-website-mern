import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    bio: { type: String },
    specialties: [{ type: String }],
    photo: { type: String },
    yearsExperience: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Therapist', therapistSchema);
