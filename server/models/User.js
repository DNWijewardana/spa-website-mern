import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['guest', 'member', 'admin'],
      default: 'member',
    },
    membershipTier: {
      type: String,
      enum: ['none', 'essential', 'signature', 'elite'],
      default: 'none',
    },
  },
  { timestamps: true }
);

// Hash helper — call from controller before create
userSchema.statics.hashPassword = (plain) => bcrypt.hash(plain, 10);

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

export default mongoose.model('User', userSchema);
